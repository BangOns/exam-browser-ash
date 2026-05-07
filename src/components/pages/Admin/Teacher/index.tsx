"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import InfoCard from "@/components/shared/InfoCard";
import { useTeacherManagement } from "@/components/feature/Admin/Teacher/hooks/useTeacherManagement";
import { TeacherRequest, TeacherRequestEdit } from "@/types/teacher";
import dynamic from "next/dynamic";
const TeacherFormModal = dynamic(
  () =>
    import("@/components/feature/Admin/Teacher/components/TeacherFormModal"),
  { ssr: false },
);
const TeacherFormModalEdit = dynamic(
  () =>
    import("@/components/feature/Admin/Teacher/components/TeacherFormModalEdit"),
  { ssr: false },
);
export default function AdminTeacherListPage() {
  const {
    teachers,
    isLoadingTeachers,
    classTeacher,
    subjectTeacher,
    modalOpen,
    editing,
    editingId,
    openAdd,
    handleSave,
    handleSaveEdit,
    columns,
    setModalOpen,
    setEditing,
    setEditingId,
  } = useTeacherManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Teacher List"
          description="Manage teacher accounts and assignments"
        />
        <Button
          onClick={openAdd}
          className=" cursor-pointer px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
        >
          + Add Teacher
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[{ label: "Total Teachers", value: teachers.length, emoji: "👩‍🏫" }].map(
          (s, i) => (
            <InfoCard key={i} {...s} />
          ),
        )}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={teachers}
          className="col-span-full"
          isLoading={isLoadingTeachers}
        />
      </section>

      {/* Add Modal */}
      {editing && (
        <TeacherFormModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editing={editing as TeacherRequest}
          setEditing={setEditing}
          classOptions={
            classTeacher?.map((c) => ({ label: c.name, value: c.id })) || []
          }
          subjectOptions={
            subjectTeacher?.map((s) => ({ label: s.name, value: s.id })) || []
          }
          handleSave={handleSave}
        />
      )}
      {editingId && (
        <TeacherFormModalEdit
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editing={editingId as TeacherRequestEdit}
          setEditing={setEditingId}
          classOptions={
            classTeacher?.map((c) => ({ label: c.name, value: c.id })) || []
          }
          subjectOptions={
            subjectTeacher?.map((s) => ({ label: s.name, value: s.id })) || []
          }
          handleSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
