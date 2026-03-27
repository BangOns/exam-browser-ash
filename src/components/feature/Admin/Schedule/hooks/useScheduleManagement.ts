import { useCallback, useMemo, useState } from "react";
import { Schedule } from "@/types/schedule";
import { initialSchedules } from "@/data/dummy/schedule";
import { emptySchedule } from "../constant";
import { ScheduleColumns } from "../components/ScheduleColumns";

export function useScheduleManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = useCallback(() => {
    setEditing({ ...emptySchedule, id: Date.now() });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((s: Schedule) => {
    setEditing({ ...s });
    setModalOpen(true);
  }, []);

  const handleSave = () => {
    if (!editing) return;
    setSchedules((prev) => {
      const exists = prev.find((s) => s.id === editing.id);
      if (exists) return prev.map((s) => (s.id === editing.id ? editing : s));
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = useCallback((id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  }, []);

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
    modalOpen,
    setModalOpen,
    editing,
    setEditing,
    deleteConfirm,
    setDeleteConfirm,
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    columns,
  };
}
