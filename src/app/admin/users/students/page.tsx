"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Student = {
  id: number;
  name: string;
  email: string;
  grade: string;
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
  examsTaken: number;
  avgScore: number;
};

const initialStudents: Student[] = [
  { id: 1, name: "Siti Nurhaliza", email: "siti@school.id", grade: "XII IPA 1", status: "Active", lastLogin: "5m ago", examsTaken: 8, avgScore: 82 },
  { id: 2, name: "Budi Santoso", email: "budi@school.id", grade: "XII IPA 2", status: "Inactive", lastLogin: "3 days ago", examsTaken: 5, avgScore: 74 },
  { id: 3, name: "Reza Pratama", email: "reza@school.id", grade: "XII IPA 1", status: "Active", lastLogin: "10m ago", examsTaken: 6, avgScore: 78 },
  { id: 4, name: "Maya Anggraeni", email: "maya@school.id", grade: "XII IPS 1", status: "Active", lastLogin: "30m ago", examsTaken: 9, avgScore: 88 },
  { id: 5, name: "Andi Wijaya", email: "andi@school.id", grade: "XII IPS 2", status: "Suspended", lastLogin: "1 week ago", examsTaken: 2, avgScore: 65 },
];

const emptyStudent: Student = {
  id: 0,
  name: "",
  email: "",
  grade: "XII IPA 1",
  status: "Active",
  lastLogin: "Never",
  examsTaken: 0,
  avgScore: 0,
};

const gradeOptions = ["X IPA 1", "X IPA 2", "X IPS 1", "X IPS 2", "XI IPA 1", "XI IPA 2", "XI IPS 1", "XI IPS 2", "XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 2"];

export default function AdminStudentListPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = () => {
    setEditing({ ...emptyStudent, id: Date.now() });
    setModalOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditing({ ...s });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editing) return;
    setStudents((prev) => {
      const exists = prev.find((s) => s.id === editing.id);
      if (exists) return prev.map((s) => (s.id === editing.id ? editing : s));
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  };

  const handleRestore = (id: number) => {
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, status: "Active" } : s));
    localStorage.removeItem(`suspended_user_${id}`);
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  const columns = [
    {
      key: "name",
      label: "Student",
      render: (row: Student) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold">
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
      key: "grade",
      label: "Class/Grade",
      render: (row: Student) => <span className="badge badge-neutral">{row.grade}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row: Student) => (
        <span
          className={`badge ${
            row.status === "Active"
              ? "badge-success"
              : row.status === "Suspended"
              ? "badge-danger"
              : "badge-warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "lastLogin", label: "Last Login" },
    { key: "examsTaken", label: "Exams" },
    {
      key: "avgScore",
      label: "Avg Score",
      render: (row: Student) => (
        <span className={`font-semibold ${row.avgScore >= 80 ? "text-emerald-600" : row.avgScore >= 60 ? "text-amber-600" : "text-red-600"}`}>
          {row.avgScore}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Student) => (
        <div className="flex gap-2">
          {row.status === "Suspended" && (
            <button
              onClick={() => handleRestore(row.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
            >
              Restore
            </button>
          )}
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
          <h1 className="text-2xl font-bold text-slate-800">Student List</h1>
          <p className="text-sm text-slate-500 mt-1">Manage student accounts and enrollment</p>
        </div>
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
        >
          + Add Student
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: students.length, emoji: "🎓" },
          { label: "Active", value: students.filter((s) => s.status === "Active").length, emoji: "🟢" },
          { label: "Avg Score", value: Math.round(students.reduce((s, st) => s + st.avgScore, 0) / students.length), emoji: "📊" },
          { label: "Total Exams", value: students.reduce((s, st) => s + st.examsTaken, 0), emoji: "📝" },
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

      <DataTable columns={columns} data={students} />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing?.id && students.find((s) => s.id === editing.id) ? "Edit Student" : "Add Student"}
      >
        {editing && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <Input
                type="text"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g. Siti Nurhaliza"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <Input
                type="email"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
                value={editing.email}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                placeholder="e.g. siti@school.id"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class / Grade</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                  value={editing.grade}
                  onChange={(e) => setEditing({ ...editing, grade: e.target.value })}
                >
                  {gradeOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                  value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as Student["status"] })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
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
                disabled={!editing.name.trim() || !editing.email.trim()}
                className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {students.find((s) => s.id === editing.id) ? "Save Changes" : "Add Student"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
