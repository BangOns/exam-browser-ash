import { getStudentById } from "@/services/student.services";
import { useQuery } from "@tanstack/react-query";

export function useGetStudentById(studentId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudentById(studentId),
    enabled: !!studentId, // Hanya jalankan query jika studentId tersedia
  });

  return { data, isLoading, isError };
}
