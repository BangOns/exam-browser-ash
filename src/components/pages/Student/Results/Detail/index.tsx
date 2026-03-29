"use client";

import CardQuestionDetail from "@/components/feature/Student/results/detail/components/CardQuestionDetail";
import HeaderCardDetail from "@/components/feature/Student/results/detail/components/HeaderCardDetail";
import NotFoundDetail from "@/components/feature/Student/results/detail/components/NotFoundDetail";
import ScoreDistribution from "@/components/feature/Student/results/detail/components/ScoreDistribution";
import { useDetailResultManagement } from "@/components/feature/Student/results/detail/hooks/useDetailResultManagement";
import BackButton from "@/components/shared/BackButton";
import { use } from "react";

export default function StudentResultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { detail, scoreColor, scoreGradient } =
    useDetailResultManagement(resolvedParams);

  if (!detail) {
    return <NotFoundDetail />;
  }
  return (
    <div className="space-y-6">
      {/* Back button */}
      <BackButton href="/student/results" />

      {/* Header card */}
      <HeaderCardDetail detail={detail} scoreGradient={scoreGradient} />

      {/* Score distribution */}
      <ScoreDistribution detail={detail} />

      {/* Question breakdown */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800">
          Question Details
        </h3>
        {detail.questions.map((q) => (
          <CardQuestionDetail
            key={q.number}
            question={q}
            scoreColor={scoreColor}
          />
        ))}
      </section>
    </div>
  );
}
