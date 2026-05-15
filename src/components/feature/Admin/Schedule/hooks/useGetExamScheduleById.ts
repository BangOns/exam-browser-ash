import { getExamScheduleById } from "@/services/schedule.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExamScheduleById(scheduleId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedules", scheduleId],
    queryFn: () => getExamScheduleById(scheduleId),
    enabled: !!scheduleId, // Hanya jalankan query jika scheduleId tersedia
  });

  return { data, isLoading, isError };
}
