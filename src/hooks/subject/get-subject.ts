import { getSubject } from "@/services/subject.services";
import { useQuery } from "@tanstack/react-query";

export function useGetSubject() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubject(),
  });

  return { data, isLoading, isError };
}
