"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import InfoCard from "@/components/shared/InfoCard";
import { useTeacherManagement } from "@/components/feature/Admin/Teacher/hooks/useTeacherManagement";
import { TeacherRequest, TeacherRequestEdit } from "@/types/teacher";
import dynamic from "next/dynamic";
import SubjectModal from "@/components/feature/Admin/Teacher/components/SubjectModal";
import ClassModal from "@/components/feature/Admin/Teacher/components/ClassModal";
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
    modalOpenLesson,
    setModalOpenLesson,
    modalOpenClass,
    setModalOpenClass,
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
        <section className="flex gap-3">
          <Button
            onClick={() => setModalOpenClass(true)}
            className=" cursor-pointer px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            List Kelas
          </Button>
          <Button
            onClick={() => setModalOpenLesson(true)}
            className=" cursor-pointer px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            List Pelajaran
          </Button>
          <Button
            onClick={openAdd}
            className=" cursor-pointer px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            + Add Teacher
          </Button>
        </section>
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
      {modalOpenLesson && (
        <SubjectModal
          modalOpen={modalOpenLesson}
          setModalOpen={setModalOpenLesson}
          subjectList={subjectTeacher}
        />
      )}
      {modalOpenClass && (
        <ClassModal
          modalOpen={modalOpenClass}
          setModalOpen={setModalOpenClass}
          classList={classTeacher}
        />
      )}
    </div>
  );
}
