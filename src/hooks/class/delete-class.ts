import { deleteClass } from "@/services/class.services";
import { ApiError, ApiResponse } from "@/types/api-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending, isError, error } = useMutation<
    ApiResponse<unknown>, // ← sesuaikan dengan return type deleteClass
    ApiError,
    { id: string }
  >({
    mutationFn: (data: { id: string }) => deleteClass(data.id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast.success(response.message || "Berhasil mnghapus kelas");
    },
    onError: (response) => {
      toast.error(response.data.message || "Gagal menghapus kelas");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate, isPending, isError, error };
}
