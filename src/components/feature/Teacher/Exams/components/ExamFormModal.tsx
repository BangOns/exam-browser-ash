import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExamRow as Exam, ExamRequest } from "@/types/exam";
import { LessonList } from "@/types/lesson";
import React from "react";

export default function ExamFormModalTeacher({
  modalOpen,
  setModalOpen,
  editingExam,
  setEditingExam,
  handleSave,
  lessons,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingExam: ExamRequest;
  setEditingExam: (e: ExamRequest) => void;
  handleSave: () => void;
  lessons: LessonList[];
}) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={"Create Exam"}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Exam Name
          </label>
          <Input
            type="text"
            className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all"
            value={editingExam?.name}
            onChange={(e) =>
              setEditingExam({ ...editingExam, name: e.target.value })
            }
            placeholder="e.g. UTS Mathematics"
          />
        </div>

        <section>
          <span className="text-sm font-semibold text-slate-700">
            Pilih kelas
          </span>
          <select
            className="px-3  w-full py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
            onChange={(e) => {
              setEditingExam({
                ...editingExam,
                lesson_id: e.target.value,
              });
            }}
          >
            <option value="" defaultChecked>
              Pilih Kelas
            </option>
            {lessons.map((l: LessonList) => (
              <option key={l.id} value={l.id}>
                {l.subject.name} - {l.class.name}
              </option>
            ))}
          </select>
        </section>

        {/* Question count info */}
        <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
          <span className="font-semibold">
            {/* {editingExam?.questionIds?.length} */}
          </span>{" "}
          question
          {/* {editingExam?.questionIds?.length !== 1 ? "s" : ""} selected from */}
          Question Bank.{" "}
          <span className="text-emerald-500">
            Use the &quot;📋 Questions&quot; button on the exam row to pick
            questions.
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
            disabled={!editingExam?.name.trim()}
            className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* {exams.find((e) => e.id === editingExam.id)
                ? "Save Changes"
                : "Create Exam"} */}
            Create Exam
          </Button>
        </div>
      </div>
    </Modal>
  );
}
