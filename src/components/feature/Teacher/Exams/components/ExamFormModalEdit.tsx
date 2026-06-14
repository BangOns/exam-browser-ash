import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExamRequestEdit } from "@/types/exam";
import { LessonList } from "@/types/lesson";
import React from "react";

export default function ExamFormModalTeacherEdit({
  modalOpen,
  setModalOpen,
  editingExam,
  setEditingExam,
  handleSave,
  lessons,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingExam: ExamRequestEdit;
  setEditingExam: (e: ExamRequestEdit) => void;
  handleSave: () => void;
  lessons: LessonList[];
}) {
  const totalWeight =
    (editingExam?.pg_weight ?? 0) + (editingExam?.essay_weight ?? 0);
  const isWeightValid = totalWeight === 100;

  const handlePgWeightChange = (value: number) => {
    const pg = Math.min(100, Math.max(0, value));
    setEditingExam({
      ...editingExam,
      pg_weight: pg,
      essay_weight: 100 - pg,
    });
  };

  const handleEssayWeightChange = (value: number) => {
    const essay = Math.min(100, Math.max(0, value));
    setEditingExam({
      ...editingExam,
      essay_weight: essay,
      pg_weight: 100 - essay,
    });
  };

  const isFormValid =
    editingExam?.name.trim() && editingExam?.lesson_id && isWeightValid;

  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={"Edit Exam"}
    >
      <div className="space-y-5">
        {/* Exam Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Exam Name
          </label>

          <Input
            type="text"
            className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all"
            value={editingExam?.name ?? ""}
            onChange={(e) =>
              setEditingExam({
                ...editingExam,
                name: e.target.value,
              })
            }
            placeholder="e.g. UTS Mathematics"
          />
        </div>

        {/* Lesson */}
        <section>
          <span className="text-sm font-semibold text-slate-700">
            Pilih Kelas
          </span>

          <select
            className="px-3 w-full py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
            value={editingExam?.lesson_id ?? ""}
            onChange={(e) => {
              setEditingExam({
                ...editingExam,
                lesson_id: e.target.value,
              });
            }}
          >
            <option value="">Pilih Kelas</option>

            {lessons.map((l: LessonList) => (
              <option key={l.id} value={l.id}>
                {l.subject.name} - {l.class.name}
              </option>
            ))}
          </select>
        </section>
        {/* Bobot Soal */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Bobot Soal
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* PG Weight */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Pilihan Ganda (%)
              </label>
              <Input
                type="text"
                className="h-9 text-sm text-center font-semibold"
                value={editingExam?.pg_weight ?? 0}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  handlePgWeightChange(val);
                }}
              />
            </div>

            {/* Essay Weight */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Essay (%)
              </label>
              <Input
                type="text"
                className="h-9 text-sm text-center font-semibold"
                value={editingExam?.essay_weight ?? 0}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  handleEssayWeightChange(val);
                }}
              />
            </div>
          </div>

          {/* Total indicator */}
          <div
            className={`mt-2 px-3 py-2 rounded-lg text-xs font-medium flex justify-between ${
              isWeightValid
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-red-50 text-red-500 border border-red-100"
            }`}
          >
            <span>Total Bobot</span>
            <span>
              {totalWeight}% {isWeightValid ? "✅" : "— harus 100%"}
            </span>
          </div>
        </div>
        {/* Question Count */}
        <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
          <span className="font-semibold">
            {/* {editingExam?.questionIds?.length ?? 0} */}
          </span>{" "}
          Question selected from Question Bank.{" "}
          <span className="text-emerald-500">
            Use the &quot;📋 Questions&quot; button on the exam row to pick
            questions.
          </span>
        </div>

        {/* Footer */}
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
            disabled={!editingExam?.name?.trim() || !isFormValid}
            className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit Exam
          </Button>
        </div>
      </div>
    </Modal>
  );
}
