import { fetchWithAuth } from "@/lib/fetcher";
import { ExamList } from "@/types/exam";

export async function getExamAttempts({ id }: { id?: string }) {
  const res = await fetchWithAuth<ExamList[]>(`/api/exam-attempts/${id}`);
  return res;
}
