import { useMemo, useState } from "react";
import { StudentSubmission, AnswerItem } from "@/types/submission";
import { resultsData, submissionsData } from "@/data/dummy/result";
import { ResultRow } from "@/types/result";
import { useGetExam } from "../../Exams/hooks/useGetExamByIdTeacher";
import { ResultExamColumns } from "../components/ResultExamColumns";

export function useResultsManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading: isLoadingExam } = useGetExam({ page });

  const [selectedSubmission, selectedSubmissionSet] =
    useState<StudentSubmission | null>(null);
  const [submissionsDataResult, submissionsDataResultSet] =
    useState<StudentSubmission[]>(submissionsData);
  const [resultDataSubmission, resultDataSubmissionSet] =
    useState<ResultRow[]>(resultsData);
  const [essayScores, setEssayScores] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState(false);

  const openDetail = (submission: StudentSubmission) => {
    selectedSubmissionSet(submission);
    // Pre-populate scores from any previously earned points
    const pre: Record<number, number> = {};
    submission.answers.forEach((a: AnswerItem) => {
      if (a.earnedPoints !== undefined) pre[a.questionId] = a.earnedPoints;
    });
    setEssayScores(pre);
    setSaved(false);
  };
  const closeDetail = () => {
    selectedSubmissionSet(null);
    setEssayScores({});
    setSaved(false);
  };
  const setEssayScore = (questionId: number, points: number) => {
    setEssayScores((prev) => ({ ...prev, [questionId]: points }));
    setSaved(false);
  };
  const saveGrading = () => {
    setSaved(true);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
  const columnsTableResult = useMemo(() => {
    return ResultExamColumns();
  }, []);

  return {
    exams: data?.data || [],
    isLoadingExam,
    pagination: data?.meta.pagination,
    columnsTableResult,
    selectedSubmission,
    essayScores,
    saved,
    openDetail,
    closeDetail,
    handlePageChange,
    setEssayScore,
    saveGrading,
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
