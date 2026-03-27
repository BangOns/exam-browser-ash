import { Teacher } from "@/types/teacher";

export function columnsTableTeacher(
  deleteConfirm: number | null,
  setDeleteConfirm: (id: number | null) => void,
  handleDelete: (id: number) => void,
  openEdit: (teacher: Teacher) => void,
) {
  return [
    {
      key: "name",
      label: "Teacher",
      render: (row: Teacher) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            {row.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-medium text-slate-700">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: Teacher) => (
        <span className="badge badge-info">{row.subject}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Teacher) => (
        <span
          className={`badge ${row.status === "Active" ? "badge-success" : "badge-warning"}`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "lastLogin", label: "Last Login" },
    { key: "examsCreated", label: "Exams Created" },
    {
      key: "actions",
      label: "Actions",
      render: (row: Teacher) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium"
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
