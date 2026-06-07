import { deleteTeacher } from "@/services/teacher.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteTeacher(data.id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success(response.message || "berhasil menghapus data guru");
    },
    onError: (response) => {
      toast.error(response.message || "gagal menghapus data guru");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
