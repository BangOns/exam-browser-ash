import { ResultRow } from "@/types/result";
import { StudentSubmission } from "@/types/submission";

export function resultColumns({
  submissionsData,
  openDetail,
}: {
  submissionsData: StudentSubmission[];
  openDetail: (sub: StudentSubmission) => void;
}) {
  return [
    {
      key: "student",
      label: "Student",
      render: (row: ResultRow) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            {row.student
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="font-medium text-slate-700">{row.student}</span>
        </div>
      ),
    },
    { key: "exam", label: "Exam" },
    {
      key: "score",
      label: "Score",
      render: (row: ResultRow) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${row.score}%`,
                background:
                  row.score >= 80
                    ? "#22c55e"
                    : row.score >= 60
                      ? "#f59e0b"
                      : "#ef4444",
              }}
            />
          </div>
          <span className="text-sm font-semibold">{row.score}</span>
        </div>
      ),
    },
    {
      key: "grade",
      label: "Grade",
      render: (row: ResultRow) => (
        <span
          className={`badge ${
            row.grade.startsWith("A")
              ? "badge-success"
              : row.grade.startsWith("B")
                ? "badge-info"
                : row.grade.startsWith("C")
                  ? "badge-warning"
                  : "badge-danger"
          }`}
        >
          {row.grade}
        </span>
      ),
    },
    { key: "time", label: "Time Spent" },
    { key: "date", label: "Date" },
    {
      key: "actions",
      label: "Actions",
      render: (row: ResultRow) => (
        <button
          onClick={() => {
            const sub = submissionsData.find((s) => s.id === row.submissionId);
            if (sub) openDetail(sub);
          }}
          className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium border border-emerald-200"
        >
          Detail
        </button>
      ),
    },
  ];
}
