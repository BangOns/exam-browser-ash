import { getTeacherById } from "@/services/teacher.services";
import { useQuery } from "@tanstack/react-query";

export function useGetTeacherById(teacherId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId, // Hanya jalankan query jika teacherId tersedia
  });

  return { data, isLoading, isError };
}
