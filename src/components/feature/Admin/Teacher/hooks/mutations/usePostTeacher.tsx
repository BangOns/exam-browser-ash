import { createTeacher } from "@/services/teacher.services";
import { TeacherRequest } from "@/types/teacher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostTeacher() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: TeacherRequest) => createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
