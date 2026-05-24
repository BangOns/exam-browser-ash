import { fetchWithAuth } from "@/lib/fetcher";
import { ExamAttemptResource } from "@/types/result";

export async function getExamAttempts({ id }: { id?: string }) {
  const res = await fetchWithAuth<ExamAttemptResource[]>(
    `/api/exam-attempts/${id}`,
  );
  return res;
}
