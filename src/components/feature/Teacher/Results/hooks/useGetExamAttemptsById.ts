import { getExamAttempts } from "@/services/exam-attempts.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExamAttemptsById(examId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getExamAttempts({ id: examId }),
    enabled: !!examId, // Hanya jalankan query jika teacherId tersedia
  });

  return { data, isLoading, isError };
}
