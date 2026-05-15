import { deleteExamSchedule } from "@/services/schedule.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteExamSchedule() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteExamSchedule(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
