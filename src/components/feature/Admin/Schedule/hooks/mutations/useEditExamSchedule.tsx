import { editExamSchedule } from "@/services/schedule.services";
import { ExamScheduleRequestEdit } from "@/types/exam-schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditExamSchedule() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: ExamScheduleRequestEdit) => editExamSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  return { mutateAsync, mutate };
}
