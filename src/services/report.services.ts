import { fetchWithAuth } from "@/lib/fetcher";
import { ReportList } from "@/types/report";

export async function getReport() {
  const res = await fetchWithAuth<ReportList[]>("/api/report");
  return res;
}
