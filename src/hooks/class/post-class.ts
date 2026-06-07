import { createClass } from "@/services/class.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function usePostClass() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: createClass,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success(response.message || "berhasil menambah kelas");
    },
    onError: (response) => {
      toast.error(response.message || "gagal menambah kelas");
    },
  });

  return { mutate, mutateAsync, isPending };
}
