import { StudentSession } from "@/types/student";
import { statusConfig } from "../constants";

export default function CardInfoMonitoring({
  student,
  config,
}: {
  student: StudentSession;
  config: (typeof statusConfig)[keyof typeof statusConfig];
}) {
  return (
    <section
      className={`rounded-2xl border p-4 transition-all duration-200 hover:shadow-md ${config.bg} ${config.border}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${config.dot} ${student.status === "active" || student.status === "flagged" ? "animate-pulse-soft" : ""}`}
          />
          <span className="text-sm font-semibold text-slate-700">
            {student.name}
          </span>
        </div>
        <span className={`badge text-[10px] ${config.labelBg}`}>
          {config.label}
        </span>
      </div>

      {/* Progress */}
      <section className="mb-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            Q{student.currentQuestion}/{student.totalQuestions}
          </span>
          <span>{student.progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/60 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${student.progress}%`,
              background:
                student.status === "flagged"
                  ? "#ef4444"
                  : student.status === "completed"
                    ? "#94a3b8"
                    : "#10b981",
            }}
          />
        </div>
      </section>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{student.timeLeft}</span>
        </div>
        {student.violations > 0 && (
          <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            {student.violations} violation
            {student.violations > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </section>
  );
}
