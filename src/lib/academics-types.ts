// ASI Academics Quiz Types

export type SkillCategory =
  | "Technical Understanding"
  | "Ethical Reasoning"
  | "Safety Awareness"
  | "Alignment Concepts"
  | "Capability Assessment"
  | "Risk Analysis"
  | "Governance Knowledge"
  | "Future Implications";

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Technical Understanding",
  "Ethical Reasoning",
  "Safety Awareness",
  "Alignment Concepts",
  "Capability Assessment",
  "Risk Analysis",
  "Governance Knowledge",
  "Future Implications",
];

export interface Question {
  id: number;
  text: string;
  skillCategory: SkillCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Answer {
  questionId: number;
  text: string;
  submittedAt: Date;
}

export interface QuestionScore {
  questionId: number;
  score: number; // 1-10
  feedback: string;
  skillCategory: SkillCategory;
}

export interface SkillScore {
  skill: SkillCategory;
  score: number; // Average score for this skill (1-10)
  questionsCount: number;
}

export interface QuizResult {
  quizId: string;
  participantName: string;
  questions: Question[];
  answers: Answer[];
  scores: QuestionScore[];
  skillBreakdown: SkillScore[];
  overallScore: number; // Percentage (0-100)
  certificateId: string;
  completedAt: Date;
}

export interface QuizSession {
  quizId: string;
  ipAddress: string;
  userAgent: string;
  participantName: string;
  questions: Question[];
  answers: Answer[];
  scores: QuestionScore[];
  skillBreakdown: SkillScore[];
  overallScore: number;
  certificateId: string;
  startedAt: Date;
  completedAt: Date | null;
  status: "in_progress" | "completed";
}

export interface GenerateQuestionsResponse {
  success: boolean;
  quizId: string;
  questions: Question[];
  error?: string;
}

export interface EvaluateAnswersRequest {
  quizId: string;
  participantName: string;
  questions: Question[];
  answers: Answer[];
}

export interface EvaluateAnswersResponse {
  success: boolean;
  scores: QuestionScore[];
  skillBreakdown: SkillScore[];
  overallScore: number;
  certificateId: string;
  error?: string;
}

export interface CertificateData {
  certificateId: string;
  participantName: string;
  overallScore: number;
  skillBreakdown: SkillScore[];
  completedAt: Date;
  quizId: string;
}

// Rate limit tracking.
export interface RateLimitRecord {
  count: number;
  resetTime: number;
}
