"use client";

import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Option = { label: string; text: string };

type Question = {
  id: number;
  question: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "Multiple Choice" | "Essay";
  options?: Option[];
  correctAnswer?: string;
  rubric?: string;
  maxPoints?: number;
  used: number;
};

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "What is Newton's First Law of Motion?",
    subject: "Physics",
    difficulty: "Easy",
    type: "Multiple Choice",
    options: [
      { label: "A", text: "An object at rest stays at rest unless acted upon by a force" },
      { label: "B", text: "Force equals mass times acceleration" },
      { label: "C", text: "Every action has an equal and opposite reaction" },
      { label: "D", text: "Energy cannot be created or destroyed" },
    ],
    correctAnswer: "A",
    used: 5,
  },
  {
    id: 2,
    question: "Solve: 2x² + 5x - 3 = 0",
    subject: "Mathematics",
    difficulty: "Hard",
    type: "Multiple Choice",
    options: [
      { label: "A", text: "x = 1/2, x = -3" },
      { label: "B", text: "x = -1/2, x = 3" },
      { label: "C", text: "x = 1, x = -3" },
      { label: "D", text: "x = 2, x = -1" },
    ],
    correctAnswer: "A",
    used: 3,
  },
  {
    id: 3,
    question: "Explain the process of photosynthesis in detail",
    subject: "Biology",
    difficulty: "Hard",
    type: "Essay",
    rubric: "Students should cover: light-dependent reactions, Calvin cycle, inputs (CO₂, H₂O, light), outputs (glucose, O₂). Award marks for diagrams and correct terminology.",
    maxPoints: 20,
    used: 2,
  },
  {
    id: 4,
    question: "What is the past tense of 'swim'?",
    subject: "English",
    difficulty: "Easy",
    type: "Multiple Choice",
    options: [
      { label: "A", text: "Swam" },
      { label: "B", text: "Swimmed" },
      { label: "C", text: "Swum" },
      { label: "D", text: "Sweem" },
    ],
    correctAnswer: "A",
    used: 8,
  },
  {
    id: 5,
    question: "Define the atomic number of an element",
    subject: "Chemistry",
    difficulty: "Medium",
    type: "Multiple Choice",
    options: [
      { label: "A", text: "Number of protons in the nucleus" },
      { label: "B", text: "Number of neutrons in the nucleus" },
      { label: "C", text: "Total number of protons and neutrons" },
      { label: "D", text: "Number of electrons in the outer shell" },
    ],
    correctAnswer: "A",
    used: 4,
  },
  {
    id: 6,
    question: "Explain the water cycle with diagrams",
    subject: "Geography",
    difficulty: "Medium",
    type: "Essay",
    rubric: "Describe evaporation, condensation, precipitation, and collection. Include a labeled diagram. Award marks for clarity and scientific vocabulary.",
    maxPoints: 15,
    used: 1,
  },
  {
    id: 7,
    question: "Calculate the acceleration of a 5kg object with 20N force",
    subject: "Physics",
    difficulty: "Medium",
    type: "Multiple Choice",
    options: [
      { label: "A", text: "4 m/s²" },
      { label: "B", text: "100 m/s²" },
      { label: "C", text: "25 m/s²" },
      { label: "D", text: "0.25 m/s²" },
    ],
    correctAnswer: "A",
    used: 6,
  },
  {
    id: 8,
    question: "Who wrote 'Romeo and Juliet'?",
    subject: "English",
    difficulty: "Easy",
    type: "Multiple Choice",
    options: [
      { label: "A", text: "William Shakespeare" },
      { label: "B", text: "Charles Dickens" },
      { label: "C", text: "Jane Austen" },
      { label: "D", text: "Mark Twain" },
    ],
    correctAnswer: "A",
    used: 9,
  },
];

const emptyQuestion: Question = {
  id: 0,
  question: "",
  subject: "Physics",
  difficulty: "Medium",
  type: "Multiple Choice",
  options: [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ],
  correctAnswer: "A",
  rubric: "",
  maxPoints: 10,
  used: 0,
};

const subjects = ["All", "Physics", "Mathematics", "Biology", "English", "Chemistry", "Geography"];
const difficulties: Array<"Easy" | "Medium" | "Hard"> = ["Easy", "Medium", "Hard"];
const types = ["All", "Multiple Choice", "Essay"];

export default function TeacherQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = questions.filter((q) => {
    if (activeSubject !== "All" && q.subject !== activeSubject) return false;
    if (activeType !== "All" && q.type !== activeType) return false;
    return true;
  });

  const openAdd = () => {
    setEditingQuestion({ ...emptyQuestion, id: Date.now() });
    setModalOpen(true);
  };

  const openEdit = (q: Question) => {
    setEditingQuestion({ ...q, options: q.options ? q.options.map((o) => ({ ...o })) : undefined });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editingQuestion) return;
    setQuestions((prev) => {
      const exists = prev.find((q) => q.id === editingQuestion.id);
      if (exists) return prev.map((q) => (q.id === editingQuestion.id ? editingQuestion : q));
      return [...prev, editingQuestion];
    });
    setModalOpen(false);
    setEditingQuestion(null);
  };

  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setDeleteConfirm(null);
  };

  const mcCount = questions.filter((q) => q.type === "Multiple Choice").length;
  const essayCount = questions.filter((q) => q.type === "Essay").length;

  const columns = [
    {
      key: "question",
      label: "Question",
      render: (row: Question) => (
        <div className="max-w-xs">
          <p className="font-medium text-slate-700 truncate">{row.question}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.subject}</p>
        </div>
      ),
    },
    {
      key: "difficulty",
      label: "Difficulty",
      render: (row: Question) => (
        <span
          className={`badge ${
            row.difficulty === "Easy"
              ? "badge-success"
              : row.difficulty === "Medium"
              ? "badge-warning"
              : "badge-danger"
          }`}
        >
          {row.difficulty}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row: Question) => (
        <span className={`badge ${row.type === "Multiple Choice" ? "badge-info" : "badge-neutral"}`}>
          {row.type}
        </span>
      ),
    },
    { key: "used", label: "Used" },
    {
      key: "actions",
      label: "Actions",
      render: (row: Question) => (
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
          <h1 className="text-2xl font-bold text-slate-800">Question Bank</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize your exam questions</p>
        </div>
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
        >
          + Add Question
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Questions", value: questions.length, emoji: "📋" },
          { label: "Multiple Choice", value: mcCount, emoji: "☑️" },
          { label: "Essay", value: essayCount, emoji: "✍️" },
          { label: "Subjects", value: new Set(questions.map((q) => q.subject)).size, emoji: "📚" },
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
      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSubject === sub
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeType === t
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={filtered} />

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingQuestion?.id && questions.find((q) => q.id === editingQuestion.id) ? "Edit Question" : "Add Question"}>
        {editingQuestion && (
          <div className="space-y-5">
            {/* Question text */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Question Text</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                placeholder="Enter your question..."
              />
            </div>

            {/* Subject + Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                  value={editingQuestion.subject}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, subject: e.target.value })}
                >
                  {subjects.filter((s) => s !== "All").map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                  value={editingQuestion.difficulty}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: e.target.value as "Easy" | "Medium" | "Hard" })}
                >
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Question Type</label>
              <div className="flex gap-3">
                {(["Multiple Choice", "Essay"] as const).map((t) => (
                  <Button
                    key={t}
                    variant="ghost"
                    onClick={() => {
                      setEditingQuestion({
                        ...editingQuestion,
                        type: t,
                        options: t === "Multiple Choice"
                          ? editingQuestion.options || [
                              { label: "A", text: "" },
                              { label: "B", text: "" },
                              { label: "C", text: "" },
                              { label: "D", text: "" },
                            ]
                          : undefined,
                        correctAnswer: t === "Multiple Choice" ? editingQuestion.correctAnswer || "A" : undefined,
                      });
                    }}
                    className={`flex-1 px-4 py-2.5 h-10 rounded-xl text-sm font-medium transition-all ${
                      editingQuestion.type === t
                        ? "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 hover:text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {t === "Multiple Choice" ? "☑️ " : "✍️ "}{t}
                  </Button>
                ))}
              </div>
            </div>

            {/* Multiple Choice options */}
            {editingQuestion.type === "Multiple Choice" && editingQuestion.options && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Answer Options</label>
                {editingQuestion.options.map((opt, idx) => (
                  <div key={opt.label} className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setEditingQuestion({ ...editingQuestion, correctAnswer: opt.label })}
                      className={`w-9 h-9 p-0 rounded-xl text-sm font-bold shrink-0 transition-all ${
                        editingQuestion.correctAnswer === opt.label
                          ? "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 hover:text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600"
                      }`}
                    >
                      {opt.label}
                    </Button>
                    <Input
                      type="text"
                      className="h-10 flex-1 px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all shadow-none"
                      value={opt.text}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options!];
                        newOptions[idx] = { ...opt, text: e.target.value };
                        setEditingQuestion({ ...editingQuestion, options: newOptions });
                      }}
                      placeholder={`Option ${opt.label}`}
                    />
                  </div>
                ))}
                <p className="text-xs text-slate-400">Click a letter to mark it as the correct answer</p>
              </div>
            )}

            {/* Essay fields */}
            {editingQuestion.type === "Essay" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Answer Rubric / Guidelines</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                    value={editingQuestion.rubric || ""}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, rubric: e.target.value })}
                    placeholder="Describe the expected answer and grading criteria..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Maximum Points</label>
                  <Input
                    type="number"
                    min={1}
                    className="h-10 w-32 px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all shadow-none"
                    value={editingQuestion.maxPoints || 10}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, maxPoints: parseInt(e.target.value) || 10 })}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
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
                disabled={!editingQuestion.question.trim()}
                className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {questions.find((q) => q.id === editingQuestion.id) ? "Save Changes" : "Add Question"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
