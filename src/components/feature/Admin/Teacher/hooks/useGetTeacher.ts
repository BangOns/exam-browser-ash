import { getTeachers } from "@/services/teacher.services";
import { useQuery } from "@tanstack/react-query";

export function useGetTeacher({ page }: { page: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teachers", page],
    queryFn: () => getTeachers({ page }),
  });

  return { data, isLoading, isError };
}
