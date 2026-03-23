"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Schedule = {
  id: number;
  name: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Scheduled" | "Ongoing" | "Completed";
};

const initialSchedules: Schedule[] = [
  { id: 1, name: "UTS Mathematics", subject: "Mathematics", date: "2026-03-24", startTime: "08:00", endTime: "10:00", status: "Scheduled" },
  { id: 2, name: "Quiz Physics", subject: "Physics", date: "2026-03-25", startTime: "09:00", endTime: "10:00", status: "Ongoing" },
  { id: 3, name: "UAS English", subject: "English", date: "2026-03-26", startTime: "10:00", endTime: "11:30", status: "Scheduled" },
];

const emptySchedule: Schedule = {
  id: 0,
  name: "",
  subject: "Mathematics",
  date: "",
  startTime: "",
  endTime: "",
  status: "Scheduled",
};

const subjectOptions = ["Mathematics", "Physics", "English", "Chemistry", "Biology", "Geography", "History"];

export default function AdminSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = () => {
    setEditing({ ...emptySchedule, id: Date.now() });
    setModalOpen(true);
  };

  const openEdit = (s: Schedule) => {
    setEditing({ ...s });
    setModalOpen(true);
  };

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

  const handleDelete = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  const columns = [
    {
      key: "name",
      label: "Exam Name",
      render: (row: Schedule) => (
        <div>
          <p className="font-medium text-slate-700">{row.name}</p>
          <p className="text-xs text-slate-400">{row.subject}</p>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row: Schedule) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {row.date}
        </div>
      ),
    },
    {
      key: "time",
      label: "Time",
      render: (row: Schedule) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium whitespace-nowrap">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {row.startTime} - {row.endTime}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Schedule) => (
        <span
          className={`badge ${
            row.status === "Scheduled"
              ? "badge-info"
              : row.status === "Ongoing"
              ? "badge-success"
              : "badge-neutral"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Schedule) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="text-xs px-3 py-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors font-medium"
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
          <h1 className="text-2xl font-bold text-slate-800">Exam Schedule</h1>
          <p className="text-sm text-slate-500 mt-1">Manage dates and times for upcoming exams</p>
        </div>
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm"
        >
          + Add Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-5 border-l-4 border-l-sky-500">
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Scheduled</p>
          <p className="text-2xl font-bold text-slate-800">{schedules.length}</p>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-emerald-500">
          <p className="text-sm font-semibold text-slate-500 mb-1">Ongoing Exams</p>
          <p className="text-2xl font-bold text-slate-800">{schedules.filter(s => s.status === "Ongoing").length}</p>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-slate-400">
          <p className="text-sm font-semibold text-slate-500 mb-1">Completed</p>
          <p className="text-2xl font-bold text-slate-800">{schedules.filter(s => s.status === "Completed").length}</p>
        </div>
      </div>

      <DataTable columns={columns} data={schedules} />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing?.id && schedules.find((s) => s.id === editing.id) ? "Edit Schedule" : "Add Schedule"}
      >
        {editing && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Exam Name</label>
              <Input
                type="text"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g. UTS Mathematics"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all bg-white"
                  value={editing.subject}
                  onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                >
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                <Input
                  type="date"
                  className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Time</label>
                <Input
                  type="time"
                  className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
                  value={editing.startTime}
                  onChange={(e) => setEditing({ ...editing, startTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">End Time</label>
                <Input
                  type="time"
                  className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
                  value={editing.endTime}
                  onChange={(e) => setEditing({ ...editing, endTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all bg-white"
                value={editing.status}
                onChange={(e) => setEditing({ ...editing, status: e.target.value as Schedule["status"] })}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="ghost"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                title="Cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!editing.name.trim() || !editing.date || !editing.startTime || !editing.endTime}
                className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Save Schedule"
              >
                {schedules.find((s) => s.id === editing.id) ? "Save Changes" : "Save Schedule"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
