"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Exam = {
  id: number;
  name: string;
  subject: string;
  questions: number;
  students: number;
  status: "Active" | "Scheduled" | "Draft" | "Completed";
};

const initialExams: Exam[] = [
  { id: 1, name: "UTS Mathematics", subject: "Mathematics", questions: 40, students: 45, status: "Active" },
  { id: 2, name: "Quiz Physics", subject: "Physics", questions: 20, students: 38, status: "Active" },
  { id: 3, name: "UAS English", subject: "English", questions: 50, students: 0, status: "Scheduled" },
  { id: 4, name: "Quiz Chemistry", subject: "Chemistry", questions: 15, students: 42, status: "Completed" },
  { id: 5, name: "UTS Biology", subject: "Biology", questions: 35, students: 0, status: "Draft" },
];

const emptyExam: Exam = {
  id: 0,
  name: "",
  subject: "Mathematics",
  questions: 20,
  students: 0,
  status: "Draft",
};

const statusOptions: Exam["status"][] = ["Draft", "Scheduled", "Active", "Completed"];
const statusTabs = ["All", "Active", "Scheduled", "Draft", "Completed"];

export default function TeacherExamsPage() {
  const user = typeof window !== 'undefined' ? getCurrentUser() : null;
  const teacherSubject = user?.subject || "Mathematics";

  const [exams, setExams] = useState<Exam[]>(() => 
    initialExams.filter(e => e.subject === teacherSubject)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = activeTab === "All" ? exams : exams.filter((e) => e.status === activeTab);

  const openAdd = () => {
    setEditingExam({ ...emptyExam, id: Date.now() });
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

  const columns = [
    {
      key: "name",
      label: "Exam Name",
      render: (row: Exam) => (
        <div>
          <p className="font-medium text-slate-700">{row.name}</p>
          <p className="text-xs text-slate-400">{row.subject}</p>
        </div>
      ),
    },
    { key: "questions", label: "Questions" },
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
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
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
                <div className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 text-sm font-medium">
                  {teacherSubject}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Questions</label>
                <Input
                  type="number"
                  min={1}
                  className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all"
                  value={editingExam.questions}
                  onChange={(e) => setEditingExam({ ...editingExam, questions: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
