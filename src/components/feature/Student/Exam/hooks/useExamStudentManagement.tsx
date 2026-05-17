import { useGetExamById } from "@/components/feature/Teacher/Exams/hooks/uesGetExamById";
import { QuestionList } from "@/types/question";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePostExitExam } from "./mutations/usePostExitExam";
import { usePostSubmiExam } from "./mutations/usePostSubmitExam";
import { AnswerRequest } from "@/types/answer";

export function useExamStudentManagement() {
  const params = useParams<{ id?: string }>();

  const id = params?.id ?? "";

  const STORAGE_KEY = `exam_answers_${id}`;

  const { data: dataExam, isLoading: isLoadingQuestions } = useGetExamById(id);
  const router = useRouter();

  const { mutateAsync: exitExam, isPending: isPendingExitExam } =
    usePostExitExam();
  const { mutateAsync: submitExam, isPending: isPendingSubmit } =
    usePostSubmiExam();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [showViolation, setShowViolation] = useState(false);
  const [violationMsg, setViolationMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<"exit" | "submit" | null>(null);
  const [initialQuestions, setInitialQuestions] = useState<QuestionList[]>([]);
  const question = useMemo(
    () => initialQuestions[currentQ],
    [currentQ, initialQuestions],
  );
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = useMemo(
    () => Math.round((answeredCount / initialQuestions.length) * 100),
    [answeredCount, initialQuestions.length],
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

    if (Object.keys(answers).length === 0) {
      setErrorMsg("Jawaban masih kosong");
      return;
    }

    const data: AnswerRequest = {
      answer: Object.entries(answers).map(([question_id, answer]) => ({
        question_id,
        answer: String(answer),
      })),
    };

    submitExam(
      { id, data },
      {
        onError: (err) =>
          setErrorMsg(err?.data?.message ?? "Terjadi kesalahan"),

        onSuccess: () => {
          setErrorMsg("");
          clearAnswersStorage();
          setModalProps(null);
          router.push("/student");
        },
      },
    );
  }, [id, submitExam, router, clearAnswersStorage, answers]);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setModalProps(null);
  }, []);

  //   useEffect(() => {
  //     // Basic auth/session verify
  //     const sessionToken = localStorage.getItem("exam_session");
  //     if (!sessionToken) {
  //       router.push("/student");
  //       return;
  //     }

  //     const checkCheat = () => {
  //       // 1. Revoke session token
  //       localStorage.removeItem("exam_session");
  //       // 2. Mark student as Suspended
  //       const ustr = localStorage.getItem("user");
  //       if (ustr) {
  //         try {
  //           const u = JSON.parse(ustr);
  //           localStorage.setItem(`suspended_user_${u.id}`, "true");
  //         } catch {
  //           // ignore
  //         }
  //       }
  //       // 3. Show violation modal
  //       setViolationMsg(
  //         "You violated the exam rules by switching tabs or leaving the strict fullscreen mode. Your access has been revoked and you have been suspended. Please contact the administrator.",
  //       );
  //       setShowViolation(true);
  //     };

  //     const handleVisibilityChange = () => {
  //       if (document.hidden) checkCheat();
  //     };

  //     const handleBlur = () => {
  //       checkCheat();
  //     };

  //     document.addEventListener("visibilitychange", handleVisibilityChange);
  //     window.addEventListener("blur", handleBlur);

  //     return () => {
  //       document.removeEventListener("visibilitychange", handleVisibilityChange);
  //       window.removeEventListener("blur", handleBlur);
  //     };
  //   }, [router]);

  // Mengambil data soal dari API
  useEffect(() => {
    if (dataExam?.data) {
      setInitialQuestions(dataExam.data.questions);
    }
  }, [dataExam]);

  //  Mendapatkan data keseluruhan soal yang sudah di isi didalam local storage
  useEffect(() => {
    const savedAnswers = loadAnswersFromStorage();

    setAnswers(savedAnswers);
  }, [loadAnswersFromStorage]);
  return {
    currentQ,
    answers,
    initialQuestions,
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
    isPendingExitExam,
    isPendingSubmit,
  };
}
