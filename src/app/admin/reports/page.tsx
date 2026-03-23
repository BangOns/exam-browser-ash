export default function AdminReportsPage() {
  type AuditEntry = {
    id: number;
    action: string;
    user: string;
    role: string;
    timestamp: string;
    type: "info" | "warning" | "danger";
  };

  const auditLog: AuditEntry[] = [
    { id: 1, action: "Student Budi Santoso attempted tab switch during Quiz Physics", user: "Budi Santoso", role: "Student", timestamp: "Mar 22, 2026 12:05", type: "danger" },
    { id: 2, action: "New exam 'UTS Biology' created by Dewi Lestari", user: "Dewi Lestari", role: "Teacher", timestamp: "Mar 22, 2026 11:30", type: "info" },
    { id: 3, action: "Student Reza Pratama left fullscreen mode during Quiz Physics", user: "Reza Pratama", role: "Student", timestamp: "Mar 22, 2026 11:22", type: "danger" },
    { id: 4, action: "User Andi Wijaya account suspended by admin", user: "Admin", role: "Admin", timestamp: "Mar 22, 2026 10:45", type: "warning" },
    { id: 5, action: "Exam 'Quiz Chemistry' completed — 45 students participated", user: "System", role: "System", timestamp: "Mar 21, 2026 15:00", type: "info" },
    { id: 6, action: "Server backup completed successfully", user: "System", role: "System", timestamp: "Mar 21, 2026 03:00", type: "info" },
    { id: 7, action: "Student Maya Anggraeni flagged for suspicious activity", user: "Maya Anggraeni", role: "Student", timestamp: "Mar 20, 2026 14:30", type: "warning" },
    { id: 8, action: "System update applied — version 2.4.1", user: "System", role: "System", timestamp: "Mar 20, 2026 02:00", type: "info" },
  ];

  const typeStyles = {
    info: { icon: "bg-blue-50 text-blue-500", border: "border-l-blue-400" },
    warning: { icon: "bg-amber-50 text-amber-500", border: "border-l-amber-400" },
    danger: { icon: "bg-red-50 text-red-500", border: "border-l-red-400" },
  };

  const stats = [
    { label: "Total Events", value: "1,284", icon: "📊" },
    { label: "Violations", value: "23", icon: "⚠️" },
    { label: "System Events", value: "856", icon: "🔧" },
    { label: "User Actions", value: "405", icon: "👤" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports & Audit Log</h1>
        <p className="text-sm text-slate-500 mt-1">System activity timeline and violation reports</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["All", "Violations", "System", "User Actions"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              i === 0
                ? "bg-indigo-500 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Audit timeline */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="space-y-4">
          {auditLog.map((entry) => {
            const styles = typeStyles[entry.type];
            return (
              <div
                key={entry.id}
                className={`flex items-start gap-4 p-4 rounded-xl border-l-4 bg-white shadow-sm ${styles.border}`}
              >
                <div className={`w-10 h-10 rounded-xl ${styles.icon} flex items-center justify-center shrink-0`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {entry.type === "danger" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    ) : entry.type === "warning" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{entry.action}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-slate-400">{entry.timestamp}</span>
                    <span className={`badge ${
                      entry.role === "Student" ? "badge-neutral" :
                      entry.role === "Teacher" ? "badge-info" :
                      entry.role === "Admin" ? "badge-warning" :
                      "badge-neutral"
                    }`}>
                      {entry.user}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
