import { updateClass } from "@/services/class.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateClass() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class"] });
    },
  });

  return { mutate, mutateAsync, isPending };
}
