import { createExamSchedule } from "@/services/schedule.services";
import { ExamScheduleRequest } from "@/types/exam-schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostExamShedule() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: ExamScheduleRequest) => createExamSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  return { mutateAsync, mutate };
}
