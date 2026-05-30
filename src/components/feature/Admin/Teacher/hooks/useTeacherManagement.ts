import { useState, useMemo, useCallback, useEffect } from "react";
import { TeacherRequest, TeacherRequestEdit } from "@/types/teacher";
import { columnsTableTeacher } from "@/components/feature/Admin/Teacher/components/TeacherColumns";
import { useGetTeacher } from "./useGetTeacher";
import { useGetClass } from "@/hooks/class/get-class";
import { useGetSubject } from "@/hooks/subject/get-subject";
import { usePostTeacher } from "./mutations/usePostTeacher";
import { useGetTeacherById } from "./useGetTeacherById";
import { useEditTeacher } from "./mutations/useEditTeacher";
import { useDeleteTeacher } from "./mutations/useDeleteTeacher";
import { EMPTY_TEACHER } from "../constants";

export function useTeacherManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading: isLoadingTeachers } = useGetTeacher({ page });
  const { data: classData } = useGetClass();
  const { data: subjectData } = useGetSubject();
  const { mutateAsync } = usePostTeacher();
  const { mutateAsync: mutateEditTeacher } = useEditTeacher();
  const { mutateAsync: mutateDeleteTeacher } = useDeleteTeacher();
  const [teacherId, setTeacherId] = useState<string>("");
  const { data: teacherDataById } = useGetTeacherById(teacherId || "");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenClass, setModalOpenClass] = useState(false);
  const [modalOpenLesson, setModalOpenLesson] = useState(false);
  const [editing, setEditing] = useState<TeacherRequest | null>(null);
  const [editingId, setEditingId] = useState<TeacherRequestEdit | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditing({ ...EMPTY_TEACHER });
    setModalOpen(true);
  }; //fungsi untuk membuka modal tambah teacher
  const handleSave = () => {
    if (!editing) return;
    mutateAsync(editing);
    setModalOpen(false);
    setEditing(null);
  }; //fungsi untuk menyimpan teacher baru
  const handleSaveEdit = () => {
    if (!editingId) return;
    mutateEditTeacher(editingId);
    setModalOpen(false);
    setEditingId(null);
  }; //fungsi untuk menyimpan perubahan teacher
  const handlePageChange = (page: number) => {
    setPage(page);
  }; //fungsi untuk mengubah halaman
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditing(null);
  }; //fungsi untuk menutup modal

  const handleDelete = useCallback(
    (id: string) => {
      if (!id) return;
      mutateDeleteTeacher({ id });
    },
    [mutateDeleteTeacher],
  ); //fungsi untuk menghapus teacher
  const openEdit = useCallback((id: string) => {
    setTeacherId(id);
    setModalOpen(true);
  }, []); //fungsi untuk membuka modal edit teacher
  const columns = useMemo(
    () =>
      columnsTableTeacher(
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
        openEdit,
      ),
    [deleteConfirm, setDeleteConfirm, handleDelete, openEdit],
  ); //fungsi untuk menampilkan kolom tabel teacher

  useEffect(() => {
    if (!teacherDataById) return;

    const { data } = teacherDataById;

    setEditingId({
      id: data.id,
      full_name: data.name,
      username: data.username.toLowerCase(),
      password: "",
      nip: data.nip,
      lessons: data.teaching_assignments.map((ta) => ({
        class_id: ta.class_id,
        subject_id: ta.subject_id,
      })),
    });
  }, [teacherDataById]); //fungsi untuk mengupdate editingId

  return {
    teachers: data?.data ?? [],
    pagination: data?.meta.pagination,
    isLoadingTeachers,
    classTeacher: classData?.data ?? [],
    subjectTeacher: subjectData?.data ?? [],
    modalOpen,
    modalOpenClass,
    setModalOpenClass,
    modalOpenLesson,
    setModalOpenLesson,
    editing,
    editingId,
    deleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleSaveEdit,
    handleDelete,
    handleCloseModal, // ✅ export yang baru
    handlePageChange,
    columns,
    setModalOpen,
    setEditing,
    setDeleteConfirm,
    setEditingId,
  };
}
