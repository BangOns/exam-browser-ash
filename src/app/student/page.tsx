"use client";

import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statsData = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Available Exams",
    value: 3,
    trend: "1 starting soon",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    label: "Completed Exams",
    value: 12,
    trend: "3 this week",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Average Score",
    value: "82.4",
    trend: "+3.1 pts",
    trendUp: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    label: "Notifications",
    value: 2,
    trend: "1 warning",
    trendUp: false,
  },
];

type Exam = {
  id: number;
  name: string;
  subject: string;
  duration: string;
  questions: number;
  startsIn: string;
  status: "available" | "upcoming" | "completed";
};

const exams: Exam[] = [
  { id: 1, name: "UTS Mathematics", subject: "Mathematics", duration: "120 min", questions: 40, startsIn: "2h 30m", status: "available" },
  { id: 2, name: "Quiz Physics", subject: "Physics", duration: "60 min", questions: 20, startsIn: "Now", status: "available" },
  { id: 3, name: "UAS English", subject: "English", duration: "90 min", questions: 50, startsIn: "3 days", status: "upcoming" },
  { id: 4, name: "Quiz Chemistry", subject: "Chemistry", duration: "45 min", questions: 15, startsIn: "5 days", status: "upcoming" },
];

type Result = { exam: string; score: number; grade: string; date: string };

const recentResults: Result[] = [
  { exam: "Quiz Biology", score: 88, grade: "A-", date: "Mar 20, 2026" },
  { exam: "UTS Indonesian", score: 76, grade: "B+", date: "Mar 18, 2026" },
  { exam: "Quiz History", score: 92, grade: "A", date: "Mar 15, 2026" },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [verifyModal, setVerifyModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartExam = (id: number) => {
    // Check if suspended
    const ustr = localStorage.getItem("user");
    if (ustr) {
      try {
        const u = JSON.parse(ustr);
        if (localStorage.getItem(`suspended_user_${u.id}`) === "true") {
          alert("Your access is suspended due to a rule violation. Please contact Admin.");
          return;
        }
      } catch {
        // ignore
      }
    }
    setSelectedExam(id);
    setVerifyModal(true);
    setErrorMsg("");
    setTokenInput("");
  };

  const handleVerifyToken = () => {
    if (!selectedExam) return;
    const correctToken = localStorage.getItem(`exam_token_${selectedExam}`);
    if (correctToken && correctToken === tokenInput) {
      // verification success
      localStorage.setItem("exam_session", Math.random().toString(36).substring(2, 10));
      router.push("/student/exam");
    } else {
      setErrorMsg("Invalid token. Please ask your admin for the correct access token.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">View your exams, results, and notifications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} accent={i === 3 ? "warning" : "student"} />
        ))}
      </div>

      {/* Available Exams */}
      <div className="glass-card overflow-hidden animate-slide-up">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">Available & Upcoming Exams</h3>
        </div>
        <div className="p-4 space-y-3">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                exam.status === "available"
                  ? "border-sky-200 bg-sky-50/50 hover:bg-sky-50"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  exam.status === "available" ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"
                }`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span>{exam.subject}</span>
                    <span>•</span>
                    <span>{exam.duration}</span>
                    <span>•</span>
                    <span>{exam.questions} questions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                  exam.startsIn === "Now"
                    ? "bg-emerald-50 text-emerald-600 animate-pulse-soft"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {exam.startsIn === "Now" ? "🟢 Live Now" : `⏰ ${exam.startsIn}`}
                </div>
                {exam.status === "available" ? (
                  <Button
                    onClick={() => handleStartExam(exam.id)}
                    className="px-5 py-2 h-9 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Start Exam
                  </Button>
                ) : (
                  <span className="badge badge-neutral">Upcoming</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div className="glass-card overflow-hidden animate-slide-up">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">Recent Results</h3>
        </div>
        <div className="p-4 space-y-3">
          {recentResults.map((result, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                  result.score >= 85 ? "bg-emerald-50 text-emerald-600" :
                  result.score >= 70 ? "bg-sky-50 text-sky-600" :
                  "bg-amber-50 text-amber-600"
                }`}>
                  {result.grade}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">{result.exam}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{result.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">{result.score}</p>
                  <p className="text-xs text-slate-400">out of 100</p>
                </div>
                <div className="w-14 h-14 relative">
                  <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="16" fill="none"
                      stroke={result.score >= 85 ? "#22c55e" : result.score >= 70 ? "#0ea5e9" : "#f59e0b"}
                      strokeWidth="3"
                      strokeDasharray={`${result.score} ${100 - result.score}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Violation Warning card */}
      <div className="glass-card border-l-4 border-l-amber-400 p-5 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Exam Rules Reminder</h4>
            <p className="text-sm text-slate-500 mt-1">
              Do not switch tabs, open other applications, or exit fullscreen during an exam. Violations will be recorded and reported to your teacher.
            </p>
          </div>
        </div>
      </div>
      {/* Token Verification Modal */}
      <Modal
        isOpen={verifyModal}
        onClose={() => setVerifyModal(false)}
        title="Enter Access Token"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Please enter the access token provided by the administrator to begin this exam.
          </p>
          {errorMsg && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">
              {errorMsg}
            </div>
          )}
          <Input
            type="text"
            className="h-12 w-full px-4 rounded-xl border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 tracking-widest font-mono text-center uppercase"
            placeholder="XXXXXX"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => setVerifyModal(false)}
              className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyToken}
              disabled={!tokenInput}
              className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
            >
              Verify & Start
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
