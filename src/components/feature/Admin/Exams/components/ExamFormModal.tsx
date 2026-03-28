import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExamRow } from "@/types/exam";

export default function ExamFormModal({
  modalOpen,
  setModalOpen,
  editingExam,
  setEditingExam,
  handleSave,
  subjectOptions,
  statusOptions,
  subjectTimers,
  exams,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editingExam: ExamRow | null;
  setEditingExam: (exam: ExamRow | null) => void;
  handleSave: () => void;
  subjectOptions: string[];
  statusOptions: ExamRow["status"][];
  subjectTimers: Record<string, string>;
  exams: ExamRow[];
}) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={
        editingExam?.id && exams.find((e) => e.id === editingExam.id)
          ? "Edit Exam"
          : "Create Exam"
      }
    >
      {editingExam && (
        <section className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Exam Name
            </label>
            <Input
              type="text"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
              value={editingExam.name}
              onChange={(e) =>
                setEditingExam({ ...editingExam, name: e.target.value })
              }
              placeholder="e.g. UTS Mathematics"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Subject
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                value={editingExam.subject}
                onChange={(e) =>
                  setEditingExam({ ...editingExam, subject: e.target.value })
                }
              >
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Global Duration Override
              </label>
              <div className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 text-sm italic">
                Inherits {subjectTimers[editingExam.subject] || "60 min"} from
                Subject settings
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Number of Questions
              </label>
              <Input
                type="number"
                min={1}
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
                value={editingExam.questions}
                onChange={(e) =>
                  setEditingExam({
                    ...editingExam,
                    questions: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                value={editingExam.status}
                onChange={(e) =>
                  setEditingExam({
                    ...editingExam,
                    status: e.target.value as ExamRow["status"],
                  })
                }
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
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
              {exams.find((e) => e.id === editingExam.id)
                ? "Save Changes"
                : "Create Exam"}
            </Button>
          </div>
        </section>
      )}
    </Modal>
  );
}
