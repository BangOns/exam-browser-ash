import { deleteTeacher } from "@/services/teacher.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteTeacher(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
