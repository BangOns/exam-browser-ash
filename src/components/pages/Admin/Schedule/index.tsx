"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import InfoCard from "@/components/shared/InfoCard";
import PageHeader from "@/components/shared/PageHeader";
import ScheduleFormModal from "@/components/feature/Admin/Schedule/components/ScheduleFormModal";
import { useScheduleManagement } from "@/components/feature/Admin/Schedule/hooks/useScheduleManagement";
import {
  ExamSchedule,
  ExamScheduleRequest,
  ExamScheduleRequestEdit,
} from "@/types/exam-schedule";
import { ExamList } from "@/types/exam";
import ScheduleFormModalEdit from "@/components/feature/Admin/Schedule/components/ScheduleFormModalEdit";
export default function AdminSchedulePage() {
  const {
    schedules,
    isLoadingSchedules,
    exam,
    modalOpen,
    editing,
    editingById,
    setEditingById,
    openAdd,
    handleSave,
    handleSaveEdit,
    setModalOpen,
    setEditing,
    columns,
  } = useScheduleManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Exam Schedule"
          description="Manage dates and times for upcoming exams"
        />
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm"
        >
          + Add Schedule
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Schedule", value: schedules.length, emoji: "🎓" },
          {
            label: "OnGoing Exams",
            value: schedules.filter((s) => s.status === "Ongoing").length,
            emoji: "🟢",
          },
          {
            label: "Completed",
            value: schedules.filter((s) => s.status === "Completed").length,
            emoji: "📊",
          },
        ].map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={schedules as ExamSchedule[]}
          className="col-span-full"
          isLoading={isLoadingSchedules}
        />
      </section>
      {/* Modal add schedule */}
      <ScheduleFormModal
        modalOpen={modalOpen === "add"}
        setModalOpen={() => setModalOpen(null)}
        editing={editing as ExamScheduleRequest}
        setEditing={setEditing}
        examList={exam as ExamList[]}
        handleSave={handleSave}
      />
      <ScheduleFormModalEdit
        modalOpen={modalOpen === "edit"}
        setModalOpen={() => setModalOpen(null)}
        editing={editingById as ExamScheduleRequestEdit}
        setEditing={setEditingById}
        examList={exam as ExamList[]}
        handleSave={handleSaveEdit}
      />
    </div>
  );
}
