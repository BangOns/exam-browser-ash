import { deleteExam } from "@/services/exam.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteExam(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
