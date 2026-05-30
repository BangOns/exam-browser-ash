import { getStudents } from "@/services/student.services";
import { useQuery } from "@tanstack/react-query";

export function useGetStudents({ page }: { page?: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents({ page }),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
