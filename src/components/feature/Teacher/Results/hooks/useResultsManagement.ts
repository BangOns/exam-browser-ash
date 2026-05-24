import { useCallback, useEffect, useMemo, useState } from "react";
import { StudentSubmission, AnswerItem } from "@/types/submission";
import { resultColumns } from "../components/ResultColumns";
import { resultsData, submissionsData } from "@/data/dummy/result";
import { ResultRow } from "@/types/result";
import { useGetExam } from "../../Exams/hooks/useGetExam";
import { ExamList } from "@/types/exam";
import { ResultExamColumns } from "../components/ResultExamColumns";

export function useResultsManagement() {
  const { data } = useGetExam();

  const [exams, setExams] = useState<ExamList[]>([]);
  const [selectedSubmission, selectedSubmissionSet] =
    useState<StudentSubmission | null>(null);
  const [submissionsDataResult, submissionsDataResultSet] =
    useState<StudentSubmission[]>(submissionsData);
  const [resultDataSubmission, resultDataSubmissionSet] =
    useState<ResultRow[]>(resultsData);
  /** Teacher-entered essay scores: { [questionId]: points } */
  const [essayScores, setEssayScores] = useState<Record<number, number>>({});

  const [saved, setSaved] = useState(false);
  const avg = useMemo(() => {
    if (!resultDataSubmission.length) return 0;
    return Math.round(
      resultDataSubmission.reduce((s, r) => s + r.score, 0) /
        resultDataSubmission.length,
    );
  }, [resultDataSubmission]);
  const highest = useMemo(() => {
    if (!resultDataSubmission.length) return 0;
    return Math.max(...resultDataSubmission.map((r) => r.score));
  }, [resultDataSubmission]);
  const lowest = useMemo(() => {
    if (!resultDataSubmission.length) return 0;
    return Math.min(...resultDataSubmission.map((r) => r.score));
  }, [resultDataSubmission]);
  const passed = useMemo(() => {
    if (!resultDataSubmission.length) return 0;
    return resultDataSubmission.filter((r) => r.score >= 60).length;
  }, [resultDataSubmission]);

  const openDetail = useCallback((submission: StudentSubmission) => {
    selectedSubmissionSet(submission);
    // Pre-populate scores from any previously earned points
    const pre: Record<number, number> = {};
    submission.answers.forEach((a: AnswerItem) => {
      if (a.earnedPoints !== undefined) pre[a.questionId] = a.earnedPoints;
    });
    setEssayScores(pre);
    setSaved(false);
  }, []);

  const closeDetail = useCallback(() => {
    selectedSubmissionSet(null);
    setEssayScores({});
    setSaved(false);
  }, []);

  const setEssayScore = useCallback((questionId: number, points: number) => {
    setEssayScores((prev) => ({ ...prev, [questionId]: points }));
    setSaved(false);
  }, []);

  const saveGrading = useCallback(() => {
    setSaved(true);
  }, []);
  const columns = useMemo(() => {
    return resultColumns({
      submissionsData: submissionsDataResult,
      openDetail,
    });
  }, [submissionsDataResult, openDetail]);
  const columnsTableResult = useMemo(() => {
    return ResultExamColumns();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setExams(data?.data);
    }
  }, [data]);
  return {
    exams,
    columnsTableResult,
    selectedSubmission,
    essayScores,
    saved,
    openDetail,
    closeDetail,
    setEssayScore,
    saveGrading,
    columns,
    submissionsDataResult,
    submissionsDataResultSet,
    resultDataSubmission,
    resultDataSubmissionSet,
    avg,
    highest,
    lowest,
    passed,
  };
}
