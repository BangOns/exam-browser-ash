import { getStudents } from "@/services/student.services";
import { useQuery } from "@tanstack/react-query";

export function useGetStudents() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(),
  });

  return { data, isLoading, isError };
}
