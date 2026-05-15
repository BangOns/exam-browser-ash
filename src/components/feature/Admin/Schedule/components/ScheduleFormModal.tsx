import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExamList } from "@/types/exam";
import { ExamScheduleRequest } from "@/types/exam-schedule";
import { getDuration } from "@/utils/FormatDate";

export default function ScheduleFormModal({
  modalOpen,
  setModalOpen,
  editing,
  setEditing,
  examList,
  handleSave,
}: {
  modalOpen: boolean;
  setModalOpen: () => void;
  editing: ExamScheduleRequest;
  setEditing: (editing: ExamScheduleRequest) => void;
  examList: ExamList[];
  handleSave: () => void;
}) {
  return (
    <Modal isOpen={modalOpen} onClose={setModalOpen} title="Add Schedule">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Exam Name
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            onChange={(e) => {
              setEditing({
                ...editing,
                exam_id: e.target.value,
              });
            }}
          >
            <option value="">Pilih Subject</option>
            {examList?.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Date
            </label>
            <Input
              type="date"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
              onChange={(e) =>
                setEditing({ ...editing, exam_date: e.target?.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Start Time
            </label>
            <Input
              type="time"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
              onChange={(e) =>
                setEditing({ ...editing, start_time: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              End Time
            </label>
            <Input
              type="time"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
              onChange={(e) =>
                setEditing({ ...editing, end_time: e.target.value })
              }
            />
          </div>
        </div>

        {editing?.start_time && editing?.end_time && (
          <section className="w-full">
            <p className="">
              Waktu Ujian: {getDuration(editing.start_time, editing.end_time)}{" "}
              Menit
            </p>
          </section>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={setModalOpen}
            className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            title="Cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title="Save Schedule"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
