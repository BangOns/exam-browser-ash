import { getLesson } from "@/services/lesson.services";
import { useQuery } from "@tanstack/react-query";

export function useGetLesson() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["class"],
    queryFn: () => getLesson(),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
