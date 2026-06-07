import { updateClass } from "@/services/class.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateClass() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: updateClass,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success(response.message || "Berhasil merubah kelas");
    },
    onError: (response) => {
      toast.error(response.message || "Gagal merubah kelas");
    },
  });

  return { mutate, mutateAsync, isPending };
}
