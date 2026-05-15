import { useCallback, useEffect, useMemo, useState } from "react";
import { emptySchedule } from "../constant";
import { ScheduleColumns } from "../components/ScheduleColumns";
import { useGetExamSchedule } from "./useGetExamSchedule";
import { useGetExam } from "@/components/feature/Teacher/Exams/hooks/useGetExam";
import { usePostExamShedule } from "./mutations/usePostTeacher";
import { useEditExamSchedule } from "./mutations/useEditExamSchedule";
import { useDeleteExamSchedule } from "./mutations/useDeleteExamSchedule";
import { ExamList } from "@/types/exam";
import {
  ExamSchedule,
  ExamScheduleRequest,
  ExamScheduleRequestEdit,
} from "@/types/exam-schedule";
import { useGetExamScheduleById } from "./useGetExamScheduleById";
import { getDuration } from "@/utils/FormatDate";

export function useScheduleManagement() {
  const { data, isLoading: isLoadingSchedules } = useGetExamSchedule();
  const { data: dataExam } = useGetExam();
  const { mutateAsync: mutatePostExamSchedule } = usePostExamShedule();
  const { mutateAsync: mutateEditExamSchedule } = useEditExamSchedule();
  const { mutateAsync: mutateDeleteExamSchedule } = useDeleteExamSchedule();
  const [scheduleId, setScheduleId] = useState<string>("");
  const { data: dataExamScheduleById } = useGetExamScheduleById(scheduleId);
  const [schedules, setSchedules] = useState<ExamSchedule[]>(data?.data || []);

  const [exam, setExam] = useState<ExamList[]>(dataExam?.data || []);
  const [modalOpen, setModalOpen] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ExamScheduleRequest | null>(null);
  const [editingById, setEditingById] =
    useState<ExamScheduleRequestEdit | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");

  const openAdd = useCallback(() => {
    setEditing({ ...emptySchedule });
    setModalOpen("add");
  }, []);

  const openEdit = useCallback((id: string) => {
    setScheduleId(id);
    setModalOpen("edit");
  }, []);

  const handleSave = () => {
    const data: ExamScheduleRequest = {
      exam_id: editing?.exam_id || "",
      exam_date: editing?.exam_date || "",
      start_time: editing?.start_time.slice(0, 5) || "",
      end_time: editing?.end_time.slice(0, 5) || "",
      duration: getDuration(
        editing?.start_time || "",
        editing?.end_time || "",
      ) as number,
    };

    mutatePostExamSchedule(data);
    setModalOpen(null);
  };
  const handleSaveEdit = () => {
    const data: ExamScheduleRequestEdit = {
      id: editingById?.id || "",
      exam_id: editingById?.exam_id || "",
      exam_date: editingById?.exam_date || "",
      start_time: editingById?.start_time.slice(0, 5) || "",
      end_time: editingById?.end_time.slice(0, 5) || "",
      duration: getDuration(
        editingById?.start_time || "",
        editingById?.end_time || "",
      ) as number,
    };

    mutateEditExamSchedule(data);
    setModalOpen(null);
  };

  const handleDelete = useCallback((id: string) => {
    mutateDeleteExamSchedule({ id });
    setDeleteConfirm("");
  }, []);

  useEffect(() => {
    if (data?.data) {
      setSchedules(data?.data || []);
    }
  }, [data]);
  useEffect(() => {
    if (dataExam?.data) {
      setExam(dataExam?.data || []);
    }
  }, [dataExam]);
  useEffect(() => {
    if (!dataExamScheduleById) return;
    const { data } = dataExamScheduleById;
    setEditingById({
      duration: data.duration,
      end_time: data.end_time,
      exam_date: data.exam_date,
      start_time: data.start_time,
      exam_id: data.exam.id,
      id: data.id,
    });
  }, [dataExamScheduleById]);

  const columns = useMemo(
    () =>
      ScheduleColumns({
        openEdit,
        deleteConfirm,
        handleDelete,
        setDeleteConfirm,
      }),

    [openEdit, deleteConfirm, handleDelete, setDeleteConfirm],
  );

  return {
    schedules,
    isLoadingSchedules,
    modalOpen,
    exam,
    editingById,
    setEditingById,
    setModalOpen,
    editing,
    setEditing,
    deleteConfirm,
    setDeleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleSaveEdit,
    handleDelete,
    columns,
  };
}
