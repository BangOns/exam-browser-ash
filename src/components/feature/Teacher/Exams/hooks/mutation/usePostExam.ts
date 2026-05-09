import { createExam } from "@/services/exam.services";
import { QuestionRequest } from "@/types/question";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: QuestionRequest) => createExam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
