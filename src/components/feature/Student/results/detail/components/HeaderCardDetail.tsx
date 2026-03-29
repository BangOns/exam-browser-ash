import { ExamDetail } from "@/types/result";

export default function HeaderCardDetail({
  detail,
  scoreGradient,
}: {
  detail: ExamDetail;
  scoreGradient: string;
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className={`bg-linear-to-r ${scoreGradient} px-6 py-5 text-white`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{detail.exam}</h1>
            <p className="text-white/80 text-sm mt-1">
              {detail.subject} · {detail.date}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold">{detail.score}</p>
              <p className="text-white/70 text-xs mt-0.5">Score</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold">{detail.grade}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
        {[
          {
            label: "Correct Answers",
            value: `${detail.correctAnswers}/${detail.totalQuestions}`,
          },
          {
            label: "Accuracy",
            value: `${Math.round((detail.correctAnswers / detail.totalQuestions) * 100)}%`,
          },
          { label: "Time Spent", value: detail.timeSpent },
          { label: "Total Time", value: detail.totalTime },
        ].map((stat, i) => (
          <div key={i} className="p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
