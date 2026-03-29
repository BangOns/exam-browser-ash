import React from "react";
import { ResultStudent } from "@/types/result";
import Progress from "@/components/ui/Progress";

export default function CardRecentResult({
  result,
}: {
  result: ResultStudent;
}) {
  return (
    <section className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-all">
      <header className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
            result.score >= 85
              ? "bg-emerald-50 text-emerald-600"
              : result.score >= 70
                ? "bg-sky-50 text-sky-600"
                : "bg-amber-50 text-amber-600"
          }`}
        >
          {result.grade}
        </div>
        <div>
          <h4 className="font-semibold text-slate-700">{result.exam}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{result.date}</p>
        </div>
      </header>
      <section className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">{result.score}</p>
          <p className="text-xs text-slate-400">out of 100</p>
        </div>
        <div className="w-14 h-14 relative">
          <Progress value={result.score} />
        </div>
      </section>
    </section>
  );
}
