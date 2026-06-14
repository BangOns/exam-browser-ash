import { UpdateAnswersExam } from "@/services/generate-token.services";
import { ScoreRequest } from "@/types/answer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostEditExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      studentId,
      data,
    }: {
      id: string;
      studentId: string;
      data: ScoreRequest;
    }) => UpdateAnswersExam(id, studentId, data),
    onError: (err: { data: { message: string } }) => {
      return err.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-result"] });
    },
  });

  return { mutateAsync, mutate, isPending };
}
