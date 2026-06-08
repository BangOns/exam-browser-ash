import { ExamSchedule } from "@/types/exam-schedule";

export function ScheduleColumns({
  openEdit,
  deleteConfirm,
  handleDelete,
  setDeleteConfirm,
}: {
  openEdit: (s: string) => void;
  deleteConfirm: string | null;
  handleDelete: (id: string) => void;
  setDeleteConfirm: (id: string) => void;
}) {
  return [
    {
      key: "name",
      label: "Exam Name",

      render: (row: ExamSchedule) => (
        <div>
          <p className="font-medium text-slate-700">{row.exam.name || "-"}</p>
          <p className="text-xs text-slate-400">
            {row.exam.lesson.class.name || "-"} -
            {row.exam.lesson.subject.name || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row: ExamSchedule) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {row.exam_date || "-"}
        </div>
      ),
    },
    {
      key: "time",
      label: "Time",
      render: (row: ExamSchedule) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium whitespace-nowrap">
          <svg
            className="w-4 h-4 text-slate-400"
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
          {row.start_time.slice(0, 5)} - {row.end_time.slice(0, 5)}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: ExamSchedule) => (
        <span
          className={`badge ${
            row.status === "Scheduled"
              ? "badge-info"
              : row.status === "Ongoing"
                ? "badge-success"
                : "badge-neutral"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: ExamSchedule) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row.id.toString())}
            className="text-xs px-3 py-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors font-medium"
          >
            Edit
          </button>
          {deleteConfirm === row.id.toString() ? (
            <div className="flex gap-1">
              <button
                onClick={() => handleDelete(row.id.toString())}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
              >
                Confirm
              </button>
              <button
                onClick={() => setDeleteConfirm("")}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(row.id.toString())}
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
