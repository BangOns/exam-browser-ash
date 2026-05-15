import { getExamSchedule } from "@/services/schedule.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExamSchedule() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedules"],
    queryFn: () => getExamSchedule(),
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

  return { data, isLoading, isError };
}
