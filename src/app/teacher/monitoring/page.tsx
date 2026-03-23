export default function TeacherMonitoringPage() {
  type StudentSession = {
    name: string;
    status: "active" | "idle" | "flagged" | "completed";
    progress: number;
    timeLeft: string;
    violations: number;
    currentQuestion: number;
    totalQuestions: number;
  };

  const students: StudentSession[] = [
    { name: "Siti Nurhaliza", status: "active", progress: 72, timeLeft: "28:15", violations: 0, currentQuestion: 15, totalQuestions: 20 },
    { name: "Reza Pratama", status: "idle", progress: 45, timeLeft: "35:42", violations: 0, currentQuestion: 9, totalQuestions: 20 },
    { name: "Budi Santoso", status: "flagged", progress: 30, timeLeft: "42:30", violations: 2, currentQuestion: 6, totalQuestions: 20 },
    { name: "Maya Anggraeni", status: "active", progress: 85, timeLeft: "12:18", violations: 0, currentQuestion: 17, totalQuestions: 20 },
    { name: "Andi Wijaya", status: "flagged", progress: 55, timeLeft: "25:00", violations: 1, currentQuestion: 11, totalQuestions: 20 },
    { name: "Putri Handayani", status: "active", progress: 60, timeLeft: "31:45", violations: 0, currentQuestion: 12, totalQuestions: 20 },
    { name: "Dani Saputra", status: "completed", progress: 100, timeLeft: "00:00", violations: 0, currentQuestion: 20, totalQuestions: 20 },
    { name: "Lina Marlina", status: "active", progress: 40, timeLeft: "38:20", violations: 0, currentQuestion: 8, totalQuestions: 20 },
  ];

  const statusConfig = {
    active: { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", label: "Active", labelBg: "badge-success" },
    idle: { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", label: "Idle", labelBg: "badge-warning" },
    flagged: { bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", label: "Flagged", labelBg: "badge-danger" },
    completed: { bg: "bg-slate-50", border: "border-slate-200", dot: "bg-slate-400", label: "Done", labelBg: "badge-neutral" },
  };

  const activeCount = students.filter(s => s.status === "active").length;
  const flaggedCount = students.filter(s => s.status === "flagged").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Monitoring</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time monitoring of Quiz Physics</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge badge-success flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            {activeCount} Active
          </span>
          {flaggedCount > 0 && (
            <span className="badge badge-danger flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-soft" />
              {flaggedCount} Flagged
            </span>
          )}
        </div>
      </div>

      {/* Exam info bar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4 animate-slide-up">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-slate-400 font-medium">Exam</p>
            <p className="text-sm font-semibold text-slate-700">Quiz Physics</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Duration</p>
            <p className="text-sm font-semibold text-slate-700">60 minutes</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Students</p>
            <p className="text-sm font-semibold text-slate-700">{students.length} total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium">Elapsed Time</p>
            <p className="text-lg font-bold text-emerald-600">31:45</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
            End Exam
          </button>
        </div>
      </div>

      {/* Student grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {students.map((student, i) => {
          const config = statusConfig[student.status];
          return (
            <div
              key={i}
              className={`rounded-2xl border p-4 transition-all duration-200 hover:shadow-md ${config.bg} ${config.border}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${config.dot} ${student.status === "active" || student.status === "flagged" ? "animate-pulse-soft" : ""}`} />
                  <span className="text-sm font-semibold text-slate-700">{student.name}</span>
                </div>
                <span className={`badge text-[10px] ${config.labelBg}`}>{config.label}</span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Q{student.currentQuestion}/{student.totalQuestions}</span>
                  <span>{student.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${student.progress}%`,
                      background: student.status === "flagged" ? "#ef4444" : student.status === "completed" ? "#94a3b8" : "#10b981",
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{student.timeLeft}</span>
                </div>
                {student.violations > 0 && (
                  <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {student.violations} violation{student.violations > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
