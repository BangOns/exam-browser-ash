import { fetchWithAuth } from "@/lib/fetcher";
import { SubmissionAnswer } from "@/types/answer";

export async function getExamAnswer({ id }: { id?: string }) {
  const res = await fetchWithAuth<SubmissionAnswer[]>(
    `/api/exam-answers/${id}`,
  );
  return res;
}
