import { getQuestion } from "@/services/question.services";
import { useQuery } from "@tanstack/react-query";

export function useGetQuestion() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestion(),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError };
}
