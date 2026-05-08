import { createQuestion } from "@/services/question.services";
import { QuestionRequest } from "@/types/question";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostQuestion() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: QuestionRequest) => createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
