import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDatabase } from "@/lib/mongodb";
import sanitizeHtml from "sanitize-html";
import {
  Question,
  Answer,
  QuestionScore,
  SkillScore,
  FieldScore,
  EnhancedQuestionScore,
  EvaluateAnswersRequest,
  EvaluateAnswersResponse,
  SKILL_CATEGORIES,
  EVALUATION_FIELDS,
  SkillCategory,
  EvaluationField,
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

  for (const skill of SKILL_CATEGORIES) {
    skillScores.set(skill, { total: 0, count: 0 });
  }

  for (const score of scores) {
    const current = skillScores.get(score.skillCategory);
    if (current) {
      current.total += score.score;
      current.count += 1;
    }
  }

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

function calculateFieldBreakdown(enhancedScores: EnhancedQuestionScore[]): FieldScore[] {
  const fieldTotals: Map<EvaluationField, { total: number; count: number; reasonings: string[] }> = new Map();

  for (const field of EVALUATION_FIELDS) {
    fieldTotals.set(field, { total: 0, count: 0, reasonings: [] });
  }

  for (const score of enhancedScores) {
    for (const fieldScore of score.fieldScores) {
      const current = fieldTotals.get(fieldScore.field);
      if (current) {
        current.total += fieldScore.score;
        current.count += 1;
        current.reasonings.push(fieldScore.reasoning);
      }
    }
  }

  const breakdown: FieldScore[] = [];
  for (const field of EVALUATION_FIELDS) {
    const data = fieldTotals.get(field);
    if (data && data.count > 0) {
      breakdown.push({
        field,
        score: Math.round((data.total / data.count) * 10) / 10,
        reasoning: `Evaluated across ${data.count} responses.`,
      });
    } else {
      breakdown.push({
        field,
        score: 5, // Default neutral score.
        reasoning: "Not directly assessed.",
      });
    }
  }

  return breakdown;
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateAnswersRequest = await request.json();
    const { quizId, participantName, questions, answers } = body;

    if (!quizId || !participantName || !questions || !answers) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." } as EvaluateAnswersResponse,
        { status: 400 }
      );
    }

    if (questions.length !== 10 || answers.length !== 10) {
      return NextResponse.json(
        { success: false, error: "All 10 questions must be answered." } as EvaluateAnswersResponse,
        { status: 400 }
      );
    }

    const sanitizedAnswers: Answer[] = answers.map((answer) => ({
      ...answer,
      text: sanitizeInput(answer.text.substring(0, 256)),
    }));

    const questionsAndAnswers = questions.map((q: Question, i: number) => {
      const answer = sanitizedAnswers.find((a) => a.questionId === q.id);
      return `Question ${q.id} (${q.skillCategory}, ${q.difficulty}):
"${q.text}"

Answer: "${answer?.text || "(No answer provided)"}"`;
    }).join("\n\n---\n\n");

    // ========== PASS 1: Initial Multi-Field Evaluation ==========
    const pass1SystemPrompt = `You are an expert evaluator for an Artificial Superintelligence (ASI) knowledge assessment. ASI is an open-ended, interdisciplinary field that draws from many domains of human knowledge.

Your task is to evaluate each answer across 12 dimensions, recognizing that ASI thinking can come from diverse perspectives:

1. **Philosophy** - Metaphysical understanding, consciousness, existence, epistemology
2. **Art** - Creative thinking, aesthetic understanding, imagination, expression
3. **Science** - Scientific method, empirical reasoning, hypothesis formation
4. **Biology** - Life systems, evolution, neural processes, organic intelligence
5. **Cybernetics** - Feedback systems, control theory, human-machine interaction
6. **SciFi** - Speculative futures, imagination, narrative understanding of AI
7. **Computer Science** - Algorithms, computation, AI/ML technical knowledge
8. **Mysticism** - Transcendent understanding, intuition, holistic thinking
9. **Policy** - Governance, regulation, societal structures, ethics in practice
10. **Yoga** - Mind-body connection, discipline, concentration, self-awareness
11. **Mindfulness** - Present awareness, clarity of thought, metacognition
12. **Data Engineering** - Systems thinking, data flows, infrastructure, scalability

IMPORTANT: Be generous and open-minded. ASI is speculative and open-ended - there are no "wrong" answers if they show genuine thought. Value creativity, original thinking, and interdisciplinary connections.

Scoring Guidelines:
- 1-3: Answer shows no engagement with the topic
- 4-5: Basic engagement, conventional thinking
- 6-7: Good understanding, some original insights
- 8-9: Excellent insight, creative connections, deep understanding
- 10: Exceptional - profound, original, interdisciplinary thinking

Return ONLY valid JSON:
{
  "evaluations": [
    {
      "questionId": 1,
      "initialScore": 7,
      "feedback": "Constructive feedback here",
      "skillCategory": "The skill category from the question",
      "fieldScores": [
        {"field": "Philosophy", "score": 7, "reasoning": "Brief reason"},
        {"field": "Art", "score": 6, "reasoning": "Brief reason"},
        {"field": "Science", "score": 8, "reasoning": "Brief reason"},
        {"field": "Biology", "score": 5, "reasoning": "Brief reason"},
        {"field": "Cybernetics", "score": 7, "reasoning": "Brief reason"},
        {"field": "SciFi", "score": 8, "reasoning": "Brief reason"},
        {"field": "Computer Science", "score": 7, "reasoning": "Brief reason"},
        {"field": "Mysticism", "score": 6, "reasoning": "Brief reason"},
        {"field": "Policy", "score": 7, "reasoning": "Brief reason"},
        {"field": "Yoga", "score": 5, "reasoning": "Brief reason"},
        {"field": "Mindfulness", "score": 6, "reasoning": "Brief reason"},
        {"field": "Data Engineering", "score": 6, "reasoning": "Brief reason"}
      ]
    }
  ]
}`;

    const pass1Response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      messages: [
        {
          role: "user",
          content: `Evaluate these ASI quiz answers with multi-field reasoning:\n\n${questionsAndAnswers}`,
        },
      ],
      system: pass1SystemPrompt,
    });

    const pass1Text = pass1Response.content.find((block) => block.type === "text");
    if (!pass1Text || pass1Text.type !== "text") {
      throw new Error("No text content in pass 1 response.");
    }

    let pass1ResponseText = pass1Text.text.trim();
    if (pass1ResponseText.startsWith("```")) {
      pass1ResponseText = pass1ResponseText.replace(/```json?\n?/g, "").replace(/```/g, "");
    }

    const pass1Parsed = JSON.parse(pass1ResponseText);
    const initialEvaluations = pass1Parsed.evaluations;

    // ========== PASS 2: Let-Through Pass - Remove Hard Assumptions ==========
    const pass2SystemPrompt = `You are a senior reviewer conducting a "let-through" pass on ASI quiz evaluations. Your job is to RAISE scores where the initial evaluation was too harsh.

ASI is fundamentally open-ended and speculative. Many answers that seem "wrong" by conventional standards may actually show creative, interdisciplinary, or non-obvious thinking that should be valued.

ADJUSTMENT RULES:
1. If an answer shows ANY genuine thought about ASI, minimum score should be 5
2. If an answer makes creative/unusual connections, ADD 1-2 points
3. If an answer draws from non-technical fields (art, philosophy, mysticism), this is VALUABLE - ADD points
4. If an answer shows awareness of uncertainty/humility about ASI, this is WISE - ADD points
5. If the initial evaluation penalized unconventional thinking, CORRECT this
6. Personal experiences and intuitions about intelligence ARE valid perspectives

Your adjustments should be GENEROUS. We want to encourage diverse thinking about ASI.

Previous evaluations to review:
${JSON.stringify(initialEvaluations, null, 2)}

Original questions and answers for context:
${questionsAndAnswers}

Return ONLY valid JSON with adjusted scores:
{
  "adjustments": [
    {
      "questionId": 1,
      "adjustedScore": 8,
      "adjustmentReason": "Raised from 7 because the answer showed creative thinking about consciousness that was undervalued",
      "adjustedFieldScores": [
        {"field": "Philosophy", "score": 8, "adjustment": "+1 for original metaphysical insight"},
        {"field": "Art", "score": 7, "adjustment": "+1 for creative expression"},
        ... (all 12 fields)
      ]
    }
  ]
}`;

    const pass2Response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      messages: [
        {
          role: "user",
          content: "Review and adjust these evaluations with a generous, open-minded let-through pass.",
        },
      ],
      system: pass2SystemPrompt,
    });

    const pass2Text = pass2Response.content.find((block) => block.type === "text");
    if (!pass2Text || pass2Text.type !== "text") {
      throw new Error("No text content in pass 2 response.");
    }

    let pass2ResponseText = pass2Text.text.trim();
    if (pass2ResponseText.startsWith("```")) {
      pass2ResponseText = pass2ResponseText.replace(/```json?\n?/g, "").replace(/```/g, "");
    }

    const pass2Parsed = JSON.parse(pass2ResponseText);
    const adjustments = pass2Parsed.adjustments;

    // ========== Combine Results ==========
    const enhancedScores: EnhancedQuestionScore[] = initialEvaluations.map((initial: {
      questionId: number;
      initialScore: number;
      feedback: string;
      skillCategory: SkillCategory;
      fieldScores: { field: EvaluationField; score: number; reasoning: string }[];
    }) => {
      const adjustment = adjustments.find((a: { questionId: number }) => a.questionId === initial.questionId);
      const adjustedScore = adjustment?.adjustedScore || initial.initialScore;

      // Merge field scores from both passes.
      const mergedFieldScores: FieldScore[] = EVALUATION_FIELDS.map((field) => {
        const initialField = initial.fieldScores?.find((f: { field: string }) => f.field === field);
        const adjustedField = adjustment?.adjustedFieldScores?.find((f: { field: string }) => f.field === field);

        const initialScore = initialField?.score || 5;
        const adjustedFieldScore = adjustedField?.score || initialScore;
        const finalFieldScore = Math.round(((initialScore + adjustedFieldScore) / 2) * 10) / 10;

        return {
          field,
          score: Math.max(finalFieldScore, 5), // Minimum 5 for any field
          reasoning: adjustedField?.adjustment || initialField?.reasoning || "Evaluated",
        };
      });

      const compositeFieldScore = Math.round(
        (mergedFieldScores.reduce((sum, f) => sum + f.score, 0) / mergedFieldScores.length) * 10
      ) / 10;

      const finalScore = Math.round(((initial.initialScore + adjustedScore) / 2) * 10) / 10;

      return {
        questionId: initial.questionId,
        initialScore: initial.initialScore,
        adjustedScore,
        finalScore: Math.max(finalScore, 5), // Minimum 5
        feedback: initial.feedback + (adjustment?.adjustmentReason ? ` [Adjusted: ${adjustment.adjustmentReason}]` : ""),
        skillCategory: initial.skillCategory,
        fieldScores: mergedFieldScores,
        compositeFieldScore,
      };
    });

    // Create legacy QuestionScore format for backward compatibility.
    const scores: QuestionScore[] = enhancedScores.map((es) => ({
      questionId: es.questionId,
      score: es.finalScore,
      feedback: es.feedback,
      skillCategory: es.skillCategory,
    }));

    const skillBreakdown = calculateSkillBreakdown(scores);
    const fieldBreakdown = calculateFieldBreakdown(enhancedScores);

    // Calculate overall scores.
    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const overallScore = Math.round((totalScore / 100) * 100);

    const compositeScore = Math.round(
      (fieldBreakdown.reduce((sum, f) => sum + f.score, 0) / fieldBreakdown.length) * 10
    );

    const certificateId = generateCertificateId();

    // Update MongoDB.
    const db = await getDatabase();
    const collection = db.collection("academic_quizzes");

    await collection.updateOne(
      { quizId },
      {
        $set: {
          answers: sanitizedAnswers,
          scores,
          enhancedScores,
          skillBreakdown,
          fieldBreakdown,
          overallScore,
          compositeScore,
          certificateId,
          completedAt: new Date(),
          status: "completed",
        },
      }
    );

    return NextResponse.json({
      success: true,
      scores,
      enhancedScores,
      skillBreakdown,
      fieldBreakdown,
      overallScore,
      compositeScore,
      certificateId,
    } as EvaluateAnswersResponse);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Answer evaluation error:", error);
    }

    return NextResponse.json(
      { success: false, error: "Failed to evaluate answers. Please try again." } as EvaluateAnswersResponse,
      { status: 500 }
    );
  }
}
