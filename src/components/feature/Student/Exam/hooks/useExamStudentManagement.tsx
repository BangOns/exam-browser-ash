import { Question } from "@/types/question";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useExamStudentManagement({
  questions,
}: {
  questions: Question[];
}) {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [showViolation, setShowViolation] = useState(false);
  const [violationMsg, setViolationMsg] = useState("");
  const question = useMemo(() => questions[currentQ], [currentQ, questions]);
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = useMemo(
    () => Math.round((answeredCount / questions.length) * 100),
    [answeredCount, questions.length],
  );
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

  return {
    currentQ,
    answers,
    showViolation,
    violationMsg,
    setCurrentQ,
    setAnswers,
    setShowViolation,
    setViolationMsg,
    question,
    answeredCount,
    progress,
  };
}
