import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";

const statsData = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "Upcoming Exams",
    value: 5,
    trend: "Next: Mar 25",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Active Students",
    value: 186,
    trend: "+12 today",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Avg Score",
    value: "78.5",
    trend: "+2.3 pts",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Questions Created",
    value: 432,
    trend: "+28 this week",
    trendUp: true,
  },
];

type QuestionRow = { question: string; subject: string; difficulty: string; type: string };

const questionsData: QuestionRow[] = [
  { question: "What is Newton's First Law?", subject: "Physics", difficulty: "Easy", type: "Multiple Choice" },
  { question: "Solve: 2x + 5 = 15", subject: "Mathematics", difficulty: "Medium", type: "Short Answer" },
  { question: "Explain photosynthesis process", subject: "Biology", difficulty: "Hard", type: "Essay" },
  { question: "Past tense of 'swim'", subject: "English", difficulty: "Easy", type: "Multiple Choice" },
  { question: "What is the atomic number of Carbon?", subject: "Chemistry", difficulty: "Easy", type: "Multiple Choice" },
];

const questionColumns = [
  { key: "question", label: "Question" },
  { key: "subject", label: "Subject" },
  {
    key: "difficulty",
    label: "Difficulty",
    render: (row: QuestionRow) => (
      <span className={`badge ${
        row.difficulty === "Easy" ? "badge-success" :
        row.difficulty === "Medium" ? "badge-warning" :
        "badge-danger"
      }`}>
        {row.difficulty}
      </span>
    ),
  },
  {
    key: "type",
    label: "Type",
    render: (row: QuestionRow) => (
      <span className="badge badge-neutral">{row.type}</span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2">
        <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium">
          Edit
        </button>
        <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium">
          Delete
        </button>
      </div>
    ),
  },
];

type ResultRow = { student: string; exam: string; score: number; grade: string; date: string };

const resultsData: ResultRow[] = [
  { student: "Siti Nurhaliza", exam: "UTS Mathematics", score: 92, grade: "A", date: "Mar 20, 2026" },
  { student: "Reza Pratama", exam: "UTS Mathematics", score: 76, grade: "B+", date: "Mar 20, 2026" },
  { student: "Budi Santoso", exam: "Quiz Physics", score: 65, grade: "C+", date: "Mar 21, 2026" },
  { student: "Maya Anggraeni", exam: "UTS Mathematics", score: 88, grade: "A-", date: "Mar 20, 2026" },
];

const resultColumns = [
  { key: "student", label: "Student" },
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
        "badge-warning"
      }`}>
        {row.grade}
      </span>
    ),
  },
  { key: "date", label: "Date" },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Teacher Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your exams, questions, and monitor student progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} accent="teacher" />
        ))}
      </div>

      {/* Monitoring quick view */}
      <div className="glass-card p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-800">Live Monitoring</h3>
          <span className="badge badge-success flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            3 Active Sessions
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Siti Nurhaliza", exam: "Quiz Physics", status: "active", progress: 65 },
            { name: "Reza Pratama", exam: "Quiz Physics", status: "idle", progress: 42 },
            { name: "Maya Anggraeni", exam: "Quiz Physics", status: "flagged", progress: 30 },
          ].map((s, i) => (
            <div key={i} className={`p-4 rounded-xl border transition-colors ${
              s.status === "active" ? "border-emerald-200 bg-emerald-50/50" :
              s.status === "flagged" ? "border-red-200 bg-red-50/50" :
              "border-amber-200 bg-amber-50/50"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  s.status === "active" ? "bg-emerald-500 animate-pulse-soft" :
                  s.status === "flagged" ? "bg-red-500 animate-pulse-soft" :
                  "bg-amber-500"
                }`} />
                <span className="text-sm font-semibold text-slate-700">{s.name}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{s.exam}</p>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${s.progress}%`,
                    background: s.status === "flagged" ? "#ef4444" : "#10b981",
                  }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">{s.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DataTable
          title="Question Bank"
          columns={questionColumns}
          data={questionsData}
          action={
            <button className="text-xs px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors font-semibold shadow-sm">
              + Add Question
            </button>
          }
        />
        <DataTable
          title="Recent Results"
          columns={resultColumns}
          data={resultsData}
        />
      </div>
    </div>
  );
}
