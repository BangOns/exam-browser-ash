"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    text: "A ball is thrown vertically upward with a velocity of 20 m/s. What is the maximum height reached by the ball? (Take g = 10 m/s²)",
    options: ["10 m", "20 m", "30 m", "40 m"],
    correct: 1,
  },
  {
    id: 2,
    text: "Which of the following is a vector quantity?",
    options: ["Mass", "Temperature", "Velocity", "Energy"],
    correct: 2,
  },
  {
    id: 3,
    text: "Newton's Third Law of Motion states that:",
    options: [
      "An object at rest stays at rest",
      "F = ma",
      "For every action there is an equal and opposite reaction",
      "Energy is conserved",
    ],
    correct: 2,
  },
  {
    id: 4,
    text: "What is the SI unit of electric current?",
    options: ["Volt", "Ohm", "Watt", "Ampere"],
    correct: 3,
  },
  {
    id: 5,
    text: "The phenomenon of light bending when passing from one medium to another is called:",
    options: ["Reflection", "Refraction", "Diffraction", "Interference"],
    correct: 1,
  },
  {
    id: 6,
    text: "Which type of lens is used to correct myopia (nearsightedness)?",
    options: ["Convex lens", "Concave lens", "Cylindrical lens", "Bifocal lens"],
    correct: 1,
  },
  {
    id: 7,
    text: "The acceleration due to gravity on the surface of the Moon is approximately:",
    options: ["1.6 m/s²", "3.7 m/s²", "9.8 m/s²", "0 m/s²"],
    correct: 0,
  },
  {
    id: 8,
    text: "What happens to the resistance of a conductor when its temperature increases?",
    options: ["Decreases", "Increases", "Remains same", "Becomes zero"],
    correct: 1,
  },
];

export default function StudentExamPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showViolation, setShowViolation] = useState(false);
  const [violationMsg, setViolationMsg] = useState("");

  useEffect(() => {
    // Basic auth/session verify
    const sessionToken = localStorage.getItem("exam_session");
    if (!sessionToken) {
      router.push("/student");
      return;
    }

    const checkCheat = () => {
      // 1. Revoke session token
      localStorage.removeItem("exam_session");
      // 2. Mark student as Suspended
      const ustr = localStorage.getItem("user");
      if (ustr) {
        try {
          const u = JSON.parse(ustr);
          localStorage.setItem(`suspended_user_${u.id}`, "true");
        } catch {
          // ignore
        }
      }
      // 3. Show violation modal
      setViolationMsg("You violated the exam rules by switching tabs or leaving the strict fullscreen mode. Your access has been revoked and you have been suspended. Please contact the administrator.");
      setShowViolation(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) checkCheat();
    };

    const handleBlur = () => {
      checkCheat();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [router]);

  const question = questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/student"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-base font-bold text-slate-800">Quiz Physics</h1>
              <p className="text-xs text-slate-400">20 Questions • 60 minutes</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 border border-sky-200">
              <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold text-sky-600 tabular-nums">42:15</span>
            </div>
            <button
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              onClick={() => setShowViolation(true)}
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-7xl mx-auto mt-2">
          <div className="timer-bar">
            <div
              className="timer-bar-fill bg-sky-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1 text-right">
            {answeredCount}/{questions.length} answered ({progress}%)
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full p-6 gap-6">
        {/* Question area */}
        <div className="flex-1">
          <div className="glass-card p-8 animate-scale-in" key={currentQ}>
            {/* Question number */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">
                {currentQ + 1}
              </span>
              <span className="text-sm text-slate-400 font-medium">
                Question {currentQ + 1} of {questions.length}
              </span>
            </div>

            {/* Question text */}
            <h2 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [currentQ]: idx })}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    answers[currentQ] === idx
                      ? "border-sky-500 bg-sky-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      answers[currentQ] === idx
                        ? "bg-sky-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span
                    className={`text-sm ${
                      answers[currentQ] === idx
                        ? "text-sky-700 font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentQ(Math.min(questions.length - 1, currentQ + 1))
                }
                disabled={currentQ === questions.length - 1}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Question navigation panel */}
        <div className="hidden lg:block w-64">
          <div className="glass-card p-5 sticky top-36">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQ(idx)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    currentQ === idx
                      ? "bg-sky-500 text-white shadow-md"
                      : answers[idx] !== undefined
                      ? "bg-sky-100 text-sky-600 border border-sky-200"
                      : "bg-slate-50 text-slate-400 border border-slate-200 hover:border-sky-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3 h-3 rounded bg-sky-100 border border-sky-200" />
                Answered ({answeredCount})
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200" />
                Unanswered ({questions.length - answeredCount})
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3 h-3 rounded bg-sky-500" />
                Current
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Violation / Submit overlay */}
      {showViolation && (
        <div className="violation-overlay fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full bg-white p-8 rounded-2xl text-center animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            {violationMsg ? (
              <>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Rule Violation Detected</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  {violationMsg}
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/student"
                    className="w-full px-5 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Submit Exam?</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  You have answered {answeredCount} of {questions.length} questions.
                  {answeredCount < questions.length && " Some questions are still unanswered."}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowViolation(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Continue Exam
                  </button>
                  <Link
                    href="/student/results"
                    className="px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                  >
                    Submit Now
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
