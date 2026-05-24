import { useParams } from "next/navigation";
import { useGetExamAttemptsById } from "./useGetExamAttemptsById";
import { useEffect, useMemo, useState } from "react";
import { ExamAttemptResource } from "@/types/result";
import { resultColumnsDetail } from "../components/ResultColumnsDetail";

export function useResultByIdManagement() {
  const params = useParams<{ id?: string }>();

  const id = params?.id ?? "";
  const { data: detailResult } = useGetExamAttemptsById(id || "");
  const [result, setResult] = useState<ExamAttemptResource[]>([]);

  useEffect(() => {
    if (detailResult) {
      setResult(detailResult.data);
    }
  }, [detailResult]);
  const columns = useMemo(() => {
    return resultColumnsDetail();
  }, []);
  return { result, columns };
}
