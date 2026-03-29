import { StudentSession } from "@/types/student";

export default function ExamInfoBar({
  students,
}: {
  students: StudentSession[];
  examName?: string;
  duration?: string;
  elapsedTime?: string;
  onEndExam?: () => void;
}) {
  return (
    <section className="glass-card p-4 flex flex-wrap items-center justify-between gap-4 animate-slide-up">
      <section className="flex items-center gap-6">
        <div>
          <p className="text-xs text-slate-400 font-medium">Exam</p>
          <p className="text-sm font-semibold text-slate-700">Quiz Physics</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Duration</p>
          <p className="text-sm font-semibold text-slate-700">60 minutes</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Students</p>
          <p className="text-sm font-semibold text-slate-700">
            {students.length} total
          </p>
        </div>
      </section>
      <section className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-slate-400 font-medium">Elapsed Time</p>
          <p className="text-lg font-bold text-emerald-600">31:45</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
          End Exam
        </button>
      </section>
    </section>
  );
}
