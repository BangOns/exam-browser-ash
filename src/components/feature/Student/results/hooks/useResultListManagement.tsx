import { resultsDetail } from "@/data/dummy/result";
import { ResultDetail } from "@/types/result";
import { useMemo, useState } from "react";

export function useResultListManagement() {
  const [results, setResults] = useState<ResultDetail[]>(resultsDetail);
  const avgScore = useMemo(() => {
    return Math.round(
      results.reduce((s, r) => s + r.score, 0) / results.length,
    );
  }, [results]);
  return {
    results,
    setResults,
    avgScore,
  };
}
