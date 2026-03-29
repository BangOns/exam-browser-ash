import { ResultRow } from "@/types/result";
import { StudentSubmission } from "@/types/submission";

export const resultsData: ResultRow[] = [
  {
    id: "r1",
    student: "Siti Nurhaliza",
    exam: "UTS Mathematics",
    score: 92,
    grade: "A",
    time: "85 min",
    date: "Mar 20, 2026",
    submissionId: "sub-1",
  },
  {
    id: "r2",
    student: "Maya Anggraeni",
    exam: "UTS Mathematics",
    score: 88,
    grade: "A-",
    time: "92 min",
    date: "Mar 20, 2026",
    submissionId: "sub-2",
  },
  {
    id: "r3",
    student: "Reza Pratama",
    exam: "UTS Mathematics",
    score: 76,
    grade: "B+",
    time: "110 min",
    date: "Mar 20, 2026",
    submissionId: "sub-3",
  },
  {
    id: "r4",
    student: "Budi Santoso",
    exam: "Quiz Physics",
    score: 65,
    grade: "C+",
    time: "55 min",
    date: "Mar 21, 2026",
    submissionId: "sub-4",
  },
  {
    id: "r5",
    student: "Andi Wijaya",
    exam: "Quiz Chemistry",
    score: 42,
    grade: "D",
    time: "40 min",
    date: "Mar 19, 2026",
    submissionId: "sub-5",
  },
  {
    id: "r6",
    student: "Putri Handayani",
    exam: "UTS Mathematics",
    score: 95,
    grade: "A+",
    time: "78 min",
    date: "Mar 20, 2026",
    submissionId: "sub-6",
  },
  {
    id: "r7",
    student: "Dani Saputra",
    exam: "Quiz Physics",
    score: 81,
    grade: "A-",
    time: "48 min",
    date: "Mar 21, 2026",
    submissionId: "sub-7",
  },
  {
    id: "r8",
    student: "Lina Marlina",
    exam: "UTS Mathematics",
    score: 70,
    grade: "B",
    time: "115 min",
    date: "Mar 20, 2026",
    submissionId: "sub-8",
  },
];

/**
 * Question IDs used in each exam (from initialQuestions in dummy/questions.ts):
 *  UTS Mathematics  → question ids: 2, 9, 10 (has essay)
 *  Quiz Physics     → question ids: 1, 7, 3  (has essay)
 *  Quiz Chemistry   → question ids: 5, 11, 6 (has essay)
 */
export const submissionsData: StudentSubmission[] = [
  // ---------- UTS Mathematics ----------
  {
    id: "sub-1",
    studentName: "Siti Nurhaliza",
    examId: 1,
    examName: "UTS Mathematics",
    answers: [
      { questionId: 2, answer: "A" }, // correct
      { questionId: 9, answer: "A" }, // correct
      { questionId: 10, answer: "The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration using oxygen and glucose. The inner membrane folds (cristae) increase surface area for the electron transport chain, generating energy efficiently for cellular processes.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-2",
    studentName: "Maya Anggraeni",
    examId: 1,
    examName: "UTS Mathematics",
    answers: [
      { questionId: 2, answer: "A" }, // correct
      { questionId: 9, answer: "B" }, // wrong
      { questionId: 10, answer: "Mitochondria produce energy in the form of ATP. They do this through oxidative phosphorylation and the Krebs cycle. The electron transport chain on the inner mitochondrial membrane pumps protons to create a gradient that drives ATP synthase.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-3",
    studentName: "Reza Pratama",
    examId: 1,
    examName: "UTS Mathematics",
    answers: [
      { questionId: 2, answer: "C" }, // wrong
      { questionId: 9, answer: "A" }, // correct
      { questionId: 10, answer: "Mitochondria make ATP for energy. They have an outer and inner membrane. The inner membrane is folded into cristae. Energy production happens inside.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-4",
    studentName: "Budi Santoso",
    examId: 3,
    examName: "Quiz Physics",
    answers: [
      { questionId: 1, answer: "A" }, // correct
      { questionId: 7, answer: "A" }, // correct
      { questionId: 3, answer: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. The light-dependent reactions occur in the thylakoids and the Calvin cycle occurs in the stroma. 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-5",
    studentName: "Andi Wijaya",
    examId: 4,
    examName: "Quiz Chemistry",
    answers: [
      { questionId: 5, answer: "B" }, // wrong
      { questionId: 11, answer: "A" }, // correct
      { questionId: 6, answer: "The water cycle involves evaporation from oceans and lakes, condensation into clouds, and precipitation as rain or snow. Water then collects in rivers and groundwater, and the cycle repeats.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-6",
    studentName: "Putri Handayani",
    examId: 1,
    examName: "UTS Mathematics",
    answers: [
      { questionId: 2, answer: "A" }, // correct
      { questionId: 9, answer: "A" }, // correct
      { questionId: 10, answer: "Mitochondria are double-membraned organelles responsible for aerobic respiration. They generate ATP via the electron transport chain located on the inner mitochondrial membrane (cristae). The matrix houses the Krebs cycle enzymes. They also regulate apoptosis and calcium signaling. Their genome suggests endosymbiotic bacterial origin.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-7",
    studentName: "Dani Saputra",
    examId: 3,
    examName: "Quiz Physics",
    answers: [
      { questionId: 1, answer: "A" }, // correct
      { questionId: 7, answer: "A" }, // correct
      { questionId: 3, answer: "Photosynthesis converts light energy to chemical energy stored as glucose. Light reactions split water and produce NADPH and ATP. The Calvin cycle uses these to fix CO₂ into glucose. Plants release O₂ as a byproduct.", earnedPoints: undefined },
    ],
  },
  {
    id: "sub-8",
    studentName: "Lina Marlina",
    examId: 1,
    examName: "UTS Mathematics",
    answers: [
      { questionId: 2, answer: "A" }, // correct
      { questionId: 9, answer: "D" }, // wrong
      { questionId: 10, answer: "Mitochondria are found in eukaryotic cells and produce ATP through cellular respiration. The process involves glycolysis, the Krebs cycle, and oxidative phosphorylation. Without mitochondria, cells cannot produce enough energy for most functions.", earnedPoints: undefined },
    ],
  },
];
