import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";

const statsData = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Total Exams",
    value: 142,
    trend: "+12 this month",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Active Users",
    value: "1,248",
    trend: "+85 this week",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: "Ongoing Exams",
    value: 8,
    trend: "3 finishing soon",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    label: "System Alerts",
    value: 3,
    trend: "2 violations",
    trendUp: false,
  },
];

type UserRow = { name: string; email: string; role: string; status: string };

const usersData: UserRow[] = [
  { name: "Ahmad Fauzi", email: "ahmad@school.id", role: "Teacher", status: "Active" },
  { name: "Siti Nurhaliza", email: "siti@school.id", role: "Student", status: "Active" },
  { name: "Budi Santoso", email: "budi@school.id", role: "Student", status: "Inactive" },
  { name: "Dewi Lestari", email: "dewi@school.id", role: "Teacher", status: "Active" },
  { name: "Reza Pratama", email: "reza@school.id", role: "Student", status: "Active" },
];

const userColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  {
    key: "role",
    label: "Role",
    render: (row: UserRow) => (
      <span className={`badge ${row.role === "Teacher" ? "badge-info" : "badge-neutral"}`}>
        {row.role}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: UserRow) => (
      <span className={`badge ${row.status === "Active" ? "badge-success" : "badge-danger"}`}>
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2">
        <button className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium">
          Edit
        </button>
        <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium">
          Remove
        </button>
      </div>
    ),
  },
];

type ScheduleRow = { exam: string; subject: string; date: string; time: string; status: string };

const scheduleData: ScheduleRow[] = [
  { exam: "UTS Mathematics", subject: "Mathematics", date: "Mar 25, 2026", time: "08:00 - 10:00", status: "Scheduled" },
  { exam: "UAS English", subject: "English", date: "Mar 26, 2026", time: "10:00 - 12:00", status: "Scheduled" },
  { exam: "Quiz Physics", subject: "Physics", date: "Mar 22, 2026", time: "13:00 - 14:00", status: "In Progress" },
  { exam: "UTS Biology", subject: "Biology", date: "Mar 27, 2026", time: "08:00 - 10:00", status: "Scheduled" },
];

const scheduleColumns = [
  { key: "exam", label: "Exam Name" },
  { key: "subject", label: "Subject" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  {
    key: "status",
    label: "Status",
    render: (row: ScheduleRow) => (
      <span className={`badge ${row.status === "In Progress" ? "badge-warning" : "badge-info"}`}>
        {row.status}
      </span>
    ),
  },
];

type Alert = { id: number; message: string; type: string; time: string };

const alerts: Alert[] = [
  { id: 1, message: "Student Budi Santoso attempted tab switch during Quiz Physics", type: "violation", time: "2 min ago" },
  { id: 2, message: "Server load exceeding 80% — consider scaling", type: "system", time: "15 min ago" },
  { id: 3, message: "Student Reza Pratama left fullscreen mode", type: "violation", time: "28 min ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">System overview and management controls</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} accent={i === 3 ? "danger" : "admin"} />
        ))}
      </div>

      {/* Alerts panel */}
      <div className="glass-card p-5 animate-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <span className="notification-dot relative w-2.5 h-2.5 inline-block" />
          <h3 className="text-base font-semibold text-slate-800">Recent Notifications</h3>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                alert.type === "violation"
                  ? "border-red-100 bg-red-50/50 hover:bg-red-50"
                  : "border-amber-100 bg-amber-50/50 hover:bg-amber-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                alert.type === "violation" ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-500"
              }`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{alert.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DataTable
          title="Recent Users"
          columns={userColumns}
          data={usersData}
          action={
            <button className="text-xs px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold shadow-sm">
              + Add User
            </button>
          }
        />
        <DataTable
          title="Exam Schedule"
          columns={scheduleColumns}
          data={scheduleData}
          action={
            <button className="text-xs px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold shadow-sm">
              + Schedule Exam
            </button>
          }
        />
      </div>
    </div>
  );
}
