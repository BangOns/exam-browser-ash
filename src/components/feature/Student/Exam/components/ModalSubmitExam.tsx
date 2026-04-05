import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function ModalSubmitExam({
  violationMsg,
  answeredCount,
  initialQuestions,
  setShowViolation,
}: {
  violationMsg: string;
  answeredCount: number;
  initialQuestions: number;
  setShowViolation: (showViolation: boolean) => void;
}) {
  return (
    <section className="violation-overlay fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="glass-card max-w-md w-full bg-white p-8 rounded-2xl text-center animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4">
          <TriangleAlert size={32} />
        </div>

        {violationMsg ? (
          <>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Rule Violation Detected
            </h3>
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Submit Exam?
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              You have answered {answeredCount} of {initialQuestions} questions.
              {answeredCount < initialQuestions &&
                " Some questions are still unanswered."}
            </p>
            <section className="flex gap-3 justify-center">
              <Button
                onClick={() => setShowViolation(false)}
                className="p-5 rounded-xl border cursor-pointer border-slate-200 bg-slate-50 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Continue Exam
              </Button>
              <Link
                href="/student/results"
                className="px-5 py-2.5 cursor-pointer rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Submit Now
              </Link>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
