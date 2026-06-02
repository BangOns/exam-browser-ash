import { deleteStudent } from "@/services/student.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteStudent(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
