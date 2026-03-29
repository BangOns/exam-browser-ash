import Link from "next/link";
import React from "react";

export default function NotFoundDetail() {
  return (
    <article className="space-y-6">
      <section className="glass-card p-12 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-slate-700 mb-2">
          Result Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          The exam result you are looking for does not exist.
        </p>
        <Link
          href="/student/results"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors"
        >
          ← Back to Results
        </Link>
      </section>
    </article>
  );
}
