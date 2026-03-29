import { examDetailsMap } from "@/data/dummy/result";
import { useMemo } from "react";

export function useDetailResultManagement(params: { id: string }) {
  const { id } = params;

  const detail = useMemo(() => {
    return examDetailsMap[id] ?? null;
  }, [id]);

  const scoreColor = useMemo(() => {
    if (!detail) return "";

    return detail.score >= 85
      ? "#22c55e"
      : detail.score >= 70
        ? "#0ea5e9"
        : detail.score >= 60
          ? "#f59e0b"
          : "#ef4444";
  }, [detail]);

  const scoreGradient = useMemo(() => {
    if (!detail) return "";

    return detail.score >= 85
      ? "from-emerald-500 to-emerald-600"
      : detail.score >= 70
        ? "from-sky-500 to-sky-600"
        : detail.score >= 60
          ? "from-amber-500 to-amber-600"
          : "from-red-500 to-red-600";
  }, [detail]);

  return {
    detail,
    scoreColor,
    scoreGradient,
  };
}
