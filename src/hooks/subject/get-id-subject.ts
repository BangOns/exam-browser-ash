import { getSubjectDetail } from "@/services/subject.services";
import { useQuery } from "@tanstack/react-query";

export function useGetSubjectById(subjectId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subjects", subjectId],
    queryFn: () => getSubjectDetail(subjectId),
    enabled: !!subjectId,
  });

  return { data, isLoading, isError };
}
