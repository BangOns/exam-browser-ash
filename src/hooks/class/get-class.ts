import { getClass } from "@/services/class.services";
import { useQuery } from "@tanstack/react-query";

export function useGetClass() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["class"],
    queryFn: () => getClass(),
  });

  return { data, isLoading, isError };
}
