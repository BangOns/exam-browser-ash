import { SubmitAnswersExam } from "@/services/generate-token.services";
import { AnswerRequest } from "@/types/answer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function usePostSubmiExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AnswerRequest }) =>
      SubmitAnswersExam(id, data),
    onError: (err: { data: { message: string } }) => {
      toast.error(err.data.message || "Terjadi Kesalahan");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  });

  return { mutateAsync, mutate, isPending };
}
