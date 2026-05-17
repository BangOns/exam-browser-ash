import { ExitExam } from "@/services/generate-token.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostExitExam() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    mutationFn: ({ id, type }: { id: string; type: string }) =>
      ExitExam({ id, type }),
    onError: (err: { data: { message: string } }) => {
      return err.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  });

  return { mutateAsync, mutate, isPending };
}
