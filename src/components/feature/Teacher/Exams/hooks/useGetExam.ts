import { getExam } from "@/services/exam.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExam() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam"],
    queryFn: () => getExam(),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError };
}
