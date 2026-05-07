import { fetchWithAuth } from "@/lib/fetcher";
import { QuestionList } from "@/types/question";

export async function getLesson() {
  const res = await fetchWithAuth<QuestionList[]>("/api/lesson");
  return res;
}
