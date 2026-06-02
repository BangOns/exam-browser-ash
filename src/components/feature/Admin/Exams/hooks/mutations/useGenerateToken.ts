import { generateToken } from "@/services/generate-token.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useGenerateToken() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (id: string) => generateToken(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
      toast.success("Token generated successfully");
    },
  });

  return { mutateAsync, mutate };
}
