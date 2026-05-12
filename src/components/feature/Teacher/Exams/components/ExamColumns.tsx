import { ExamList, ExamRequest } from "@/types/exam";
export function columnsExamTeacher({
  openPicker,
  openEdit,
  deleteConfirm,
  handleDelete,
  setDeleteConfirm,
}: {
  openPicker: (exam: string) => void;
  openEdit: (id: string) => void;
  deleteConfirm: string | null;
  handleDelete: (id: string) => void;
  setDeleteConfirm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return [
    {
      key: "name",
      label: "Exam Name",
      render: (row: ExamList) => (
        <p className="font-medium text-slate-700">{row.name}</p>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: ExamList) => (
        <span className="badge badge-info">{row.subject.name}</span>
      ),
    },
    {
      key: "targetClass",
      label: "Class",
      render: (row: ExamList) => (
        <span className="badge badge-neutral">{row.class.name}</span>
      ),
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
      key: "actions",
      label: "Actions",
      render: (row: ExamList) => (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => openPicker(row.id)}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
            title="Select questions from bank"
          >
            📋 Questions
          </button>
          <button
            onClick={() => openEdit(row.id.toString() as string)}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium"
          >
            Edit
          </button>
          {deleteConfirm === row.id.toString() ? (
            <div className="flex gap-1">
              <button
                onClick={() => handleDelete(row.id.toString() as string)}
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
              onClick={() => setDeleteConfirm(row.id.toString() as string)}
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
