import Modal from "@/components/ui/Modal";
import { SubmissionAnswer } from "@/types/answer";
import { QuestionOption } from "@/types/question";

interface Props {
  submission: SubmissionAnswer[] | null;
  essayScores: Record<string, number>;
  isOpen: boolean;
  onClose: () => void;
  onSetEssayScore: (questionId: string, points: number | string) => void;
  onSave: () => void;
  isPending: boolean;
}

export default function ResultDetailModal({
  submission,
  essayScores,
  isOpen,
  onClose,
  onSetEssayScore,
  onSave,
  isPending,
}: Props) {
  // Cek apakah ada soal essay
  const hasEssay = submission?.filter(
    (a: SubmissionAnswer) => a.question.type === "Essay",
  );

  // Cek apakah semua essay sudah dinilai
  const allEssayScored =
    hasEssay &&
    submission
      ?.filter((a: SubmissionAnswer) => a.question.type === "Essay")
      .every(
        (a: SubmissionAnswer) =>
          essayScores[a.question.id] !== undefined || // ✅ guru baru input
          (a.score !== null && a.score !== undefined), // ✅ sudah pernah dinilai
      );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Answer Detail"
      maxWidth="max-w-3xl"
    >
      {/* Informasi siswa */}
      {/*<div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="font-semibold text-slate-800">
          {submission?.student.name}
        </p>

        <p className="text-sm text-slate-500">{submission?.student.class}</p>

        <p className="text-sm text-slate-500">{submission?.exam.name}</p>
      </div>*/}

      {/* List jawaban */}
      <div className="space-y-4">
        {submission?.map((answerItem, idx) => {
          // Cek tipe soal
          const isMCQ = answerItem.question.type === "Multiple Choice";

          // Parse options JSON
          const parsedOptions = answerItem.question.options
            ? JSON.parse(answerItem.question.options)
            : [];

          // Cari opsi yang dipilih
          const selectedOption = parsedOptions.find(
            (o: QuestionOption) => o.label === answerItem.answer,
          );

          return (
            <div key={answerItem.id} className="rounded-xl border p-4">
              {/* Header soal */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                    {idx + 1}
                  </span>

                  <p className="text-sm font-medium">
                    {answerItem.question.question}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">
                  {answerItem.question.type}
                </span>
              </div>

              {/* Multiple Choice */}
              {isMCQ && (
                <div className="space-y-2">
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      answerItem.answer === answerItem.question.correct_answer
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {answerItem.answer}. {selectedOption?.text ?? "-"}
                  </div>

                  {!answerItem.is_correct && (
                    <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      Correct Answer: {answerItem.question.correct_answer}
                    </div>
                  )}
                </div>
              )}

              {/* Essay */}
              {!isMCQ && (
                <div className="space-y-3">
                  {/* Rubric */}
                  {answerItem.question.rubric && (
                    <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                      <span className="font-semibold">Jawaban benar:</span>{" "}
                      {answerItem.question.rubric}
                    </div>
                  )}

                  {/* Jawaban siswa */}
                  <div className="rounded-lg border p-3 text-sm whitespace-pre-wrap">
                    {answerItem.answer}
                  </div>

                  {/* Input score */}
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={
                        essayScores[answerItem.question.id] !== undefined
                          ? essayScores[answerItem.question.id]
                          : (answerItem.score ?? "")
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          onSetEssayScore(answerItem.question.id, "");
                          return;
                        }
                        const numericValue = Number(value);
                        if (
                          isNaN(numericValue) ||
                          numericValue > 100 ||
                          numericValue < 0
                        ) {
                          return;
                        }
                        onSetEssayScore(answerItem.question.id, numericValue);
                      }}
                      placeholder="0"
                      className="w-24 rounded-lg border px-3 py-2"
                    />
                    <span className="text-sm text-slate-500">/ 100</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tombol save */}
      {hasEssay && (
        <div className="mt-6 flex justify-end border-t pt-4">
          <button
            onClick={onSave}
            disabled={!allEssayScored || isPending}
            className="rounded-xl bg-emerald-500 px-5 py-2 text-white disabled:opacity-50"
          >
            Save Assessment
          </button>
        </div>
      )}
    </Modal>
  );
}
