import { fetchWithAuth } from "@/lib/fetcher";
import { LessonList } from "@/types/lesson";

export async function getLesson() {
  const res = await fetchWithAuth<LessonList[]>("/api/lesson");
  return res;
}
