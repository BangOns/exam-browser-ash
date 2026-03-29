"use client";

import Modal from "@/components/ui/Modal";
import { initialQuestions } from "@/data/dummy/questions";
import { StudentSubmission } from "@/types/submission";

interface Props {
  submission: StudentSubmission | null;
  essayScores: Record<number, number>;
  saved: boolean;
  onClose: () => void;
  onSetEssayScore: (questionId: number, points: number) => void;
  onSave: () => void;
}

export default function ResultDetailModal({
  submission,
  essayScores,
  saved,
  onClose,
  onSetEssayScore,
  onSave,
}: Props) {
  if (!submission) return null;

  const hasEssay = submission.answers.some((a) => {
    const q = initialQuestions.find((q) => q.id === a.questionId);
    return q?.type === "Essay";
  });

  const allEssayScored =
    hasEssay &&
    submission.answers
      .filter((a) => {
        const q = initialQuestions.find((q) => q.id === a.questionId);
        return q?.type === "Essay";
      })
      .every((a) => essayScores[a.questionId] !== undefined);

  return (
    <Modal
      isOpen={!!submission}
      onClose={onClose}
      title="Student Answer Detail"
      maxWidth="max-w-3xl"
    >
      {/* Student info bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {submission.studentName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">
            {submission.studentName}
          </p>
          <p className="text-xs text-slate-500">{submission.examName}</p>
        </div>
        {hasEssay && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
              saved
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}
          >
            {saved ? "✓ Grading saved" : "⏳ Pending essay grading"}
          </span>
        )}
      </div>

      {/* Answer list */}
      <div className="space-y-4">
        {submission.answers.map((answerItem, idx) => {
          const question = initialQuestions.find(
            (q) => q.id === answerItem.questionId,
          );
          if (!question) return null;

          const isMCQ = question.type === "Multiple Choice";
          const isCorrect =
            isMCQ && question.correctAnswer === answerItem.answer;
          const selectedOption = question.options?.find(
            (o) => o.label === answerItem.answer,
          );

          return (
            <div
              key={answerItem.questionId}
              className={`rounded-xl border p-4 transition-colors ${
                isMCQ
                  ? isCorrect
                    ? "bg-emerald-50/60 border-emerald-200"
                    : "bg-red-50/60 border-red-200"
                  : "bg-blue-50/40 border-blue-200"
              }`}
            >
              {/* Question header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    {question.question}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isMCQ
                      ? "bg-violet-100 text-violet-600"
                      : "bg-sky-100 text-sky-600"
                  }`}
                >
                  {question.type}
                </span>
              </div>

              {/* MCQ answer */}
              {isMCQ && (
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <span>
                      {answerItem.answer}. {selectedOption?.text ?? "—"}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                      <span className="text-xs text-emerald-500">Correct:</span>
                      {question.correctAnswer}.{" "}
                      {
                        question.options?.find(
                          (o) => o.label === question.correctAnswer,
                        )?.text
                      }
                    </div>
                  )}
                </div>
              )}

              {/* Essay answer */}
              {!isMCQ && (
                <div className="mt-2 space-y-3">
                  {/* Rubric */}
                  {question.rubric && (
                    <div className="text-xs text-slate-500 bg-white/70 rounded-lg px-3 py-2 border border-slate-100">
                      <span className="font-semibold text-slate-600">
                        Rubric:{" "}
                      </span>
                      {question.rubric}
                    </div>
                  )}
                  {/* Student's essay text */}
                  <div className="bg-white rounded-lg border border-slate-200 p-3 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {answerItem.answer}
                  </div>
                  {/* Score input */}
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-600 shrink-0">
                      Score (max {question.maxPoints ?? 100}):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={question.maxPoints ?? 100}
                      value={essayScores[answerItem.questionId] ?? ""}
                      onChange={(e) => {
                        const val = Math.min(
                          Number(e.target.value),
                          question.maxPoints ?? 100,
                        );
                        onSetEssayScore(answerItem.questionId, val);
                      }}
                      placeholder="Enter score…"
                      className="w-28 px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                    <span className="text-xs text-slate-400">
                      / {question.maxPoints ?? 100} pts
                    </span>
                    {essayScores[answerItem.questionId] !== undefined && (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        ✓ scored
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Save grading button — only when essay questions exist */}
      {hasEssay && (
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            {allEssayScored
              ? "All essay questions scored. Ready to save."
              : "Enter scores for all essay questions before saving."}
          </p>
          <button
            onClick={onSave}
            disabled={!allEssayScored || saved}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              saved
                ? "bg-emerald-100 text-emerald-700 cursor-default"
                : allEssayScored
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {saved ? "✓ Grading Saved" : "Save Assessment"}
          </button>
        </div>
      )}
    </Modal>
  );
}
