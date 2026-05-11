import { deleteSubject } from "@/services/subject.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    mutationFn: (data: { id: string }) => deleteSubject(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate, isPending };
}
