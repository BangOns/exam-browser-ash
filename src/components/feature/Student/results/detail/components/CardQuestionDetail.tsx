import { ExamDetail } from "@/types/result";

export default function CardQuestionDetail({
  question,
  scoreColor,
}: {
  question: ExamDetail["questions"][0];
  scoreColor: string;
}) {
  return (
    <section
      className={`glass-card p-5 border-l-4 animate-slide-up`}
      style={{
        borderLeftColor: question.isCorrect
          ? "#22c55e"
          : question.points > 0
            ? "#f59e0b"
            : "#ef4444",
      }}
    >
      <header className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{
              background: question.isCorrect
                ? "#22c55e"
                : question.points > 0
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {question.number}
          </div>
          <div>
            <p className="font-medium text-slate-700 text-sm">
              {question.question}
            </p>
            <span
              className={`badge mt-1 ${question.type === "Multiple Choice" ? "badge-info" : "badge-neutral"}`}
            >
              {question.type}
            </span>
          </div>
        </div>
        <span
          className="text-sm font-bold text-slate-600 shrink-0"
          style={{ color: scoreColor }}
        >
          {question.points}/{question.maxPoints}
        </span>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Your Answer
          </p>
          <p
            className={`text-sm ${question.isCorrect ? "text-emerald-700" : "text-red-600"}`}
          >
            {question.studentAnswer}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-semibold mb-1">
            Correct Answer
          </p>
          <p className="text-sm text-emerald-700">{question.correctAnswer}</p>
        </div>
      </section>
    </section>
  );
}
