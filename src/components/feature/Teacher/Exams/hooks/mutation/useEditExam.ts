import { editExam } from "@/services/exam.services";
import { QuestionRequestEdit } from "@/types/question";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: QuestionRequestEdit) => editExam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
