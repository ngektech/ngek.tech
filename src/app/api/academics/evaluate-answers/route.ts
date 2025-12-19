import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDatabase } from "@/lib/mongodb";
import sanitizeHtml from "sanitize-html";
import {
  Question,
  Answer,
  QuestionScore,
  SkillScore,
  EvaluateAnswersRequest,
  EvaluateAnswersResponse,
  SKILL_CATEGORIES,
  SkillCategory,
} from "@/lib/academics-types";

const anthropic = new Anthropic();

function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function generateCertificateId(): string {
  return `CERT-ASI-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

function calculateSkillBreakdown(scores: QuestionScore[]): SkillScore[] {
  const skillScores: Map<SkillCategory, { total: number; count: number }> = new Map();

  // Initialize all skills.
  for (const skill of SKILL_CATEGORIES) {
    skillScores.set(skill, { total: 0, count: 0 });
  }

  // Aggregate scores by skill.
  for (const score of scores) {
    const current = skillScores.get(score.skillCategory);
    if (current) {
      current.total += score.score;
      current.count += 1;
    }
  }

  // Calculate averages.
  const breakdown: SkillScore[] = [];
  for (const skill of SKILL_CATEGORIES) {
    const data = skillScores.get(skill);
    if (data && data.count > 0) {
      breakdown.push({
        skill,
        score: Math.round((data.total / data.count) * 10) / 10,
        questionsCount: data.count,
      });
    } else {
      breakdown.push({
        skill,
        score: 0,
        questionsCount: 0,
      });
    }
  }

  return breakdown;
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateAnswersRequest = await request.json();
    const { quizId, participantName, questions, answers } = body;

    // Validate input.
    if (!quizId || !participantName || !questions || !answers) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        } as EvaluateAnswersResponse,
        { status: 400 }
      );
    }

    if (questions.length !== 10 || answers.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          error: "All 10 questions must be answered.",
        } as EvaluateAnswersResponse,
        { status: 400 }
      );
    }

    // Sanitize and validate answers.
    const sanitizedAnswers: Answer[] = answers.map((answer) => ({
      ...answer,
      text: sanitizeInput(answer.text.substring(0, 256)),
    }));

    // Build evaluation prompt.
    const questionsAndAnswers = questions.map((q: Question, i: number) => {
      const answer = sanitizedAnswers.find((a) => a.questionId === q.id);
      return `Question ${q.id} (${q.skillCategory}, ${q.difficulty}):
"${q.text}"

Answer: "${answer?.text || "(No answer provided)"}"`;
    }).join("\n\n---\n\n");

    const systemPrompt = `You are an expert evaluator for an Artificial Superintelligence (ASI) knowledge assessment. Your task is to evaluate each answer and provide a score from 1 to 10.

Scoring Guidelines:
- 1-2: Completely incorrect or irrelevant answer
- 3-4: Shows minimal understanding, major misconceptions
- 5-6: Partial understanding, some correct concepts but incomplete
- 7-8: Good understanding, mostly correct with minor gaps
- 9-10: Excellent understanding, comprehensive and insightful answer

Consider:
- Accuracy of information about ASI concepts
- Depth of understanding demonstrated
- Critical thinking and nuance
- Relevance to the question asked
- Clarity of explanation

Return ONLY valid JSON in this exact format:
{
  "scores": [
    {
      "questionId": 1,
      "score": 7,
      "feedback": "Brief constructive feedback (1-2 sentences)",
      "skillCategory": "Exact skill category from the question"
    }
  ]
}

Evaluate all 10 questions. Do not include any markdown, code blocks, or explanations outside the JSON.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Evaluate these ASI quiz answers:\n\n${questionsAndAnswers}`,
        },
      ],
      system: systemPrompt,
    });

    // Extract text content.
    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response.");
    }

    // Parse JSON response.
    let responseText = textContent.text.trim();
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```json?\n?/g, "").replace(/```/g, "");
    }

    const parsed = JSON.parse(responseText);
    const scores: QuestionScore[] = parsed.scores;

    if (!scores || scores.length !== 10) {
      throw new Error("Invalid number of scores returned.");
    }

    // Calculate skill breakdown.
    const skillBreakdown = calculateSkillBreakdown(scores);

    // Calculate overall score (percentage).
    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const overallScore = Math.round((totalScore / 100) * 100);

    // Generate certificate ID.
    const certificateId = generateCertificateId();

    // Update quiz in MongoDB.
    const db = await getDatabase();
    const collection = db.collection("academic_quizzes");

    await collection.updateOne(
      { quizId },
      {
        $set: {
          answers: sanitizedAnswers,
          scores,
          skillBreakdown,
          overallScore,
          certificateId,
          completedAt: new Date(),
          status: "completed",
        },
      }
    );

    return NextResponse.json({
      success: true,
      scores,
      skillBreakdown,
      overallScore,
      certificateId,
    } as EvaluateAnswersResponse);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Answer evaluation error:", error);
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to evaluate answers. Please try again.",
      } as EvaluateAnswersResponse,
      { status: 500 }
    );
  }
}
