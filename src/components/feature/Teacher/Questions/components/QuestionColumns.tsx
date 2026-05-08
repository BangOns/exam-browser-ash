import { QuestionList } from "@/types/question";

export function columnsQuestions(
  openEdit: (q: string) => void,
  deleteConfirm: string | null,
  setDeleteConfirm: (id: string | null) => void,
  handleDelete: (id: string) => void,
) {
  return [
    {
      key: "question",
      label: "Question",
      render: (row: QuestionList) => (
        <div className="max-w-xs">
          <p className="font-medium text-slate-700 truncate">{row.question}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.lesson.subject}</p>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row: QuestionList) => (
        <span
          className={`badge ${row.type === "Multiple Choice" ? "badge-info" : "badge-neutral"}`}
        >
          {row.type}
        </span>
      ),
    },
    {
      key: "class",
      label: "Kelas",
      render: (row: QuestionList) => <span>{row.lesson.name}</span>,
    },

    {
      key: "actions",
      label: "Actions",
      render: (row: QuestionList) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row.id)}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
          >
            Edit
          </button>
          {deleteConfirm === row.id ? (
            <div className="flex gap-1">
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
