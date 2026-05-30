"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
// import {
//   subjects,
//   types,
// } from "@/components/feature/Teacher/Questions/constants";
import InfoCard from "@/components/shared/InfoCard";
import useQuestionManagement from "@/components/feature/Teacher/Questions/hooks/useQuestionManagement";
import QuestionFormModal from "@/components/feature/Teacher/Questions/components/QuestionFormModal";
import PageHeader from "@/components/shared/PageHeader";
import QuestionFormModalEdit from "@/components/feature/Teacher/Questions/components/QuestionFormEditModal";
import Pagination from "@/components/shared/Pagination";

export default function TeacherQuestionsPage() {
  const {
    questions,
    isLoadingQuestion,
    questionId,
    lessons,
    modalOpen,
    setModalOpen,
    editingQuestion,
    setEditingQuestion,
    editingQuestionId,
    setEditingQuestionId,
    // activeSubject,
    // setActiveSubject,
    // activeType,
    // setActiveType,
    openAdd,
    handleSave,
    handleSaveEdit,
    mcCount,
    essayCount,
    columns,
    pagination,
    handlePageChange,
  } = useQuestionManagement();

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Question Bank"
          description="Manage and organize your exam questions"
        />
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
        >
          + Add Question
        </Button>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {questions &&
          [
            { label: "Total Questions", value: questions.length, emoji: "📋" },
            { label: "Multiple Choice", value: mcCount ?? 0, emoji: "☑️" },
            { label: "Essay", value: essayCount ?? 0, emoji: "✍️" },
            {
              label: "Subjects",
              value: new Set(questions.map((q) => q.lesson.subject)).size,
              emoji: "📚",
            },
          ].map((s, i) => <InfoCard key={i} {...s} />)}
      </section>
      {/* Filters */}
      {/* <section className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {subjects.map((sub) => (
            <Button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSubject === sub
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {sub}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <Button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeType === t
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>
      </section> */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={questions}
          className="col-span-full"
          isLoading={isLoadingQuestion}
        />
        {pagination && (
          <div className="col-span-full">
            <Pagination
              currentPage={pagination.current_page}
              total={pagination.total}
              lastPage={pagination.last_page}
              perPage={pagination.per_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      {/* Add/Edit Modal */}
      {editingQuestion && (
        <QuestionFormModal
          modalOpen={modalOpen}
          setModalOpen={() => setModalOpen(false)}
          editingQuestion={editingQuestion}
          setEditingQuestion={setEditingQuestion}
          handleSave={handleSave}
          lessons={lessons}
        />
      )}
      {questionId && editingQuestionId && (
        <QuestionFormModalEdit
          modalOpen={modalOpen}
          setModalOpen={() => setModalOpen(false)}
          editingQuestion={editingQuestionId}
          setEditingQuestion={setEditingQuestionId}
          handleSave={handleSaveEdit}
          lessons={lessons}
        />
      )}
    </div>
  );
}
