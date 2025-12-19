// ASI Academics Quiz Types

// Original skill categories for question generation.
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

// Multi-dimensional evaluation fields for holistic ASI assessment.
export type EvaluationField =
  | "Philosophy"
  | "Art"
  | "Science"
  | "Biology"
  | "Cybernetics"
  | "SciFi"
  | "Computer Science"
  | "Mysticism"
  | "Policy"
  | "Yoga"
  | "Mindfulness"
  | "Data Engineering";

export const EVALUATION_FIELDS: EvaluationField[] = [
  "Philosophy",
  "Art",
  "Science",
  "Biology",
  "Cybernetics",
  "SciFi",
  "Computer Science",
  "Mysticism",
  "Policy",
  "Yoga",
  "Mindfulness",
  "Data Engineering",
];

// Field score from multi-step reasoning.
export interface FieldScore {
  field: EvaluationField;
  score: number; // 1-10
  reasoning: string;
}

// Enhanced question score with field breakdown.
export interface EnhancedQuestionScore {
  questionId: number;
  initialScore: number; // First pass score
  adjustedScore: number; // Second pass (let-through) score
  finalScore: number; // Average of both passes
  feedback: string;
  skillCategory: SkillCategory;
  fieldScores: FieldScore[]; // Scores across all 12 fields
  compositeFieldScore: number; // Average of all field scores
}

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
  enhancedScores: EnhancedQuestionScore[];
  skillBreakdown: SkillScore[];
  fieldBreakdown: FieldScore[]; // Aggregate field scores across all questions
  overallScore: number;
  compositeScore: number; // Average of all 12 field scores
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
