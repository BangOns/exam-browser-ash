import { fetchWithAuth } from "@/lib/fetcher";
import { ClassList } from "@/types/class";

export async function getClass() {
  const res = await fetchWithAuth<ClassList[]>("/api/class");

  return res;
}
