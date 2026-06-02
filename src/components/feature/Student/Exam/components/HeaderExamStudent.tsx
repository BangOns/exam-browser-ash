import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

interface Props {
  examName: string;
  examSubject: string;
  progress: number;
  answeredCount: number;
  initialQuestions: number;
  handleModalExit: () => void;
  handleModalSubmit: () => void;
  seconds?: number;
  minutes?: number;
}
export default function HeaderExamStudent({
  progress,
  answeredCount,
  initialQuestions,
  handleModalExit,
  handleModalSubmit,
  seconds,
  minutes,
}: Props) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleModalExit}
            className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100"
          >
            <ArrowLeft />
          </Button>
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
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}:
            </span>
          </div>
          <button
            className="px-4 py-2 cursor-pointer rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            onClick={handleModalSubmit}
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
