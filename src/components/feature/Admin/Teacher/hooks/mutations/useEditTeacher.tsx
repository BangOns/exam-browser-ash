import { editTeacher } from "@/services/teacher.services";
import { TeacherRequestEdit } from "@/types/teacher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useEditTeacher() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: TeacherRequestEdit) => editTeacher(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success(response.message || "berhasil merubah data guru");
    },
    onError: (response) => {
      toast.error(response.message || "gagal merubah data guru");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
