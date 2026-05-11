import { deleteClass } from "@/services/class.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    mutationFn: (data: { id: string }) => deleteClass(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate, isPending };
}
