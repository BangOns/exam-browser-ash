import { editExam } from "@/services/exam.services";
import { ExamRequestEdit } from "@/types/exam";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: ExamRequestEdit) => editExam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
