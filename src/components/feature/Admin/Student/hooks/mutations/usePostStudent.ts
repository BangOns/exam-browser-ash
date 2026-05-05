import { createStudent } from "@/services/student.services";
import { StudentRequest } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostStudent() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: StudentRequest) => createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
