import { getExamById } from "@/services/exam.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExamById(examId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => getExamById(examId),
    enabled: !!examId, // Hanya jalankan query jika teacherId tersedia
  });

  return { data, isLoading, isError };
}
