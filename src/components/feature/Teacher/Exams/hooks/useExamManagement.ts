import { ExamRow as Exam, ExamList, ExamRequest } from "@/types/exam";
import { useCallback, useEffect, useMemo, useState } from "react";
import { columnsExamTeacher } from "../components/ExamColumns";
import { useGetExam } from "./useGetExam";
import { useGetLesson } from "@/hooks/lesson/useGetLesson";
import { usePostExam } from "./mutation/usePostExam";
import { useEditExam } from "./mutation/useEditExam";
import { useDeleteExam } from "./mutation/useDeleteExam";
const EMPTY_EXAM: ExamRequest = {
  name: "",
  lesson_id: "",
  status: "draft",
};
export function useExamTeacherManagement() {
  const { data } = useGetExam();
  const { data: dataLesson } = useGetLesson();
  // const teacherSubject = useMemo(() => {
  //   return getCurrentUser()?.subject ?? "Mathematics";
  // }, []);
  const { mutateAsync: mutatePostExam } = usePostExam();
  const { mutateAsync: mutateEditExam } = useEditExam();
  const { mutateAsync: mutateDeleteExam } = useDeleteExam();
  const [examId, setExamId] = useState<string>("");
  const [exams, setExams] = useState<ExamList[]>([]);
  const [lessons, setLessons] = useState(dataLesson?.data || []);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamRequest | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Question Picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerExam, setPickerExam] = useState<string | null>(null);

  // const filtered = useMemo(() => {
  //   return activeTab === "All"
  //     ? exams
  //     : exams.filter((e) => e.status === activeTab);
  // }, [activeTab, exams]);

  const openAdd = useCallback(() => {
    setEditingExam({ ...EMPTY_EXAM });
    setModalOpen(true);
  }, []);
  const openEdit = useCallback((id: string) => {
    setExamId(id);

    setModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editingExam) return;

    mutatePostExam(editingExam as ExamRequest);

    setEditingExam(null);
  }, [editingExam, mutatePostExam]);

  const handleDelete = useCallback(
    (id: string) => {
      mutateDeleteExam({ id });
      setDeleteConfirm(null);
    },
    [mutateDeleteExam],
  );

  const openPicker = useCallback((exam: string) => {
    setPickerExam(exam);
    setPickerOpen(true);
  }, []);

  const handlePickerSave = useCallback(
    (ids: number[]) => {
      if (!pickerExam) return;
      // setExams((prev) =>
      //   prev.map((e) =>
      //     e.id === pickerExam.id
      //       ? { ...e, questionIds: ids, questions: ids.length }
      //       : e,
      //   ),
      // );
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
  useEffect(() => {
    if (data?.data) {
      setExams(data?.data);
    }
  }, [data]);
  useEffect(() => {
    if (dataLesson?.data) {
      setLessons(dataLesson?.data);
    }
  }, [dataLesson]);
  return {
    exams,
    lessons,
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
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    openPicker,
    handlePickerSave,
    columns,
  };
}
