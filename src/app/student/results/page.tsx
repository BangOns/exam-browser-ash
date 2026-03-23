import Link from "next/link";

export default function StudentResultsPage() {
  type Result = { id: string; exam: string; subject: string; score: number; grade: string; date: string; questions: number; correct: number };

  const results: Result[] = [
    { id: "1", exam: "Quiz Biology", subject: "Biology", score: 88, grade: "A-", date: "Mar 20, 2026", questions: 20, correct: 18 },
    { id: "2", exam: "UTS Indonesian", subject: "Indonesian", score: 76, grade: "B+", date: "Mar 18, 2026", questions: 40, correct: 30 },
    { id: "3", exam: "Quiz History", subject: "History", score: 92, grade: "A", date: "Mar 15, 2026", questions: 25, correct: 23 },
    { id: "4", exam: "UTS Mathematics", subject: "Mathematics", score: 68, grade: "B-", date: "Mar 10, 2026", questions: 40, correct: 27 },
    { id: "5", exam: "Quiz English", subject: "English", score: 95, grade: "A+", date: "Mar 8, 2026", questions: 30, correct: 29 },
    { id: "6", exam: "UTS Physics", subject: "Physics", score: 72, grade: "B", date: "Mar 5, 2026", questions: 35, correct: 25 },
  ];

  const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Results</h1>
        <p className="text-sm text-slate-500 mt-1">View your exam scores and performance history</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Average Score", value: avgScore, suffix: "" },
          { label: "Exams Taken", value: results.length, suffix: "" },
          { label: "Highest Score", value: Math.max(...results.map(r => r.score)), suffix: "" },
          { label: "Pass Rate", value: `${Math.round((results.filter(r => r.score >= 60).length / results.length) * 100)}%`, suffix: "" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <p className="text-xs text-slate-400 font-medium mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-sky-600">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Results list */}
      <div className="space-y-4">
        {results.map((result, i) => (
          <div
            key={i}
            className="glass-card p-5 animate-slide-up flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${
                result.score >= 85 ? "bg-emerald-50 text-emerald-600" :
                result.score >= 70 ? "bg-sky-50 text-sky-600" :
                result.score >= 60 ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-600"
              }`}>
                {result.grade}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{result.exam}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span>{result.subject}</span>
                  <span>•</span>
                  <span>{result.date}</span>
                  <span>•</span>
                  <span>{result.correct}/{result.questions} correct</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Score bar */}
              <div className="flex-1 sm:w-40">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Score</span>
                  <span className="font-semibold text-slate-700">{result.score}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${result.score}%`,
                      background: result.score >= 85 ? "#22c55e" : result.score >= 70 ? "#0ea5e9" : result.score >= 60 ? "#f59e0b" : "#ef4444",
                    }}
                  />
                </div>
              </div>

              <Link
                href={`/student/results/${result.id}`}
                className="text-xs px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium shrink-0"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
