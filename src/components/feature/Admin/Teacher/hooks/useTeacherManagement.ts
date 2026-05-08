import { useState, useMemo, useCallback, useEffect } from "react";
import {
  TeacherList,
  TeacherRequest,
  TeacherRequestEdit,
} from "@/types/teacher";
import { columnsTableTeacher } from "@/components/feature/Admin/Teacher/components/TeacherColumns";
import { useGetTeacher } from "./useGetTeacher";
import { useGetClass } from "@/hooks/class/get-class";
import { useGetSubject } from "@/hooks/subject/get-subject";
import { ClassList } from "@/types/class";
import { SubjectList } from "@/types/subject";
import { usePostTeacher } from "./mutations/usePostTeacher";
import { useGetTeacherById } from "./useGetTeacherById";
import { useEditTeacher } from "./mutations/useEditTeacher";
import { useDeleteTeacher } from "./mutations/useDeleteTeacher";
import { EMPTY_TEACHER } from "../constants";

export function useTeacherManagement() {
  const { data, isLoading: isLoadingTeachers } = useGetTeacher();
  const { data: classData } = useGetClass();
  const { data: subjectData } = useGetSubject();
  const { mutateAsync } = usePostTeacher();
  const { mutateAsync: mutateEditTeacher } = useEditTeacher();
  const { mutateAsync: mutateDeleteTeacher } = useDeleteTeacher();
  const [teacherId, setTeacherId] = useState<string>("");
  const { data: teacherDataById } = useGetTeacherById(teacherId || "");

  const [teachers, setTeachers] = useState<TeacherList[]>(data?.data || []);
  const [classTeacher, setClassTeacher] = useState<ClassList[]>(
    classData?.data || [],
  );
  const [subjectTeacher, setSubjectTeacher] = useState<SubjectList[]>(
    subjectData?.data || [],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeacherRequest | null>(null);
  const [editingId, setEditingId] = useState<TeacherRequestEdit | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // ✅ openAdd: inisialisasi editing dengan object kosong
  const openAdd = useCallback(() => {
    setEditing({ ...EMPTY_TEACHER });
    setModalOpen(true);
  }, []);

  // ✅ openEdit: isi editing dengan data teacher yang dipilih
  const openEdit = useCallback((id: string) => {
    setTeacherId(id);

    setModalOpen(true);
  }, []);

  const handleSave = () => {
    if (!editing) return;
    mutateAsync(editing);
    setModalOpen(false);
    setEditing(null);
  };
  const handleSaveEdit = () => {
    if (!editingId) return;
    mutateEditTeacher(editingId);
    setModalOpen(false);
    setEditingId(null);
  };
  const handleDelete = useCallback(
    (id: string) => {
      if (!id) return;
      mutateDeleteTeacher({ id });
    },
    [mutateDeleteTeacher],
  );

  // ✅ tutup modal sambil reset editing
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditing(null);
  }, []);

  const columns = useMemo(
    () =>
      columnsTableTeacher(
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
        openEdit,
      ),
    [deleteConfirm, setDeleteConfirm, handleDelete, openEdit],
  );

  useEffect(() => {
    if (data?.data.length) {
      setTeachers(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (classData?.data.length) {
      setClassTeacher(classData.data);
    }
  }, [classData]);

  useEffect(() => {
    if (subjectData?.data.length) {
      setSubjectTeacher(subjectData.data);
    }
  }, [subjectData]);

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
  }, [teacherDataById]);
  return {
    teachers,
    isLoadingTeachers,
    classTeacher,
    subjectTeacher,
    modalOpen,
    editing,
    editingId,
    deleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleSaveEdit,
    handleDelete,
    handleCloseModal, // ✅ export yang baru
    columns,
    setModalOpen,
    setEditing,
    setDeleteConfirm,
    setTeachers,
    setClassTeacher,
    setEditingId,
  };
}
