import { Button } from "@/components/ui/button";
import { ExamQuestionNow } from "@/types/exam";
import { FileText } from "lucide-react";

export default function CardExamNow({
  exam,
  handleStartExam,
}: {
  exam: ExamQuestionNow;
  handleStartExam: (id: number) => void;
}) {
  return (
    <section
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
        exam.status === "available"
          ? "border-sky-200 bg-sky-50/50 hover:bg-sky-50"
          : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
      }`}
    >
      <section className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            exam.status === "available"
              ? "bg-sky-100 text-sky-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <FileText />
        </div>
        <section>
          <h4 className="font-semibold text-slate-800">{exam.name}</h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span>{exam.subject}</span>
            <span>•</span>
            <span>{exam.duration}</span>
            <span>•</span>
            <span>{exam.questions} questions</span>
          </div>
        </section>
      </section>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div
          className={`text-sm font-semibold px-3 py-1 rounded-lg ${
            exam.startsIn === "Now"
              ? "bg-emerald-50 text-emerald-600 animate-pulse-soft"
              : "bg-slate-100 text-slate-600"
          }`}
        >
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
    </section>
  );
}
