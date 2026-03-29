import { ExamDetail } from "@/types/result";

export default function ScoreDistribution({ detail }: { detail: ExamDetail }) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-base font-semibold text-slate-800 mb-4">
        Score Breakdown
      </h3>
      <div className="space-y-3">
        {[
          {
            label: "Correct",
            count: detail.questions.filter((q) => q.isCorrect).length,
            color: "#22c55e",
          },
          {
            label: "Partial",
            count: detail.questions.filter((q) => !q.isCorrect && q.points > 0)
              .length,
            color: "#f59e0b",
          },
          {
            label: "Wrong",
            count: detail.questions.filter((q) => q.points === 0).length,
            color: "#ef4444",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-16 font-medium">
              {item.label}
            </span>
            <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${detail.questions.length > 0 ? (item.count / detail.questions.length) * 100 : 0}%`,
                  background: item.color,
                }}
              />
            </div>
            <span className="text-sm font-bold text-slate-700 w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
