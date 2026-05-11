import { createClass } from "@/services/class.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostClass() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class"] });
    },
  });

  return { mutate, mutateAsync, isPending };
}
