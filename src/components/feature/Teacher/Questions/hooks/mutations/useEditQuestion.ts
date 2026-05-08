import { editQuestion } from "@/services/question.services";
import { QuestionRequestEdit } from "@/types/question";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditQuestion() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: QuestionRequestEdit) => editQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
