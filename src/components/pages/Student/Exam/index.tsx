"use client";

import { useExamStudentManagement } from "@/components/feature/Student/Exam/hooks/useExamStudentManagement";
import { initialQuestions } from "@/data/dummy/questions";
import HeaderExamStudent from "@/components/feature/Student/Exam/components/HeaderExamStudent";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonOptions from "@/components/feature/Student/Exam/components/ButtonOptions";
import ModalSubmitExam from "@/components/feature/Student/Exam/components/ModalSubmitExam";
import NavigationQuestions from "@/components/feature/Student/Exam/components/NavigationQuestions";

export default function StudentExamPage() {
  const {
    currentQ,
    answers,
    showViolation,
    violationMsg,
    setCurrentQ,
    setAnswers,
    setShowViolation,
    question,
    answeredCount,
    progress,
  } = useExamStudentManagement({ questions: initialQuestions });

  return (
    <article className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <HeaderExamStudent
        examName="Quiz Physics"
        examSubject="Physics"
        progress={progress}
        answeredCount={answeredCount}
        setShowViolation={setShowViolation}
        initialQuestions={initialQuestions.length}
      />

      {/* Main content */}
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
              {question.question || ""}
            </h2>

            {/* Options */}
            {question.type.toLowerCase() === "multiple choice" && (
              <div className="space-y-3">
                {question.options?.map((option, idx) => (
                  <ButtonOptions
                    key={idx}
                    idx={idx}
                    option={option}
                    answers={answers as Record<number, string>}
                    currentQ={currentQ}
                    setAnswers={setAnswers}
                  />
                ))}
              </div>
            )}
            {question.type.toLowerCase() === "essay" && (
              <section className="space-y-3">
                <textarea
                  value={answers[currentQ] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [currentQ]: e.target.value })
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
          answers={answers as Record<number, string>}
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
    </article>
  );
}
