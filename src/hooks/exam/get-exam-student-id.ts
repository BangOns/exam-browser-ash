import { getExamByIdStudent } from "@/services/exam.services";
import { useQuery } from "@tanstack/react-query";
interface Props {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}
export function useGetExamByIdStudent({
  page,
  limit,
  search,
  status,
}: Props = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam", search, page, limit, status],
    queryFn: () => getExamByIdStudent({ page, limit, search, status }),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
