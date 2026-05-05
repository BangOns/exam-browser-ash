import { deleteStudent } from "@/services/student.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteStudent(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
