import { Badge } from "@/components/ui/badge";
import { ExamAttemptResource } from "@/types/result";
interface Props {
  openDetail: (id: string) => void;
}
export function ResultColumnsDetail({ openDetail }: Props) {
  return [
    {
      key: "student",
      label: "Student",

      render: (row: ExamAttemptResource) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            {row.kelas
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="font-medium text-slate-700">{row.nama}</span>
        </div>
      ),
    },
    {
      key: "exam",
      label: "Exam",
      render: (row: ExamAttemptResource) => (
        <span className="font-medium text-slate-700">
          {row.attempts[0].exam}
        </span>
      ),
    },
    {
      key: "score",
      label: "Score",
      render: (row: ExamAttemptResource) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${row.attempts[0].total_score}%`,
                background:
                  row.attempts[0].total_score >= 80
                    ? "#22c55e"
                    : row.attempts[0].total_score >= 60
                      ? "#f59e0b"
                      : "#ef4444",
              }}
            />
          </div>
          <span className="text-sm font-semibold">
            {row.attempts[0].total_score}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: ExamAttemptResource) => (
        <section className="flex items-center gap-2">
          <Badge
            variant={
              row.attempts[0].status.toLowerCase() === "submitted"
                ? "success"
                : row.attempts[0].status.toLowerCase() === "pending"
                  ? "pending"
                  : "error"
            }
          >
            {row.attempts[0].status}
          </Badge>
        </section>
      ),
    },
    // {
    //   key: "grade",
    //   label: "Grade",
    //   render: (row: ExamAttemptResource) => (
    //     <span
    //       className={`badge ${
    //         row.attempts[0]..startsWith("A")
    //           ? "badge-success"
    //           : row.attempts[0].grade.startsWith("B")
    //             ? "badge-info"
    //             : row.attempts[0].grade.startsWith("C")
    //               ? "badge-warning"
    //               : "badge-danger"
    //       }`}
    //     >
    //       {row.grade}
    //     </span>
    //   ),
    // },
    {
      key: "date",
      label: "Submit Date",
      render: (row: ExamAttemptResource) => (
        <span className="text-sm text-slate-500 text-center">
          {row.attempts[0].submitted_at || "-"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: ExamAttemptResource) => (
        <button
          onClick={() => openDetail(row.id)}
          //   onClick={() => {
          //     const sub = submissionsData.find((s) => s.id === row.submissionId);
          //     if (sub) openDetail(sub);
          //   }}
          className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium border border-emerald-200"
        >
          Detail
        </button>
      ),
    },
  ];
}
