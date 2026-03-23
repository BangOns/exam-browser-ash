"use client";

import Link from "next/link";
import { use } from "react";

type Question = {
  id: number;
  text: string;
  type: "Multiple Choice" | "Essay";
  options?: string[];
  correctAnswer?: string;
  points: number;
};

type ExamDetail = {
  id: string;
  name: string;
  subject: string;
  description: string;
  duration: string;
  status: "Active" | "Scheduled" | "Draft" | "Completed";
  created: string;
  questions: Question[];
};

const examDetailsMap: Record<string, ExamDetail> = {
  "1": {
    id: "1",
    name: "UTS Mathematics",
    subject: "Mathematics",
    description: "Mid-term examination for 10th-grade students covering Algebra and Geometry.",
    duration: "120 min",
    status: "Active",
    created: "Mar 10, 2026",
    questions: [
      { id: 101, text: "Solve for x: 2x + 5 = 15", type: "Multiple Choice", options: ["x = 5", "x = 10", "x = 2", "x = 8"], correctAnswer: "x = 5", points: 5 },
      { id: 102, text: "Prove the Pythagorean theorem.", type: "Essay", points: 15 },
    ],
  },
  "2": {
    id: "2",
    name: "UAS English",
    subject: "English",
    description: "Final examination for 12th-grade students covering reading comprehension and writing.",
    duration: "90 min",
    status: "Scheduled",
    created: "Mar 12, 2026",
    questions: [
      { id: 201, text: "What is the main theme of the provided text?", type: "Multiple Choice", options: ["Nature", "Technology", "History", "Science"], correctAnswer: "Nature", points: 10 },
      { id: 202, text: "Write an essay about the impact of climate change.", type: "Essay", points: 20 },
    ],
  },
  // Adding default fallback for other IDs
};

const defaultExam: ExamDetail = {
  id: "0",
  name: "Sample Exam",
  subject: "General",
  description: "This is a sample exam description.",
  duration: "60 min",
  status: "Draft",
  created: "Mar 20, 2026",
  questions: [
    { id: 1, text: "Sample Question 1?", type: "Multiple Choice", options: ["A", "B", "C", "D"], correctAnswer: "A", points: 5 },
    { id: 2, text: "Sample Essay Question?", type: "Essay", points: 10 },
  ],
};

export default function AdminExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const exam = examDetailsMap[id] || { ...defaultExam, id, name: `Exam ${id}` };

  return (
    <div className="space-y-6">
      <Link href="/admin/exams" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Exams
      </Link>

      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-800">{exam.name}</h1>
              <span className={`badge ${
                exam.status === "Active" ? "badge-success" :
                exam.status === "Scheduled" ? "badge-info" :
                exam.status === "Draft" ? "badge-neutral" :
                "badge-warning"
              }`}>
                {exam.status}
              </span>
            </div>
            <div className="text-sm font-medium text-indigo-600 mb-4">{exam.subject}</div>
            <p className="text-slate-600 leading-relaxed max-w-3xl">{exam.description || "No description provided for this exam."}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 shrink-0">
             <div className="bg-slate-50 rounded-xl p-4 min-w-[120px]">
                <p className="text-xs text-slate-400 font-medium mb-1">Duration</p>
                <p className="text-xl font-bold text-slate-800">{exam.duration}</p>
             </div>
             <div className="bg-slate-50 rounded-xl p-4 min-w-[120px]">
                <p className="text-xs text-slate-400 font-medium mb-1">Questions</p>
                <p className="text-xl font-bold text-slate-800">{exam.questions.length}</p>
             </div>
             <div className="bg-slate-50 rounded-xl p-4 min-w-[120px]">
                <p className="text-xs text-slate-400 font-medium mb-1">Total Points</p>
                <p className="text-xl font-bold text-slate-800">{exam.questions.reduce((sum, q) => sum + q.points, 0)}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Question List</h2>
            <button className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition-colors">
                Manage Questions
            </button>
        </div>

        {exam.questions.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-slate-500">No questions added to this exam yet.</p>
          </div>
        ) : (
          exam.questions.map((q, idx) => (
            <div key={q.id} className="glass-card p-6 animate-slide-up">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 text-lg leading-snug">{q.text}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`badge ${q.type === "Multiple Choice" ? "badge-info" : "badge-neutral"}`}>
                        {q.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{q.points} pt{q.points !== 1 && 's'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {q.type === "Multiple Choice" && q.options && (
                <div className="mt-4 pl-11 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, i) => {
                    const isCorrect = opt === q.correctAnswer;
                    return (
                      <div 
                        key={i} 
                        className={`p-3 rounded-xl border flex items-center gap-3 ${
                            isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-slate-50'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-500'
                        }`}>
                            {String.fromCharCode(65 + i)}
                        </span>
                        <span className={`text-sm ${isCorrect ? 'text-emerald-800 font-medium' : 'text-slate-600'}`}>{opt}</span>
                        {isCorrect && (
                            <svg className="w-4 h-4 text-emerald-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              {q.type === "Essay" && (
                <div className="mt-4 pl-11">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500 italic">
                        Essay response grading is manual. Maintain strict observance of the grading rubric.
                    </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
