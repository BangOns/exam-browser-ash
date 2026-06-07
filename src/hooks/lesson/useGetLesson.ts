import { getLesson } from "@/services/lesson.services";
import { useQuery } from "@tanstack/react-query";

export function useGetLesson({ enabled = true }: { enabled?: boolean } = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["class"],
    queryFn: () => getLesson(),
    refetchOnWindowFocus: false,
    enabled,
  });

  return { data, isLoading, isError };
}
