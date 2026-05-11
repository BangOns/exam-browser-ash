import { updateSubject } from "@/services/subject.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSubject() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: updateSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  return { mutate, mutateAsync, isPending };
}
