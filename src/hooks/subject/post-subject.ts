import { createSubject } from "@/services/subject.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostSubject() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  return { mutate, mutateAsync, isPending };
}
