"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";
import {
  Question,
  Answer,
  QuestionScore,
  SkillScore,
  GenerateQuestionsResponse,
  EvaluateAnswersResponse,
} from "@/lib/academics-types";
import QuizCertificate from "./QuizCertificate";

type QuizStage = "intro" | "loading" | "quiz" | "evaluating" | "results";

export default function AcademicsQuiz() {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [participantName, setParticipantName] = useState("");
  const [quizId, setQuizId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<QuestionScore[]>([]);
  const [skillBreakdown, setSkillBreakdown] = useState<SkillScore[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MAX_ANSWER_LENGTH = 256;

  const handleStartQuiz = async () => {
    if (!participantName.trim() || participantName.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }

    setError(null);
    setStage("loading");

    try {
      const response = await fetch("/api/academics/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantName: participantName.trim() }),
      });

      const data: GenerateQuestionsResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate questions.");
      }

      setQuizId(data.quizId);
      setQuestions(data.questions);
      setStage("quiz");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
      setStage("intro");
    }
  };

  const handleAnswerChange = (questionId: number, text: string) => {
    if (text.length <= MAX_ANSWER_LENGTH) {
      const newAnswers = new Map(answers);
      newAnswers.set(questionId, text);
      setAnswers(newAnswers);
    }
  };

  const handleSubmitQuiz = async () => {
    // Validate all answers.
    const allAnswered = questions.every((q) => {
      const answer = answers.get(q.id);
      return answer && answer.trim().length > 0;
    });

    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setError(null);
    setStage("evaluating");

    try {
      const answersArray: Answer[] = questions.map((q) => ({
        questionId: q.id,
        text: answers.get(q.id) || "",
        submittedAt: new Date(),
      }));

      const response = await fetch("/api/academics/evaluate-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          participantName: participantName.trim(),
          questions,
          answers: answersArray,
        }),
      });

      const data: EvaluateAnswersResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to evaluate answers.");
      }

      setScores(data.scores);
      setSkillBreakdown(data.skillBreakdown);
      setOverallScore(data.overallScore);
      setCertificateId(data.certificateId);
      setStage("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
      setStage("quiz");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers.get(currentQuestion.id) || "" : "";
  const answeredCount = Array.from(answers.values()).filter((a) => a.trim().length > 0).length;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5eb] to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#ff6b00]/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <GraduationCap className="text-[#ff6b00]" size={28} />
          <h1 className="text-xl font-bold gradient-text">ASI Knowledge Assessment</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Intro Stage */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-2xl p-8 text-center">
                <GraduationCap className="mx-auto text-[#ff6b00] mb-4" size={64} />
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Artificial Superintelligence Quiz
                </h2>
                <p className="text-[#666] mb-6">
                  Test your knowledge on ASI concepts, safety, ethics, and the future of AI.
                  You will answer 10 questions generated by AI.
                </p>

                {/* Disclaimer */}
                <div className="bg-[#ff6b00]/10 border border-[#ff6b00]/20 rounded-xl p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-[#ff6b00] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">Important Notice</p>
                      <p className="text-sm text-[#666] mt-1">
                        These answers will be posted on Twitter and X anonymously to further ASI
                        research, and decide the future of the next generation so answer well.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name Input */}
                <div className="max-w-md mx-auto mb-6">
                  <label className="block text-left text-sm font-medium text-[#1a1a1a] mb-2">
                    Your Name (for certificate)
                  </label>
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 outline-none transition-all"
                    maxLength={100}
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm mb-4 flex items-center justify-center gap-2">
                    <XCircle size={16} />
                    {error}
                  </div>
                )}

                <motion.button
                  onClick={handleStartQuiz}
                  className="px-8 py-3 gradient-bg text-white rounded-full font-medium"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(255, 107, 0, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Quiz
                </motion.button>

                <p className="text-xs text-[#999] mt-4">
                  You can only take this quiz once per day per device.
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#ff6b00]">10</div>
                  <div className="text-sm text-[#666]">Questions</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#ff6b00]">256</div>
                  <div className="text-sm text-[#666]">Max chars per answer</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#ff6b00]">8</div>
                  <div className="text-sm text-[#666]">Skills assessed</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading Stage */}
          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="text-[#ff6b00] animate-spin mb-4" size={48} />
              <p className="text-[#666]">Generating your personalized questions...</p>
            </motion.div>
          )}

          {/* Quiz Stage */}
          {stage === "quiz" && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="glass-effect rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    Question {currentQuestionIndex + 1} of 10
                  </span>
                  <span className="text-sm text-[#666]">
                    {answeredCount}/10 answered
                  </span>
                </div>
                <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gradient-bg"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#ff6b00]/10 text-[#ff6b00] rounded-full text-xs font-medium">
                    {currentQuestion.skillCategory}
                  </span>
                  <span className="px-3 py-1 bg-[#1a1a1a]/5 text-[#666] rounded-full text-xs">
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-[#1a1a1a] mb-4">
                  {currentQuestion.text}
                </h3>

                <div className="relative">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-32 px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 outline-none transition-all resize-none"
                    maxLength={MAX_ANSWER_LENGTH}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-[#999]">
                    {currentAnswer.length}/{MAX_ANSWER_LENGTH}
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e5e5e5] text-[#666] hover:bg-[#fff5eb] disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: currentQuestionIndex === 0 ? 1 : 1.02 }}
                  whileTap={{ scale: currentQuestionIndex === 0 ? 1 : 0.98 }}
                >
                  <ChevronLeft size={18} />
                  Previous
                </motion.button>

                {currentQuestionIndex < 9 ? (
                  <motion.button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                    <ChevronRight size={18} />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmitQuiz}
                    disabled={answeredCount < 10}
                    className="flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: answeredCount < 10 ? 1 : 1.02 }}
                    whileTap={{ scale: answeredCount < 10 ? 1 : 0.98 }}
                  >
                    Submit Quiz
                    <Send size={18} />
                  </motion.button>
                )}
              </div>

              {error && (
                <div className="text-red-600 text-sm flex items-center justify-center gap-2">
                  <XCircle size={16} />
                  {error}
                </div>
              )}

              {/* Question Navigator */}
              <div className="glass-effect rounded-xl p-4">
                <p className="text-sm font-medium text-[#1a1a1a] mb-3">Jump to question:</p>
                <div className="flex flex-wrap gap-2">
                  {questions.map((q, index) => {
                    const isAnswered = (answers.get(q.id) || "").trim().length > 0;
                    const isCurrent = index === currentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                          isCurrent
                            ? "gradient-bg text-white"
                            : isAnswered
                            ? "bg-green-100 text-green-600 border border-green-300"
                            : "bg-[#f5f5f5] text-[#666] hover:bg-[#fff5eb]"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Evaluating Stage */}
          {stage === "evaluating" && (
            <motion.div
              key="evaluating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="text-[#ff6b00] animate-spin mb-4" size={48} />
              <p className="text-[#666]">Evaluating your answers with AI...</p>
              <p className="text-sm text-[#999] mt-2">This may take a moment.</p>
            </motion.div>
          )}

          {/* Results Stage */}
          {stage === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Overall Score */}
              <div className="glass-effect rounded-2xl p-8 text-center">
                <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Quiz Completed!
                </h2>
                <div className="text-6xl font-bold gradient-text mb-2">
                  {overallScore}%
                </div>
                <p className="text-[#666]">
                  Overall Score
                </p>
              </div>

              {/* Skills Breakdown */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">
                  Skills Assessment
                </h3>
                <div className="space-y-4">
                  {skillBreakdown.map((skill) => (
                    <div key={skill.skill}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {skill.skill}
                        </span>
                        <span className={`text-sm font-bold ${getScoreColor(skill.score)}`}>
                          {skill.score}/10
                        </span>
                      </div>
                      <div className="h-3 bg-[#e5e5e5] rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getProgressBarColor(skill.score)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.score * 10}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Scores */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">
                  Question Breakdown
                </h3>
                <div className="space-y-4">
                  {scores.map((score, index) => {
                    const question = questions.find((q) => q.id === score.questionId);
                    return (
                      <div key={score.questionId} className="border-b border-[#e5e5e5] pb-4 last:border-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#1a1a1a] mb-1">
                              Q{index + 1}: {question?.text}
                            </p>
                            <p className="text-xs text-[#999] mb-2">
                              Your answer: {answers.get(score.questionId)}
                            </p>
                            <p className="text-sm text-[#666]">
                              {score.feedback}
                            </p>
                          </div>
                          <div className={`text-xl font-bold ${getScoreColor(score.score)}`}>
                            {score.score}/10
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certificate */}
              {certificateId && (
                <QuizCertificate
                  certificateId={certificateId}
                  participantName={participantName}
                  overallScore={overallScore}
                  skillBreakdown={skillBreakdown}
                  completedAt={new Date()}
                  quizId={quizId || ""}
                />
              )}

              {/* Retake Button */}
              <div className="text-center">
                <p className="text-sm text-[#999] mb-4">
                  You can retake this quiz after 24 hours.
                </p>
                <motion.button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 mx-auto px-6 py-2 border border-[#e5e5e5] rounded-lg text-[#666] hover:bg-[#fff5eb]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw size={18} />
                  Return to Home
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
