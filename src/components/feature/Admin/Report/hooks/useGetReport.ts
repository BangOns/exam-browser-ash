import { getReport } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export function useGetReports() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports"],
    queryFn: () => getReport(),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
