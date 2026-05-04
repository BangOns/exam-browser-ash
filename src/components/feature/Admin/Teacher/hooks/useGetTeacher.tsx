import { getTeachers } from "@/services/teacher.services";
import { useQuery } from "@tanstack/react-query";

export function useGetTeacher() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getTeachers(),
  });

  return { data, isLoading, isError };
}
