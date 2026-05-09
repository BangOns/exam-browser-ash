import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LessonList } from "@/types/lesson";
import { QuestionRequestEdit } from "@/types/question";

export default function QuestionFormModalEdit({
  modalOpen,
  setModalOpen,
  editingQuestion,
  setEditingQuestion,
  lessons,
  handleSave,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editingQuestion: QuestionRequestEdit;
  setEditingQuestion: (question: QuestionRequestEdit) => void;
  lessons: LessonList[];
  handleSave: () => void;
}) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={"Edit Question"}
    >
      <section className="space-y-5">
        {/* Question text */}
        <section>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Question Text
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
            value={editingQuestion.question}
            onChange={(e) =>
              setEditingQuestion({
                ...editingQuestion,
                question: e.target.value,
              })
            }
            placeholder="Enter your question..."
          />
        </section>

        {/* select class and subject */}
        <section className="">
          <span className="text-sm font-semibold text-slate-700">
            Pilih kelas
          </span>
          <select
            className="px-3  w-full py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
            value={editingQuestion.lesson_id}
            onChange={(e) => {
              setEditingQuestion({
                ...editingQuestion,
                lesson_id: e.target.value,
              });
            }}
          >
            <option value="" defaultChecked>
              Pilih Kelas
            </option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.subject.name} - {l.class.name}
              </option>
            ))}
          </select>
        </section>
        {/* Type selector */}
        <section>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Question Type
          </label>
          <div className="flex gap-3">
            {(["Multiple Choice", "Essay"] as const).map((t) => (
              <Button
                key={t}
                variant="ghost"
                onClick={() => {
                  setEditingQuestion({
                    ...editingQuestion,
                    type: t,
                  });
                }}
                className={`flex-1 px-4 py-2.5 h-10 rounded-xl text-sm font-medium transition-all ${
                  editingQuestion.type === t
                    ? "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 hover:text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {t === "Multiple Choice" ? "☑️ " : "✍️ "}
                {t}
              </Button>
            ))}
          </div>
        </section>

        {/* Multiple Choice options */}
        {editingQuestion.type === "Multiple Choice" &&
          editingQuestion.options && (
            <section className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Answer Options
              </label>
              {editingQuestion.options.map((opt, idx) => (
                <div key={opt.label} className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setEditingQuestion({
                        ...editingQuestion,
                        correct_answer: opt.label,
                      })
                    }
                    className={`w-9 h-9 p-0 rounded-xl text-sm font-bold shrink-0 transition-all ${
                      editingQuestion.correct_answer === opt.label
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
                      setEditingQuestion({
                        ...editingQuestion,
                        options: newOptions,
                      });
                    }}
                    placeholder={`Option ${opt.label}`}
                  />
                </div>
              ))}
              <p className="text-xs text-slate-400">
                Click a letter to mark it as the correct answer
              </p>
            </section>
          )}

        {/* Essay fields */}
        {editingQuestion.type === "Essay" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Answer Rubric / Guidelines
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                value={editingQuestion.rubric || ""}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    rubric: e.target.value,
                  })
                }
                placeholder="Describe the expected answer and grading criteria..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Maximum Points
              </label>
              <Input
                type="number"
                min={1}
                className="h-10 w-32 px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500 transition-all shadow-none"
                value={editingQuestion.max_points || 10}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    max_points: Number(e.target.value) || 10,
                  })
                }
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
            Save Question
          </Button>
        </div>
      </section>
    </Modal>
  );
}
