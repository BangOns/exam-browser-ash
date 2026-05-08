import { getQuestionById } from "@/services/question.services";
import { useQuery } from "@tanstack/react-query";

export function useGetQuestionById(questionId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["questions", questionId],
    queryFn: () => getQuestionById(questionId),
    enabled: !!questionId, // Hanya jalankan query jika teacherId tersedia
  });

  return { data, isLoading, isError };
}
