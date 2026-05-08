import { deleteQuestion } from "@/services/question.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteQuestion(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
