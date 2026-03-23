"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";

type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  examsCreated: number;
};

const initialTeachers: Teacher[] = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad@school.id", subject: "Physics", status: "Active", lastLogin: "2h ago", examsCreated: 12 },
  { id: 2, name: "Dewi Lestari", email: "dewi@school.id", subject: "Mathematics", status: "Active", lastLogin: "1h ago", examsCreated: 15 },
  { id: 3, name: "Putri Handayani", email: "putri@school.id", subject: "English", status: "Active", lastLogin: "4h ago", examsCreated: 10 },
];

const emptyTeacher: Teacher = {
  id: 0,
  name: "",
  email: "",
  subject: "Physics",
  status: "Active",
  lastLogin: "Never",
  examsCreated: 0,
};

const subjectOptions = ["Physics", "Mathematics", "English", "Chemistry", "Biology", "Geography", "History"];

export default function AdminTeacherListPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = () => {
    setEditing({ ...emptyTeacher, id: Date.now() });
    setModalOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditing({ ...t });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editing) return;
    setTeachers((prev) => {
      const exists = prev.find((t) => t.id === editing.id);
      if (exists) return prev.map((t) => (t.id === editing.id ? editing : t));
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  };

  const columns = [
    {
      key: "name",
      label: "Teacher",
      render: (row: Teacher) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            {row.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-medium text-slate-700">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: Teacher) => <span className="badge badge-info">{row.subject}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row: Teacher) => (
        <span className={`badge ${row.status === "Active" ? "badge-success" : "badge-warning"}`}>
          {row.status}
        </span>
      ),
    },
    { key: "lastLogin", label: "Last Login" },
    { key: "examsCreated", label: "Exams Created" },
    {
      key: "actions",
      label: "Actions",
      render: (row: Teacher) => (
        <div className="flex gap-2">
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
          <h1 className="text-2xl font-bold text-slate-800">Teacher List</h1>
          <p className="text-sm text-slate-500 mt-1">Manage teacher accounts and assignments</p>
        </div>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
        >
          + Add Teacher
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Teachers", value: teachers.length, emoji: "👩‍🏫" },
          { label: "Active", value: teachers.filter((t) => t.status === "Active").length, emoji: "🟢" },
          { label: "Total Exams", value: teachers.reduce((s, t) => s + t.examsCreated, 0), emoji: "📝" },
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

      <DataTable columns={columns} data={teachers} />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing?.id && teachers.find((t) => t.id === editing.id) ? "Edit Teacher" : "Add Teacher"}
      >
        {editing && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g. Ahmad Fauzi"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                value={editing.email}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                placeholder="e.g. ahmad@school.id"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject Specialty</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                  value={editing.subject}
                  onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                >
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                  value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as "Active" | "Inactive" })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!editing.name.trim() || !editing.email.trim()}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {teachers.find((t) => t.id === editing.id) ? "Save Changes" : "Add Teacher"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
