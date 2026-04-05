import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export default function HeaderExamStudent({
  progress,
  answeredCount,
  setShowViolation,
  initialQuestions,
}: {
  examName: string;
  examSubject: string;
  progress: number;
  answeredCount: number;
  setShowViolation: (show: boolean) => void;
  initialQuestions: number;
}) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/student"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft />
          </Link>
          <div>
            <h1 className="text-base font-bold text-slate-800">Quiz Physics</h1>
            <p className="text-xs text-slate-400">20 Questions • 60 minutes</p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 border border-sky-200">
            <Clock className=" text-sky-500" size={16} />
            <span className="text-sm font-bold text-sky-600 tabular-nums">
              42:15
            </span>
          </div>
          <button
            className="px-4 py-2 cursor-pointer rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
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
          {answeredCount}/{initialQuestions} answered ({progress}%)
        </p>
      </div>
    </header>
  );
}
