import { getReport } from "@/services/report.services";
import { useQuery } from "@tanstack/react-query";

export function useGetClass() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["class"],
    queryFn: () => getReport(),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
