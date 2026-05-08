import { useCallback, useEffect, useMemo, useState } from "react";
import {
  QuestionList,
  QuestionRequest,
  QuestionRequestEdit,
} from "@/types/question";
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
  const { data } = useGetQuestion();
  const { data: dataLesson } = useGetLesson();
  const { mutateAsync: mutatePostQuestion } = usePostQuestion();
  const { mutateAsync: mutateEditQuestion } = useEditQuestion();
  const { mutateAsync: mutateDeleteQuestion } = useDeleteQuestion();
  const [questionId, setQuestionId] = useState<string | null>(null);
  const { data: dataQuestionById } = useGetQuestionById(questionId || "");
  const [questions, setQuestions] = useState<QuestionList[]>(data?.data || []);
  const [lessons, setLessons] = useState(dataLesson?.data || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<QuestionRequest | null>(null);
  const [editingQuestionId, setEditingQuestionId] =
    useState<QuestionRequestEdit | null>(null);
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      questions.filter((q) => {
        if (activeSubject !== "All" && q.lesson.subject !== activeSubject)
          return false;
        if (activeType !== "All" && q.type !== activeType) return false;
        return true;
      }),
    [questions, activeSubject, activeType],
  );

  const openAdd = useCallback(() => {
    setEditingQuestion({ ...EMPTY_QUESTION });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((id: string) => {
    setQuestionId(id);

    setModalOpen(true);
  }, []);

  const handleSave = () => {
    if (!editingQuestion) return;
    const data = {
      ...editingQuestion,
      options:
        editingQuestion.type === "Essay" ? undefined : editingQuestion.options,
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
  const handleDelete = useCallback(
    (id: string) => {
      if (!id) return;
      mutateDeleteQuestion({ id });
    },
    [mutateDeleteQuestion],
  );

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
  useEffect(() => {
    if (data?.data) {
      setQuestions(data?.data);
    }
  }, [data]);
  useEffect(() => {
    if (dataLesson?.data) {
      setLessons(dataLesson?.data);
    }
  }, [dataLesson]);
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
    questions,
    questionId,
    setQuestions,
    lessons,
    setLessons,
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
    filtered,
    openAdd,
    handleSave,
    handleSaveEdit,
    mcCount,
    essayCount,
    columns,
  };
}
