import { getExamById } from "@/services/exam.services";
import { useQuery } from "@tanstack/react-query";

export function useGetExamById({
  examId,
  page,
}: {
  examId: string;
  page?: number;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam", examId, page],
    queryFn: () => getExamById({ examId, page }),
    enabled: !!examId, // Hanya jalankan query jika teacherId tersedia
  });

  return { data, isLoading, isError };
}
