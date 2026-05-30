import { useCallback, useEffect, useMemo, useState } from "react";
import { StudentRequest, StudentRequestEdit } from "@/types/student";
import { StudentColumns } from "../components/StudentColumns";
import { useGetStudents } from "./useGetStudents";
import { usePostStudent } from "./mutations/usePostStudent";
import { useGetClass } from "@/hooks/class/get-class";
import { useEditStudent } from "./mutations/useEditStudent";
import { useDeleteStudent } from "./mutations/useDeleteStudent";
import { useGetStudentById } from "./useGetStudentById";
const EMPTY_STUDENT: StudentRequest = {
  full_name: "",
  username: "",
  password: "",
  nisn: "",
  class_id: "",
};
export function useStudentManagement() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading: isLoadingStudents } = useGetStudents({ page });
  const { data: classData } = useGetClass();
  const { mutateAsync } = usePostStudent();
  const { mutateAsync: mutateEditStudent } = useEditStudent();
  const { mutateAsync: mutateDeleteStudent } = useDeleteStudent();
  const [studentId, setStudentId] = useState<string>("");
  const { data: studentDataById } = useGetStudentById(studentId || "");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StudentRequest | null>(null);
  const [editingId, setEditingId] = useState<StudentRequestEdit | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditing({ ...EMPTY_STUDENT });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editing) return;
    mutateAsync(editing);
    setModalOpen(false);
    setEditing(null);
  };
  const handleSaveEdit = () => {
    if (!editingId) return;
    mutateEditStudent(editingId);
    setModalOpen(false);
    setEditingId(null);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  }; //fungsi untuk mengubah halaman

  const openEdit = useCallback((id: string) => {
    setStudentId(id);
    setModalOpen(true);
  }, []);
  const handleDelete = useCallback(
    (id: string) => {
      if (!id) return;
      mutateDeleteStudent({ id });
    },
    [mutateDeleteStudent],
  );
  const columns = useMemo(
    () =>
      StudentColumns(deleteConfirm, setDeleteConfirm, handleDelete, openEdit),
    [deleteConfirm, setDeleteConfirm, handleDelete, openEdit],
  );
  useEffect(() => {
    if (!studentDataById) return;

    const { data } = studentDataById;

    setEditingId({
      id: data.id,
      full_name: data.name,
      username: data.username.toLowerCase(),
      password: "",
      nisn: data.nisn,
      class_id: data.class.id,
    });
  }, [studentDataById]);
  return {
    students: data?.data || [],
    pagination: data?.meta.pagination,
    studentId,
    isLoadingStudents,
    editingId,
    setEditingId,
    classStudent: classData?.data || [],
    modalOpen,
    editing,
    deleteConfirm,
    setModalOpen,
    setEditing,
    setDeleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleSaveEdit,
    handleDelete,
    handlePageChange,
    columns,
  };
}
