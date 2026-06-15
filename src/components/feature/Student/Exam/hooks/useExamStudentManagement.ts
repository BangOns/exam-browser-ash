import { useGetExamById } from "@/components/feature/Teacher/Exams/hooks/uesGetExamById";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePostExitExam } from "./mutations/usePostExitExam";
import { usePostSubmiExam } from "./mutations/usePostSubmitExam";
import { AnswerRequest } from "@/types/answer";
import { useExamCountdown } from "./useCountDownExam";
import { toast } from "react-toastify";

export function useExamStudentManagement() {
  const params = useParams<{ id?: string }>();
  const id = params?.id ?? "";
  const STORAGE_KEY = `exam_answers_${id}`;
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: dataExam, isLoading: isLoadingQuestions } = useGetExamById({
    examId: id,
    page,
  });
  const { mutateAsync: exitExam, isPending: isPendingExitExam } =
    usePostExitExam();
  const { mutateAsync: submitExam, isPending: isPendingSubmit } =
    usePostSubmiExam();
  const { minutes, seconds, isExpired, isLoading } = useExamCountdown(
    dataExam?.data.schedule?.exam_date,
    dataExam?.data.schedule?.end_time,
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [showViolation, setShowViolation] = useState(false);
  const [violationMsg, setViolationMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<"exit" | "submit" | null>(null);
  const question = useMemo(
    () => dataExam?.data.questions[currentQ],
    [currentQ, dataExam?.data.questions],
  );
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = useMemo(
    () =>
      Math.round(
        (answeredCount / (dataExam?.data.questions.length ?? 1)) * 100,
      ),
    [answeredCount, dataExam?.data.questions.length],
  );

  // Save answers to LocalStorage
  const saveAnswersToStorage = useCallback(
    (newAnswers: Record<number, number | string>) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
      } catch (error) {
        console.error("Failed save answers:", error);
      }
    },
    [STORAGE_KEY],
  );
  const handleModalOpen = useCallback((props: "exit" | "submit") => {
    setModalOpen(true);
    setModalProps(props);
  }, []);
  //  Action untuk menyimpan jawaban ke localStorage
  const handleAnswer = useCallback(
    (questionId: string, answer: number | string) => {
      setAnswers((prev) => {
        const updated = {
          ...prev,
          [questionId]: answer,
        };

        saveAnswersToStorage(updated);

        return updated;
      });
    },
    [saveAnswersToStorage],
  );
  const loadAnswersFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) return {};

      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed load answers:", error);
      return {};
    }
  }, [STORAGE_KEY]);
  // mendapatkan jawaban sesuai dengan nomor soal
  const getCurrentAnswer = useCallback(
    (questionId: string) => {
      return answers[questionId] ?? "";
    },
    [answers],
  );
  // clear answers
  const clearAnswersStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, [STORAGE_KEY]);
  const handleExitExam = useCallback(() => {
    if (!id) return;
    exitExam(
      { id, type: "exit" },
      {
        onError: (err) => setErrorMsg(err.data.message),
        onSuccess: () => {
          setErrorMsg("");
          clearAnswersStorage();
          setModalProps(null);
          router.push(`/student`);
        },
      },
    );
  }, [id, exitExam, router, clearAnswersStorage]);
  const handleSubmitExam = useCallback(() => {
    if (!id) return;

    if (Object.keys(answers).length === 0 && !isExpired) {
      setErrorMsg("Jawaban masih kosong");
      return;
    }

    const data: AnswerRequest = {
      answers: Object.entries(answers).map(([question_id, answer]) => ({
        question_id,
        answer: String(answer),
      })),
    };

    submitExam(
      { id, data },
      {
        onError: (err) =>
          toast.error(err?.data?.message ?? "Terjadi kesalahan"),

        onSuccess: () => {
          setErrorMsg("");
          clearAnswersStorage();
          setModalProps(null);
          router.push("/student");
        },
      },
    );
  }, [id, submitExam, router, clearAnswersStorage, answers, isExpired]);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setModalProps(null);
  }, []);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    const checkCheat = () => {
      setViolationMsg(
        "You violated the exam rules by switching tabs or leaving the strict fullscreen mode. Your access has been revoked and you have been suspended. Please contact the administrator.",
      );
      setShowViolation(true);
      handleExitExam();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) checkCheat();
    };

    const handleBlur = () => {
      checkCheat();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [router, handleExitExam]);

  useEffect(() => {
    const submitExamForce = () => {
      setViolationMsg(
        "Exam time has ended. Your answers have been submitted automatically.",
      );
      setShowViolation(true);
      handleSubmitExam();
    };

    if (isLoading) return;
    if (!isExpired) return;

    submitExamForce();
  }, [isExpired, isLoading]);

  //  Mendapatkan data keseluruhan soal yang sudah di isi didalam local storage
  useEffect(() => {
    const savedAnswers = loadAnswersFromStorage();
    setAnswers(savedAnswers);
  }, [loadAnswersFromStorage]);
  return {
    errorMsg,
    currentQ,
    answers,
    initialQuestions: dataExam?.data.questions ?? [],
    showViolation,
    violationMsg,
    setCurrentQ,
    setAnswers,
    setShowViolation,
    setViolationMsg,
    question,
    answeredCount,
    progress,
    isLoadingQuestions,
    handleExitExam,
    handleSubmitExam,
    handleAnswer,
    getCurrentAnswer,
    clearAnswersStorage,
    handleModalOpen,
    modalOpen,
    modalProps,
    setModalProps,
    handleModalClose,
    handlePageChange,
    isPendingExitExam,
    isPendingSubmit,
    minutes,
    seconds,
  };
}
