"use client";
import CardResultExamResult from "@/components/feature/Student/results/components/CardResultExamResult";
import CardStatsExamResult from "@/components/feature/Student/results/components/CardStatsExamResult";
import PageHeader from "@/components/shared/PageHeader";
import { useResultListManagement } from "@/components/feature/Student/results/hooks/useResultListManagement";

export default function StudentResultsPage() {
  const { results, avgScore } = useResultListManagement();

  return (
    <article className="space-y-6">
      <PageHeader
        title="My Results"
        description="View your exam scores and performance history"
      />

      {/* Overview cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Average Score", value: avgScore, suffix: "" },
          { label: "Exams Taken", value: results.length, suffix: "" },
          {
            label: "Highest Score",
            value: Math.max(...results.map((r) => r.score)),
            suffix: "",
          },
          {
            label: "Pass Rate",
            value: `${Math.round((results.filter((r) => r.score >= 60).length / results.length) * 100)}%`,
            suffix: "",
          },
        ].map((s, i) => (
          <CardStatsExamResult key={i} label={s.label} value={s.value} />
        ))}
      </section>

      {/* Results list */}
      <article className="space-y-4">
        {results.map((result, i) => (
          <CardResultExamResult key={i} result={result} />
        ))}
      </article>
    </article>
  );
}
