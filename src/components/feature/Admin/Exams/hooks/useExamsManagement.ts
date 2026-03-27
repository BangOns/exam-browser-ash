import { useState, useMemo, useCallback } from "react";
import { ExamRow } from "@/types/exam";
import { initialExams } from "@/data/dummy/exams";
import { defaultSubjectTimers } from "@/components/feature/Admin/Exams/constants";
import { columnsTableExams } from "@/components/feature/Admin/Exams/components/ExamColumns";
import { emptyExam } from "@/components/feature/Admin/Exams/constants";
export function useExamsManagement() {
  const [exams, setExams] = useState<ExamRow[]>(initialExams);
  const [subjectTimers, setSubjectTimers] =
    useState<Record<string, string>>(defaultSubjectTimers);
  const [modalOpen, setModalOpen] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamRow | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    return activeTab === "All"
      ? exams
      : exams.filter((e) => e.status === activeTab);
  }, [activeTab, exams]);

  const generateToken = useCallback(
    (id: number) => {
      const randomToken = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      setExams((prev) =>
        prev.map((e) => (e.id === id ? { ...e, token: randomToken } : e)),
      );

      // Save to localStorage for mock cross-client verification
      if (typeof window !== "undefined") {
        localStorage.setItem(`exam_token_${id}`, randomToken);
      }
    },
    [setExams],
  );

  const openAdd = () => {
    setEditingExam({
      ...emptyExam,
      id: Date.now(),
      created: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setModalOpen(true);
  };

  const openEdit = useCallback(
    (exam: ExamRow) => {
      setEditingExam({ ...exam });
      setModalOpen(true);
    },
    [setEditingExam, setModalOpen],
  );

  const handleSave = () => {
    if (!editingExam) return;
    setExams((prev) => {
      const exists = prev.find((e) => e.id === editingExam.id);
      if (exists)
        return prev.map((e) => (e.id === editingExam.id ? editingExam : e));
      return [...prev, editingExam];
    });
    setModalOpen(false);
    setEditingExam(null);
  };

  const handleDelete = useCallback(
    (id: number) => {
      setExams((prev) => prev.filter((e) => e.id !== id));
      setDeleteConfirm(null);
    },
    [setExams, setDeleteConfirm],
  );

  const columns = useMemo(
    () =>
      columnsTableExams(
        subjectTimers,
        generateToken,
        openEdit,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
      ),
    [subjectTimers, generateToken, openEdit, deleteConfirm, handleDelete],
  );
  return {
    exams,
    subjectTimers,
    modalOpen,
    timerModalOpen,
    editingExam,
    deleteConfirm,
    activeTab,
    filtered,
    generateToken,
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    columns,
    setModalOpen,
    setTimerModalOpen,
    setEditingExam,
    setDeleteConfirm,
    setActiveTab,
    setSubjectTimers,
  };
}
