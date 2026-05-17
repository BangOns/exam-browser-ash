import { Button } from "@/components/ui/button";
import { QuestionList } from "@/types/question";

export default function NavigationQuestions({
  currentQ,
  setCurrentQ,
  answers,
  initialQuestions,
  answeredCount,
}: {
  currentQ: number;
  setCurrentQ: (currentQ: number) => void;
  answers: Record<string, number | string>;
  initialQuestions: QuestionList[];
  answeredCount: number;
}) {
  return (
    <section className="hidden lg:block w-64">
      <header className="glass-card p-5 sticky top-36">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Question Navigator
        </h3>

        <section className="grid grid-cols-5 gap-2">
          {initialQuestions.map((question, idx) => {
            const isAnswered = answers[question.id] !== undefined;

            return (
              <Button
                key={question.id}
                onClick={() => setCurrentQ(idx)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentQ === idx
                    ? "bg-sky-500 text-white shadow-md"
                    : isAnswered
                      ? "bg-sky-100 text-sky-600 border border-sky-200"
                      : "bg-slate-50 text-slate-400 border border-slate-200 hover:border-sky-200"
                }`}
              >
                {idx + 1}
              </Button>
            );
          })}
        </section>

        <section className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-sky-100 border border-sky-200" />
            Answered ({answeredCount})
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200" />
            Unanswered ({initialQuestions.length - answeredCount})
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-sky-500" />
            Current
          </div>
        </section>
      </header>
    </section>
  );
}
