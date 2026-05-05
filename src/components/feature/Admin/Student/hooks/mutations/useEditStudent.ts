import { editStudent } from "@/services/student.services";
import { StudentRequestEdit } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditStudent() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: StudentRequestEdit) => editStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
