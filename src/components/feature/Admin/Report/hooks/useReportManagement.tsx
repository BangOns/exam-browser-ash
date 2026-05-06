import { useGetReports } from "./useGetReport";

export function useReportManagement() {
  const { data } = useGetReports();

  return { data };
}
