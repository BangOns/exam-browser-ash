import { getExamAnswer } from "@/services/exam-answer.services";
import { useQuery } from "@tanstack/react-query";

export const useGetResultExamById = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["resultExamById", id],
    queryFn: () => getExamAnswer({ id }),
    enabled: !!id,
  });
  return { data, isLoading, error };
};
