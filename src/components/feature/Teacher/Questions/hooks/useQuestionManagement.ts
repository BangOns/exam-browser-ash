import { useCallback, useMemo, useState } from "react";
import { Question } from "@/types/question";
import { initialQuestions as bankQuestions } from "@/data/dummy/questions";
import { emptyQuestion } from "@/components/feature/Teacher/Questions/constants";
import { columnsQuestions } from "../components/QuestionColumns";
import { useGetQuestion } from "./useGetQuestion";
import { useGetLesson } from "@/hooks/lesson/useGetLesson";

export default function useQuestionManagement() {
  const { data } = useGetQuestion();
  const { data: dataLesson } = useGetLesson();

  const [questions, setQuestions] = useState<Question[]>(bankQuestions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      questions.filter((q) => {
        if (activeSubject !== "All" && q.subject !== activeSubject)
          return false;
        if (activeType !== "All" && q.type !== activeType) return false;
        return true;
      }),
    [questions, activeSubject, activeType],
  );

  const openAdd = useCallback(() => {
    setEditingQuestion({ ...emptyQuestion, id: Date.now() });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((q: Question) => {
    setEditingQuestion({
      ...q,
      options: q.options ? q.options.map((o) => ({ ...o })) : undefined,
    });
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editingQuestion) return;
    setQuestions((prev) => {
      const exists = prev.find((q) => q.id === editingQuestion.id);
      if (exists)
        return prev.map((q) =>
          q.id === editingQuestion.id ? editingQuestion : q,
        );
      return [...prev, editingQuestion];
    });
    setModalOpen(false);
    setEditingQuestion(null);
  }, [editingQuestion]);

  const handleDelete = useCallback((id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setDeleteConfirm(null);
  }, []);

  const mcCount = useMemo(
    () => questions.filter((q) => q.type === "Multiple Choice").length,
    [questions],
  );
  const essayCount = useMemo(
    () => questions.filter((q) => q.type === "Essay").length,
    [questions],
  );
  const columns = useMemo(() => {
    return columnsQuestions(
      openEdit,
      deleteConfirm,
      setDeleteConfirm,
      handleDelete,
    );
  }, [openEdit, deleteConfirm, setDeleteConfirm, handleDelete]);
  return {
    questions,
    setQuestions,
    modalOpen,
    setModalOpen,
    editingQuestion,
    setEditingQuestion,
    activeSubject,
    setActiveSubject,
    activeType,
    setActiveType,
    filtered,
    openAdd,
    handleSave,
    mcCount,
    essayCount,
    columns,
  };
}
