"use client";

import { useExamStudentManagement } from "@/components/feature/Student/Exam/hooks/useExamStudentManagement";
import HeaderExamStudent from "@/components/feature/Student/Exam/components/HeaderExamStudent";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonOptions from "@/components/feature/Student/Exam/components/ButtonOptions";
import ModalSubmitExam from "@/components/feature/Student/Exam/components/ModalSubmitExam";
import NavigationQuestions from "@/components/feature/Student/Exam/components/NavigationQuestions";
import LoadSpinner from "@/components/ui/load-spinner";
import ModalExam from "@/components/feature/Student/Exam/components/ModalExam";

export default function StudentExamPage() {
  const {
    currentQ,
    answers,
    showViolation,
    violationMsg,
    setCurrentQ,
    setShowViolation,
    question,
    initialQuestions,
    answeredCount,
    progress,
    isLoadingQuestions,

    handleAnswer,
    getCurrentAnswer,
    handleModalOpen,
    modalOpen,
    modalProps,
    handleExitExam,
    handleModalClose,
    handleSubmitExam,
    isPendingExitExam,
    isPendingSubmit,
  } = useExamStudentManagement();

  return (
    <article className="min-h-screen bg-slate-50 flex flex-col">
      {!isLoadingQuestions && question ? (
        <>
          <HeaderExamStudent
            handleModalExit={() => handleModalOpen("exit")}
            handleModalSubmit={() => handleModalOpen("submit")}
            examName="Quiz Physics"
            examSubject="Physics"
            progress={progress}
            answeredCount={answeredCount}
            initialQuestions={initialQuestions.length}
          />
          <section className="flex-1 flex max-w-7xl mx-auto w-full p-6 gap-6">
            {/* Question area */}
            <article className="flex-1">
              <div className="glass-card p-8 animate-scale-in" key={currentQ}>
                {/* Question number */}
                <header className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">
                    {currentQ + 1}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    Question {currentQ + 1} of {initialQuestions.length}
                  </span>
                </header>

                {/* Question text */}
                <h2 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
                  {question?.question || ""}
                </h2>

                {/* Options */}
                {question.type.toLowerCase() === "multiple choice" && (
                  <div className="space-y-3">
                    {question.options?.map((option, idx) => (
                      <ButtonOptions
                        key={idx}
                        idx={idx}
                        option={option}
                        selected={getCurrentAnswer(question.id) === option.text}
                        onSelect={(value) => handleAnswer(question.id, value)}
                      />
                    ))}
                  </div>
                )}
                {question.type.toLowerCase() === "essay" && (
                  <section className="space-y-3">
                    <textarea
                      value={getCurrentAnswer(question.id)}
                      onChange={(e) =>
                        handleAnswer(question.id, e.target.value)
                      }
                      className="w-full h-40 p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50"
                    />
                  </section>
                )}

                {/* Navigation buttons */}
                <section className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  <Button
                    onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    className="px-5 py-3 cursor-pointer rounded-xl text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ArrowLeft />
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentQ(
                        Math.min(initialQuestions.length - 1, currentQ + 1),
                      )
                    }
                    disabled={currentQ === initialQuestions.length - 1}
                    className="px-5 py-3 cursor-pointer rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next
                    <ArrowRight />
                  </Button>
                </section>
              </div>
            </article>

            {/* Question navigation panel */}
            <NavigationQuestions
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              answers={answers as Record<string, number | string>}
              initialQuestions={initialQuestions}
              answeredCount={answeredCount}
            />
          </section>

          {/* Violation / Submit overlay */}
          {showViolation && (
            <ModalSubmitExam
              violationMsg={violationMsg}
              answeredCount={answeredCount}
              initialQuestions={initialQuestions.length}
              setShowViolation={setShowViolation}
            />
          )}
          {modalOpen && modalProps === "exit" && (
            <ModalExam
              title="Apakah Anda yakin ingin keluar"
              description="Jika anda keluar maka data semuat terhapus"
              submitText="Keluar"
              closeText="Batal"
              handleSubmit={handleExitExam}
              handleClose={handleModalClose}
              isPending={isPendingExitExam}
            />
          )}
          {modalOpen && modalProps === "submit" && (
            <ModalExam
              title="Apakah Anda yakin ingin mengumpulkan jawaban"
              description="Jika anda mengumpulkan jawaban maka data semuat terhapus"
              submitText="Kumpulkan"
              closeText="Batal"
              handleSubmit={handleSubmitExam}
              handleClose={handleModalClose}
              isPending={isPendingSubmit}
            />
          )}
        </>
      ) : (
        <section className="flex-1 flex justify-center items-center">
          <LoadSpinner />
        </section>
      )}
    </article>
  );
}
