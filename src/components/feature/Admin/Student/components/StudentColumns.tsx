import { StudentList } from "@/types/student";

export function StudentColumns(
  deleteConfirm: string | null,
  setDeleteConfirm: (id: string | null) => void,
  handleDelete: (id: string) => void,
  openEdit: (id: string) => void,
  // handleRestore: (id: string) => void,
) {
  return [
    {
      key: "name",
      label: "Student",
      render: (row: StudentList) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold">
            {row.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-medium text-slate-700">{row.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: "grade",
      label: "Class/Grade",
      render: (row: StudentList) => (
        <span className="badge badge-neutral">{row.class.name}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: StudentList) => (
        <span
          className={`badge ${
            row.status === "Active"
              ? "badge-success"
              : row.status === "Suspended"
                ? "badge-danger"
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
      render: (row: StudentList) => (
        <div className="flex gap-2">
          {/* {row.status === "Suspended" && (
            <button
              onClick={() => handleRestore(row.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
            >
              Restore
            </button>
          )} */}
          <button
            onClick={() => openEdit(row.id)}
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
