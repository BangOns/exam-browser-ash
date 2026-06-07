import { createTeacher } from "@/services/teacher.services";
import { TeacherRequest } from "@/types/teacher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function usePostTeacher() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: TeacherRequest) => createTeacher(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success(response.message || "berhasil menambah data guru");
    },
    onError: (response) => {
      toast.error(response.message || "gagal menambah data guru");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
