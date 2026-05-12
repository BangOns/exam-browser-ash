import { createExam } from "@/services/exam.services";
import { ExamRequest } from "@/types/exam";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: ExamRequest) => createExam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
