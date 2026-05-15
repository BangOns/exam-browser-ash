import { Button } from "@/components/ui/button";
import { ExamList } from "@/types/exam";

export function columnsTableExams(
  generateToken: (id: string) => void,
  deleteConfirm: string | null,
  setDeleteConfirm: (id: string | null) => void,
  handleDelete: (id: string) => void,
) {
  return [
    {
      key: "name",
      label: "Exam Name",

      render: (row: ExamList) => (
        <span className="font-semibold text-slate-700">{row.name}</span>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: ExamList) => (
        <span className="badge badge-info">{row.lesson.subject.name}</span>
      ),
    },
    {
      key: "questions",
      label: "Questions",
      render: (row: ExamList) => (
        <span className="badge badge-info">
          {row.questions.length} Questions
        </span>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      render: (row: ExamList) => <span>{row?.schedule?.duration || "-"}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row: ExamList) => (
        <span
          className={`badge ${
            row.status === "Active"
              ? "badge-success"
              : row.status === "Scheduled"
                ? "badge-info"
                : row.status === "Draft"
                  ? "badge-neutral"
                  : "badge-warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "token",
      label: "Access Token",
      render: (row: ExamList) => (
        <div className="flex items-center gap-2">
          {row.token ? (
            <span className="font-mono bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs font-bold tracking-widest">
              {row.token.token || "-"}
            </span>
          ) : (
            <span className="text-xs text-slate-400 italic">Not generated</span>
          )}
          <Button
            variant="ghost"
            onClick={() => generateToken(row.id)}
            className="text-xs px-2 py-1 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
          >
            {row.token ? "Regenerate" : "Generate"}
          </Button>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: ExamList) => (
        <div className="flex gap-2">
          {deleteConfirm === row.id ? (
            <div className="flex gap-1 animate-slide-up">
              <button
                onClick={() => handleDelete(row.id)}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
              >
                Confirm
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(row.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];
}
