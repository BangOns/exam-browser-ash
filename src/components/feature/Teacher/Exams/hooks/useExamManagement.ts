import { buildInitialExams } from "@/data/dummy/exams";
import { getCurrentUser } from "@/lib/auth";
import { ExamRow as Exam } from "@/types/exam";
import { useCallback, useMemo, useState } from "react";
import { emptyExam } from "../constants";
import { columnsExamTeacher } from "../components/ExamColumns";
export function useExamTeacherManagement() {
  const teacherSubject = useMemo(() => {
    return getCurrentUser()?.subject ?? "Mathematics";
  }, []);

  const [exams, setExams] = useState<Exam[]>(() =>
    buildInitialExams(teacherSubject),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Question Picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerExam, setPickerExam] = useState<Exam | null>(null);

  const filtered = useMemo(() => {
    return activeTab === "All"
      ? exams
      : exams.filter((e) => e.status === activeTab);
  }, [activeTab, exams]);

  const openAdd = useCallback(() => {
    setEditingExam({ ...emptyExam(teacherSubject), id: Date.now() });
    setModalOpen(true);
  }, [teacherSubject]);

  const openEdit = useCallback((exam: Exam) => {
    setEditingExam({ ...exam });
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editingExam) return;
    setExams((prev) => {
      const exists = prev.find((e) => e.id === editingExam.id);
      if (exists)
        return prev.map((e) => (e.id === editingExam.id ? editingExam : e));
      return [...prev, editingExam];
    });
    setModalOpen(false);
    setEditingExam(null);
  }, [editingExam]);

  const handleDelete = useCallback((id: number) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  }, []);

  const openPicker = useCallback((exam: Exam) => {
    setPickerExam(exam);
    setPickerOpen(true);
  }, []);

  const handlePickerSave = useCallback(
    (ids: number[]) => {
      if (!pickerExam) return;
      setExams((prev) =>
        prev.map((e) =>
          e.id === pickerExam.id
            ? { ...e, questionIds: ids, questions: ids.length }
            : e,
        ),
      );
      setPickerExam(null);
    },
    [pickerExam],
  );
  const columns = useMemo(() => {
    return columnsExamTeacher({
      openPicker,
      openEdit,
      deleteConfirm,
      handleDelete,
      setDeleteConfirm,
    });
  }, [openEdit, openPicker, deleteConfirm, setDeleteConfirm, handleDelete]);
  return {
    exams,
    setExams,
    modalOpen,
    setModalOpen,
    editingExam,
    setEditingExam,
    activeTab,
    setActiveTab,
    deleteConfirm,
    setDeleteConfirm,
    pickerOpen,
    setPickerOpen,
    pickerExam,
    setPickerExam,
    filtered,
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    openPicker,
    handlePickerSave,
    columns,
  };
}
