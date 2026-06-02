import { editStudent } from "@/services/student.services";
import { StudentRequestEdit } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useEditStudent() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: StudentRequestEdit) => editStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student updated successfully");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
