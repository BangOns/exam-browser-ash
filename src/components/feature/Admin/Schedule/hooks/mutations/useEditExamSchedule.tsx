import { editExamSchedule } from "@/services/schedule.services";
import { ExamScheduleRequestEdit } from "@/types/exam-schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useEditExamSchedule() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: ExamScheduleRequestEdit) => editExamSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Exam schedule edited successfully");
    },
  });

  return { mutateAsync, mutate };
}
