import { ResultRow } from "@/types/result";

export function resultColumns() {
  return [
    {
      key: "student",
      label: "Student",
      render: (row: ResultRow) => <p>{row.student}</p>,
    },
    {
      key: "exam",
      label: "Exam",
      render: (row: ResultRow) => <p>{row.exam}</p>,
    },
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
                : "badge-warning"
          }`}
        >
          {row.grade}
        </span>
      ),
    },
    { key: "date", label: "Date" },
  ];
}
