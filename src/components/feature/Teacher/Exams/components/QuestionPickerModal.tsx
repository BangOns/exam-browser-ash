"use client";

import { useState, useMemo, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionList } from "@/types/question";

const typeBadge: Record<string, string> = {
  "Multiple Choice": "badge-info",
  Essay: "badge-neutral",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  examName: string;
  examSubject: string;
  allQuestions: QuestionList[];
  selectedIds: string[];
  onSave: (ids: string[]) => void;
}

export default function QuestionPickerModal({
  isOpen,
  onClose,
  examName,
  examSubject,
  allQuestions,
  selectedIds,
  onSave,
}: Props) {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState(examSubject);
  const [filterType, setFilterType] = useState("All");
  const [selected, setSelected] = useState<string[]>(selectedIds);

  // Reset local state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(selectedIds);
      setSearch("");
      setFilterSubject(examSubject);
      setFilterType("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const subjects = useMemo(() => {
    const s = Array.from(
      new Set(allQuestions.map((q) => q.lesson.subject.name)),
    );
    return ["All", ...s];
  }, [allQuestions]);

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      // if (filterSubject !== "All" && q.lesson.subject.name !== filterSubject)
      //   return false;
      // if (filterType !== "All" && q.type !== filterType) return false;
      if (search.trim()) {
        return q.question.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    });
  }, [allQuestions, search]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectAll = () => setSelected(filtered.map((q) => q.id));
  const clearAll = () => setSelected([]);

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Select Questions — ${examName}`}
      maxWidth="max-w-3xl"
    >
      <div
        className="flex flex-col gap-4"
        style={{ minWidth: "min(680px, 90vw)" }}
      >
        {/* Search */}
        <Input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all shadow-none"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Subject */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Subjects" : s}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          >
            {["All", "Multiple Choice", "Essay"].map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Types" : t}
              </option>
            ))}
          </select>

          <div className="ml-auto flex gap-2">
            <button
              onClick={selectAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-medium transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-8">
              No questions match your filters.
            </p>
          ) : (
            filtered.map((q) => {
              const isSelected = selected.includes(q.id);

              return (
                <button
                  key={q.id}
                  onClick={() => toggle(q.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-300 shadow-sm"
                      : "bg-white border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox indicator */}
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 leading-snug">
                        {q.question}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="text-xs text-slate-400">
                          {q.lesson.subject.name}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span
                          className={`badge text-[11px] ${typeBadge[q.type]}`}
                        >
                          {q.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-emerald-600">
              {selected.length}
            </span>{" "}
            question{selected.length !== 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
            >
              Save Selection
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
