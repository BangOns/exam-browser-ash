import { fetchWithAuth } from "@/lib/fetcher";
import { SubjectList } from "@/types/subject";

export async function getSubject() {
  const res = await fetchWithAuth<SubjectList[]>("/api/subjects");

  return res;
}
