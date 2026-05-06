import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Student,
  StudentList,
  StudentRequest,
  StudentRequestEdit,
} from "@/types/student";
import { initialStudents } from "@/data/dummy/student";
import { emptyStudent } from "../constant";
import { StudentColumns } from "../components/StudentColumns";
import { useGetStudents } from "./useGetStudents";
import { usePostStudent } from "./mutations/usePostStudent";
import { useGetClass } from "@/hooks/class/get-class";
import { useEditStudent } from "./mutations/useEditStudent";
import { useDeleteStudent } from "./mutations/useDeleteStudent";
import { useGetStudentById } from "./useGetStudentById";
import { ClassList } from "@/types/class";
const EMPTY_STUDENT: StudentRequest = {
  full_name: "",
  username: "",
  password: "",
  nisn: "",
  class_id: "",
};
export function useStudentManagement() {
  const { data, isLoading: isLoadingStudents } = useGetStudents();
  const { data: classData } = useGetClass();
  const { mutateAsync } = usePostStudent();
  const { mutateAsync: mutateEditStudent } = useEditStudent();
  const { mutateAsync: mutateDeleteStudent } = useDeleteStudent();
  const [studentId, setStudentId] = useState<string>("");
  const { data: studentDataById } = useGetStudentById(studentId || "");
  const [students, setStudents] = useState<StudentList[]>(data?.data || []);
  const [classStudent, setClassStudent] = useState<ClassList[]>(
    classData?.data || [],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StudentRequest | null>(null);
  const [editingId, setEditingId] = useState<StudentRequestEdit | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = useCallback(() => {
    setEditing({ ...EMPTY_STUDENT });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((id: string) => {
    setStudentId(id);
    setModalOpen(true);
  }, []);

  const handleSave = () => {
    if (!editing) return;
    mutateAsync(editing);
    setModalOpen(false);
    setEditing(null);
  };

  // const handleRestore = useCallback((id: number) => {
  //   setStudents((prev) =>
  //     prev.map((s) => (s.id === id ? { ...s, status: "Active" } : s)),
  //   );
  //   localStorage.removeItem(`suspended_user_${id}`);
  // }, []);
  const handleSaveEdit = () => {
    if (!editingId) return;
    mutateEditStudent(editingId);
    setModalOpen(false);
    setEditingId(null);
  };
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
    if (data?.data.length) {
      setStudents(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (classData?.data.length) {
      setClassStudent(classData.data);
    }
  }, [classData]);

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
    students,
    studentId,
    isLoadingStudents,
    editingId,
    setEditingId,
    classStudent,
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
    columns,
  };
}
