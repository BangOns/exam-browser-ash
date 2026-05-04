import { editTeacher } from "@/services/teacher.services";
import { TeacherRequestEdit } from "@/types/teacher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditTeacher() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: TeacherRequestEdit) => editTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
