"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialQuestions } from "@/data/dummy/questions";
import QuestionPickerModal from "@/components/feature/Teacher/Exams/QuestionPickerModal";

type Exam = {
  id: number;
  name: string;
  subject: string;
  targetClass: string;
  questions: number;
  students: number;
  status: "Active" | "Scheduled" | "Draft" | "Completed";
  questionIds: number[];
};

const subjectOptions = [
  "Mathematics", "Physics", "English", "Chemistry", "Biology", "Geography", "History",
];

const classOptions = [
  "X IPA 1", "X IPA 2", "X IPS 1", "X IPS 2",
  "XI IPA 1", "XI IPA 2", "XI IPS 1", "XI IPS 2",
  "XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 2",
  "All Classes",
];

const buildInitialExams = (subject: string): Exam[] => [
  { id: 1, name: "UTS Mathematics", subject: "Mathematics", targetClass: "XII IPA 1", questions: 40, students: 45, status: "Active" as const, questionIds: [] },
  { id: 2, name: "Quiz Physics", subject: "Physics", targetClass: "XII IPA 2", questions: 20, students: 38, status: "Active" as const, questionIds: [] },
  { id: 3, name: "UAS English", subject: "English", targetClass: "All Classes", questions: 50, students: 0, status: "Scheduled" as const, questionIds: [] },
  { id: 4, name: "Quiz Chemistry", subject: "Chemistry", targetClass: "XI IPA 1", questions: 15, students: 42, status: "Completed" as const, questionIds: [] },
  { id: 5, name: "UTS Biology", subject: "Biology", targetClass: "XI IPA 2", questions: 35, students: 0, status: "Draft" as const, questionIds: [] },
].filter((e) => e.subject === subject);

const emptyExam = (subject: string): Exam => ({
  id: 0,
  name: "",
  subject,
  targetClass: "All Classes",
  questions: 20,
  students: 0,
  status: "Draft",
  questionIds: [],
});

const statusOptions: Exam["status"][] = ["Draft", "Scheduled", "Active", "Completed"];
const statusTabs = ["All", "Active", "Scheduled", "Draft", "Completed"];

export default function TeacherExamsPage() {
  const user = typeof window !== "undefined" ? getCurrentUser() : null;
  const teacherSubject = user?.subject || "Mathematics";

  const [exams, setExams] = useState<Exam[]>(() => buildInitialExams(teacherSubject));
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Question Picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerExam, setPickerExam] = useState<Exam | null>(null);

  const filtered = activeTab === "All" ? exams : exams.filter((e) => e.status === activeTab);

  const openAdd = () => {
    setEditingExam({ ...emptyExam(teacherSubject), id: Date.now() });
    setModalOpen(true);
  };

  const openEdit = (exam: Exam) => {
    setEditingExam({ ...exam });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editingExam) return;
    setExams((prev) => {
      const exists = prev.find((e) => e.id === editingExam.id);
      if (exists) return prev.map((e) => (e.id === editingExam.id ? editingExam : e));
      return [...prev, editingExam];
    });
    setModalOpen(false);
    setEditingExam(null);
  };

  const handleDelete = (id: number) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  };

  const openPicker = (exam: Exam) => {
    setPickerExam(exam);
    setPickerOpen(true);
  };

  const handlePickerSave = (ids: number[]) => {
    if (!pickerExam) return;
    setExams((prev) =>
      prev.map((e) =>
        e.id === pickerExam.id
          ? { ...e, questionIds: ids, questions: ids.length }
          : e
      )
    );
    setPickerExam(null);
  };

  const columns = [
    {
      key: "name",
      label: "Exam Name",
      render: (row: Exam) => (
        <p className="font-medium text-slate-700">{row.name}</p>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: Exam) => (
        <span className="badge badge-info">{row.subject}</span>
      ),
    },
    {
      key: "targetClass",
      label: "Class",
      render: (row: Exam) => (
        <span className="badge badge-neutral">{row.targetClass}</span>
      ),
    },
    {
      key: "questions",
      label: "Questions",
      render: (row: Exam) => (
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              row.questionIds.length > 0 ? "text-emerald-600" : "text-slate-400"
            }`}
          >
            {row.questionIds.length > 0
              ? `${row.questionIds.length} selected`
              : row.questions > 0
              ? `${row.questions} (unlinked)`
              : "—"}
          </span>
        </div>
      ),
    },
    { key: "students", label: "Students" },
    {
      key: "status",
      label: "Status",
      render: (row: Exam) => (
        <span
          className={`badge ${
            row.status === "Active"
              ? "badge-success"
              : row.status === "Scheduled"
              ? "badge-info"
              : row.status === "Draft"
              ? "badge-neutral"
              : "badge-warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Exam) => (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => openPicker(row)}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
            title="Select questions from bank"
          >
            📋 Questions
          </button>
          <button
            onClick={() => openEdit(row)}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium"
          >
            Edit
          </button>
          {deleteConfirm === row.id ? (
            <div className="flex gap-1">
              <button
                onClick={() => handleDelete(row.id)}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
              >
                Confirm
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(row.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Exams</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage your exams</p>
        </div>
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
        >
          + Create Exam
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Exams", value: exams.length, emoji: "📝" },
          { label: "Active", value: exams.filter((e) => e.status === "Active").length, emoji: "🟢" },
          { label: "Scheduled", value: exams.filter((e) => e.status === "Scheduled").length, emoji: "📅" },
          { label: "Draft", value: exams.filter((e) => e.status === "Draft").length, emoji: "📋" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="text-lg">{s.emoji}</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExam?.id && exams.find((e) => e.id === editingExam.id) ? "Edit Exam" : "Create Exam"}
      >
        {editingExam && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Exam Name</label>
              <Input
                type="text"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all"
                value={editingExam.name}
                onChange={(e) => setEditingExam({ ...editingExam, name: e.target.value })}
                placeholder="e.g. UTS Mathematics"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                  value={editingExam.subject}
                  onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })}
                >
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Class</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                  value={editingExam.targetClass}
                  onChange={(e) => setEditingExam({ ...editingExam, targetClass: e.target.value })}
                >
                  {classOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                value={editingExam.status}
                onChange={(e) => setEditingExam({ ...editingExam, status: e.target.value as Exam["status"] })}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Question count info */}
            <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
              <span className="font-semibold">{editingExam.questionIds.length}</span> question
              {editingExam.questionIds.length !== 1 ? "s" : ""} selected from Question Bank.{" "}
              <span className="text-emerald-500">
                Use the &quot;📋 Questions&quot; button on the exam row to pick questions.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="ghost"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!editingExam.name.trim()}
                className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exams.find((e) => e.id === editingExam.id) ? "Save Changes" : "Create Exam"}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Question Picker Modal */}
      {pickerExam && (
        <QuestionPickerModal
          isOpen={pickerOpen}
          onClose={() => { setPickerOpen(false); setPickerExam(null); }}
          examName={pickerExam.name}
          examSubject={pickerExam.subject}
          allQuestions={initialQuestions}
          selectedIds={pickerExam.questionIds}
          onSave={handlePickerSave}
        />
      )}
    </div>
  );
}
