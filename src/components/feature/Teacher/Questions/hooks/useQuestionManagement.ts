import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionRequest, QuestionRequestEdit } from "@/types/question";
// import { initialQuestions as bankQuestions } from "@/data/dummy/questions";
import { EMPTY_QUESTION } from "@/components/feature/Teacher/Questions/constants";
import { columnsQuestions } from "../components/QuestionColumns";
import { useGetQuestion } from "./useGetQuestion";
import { useGetLesson } from "@/hooks/lesson/useGetLesson";
import { usePostQuestion } from "./mutations/usePostQuestion";
import { useEditQuestion } from "./mutations/useEditQuestion";
import { useGetQuestionById } from "./useGetQuesionById";
import { useDeleteQuestion } from "./mutations/useDeleteQuestion";

export default function useQuestionManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading: isLoadingQuestion } = useGetQuestion({ page });
  const { data: dataLesson } = useGetLesson();
  const { mutateAsync: mutatePostQuestion } = usePostQuestion();
  const { mutateAsync: mutateEditQuestion } = useEditQuestion();
  const {
    mutateAsync: mutateDeleteQuestion,
    isPending: isLoadingDeleteQuestion,
  } = useDeleteQuestion();
  const [questionId, setQuestionId] = useState<string | null>(null);
  const { data: dataQuestionById } = useGetQuestionById(questionId || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<QuestionRequest | null>(null);
  const [editingQuestionId, setEditingQuestionId] =
    useState<QuestionRequestEdit | null>(null);
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditingQuestion({ ...EMPTY_QUESTION });
    setModalOpen(true);
  };
  const handleSave = () => {
    if (!editingQuestion) return;
    const data: QuestionRequest = {
      ...editingQuestion,
      options:
        editingQuestion.type === "Essay" ? undefined : editingQuestion.options,
      max_points: Number(editingQuestion.max_points) || 10,
    };
    mutatePostQuestion(data);
    setModalOpen(false);
    setEditingQuestion(null);
  };
  const handleSaveEdit = () => {
    if (!editingQuestionId) return;
    const data = {
      ...editingQuestionId,
      options:
        editingQuestionId.type === "Essay"
          ? undefined
          : editingQuestionId.options,
    };

    mutateEditQuestion(data);
    setModalOpen(false);
    setEditingQuestionId(null);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const openEdit = useCallback((id: string) => {
    setQuestionId(id);
    setModalOpen(true);
  }, []);
  const handleDelete = useCallback(
    (id: string) => {
      if (!id) return;
      mutateDeleteQuestion({ id });
    },
    [mutateDeleteQuestion],
  );

  const mcCount = useMemo(
    () => data?.data.filter((q) => q.type === "Multiple Choice").length,
    [data?.data],
  );
  const essayCount = useMemo(
    () => data?.data.filter((q) => q.type === "Essay").length,
    [data?.data],
  );
  const columns = useMemo(() => {
    return columnsQuestions(
      openEdit,
      deleteConfirm,
      setDeleteConfirm,
      handleDelete,
      isLoadingDeleteQuestion,
    );
  }, [
    openEdit,
    deleteConfirm,
    setDeleteConfirm,
    handleDelete,
    isLoadingDeleteQuestion,
  ]);

  useEffect(() => {
    if (!dataQuestionById) return;
    const { data } = dataQuestionById;
    setEditingQuestionId({
      id: data.id,
      question: data.question,
      lesson_id: data.lesson.id,
      type: data.type,
      options: data.options || [],
      correct_answer: data.correct_answer || "",
      rubric: data.rubric || "",
      max_points: data.max_points || 0,
    });
  }, [dataQuestionById]);
  return {
    questions: data?.data || [],
    lessons: dataLesson?.data || [],
    pagination: data?.meta.pagination,
    isLoadingQuestion,
    isLoadingDeleteQuestion,
    questionId,
    modalOpen,
    setModalOpen,
    editingQuestion,
    setEditingQuestion,
    editingQuestionId,
    setEditingQuestionId,
    activeSubject,
    setActiveSubject,
    activeType,
    setActiveType,
    openAdd,
    handleSave,
    handleSaveEdit,
    handlePageChange,
    mcCount,
    essayCount,
    columns,
  };
}
