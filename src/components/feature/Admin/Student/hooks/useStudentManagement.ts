import { useCallback, useMemo, useState } from "react";
import { Student } from "@/types/student";
import { initialStudents } from "@/data/dummy/student";
import { emptyStudent } from "../constant";
import { StudentColumns } from "../components/StudentColumns";

export function useStudentManagement() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = useCallback(() => {
    setEditing({ ...emptyStudent, id: Date.now() });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((s: Student) => {
    setEditing({ ...s });
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editing) return;
    setStudents((prev) => {
      const exists = prev.find((s) => s.id === editing.id);
      if (exists) return prev.map((s) => (s.id === editing.id ? editing : s));
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  }, [editing]);

  const handleRestore = useCallback((id: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Active" } : s)),
    );
    localStorage.removeItem(`suspended_user_${id}`);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  }, []);

  const columns = useMemo(
    () =>
      StudentColumns(
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
        openEdit,
        handleRestore,
      ),
    [deleteConfirm, setDeleteConfirm, handleDelete, openEdit, handleRestore],
  );
  return {
    students,
    modalOpen,
    editing,
    deleteConfirm,
    setModalOpen,
    setEditing,
    setDeleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleRestore,
    handleDelete,
    columns,
  };
}
