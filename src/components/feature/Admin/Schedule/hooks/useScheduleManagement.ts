import { useCallback, useEffect, useMemo, useState } from "react";
import { emptySchedule } from "../constant";
import { ScheduleColumns } from "../components/ScheduleColumns";
import { useGetExamSchedule } from "./useGetExamSchedule";
import { usePostExamShedule } from "./mutations/usePostExamSchedule";
import { useEditExamSchedule } from "./mutations/useEditExamSchedule";
import { useDeleteExamSchedule } from "./mutations/useDeleteExamSchedule";
import {
  ExamScheduleRequest,
  ExamScheduleRequestEdit,
} from "@/types/exam-schedule";
import { useGetExamScheduleById } from "./useGetExamScheduleById";
import { getDuration } from "@/utils/FormatDate";
import { useGetExam } from "@/hooks/exam/get-exam";

export function useScheduleManagement() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading: isLoadingSchedules } = useGetExamSchedule({ page });
  const { data: dataExam } = useGetExam();
  const { mutateAsync: mutatePostExamSchedule } = usePostExamShedule();
  const { mutateAsync: mutateEditExamSchedule } = useEditExamSchedule();
  const { mutateAsync: mutateDeleteExamSchedule } = useDeleteExamSchedule();
  const [scheduleId, setScheduleId] = useState<string>("");
  const { data: dataExamScheduleById } = useGetExamScheduleById(scheduleId);

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
  const handleClose = () => {
    setModalOpen(null);
    setEditingById(null);
    setScheduleId("");
  };
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
  const handlePageChange = (page: number) => {
    setPage(page);
  }; //fungsi untuk mengubah halaman

  const handleDelete = useCallback(
    (id: string) => {
      mutateDeleteExamSchedule({ id });
      setDeleteConfirm("");
    },
    [mutateDeleteExamSchedule],
  );
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

  return {
    schedules: data?.data || [],
    isLoadingSchedules,
    modalOpen,
    exam: dataExam?.data || [],
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
    handleClose,
    handlePageChange,
    columns,
    pagination: data?.meta.pagination,
  };
}
