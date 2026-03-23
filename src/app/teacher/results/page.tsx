import DataTable from "@/components/ui/DataTable";

type ResultRow = { student: string; exam: string; score: number; grade: string; time: string; date: string };

const resultsData: ResultRow[] = [
  { student: "Siti Nurhaliza", exam: "UTS Mathematics", score: 92, grade: "A", time: "85 min", date: "Mar 20, 2026" },
  { student: "Maya Anggraeni", exam: "UTS Mathematics", score: 88, grade: "A-", time: "92 min", date: "Mar 20, 2026" },
  { student: "Reza Pratama", exam: "UTS Mathematics", score: 76, grade: "B+", time: "110 min", date: "Mar 20, 2026" },
  { student: "Budi Santoso", exam: "Quiz Physics", score: 65, grade: "C+", time: "55 min", date: "Mar 21, 2026" },
  { student: "Andi Wijaya", exam: "Quiz Chemistry", score: 42, grade: "D", time: "40 min", date: "Mar 19, 2026" },
  { student: "Putri Handayani", exam: "UTS Mathematics", score: 95, grade: "A+", time: "78 min", date: "Mar 20, 2026" },
  { student: "Dani Saputra", exam: "Quiz Physics", score: 81, grade: "A-", time: "48 min", date: "Mar 21, 2026" },
  { student: "Lina Marlina", exam: "UTS Mathematics", score: 70, grade: "B", time: "115 min", date: "Mar 20, 2026" },
];

const columns = [
  {
    key: "student",
    label: "Student",
    render: (row: ResultRow) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
          {row.student.split(" ").map(n => n[0]).join("")}
        </div>
        <span className="font-medium text-slate-700">{row.student}</span>
      </div>
    ),
  },
  { key: "exam", label: "Exam" },
  {
    key: "score",
    label: "Score",
    render: (row: ResultRow) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${row.score}%`,
              background: row.score >= 80 ? "#22c55e" : row.score >= 60 ? "#f59e0b" : "#ef4444",
            }}
          />
        </div>
        <span className="text-sm font-semibold">{row.score}</span>
      </div>
    ),
  },
  {
    key: "grade",
    label: "Grade",
    render: (row: ResultRow) => (
      <span className={`badge ${
        row.grade.startsWith("A") ? "badge-success" :
        row.grade.startsWith("B") ? "badge-info" :
        row.grade.startsWith("C") ? "badge-warning" :
        "badge-danger"
      }`}>
        {row.grade}
      </span>
    ),
  },
  { key: "time", label: "Time Spent" },
  { key: "date", label: "Date" },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium">
        Detail
      </button>
    ),
  },
];

export default function TeacherResultsPage() {
  // Compute summary
  const avg = Math.round(resultsData.reduce((s, r) => s + r.score, 0) / resultsData.length);
  const highest = Math.max(...resultsData.map(r => r.score));
  const lowest = Math.min(...resultsData.map(r => r.score));
  const passed = resultsData.filter(r => r.score >= 60).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Exam Results</h1>
          <p className="text-sm text-slate-500 mt-1">View and analyze student performance</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Score distribution visual */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Average Score", value: avg, color: "emerald" },
          { label: "Highest Score", value: highest, color: "sky" },
          { label: "Lowest Score", value: lowest, color: "amber" },
          { label: "Pass Rate", value: `${Math.round((passed / resultsData.length) * 100)}%`, color: "violet" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <p className="text-xs text-slate-400 font-medium mb-1">{s.label}</p>
            <p className={`text-3xl font-bold text-${s.color}-600`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Score distribution bar chart */}
      <div className="glass-card p-6 animate-slide-up">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Score Distribution</h3>
        <div className="flex items-end gap-2 h-32">
          {[
            { range: "0-20", count: 0 },
            { range: "21-40", count: 1 },
            { range: "41-60", count: 1 },
            { range: "61-80", count: 3 },
            { range: "81-100", count: 3 },
          ].map((bucket, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${Math.max(bucket.count * 25, 4)}%`,
                  background: i <= 1 ? "#ef4444" : i === 2 ? "#f59e0b" : "#22c55e",
                  opacity: bucket.count === 0 ? 0.2 : 1,
                }}
              />
              <span className="text-[10px] text-slate-400 font-medium">{bucket.range}</span>
              <span className="text-xs font-bold text-slate-600">{bucket.count}</span>
            </div>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={resultsData} />
    </div>
  );
}
