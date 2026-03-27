import { useState, useMemo, useCallback } from "react";
import { Teacher } from "@/types/teacher";
import { initialTeachers } from "@/data/dummy/teacher";
import { emptyTeacher } from "@/components/feature/Admin/Teacher/constants";
import { columnsTableTeacher } from "@/components/feature/Admin/Teacher/components/TeacherColumns";

export function useTeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = useCallback(() => {
    setEditing({ ...emptyTeacher, id: Date.now() });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((t: Teacher) => {
    setEditing({ ...t });
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editing) return;
    setTeachers((prev) => {
      const exists = prev.find((t) => t.id === editing.id);
      if (exists) return prev.map((t) => (t.id === editing.id ? editing : t));
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  }, [editing]);

  const handleDelete = useCallback((id: number) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
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

  return {
    teachers,
    modalOpen,
    editing,
    deleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    columns,
    setModalOpen,
    setEditing,
    setDeleteConfirm,
    setTeachers,
  };
}
