import { getExamSchedule } from "@/services/schedule.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExamSchedule({ page }: { page?: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedules", page],
    queryFn: () => getExamSchedule({ page }),
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

  return { data, isLoading, isError };
}
