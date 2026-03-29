import { UserRow } from "@/types/user";

export function DashboardUserColumns() {
  return [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row: UserRow) => (
        <span
          className={`badge ${row.role === "Teacher" ? "badge-info" : "badge-neutral"}`}
        >
          {row.role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: UserRow) => (
        <span
          className={`badge ${row.status === "Active" ? "badge-success" : "badge-danger"}`}
        >
          {row.status}
        </span>
      ),
    },
  ];
}
