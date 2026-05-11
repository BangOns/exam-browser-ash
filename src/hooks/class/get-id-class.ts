import { getClassDetail } from "@/services/class.services";
import { useQuery } from "@tanstack/react-query";

export function useGetClassById(classId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["class", classId],
    queryFn: () => getClassDetail(classId),
    enabled: !!classId,
  });

  return { data, isLoading, isError };
}
