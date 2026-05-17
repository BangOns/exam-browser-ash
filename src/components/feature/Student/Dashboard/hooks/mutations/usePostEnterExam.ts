import { EnterExamWithToken } from "@/services/generate-token.services";
import { ExamTokenRequest } from "@/types/exam-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostEnterExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    mutationFn: (data: ExamTokenRequest) => EnterExamWithToken(data),
    onError: (err: { data: { message: string } }) => {
      return err.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  });

  return { mutateAsync, mutate, isPending };
}
