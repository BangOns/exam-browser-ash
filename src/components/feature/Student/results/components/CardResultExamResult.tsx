import { ResultDetail } from "@/types/result";
import Link from "next/link";
import React from "react";

export default function CardResultExamResult({
  result,
}: {
  result: ResultDetail;
}) {
  return (
    <section className="glass-card p-5 animate-slide-up flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <header className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${
            result.score >= 85
              ? "bg-emerald-50 text-emerald-600"
              : result.score >= 70
                ? "bg-sky-50 text-sky-600"
                : result.score >= 60
                  ? "bg-amber-50 text-amber-600"
                  : "bg-red-50 text-red-600"
          }`}
        >
          {result.grade}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{result.exam}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span>{result.subject}</span>
            <span>•</span>
            <span>{result.date}</span>
            <span>•</span>
            <span>
              {result.correctAnswers}/{result.totalQuestions} correct
            </span>
          </div>
        </div>
      </header>

      <section className="flex items-center gap-4 w-full sm:w-auto">
        {/* Score bar */}
        <div className="flex-1 sm:w-40">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Score</span>
            <span className="font-semibold text-slate-700">
              {result.score}/100
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${result.score}%`,
                background:
                  result.score >= 85
                    ? "#22c55e"
                    : result.score >= 70
                      ? "#0ea5e9"
                      : result.score >= 60
                        ? "#f59e0b"
                        : "#ef4444",
              }}
            />
          </div>
        </div>

        <Link
          href={`/student/results/${result.id}`}
          className="text-xs px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium shrink-0"
        >
          Details
        </Link>
      </section>
    </section>
  );
}
