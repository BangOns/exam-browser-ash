import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExamRow } from "@/types/exam";

export default function ExamFormModal({
  modalOpen,
  setModalOpen,
  editingExam,
  setEditingExam,
  handleSave,
  subjectOptions,
  statusOptions,
  exams,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editingExam: ExamRow | null;
  setEditingExam: (exam: ExamRow | null) => void;
  handleSave: () => void;
  subjectOptions: string[];
  statusOptions: ExamRow["status"][];
  exams: ExamRow[];
}) {
  const listTimer = [30, 60, 90, 120, 150, 180];
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
              disabled
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
              value={editingExam.name}
              placeholder="e.g. UTS Mathematics"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Subject
              </label>
              <Select
                disabled
                value={editingExam.subject}
                onValueChange={(value) =>
                  setEditingExam({ ...editingExam, subject: value as string })
                }
              >
                <SelectTrigger className="h-10! w-full px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {subjectOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Timer
              </label>
              <Select
                value={editingExam.timer}
                onValueChange={(value) =>
                  setEditingExam({ ...editingExam, timer: value as number })
                }
              >
                <SelectTrigger className="h-10! w-full px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {listTimer.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s} minutes
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                disabled
                className="h-10  w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
                value={editingExam.questions}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <Select
                value={editingExam.status}
                onValueChange={(value) =>
                  setEditingExam({
                    ...editingExam,
                    status: value as ExamRow["status"],
                  })
                }
              >
                <SelectTrigger className="h-10! w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
