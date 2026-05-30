import { getQuestion } from "@/services/question.services";
import { useQuery } from "@tanstack/react-query";
interface Props {
  page?: number;
}
export function useGetQuestion({ page }: Props = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestion({ page }),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError };
}
