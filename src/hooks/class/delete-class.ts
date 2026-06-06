import { deleteClass } from "@/services/class.services";
import { ApiError, ApiResponse } from "@/types/api-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending, isError, error } = useMutation<
    ApiResponse<unknown>, // ← sesuaikan dengan return type deleteClass
    ApiError,
    { id: string }
  >({
    mutationFn: (data: { id: string }) => deleteClass(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate, isPending, isError, error };
}
