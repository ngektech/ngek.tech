import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDatabase } from "@/lib/mongodb";
import {
  Question,
  SKILL_CATEGORIES,
  GenerateQuestionsResponse,
} from "@/lib/academics-types";

const anthropic = new Anthropic();

// Rate limiting: 1 quiz per 24 hours per IP.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours.
const RATE_LIMIT_MAX = 1;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP.trim();
  }
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const hoursRemaining = Math.ceil((record.resetTime - now) / (60 * 60 * 1000));
    return { allowed: false, resetTime: hoursRemaining };
  }

  record.count++;
  return { allowed: true };
}

function generateQuizId(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check rate limit.
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `You can only take this quiz once per day. Please try again in ${rateLimitResult.resetTime} hours.`,
        } as GenerateQuestionsResponse,
        { status: 429 }
      );
    }

    // Parse request body for participant name.
    const body = await request.json();
    const { participantName } = body;

    if (!participantName || participantName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your name (at least 2 characters).",
        } as GenerateQuestionsResponse,
        { status: 400 }
      );
    }

    if (participantName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Name must be less than 100 characters.",
        } as GenerateQuestionsResponse,
        { status: 400 }
      );
    }

    const quizId = generateQuizId();

    // System prompt for generating ASI questions.
    const systemPrompt = `You are an expert in Artificial Superintelligence (ASI) research and education. Your task is to generate exactly 10 thought-provoking questions about ASI that will test a participant's knowledge and critical thinking.

The questions must cover these 8 skill categories (generate at least 1 question per category, with 2 extra questions for any categories):
${SKILL_CATEGORIES.map((cat, i) => `${i + 1}. ${cat}`).join("\n")}

Requirements:
- Generate exactly 10 questions
- Each question should be open-ended and require thoughtful explanation (not simple yes/no)
- Mix difficulty levels: 3 beginner, 4 intermediate, 3 advanced
- Questions should be answerable in 256 characters or less
- Focus on practical understanding, not obscure trivia
- Cover topics like: AGI vs ASI distinction, alignment problem, control problem, value alignment, takeoff scenarios, governance, existential risk, beneficial AI, safety measures, superintelligence paths

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": 1,
      "text": "Question text here?",
      "skillCategory": "One of the 8 categories exactly as listed above",
      "difficulty": "beginner|intermediate|advanced"
    }
  ]
}

Do not include any markdown, code blocks, or explanations. Return ONLY the JSON object.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: "Generate 10 ASI knowledge assessment questions now.",
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
    // Remove markdown code blocks if present.
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```json?\n?/g, "").replace(/```/g, "");
    }

    const parsed = JSON.parse(responseText);
    const questions: Question[] = parsed.questions;

    // Validate questions.
    if (!questions || questions.length !== 10) {
      throw new Error("Invalid number of questions generated.");
    }

    // Store quiz session in MongoDB.
    const db = await getDatabase();
    const collection = db.collection("academic_quizzes");

    await collection.insertOne({
      quizId,
      ipAddress: ip,
      userAgent,
      participantName: participantName.trim(),
      questions,
      answers: [],
      scores: [],
      skillBreakdown: [],
      overallScore: 0,
      certificateId: null,
      startedAt: new Date(),
      completedAt: null,
      status: "in_progress",
    });

    return NextResponse.json({
      success: true,
      quizId,
      questions,
    } as GenerateQuestionsResponse);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Question generation error:", error);
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate questions. Please try again.",
      } as GenerateQuestionsResponse,
      { status: 500 }
    );
  }
}
