import { useState, useMemo, useCallback, useEffect } from "react";
import { ExamList, ExamRow } from "@/types/exam";
import { columnsTableExams } from "@/components/feature/Admin/Exams/components/ExamColumns";
import { useGetExam } from "@/components/feature/Teacher/Exams/hooks/useGetExam";
import { useGenerateToken } from "./mutations/useGenerateToken";
import { useDeleteExam } from "@/components/feature/Teacher/Exams/hooks/mutation/useDeleteExam";
export function useExamsManagement() {
  const { data } = useGetExam({ status: "active" });
  const { mutateAsync } = useGenerateToken();
  const { mutateAsync: deleteExam } = useDeleteExam();
  const [exams, setExams] = useState<ExamList[]>([]);
  // const [subjectTimers, setSubjectTimers] =
  //   useState<Record<string, string>>(defaultSubjectTimers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamRow | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    return exams.filter((e) => e.status === "active");
  }, [exams]);

  const generateToken = useCallback(
    (id: string) => {
      mutateAsync(id);
    },
    [mutateAsync],
  );
  const handleDelete = useCallback(
    (id: string) => {
      deleteExam({ id });
    },
    [deleteExam],
  );

  useEffect(() => {
    if (data?.data) {
      setExams(data?.data);
    }
  }, [data]);
  const columns = useMemo(
    () =>
      columnsTableExams(
        generateToken,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
      ),
    [generateToken, deleteConfirm, setDeleteConfirm, handleDelete],
  );
  return {
    exams,
    modalOpen,
    editingExam,
    deleteConfirm,
    activeTab,
    filtered,
    generateToken,

    columns,
    setModalOpen,
    setEditingExam,
    setDeleteConfirm,
    setActiveTab,
  };
}
