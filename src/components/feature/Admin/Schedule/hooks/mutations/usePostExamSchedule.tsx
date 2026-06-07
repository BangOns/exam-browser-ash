import { createExamSchedule } from "@/services/schedule.services";
import { ExamScheduleRequest } from "@/types/exam-schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function usePostExamShedule() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: ExamScheduleRequest) => createExamSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Exam schedule created successfully");
    },
    onError: (response) => {
      toast.error(response.message || "Gagal menambah Jadwal Ujian");
    },
  });

  return { mutateAsync, mutate };
}
