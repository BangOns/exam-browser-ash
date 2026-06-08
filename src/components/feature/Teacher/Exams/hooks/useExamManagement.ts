import { ExamRequest, ExamRequestEdit } from "@/types/exam";
import { useCallback, useEffect, useMemo, useState } from "react";
import { columnsExamTeacher } from "../components/ExamColumns";
import { useGetLesson } from "@/hooks/lesson/useGetLesson";
import { usePostExam } from "./mutation/usePostExam";
import { useEditExam } from "./mutation/useEditExam";
import { useDeleteExam } from "./mutation/useDeleteExam";
import { useGetExamById } from "./uesGetExamById";
import { useGetQuestion } from "../../Questions/hooks/useGetQuestion";
import { useGetExamByIdTeacher } from "@/hooks/exam/get-exam-teacher-id";
const EMPTY_EXAM: ExamRequest = {
  name: "",
  lesson_id: "",
  status: "draft",
};
export function useExamTeacherManagement() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading: isLoadingExam } = useGetExamByIdTeacher({ page });
  const { data: dataLesson } = useGetLesson();
  const { data: dataQuestion } = useGetQuestion();

  const { mutateAsync: mutatePostExam } = usePostExam();
  const { mutateAsync: mutateEditExam } = useEditExam();
  const { mutateAsync: mutateDeleteExam } = useDeleteExam();
  const [examId, setExamId] = useState<string>("");
  const { data: dataExamById } = useGetExamById({ examId: examId || "" });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamRequest | null>(null);
  const [editingExamId, setEditingExamId] = useState<ExamRequestEdit | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");

  // Question Picker state

  const [pickerExam, setPickerExam] = useState<string[]>([]);
  const [modalType, setModalType] = useState<"edit" | "picker" | null>(null);

  const openAdd = () => {
    setEditingExam({ ...EMPTY_EXAM });
    setModalOpen(true);
  };
  const handleSave = () => {
    if (!editingExam) return;
    const data = {
      ...editingExam,
      status: "draft",
    };
    mutatePostExam(data as ExamRequest);
    setEditingExam(null);
  };
  const handleSaveEdit = () => {
    if (!editingExamId) return;
    const data = {
      ...editingExamId,
      status: "draft",
    };
    mutateEditExam(data as ExamRequestEdit);

    setEditingExamId(null);
    setExamId("");
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const openEdit = useCallback((id: string) => {
    setExamId(id);
    setModalType("edit");
    setModalOpen(true);
  }, []);
  const openPickerQuestion = useCallback((id: string) => {
    setExamId(id);
    setModalType("picker");

    setModalOpen(true);
  }, []);
  const handleDelete = useCallback(
    (id: string) => {
      mutateDeleteExam({ id });
      setDeleteConfirm("");
    },
    [mutateDeleteExam],
  );
  const handlePickerSave = useCallback(
    (ids: string[]) => {
      if (!pickerExam || !editingExamId) return;

      mutateEditExam({
        ...editingExamId,
        questions: ids,
      } as ExamRequestEdit);

      setPickerExam([]);
    },
    [editingExamId, pickerExam, mutateEditExam],
  );

  const columns = useMemo(() => {
    return columnsExamTeacher({
      openPicker: openPickerQuestion,
      openEdit,
      deleteConfirm,
      handleDelete,
      setDeleteConfirm,
    });
  }, [
    openEdit,
    openPickerQuestion,
    deleteConfirm,
    setDeleteConfirm,
    handleDelete,
  ]);

  useEffect(() => {
    if (!dataExamById) return;
    const { data } = dataExamById;
    setEditingExamId({
      id: data.id,
      name: data.name,
      lesson_id: data.lesson.id,
      status: data.status.toLowerCase() as
        | "active"
        | "scheduled"
        | "draft"
        | "completed",
    });
  }, [dataExamById]);
  return {
    exams: data?.data || [],
    isLoadingExam,
    dataExamById,
    examId,
    lessons: dataLesson?.data || [],
    questions: dataQuestion?.data || [],
    modalOpen,
    setModalOpen,
    editingExam,
    setEditingExam,
    editingExamId,
    setEditingExamId,
    activeTab,
    setActiveTab,
    deleteConfirm,
    setDeleteConfirm,
    modalType,
    pickerExam,
    setPickerExam,
    openPickerQuestion,
    openAdd,
    openEdit,
    handleSave,
    handleSaveEdit,
    handleDelete,
    handlePickerSave,
    handlePageChange,
    columns,
    pagination: data?.meta.pagination,
  };
}
