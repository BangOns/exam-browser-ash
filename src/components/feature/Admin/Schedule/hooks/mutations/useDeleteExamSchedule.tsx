import { deleteExamSchedule } from "@/services/schedule.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteExamSchedule() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: (data: { id: string }) => deleteExamSchedule(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Exam schedule deleted successfully");
    },
    onError: (response) => {
      toast.error(response.message || "Gagal menghapus Jadwal Ujian");
    },
  }); // ✅ tutup useMutation dengan });

  return { mutateAsync, mutate };
}
