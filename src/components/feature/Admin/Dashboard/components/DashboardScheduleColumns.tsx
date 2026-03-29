import { ScheduleRow } from "@/types/schedule";

export function DashboardScheduleColumns() {
  return [
    { key: "exam", label: "Exam Name" },
    { key: "subject", label: "Subject" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    {
      key: "status",
      label: "Status",
      render: (row: ScheduleRow) => (
        <span
          className={`badge ${row.status === "In Progress" ? "badge-warning" : "badge-info"}`}
        >
          {row.status}
        </span>
      ),
    },
  ];
}
