import { fetchWithAuth } from "@/lib/fetcher";
import { ClassList } from "@/types/class";

export async function getReport() {
  const res = await fetchWithAuth<ClassList[]>("/api/report");
  return res;
}
