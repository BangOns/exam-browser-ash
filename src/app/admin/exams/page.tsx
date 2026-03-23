"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ExamRow = { 
  id: number;
  name: string; 
  subject: string; 
  questions: number; 
  status: "Active" | "Scheduled" | "Draft" | "Completed"; 
  created: string;
  token?: string; 
};

const initialExams: ExamRow[] = [
  { id: 1, name: "UTS Mathematics", subject: "Mathematics", questions: 40, status: "Active", created: "Mar 10, 2026", token: "MATH123" },
  { id: 2, name: "UAS English", subject: "English", questions: 50, status: "Scheduled", created: "Mar 12, 2026" },
  { id: 3, name: "Quiz Physics", subject: "Physics", questions: 20, status: "Active", created: "Mar 15, 2026", token: "PHYS55" },
  { id: 4, name: "UTS Biology", subject: "Biology", questions: 35, status: "Draft", created: "Mar 18, 2026" },
  { id: 5, name: "Quiz Chemistry", subject: "Chemistry", questions: 15, status: "Completed", created: "Mar 5, 2026" },
  { id: 6, name: "UAS History", subject: "History", questions: 30, status: "Scheduled", created: "Mar 20, 2026" },
];

const emptyExam: ExamRow = {
  id: 0,
  name: "",
  subject: "Mathematics",
  questions: 20,
  status: "Draft",
  created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
};

const defaultSubjectTimers: Record<string, string> = {
  "Mathematics": "120 min",
  "Physics": "60 min",
  "English": "90 min",
  "Chemistry": "45 min",
  "Biology": "90 min",
  "Geography": "60 min",
  "History": "90 min"
};

const subjectOptions = Object.keys(defaultSubjectTimers);
const statusOptions: ExamRow["status"][] = ["Draft", "Scheduled", "Active", "Completed"];
const statusTabs = ["All", "Active", "Scheduled", "Draft", "Completed"];

export default function AdminExamsPage() {
  const [exams, setExams] = useState<ExamRow[]>(initialExams);
  const [subjectTimers, setSubjectTimers] = useState<Record<string, string>>(defaultSubjectTimers);
  const [modalOpen, setModalOpen] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamRow | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? exams : exams.filter(e => e.status === activeTab);

  const generateToken = (id: number) => {
    const randomToken = Math.random().toString(36).substring(2, 8).toUpperCase();
    setExams(prev => prev.map(e => e.id === id ? { ...e, token: randomToken } : e));
    // Save to localStorage for mock cross-client verification
    if (typeof window !== undefined) {
      localStorage.setItem(`exam_token_${id}`, randomToken);
    }
  };

  const openAdd = () => {
    setEditingExam({ ...emptyExam, id: Date.now(), created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
    setModalOpen(true);
  };

  const openEdit = (exam: ExamRow) => {
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
    { key: "name", label: "Exam Name", render: (row: ExamRow) => <span className="font-semibold text-slate-700">{row.name}</span> },
    { key: "subject", label: "Subject", render: (row: ExamRow) => <span className="badge badge-info">{row.subject}</span> },
    { key: "questions", label: "Questions" },
    { key: "duration", label: "Duration", render: (row: ExamRow) => <span>{subjectTimers[row.subject] || "60 min"}</span> },
    {
      key: "status",
      label: "Status",
      render: (row: ExamRow) => (
        <span className={`badge ${
          row.status === "Active" ? "badge-success" :
          row.status === "Scheduled" ? "badge-info" :
          row.status === "Draft" ? "badge-neutral" :
          "badge-warning"
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "token",
      label: "Access Token",
      render: (row: ExamRow) => (
        <div className="flex items-center gap-2">
          {row.token ? (
            <span className="font-mono bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs font-bold tracking-widest">{row.token}</span>
          ) : (
            <span className="text-xs text-slate-400 italic">Not generated</span>
          )}
          <Button
            variant="ghost"
            onClick={() => generateToken(row.id)}
            className="text-xs px-2 py-1 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
          >
            {row.token ? "Regenerate" : "Generate"}
          </Button>
        </div>
      )
    },
    { key: "created", label: "Created" },
    {
      key: "actions",
      label: "Actions",
      render: (row: ExamRow) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium">
            Edit
          </button>
          
          {deleteConfirm === row.id ? (
            <div className="flex gap-1 animate-slide-up">
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
          <h1 className="text-2xl font-bold text-slate-800">Exam Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create exams, manage tokens, and configure global subject timers</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setTimerModalOpen(true)}
            className="px-5 py-2.5 h-10 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors shadow-sm"
          >
            Configure Timers
          </Button>
          <Button
            onClick={openAdd}
            className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            + Create Exam
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Exams", value: exams.length, emoji: "📝" },
          { label: "Active", value: exams.filter((e) => e.status === "Active").length, emoji: "🟢" },
          { label: "Scheduled", value: exams.filter((e) => e.status === "Scheduled").length, emoji: "📅" },
          { label: "Draft", value: exams.filter((e) => e.status === "Draft").length, emoji: "📋" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <span className="text-lg">{s.emoji}</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
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
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
                value={editingExam.name}
                onChange={(e) => setEditingExam({ ...editingExam, name: e.target.value })}
                placeholder="e.g. UTS Mathematics"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                  value={editingExam.subject}
                  onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })}
                >
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Global Duration Override</label>
                <div className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 text-sm italic">
                  Inherits {subjectTimers[editingExam.subject] || "60 min"} from Subject settings
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Questions</label>
                <Input
                  type="number"
                  min={1}
                  className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
                  value={editingExam.questions}
                  onChange={(e) => setEditingExam({ ...editingExam, questions: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                  value={editingExam.status}
                  onChange={(e) => setEditingExam({ ...editingExam, status: e.target.value as ExamRow["status"] })}
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
                className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exams.find((e) => e.id === editingExam.id) ? "Save Changes" : "Create Exam"}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Timer Configuration Modal */}
      <Modal
        isOpen={timerModalOpen}
        onClose={() => setTimerModalOpen(false)}
        title="Global Subject Timers"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {Object.entries(subjectTimers).map(([subject, duration]) => (
            <div key={subject} className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-semibold text-slate-700">{subject}</span>
              <select
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
                value={duration}
                onChange={(e) => setSubjectTimers((prev) => ({ ...prev, [subject]: e.target.value }))}
              >
                {["30 min", "45 min", "60 min", "90 min", "120 min", "150 min", "180 min"].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          ))}
          
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setTimerModalOpen(false)}
              className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
            >
              Done Settings
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
