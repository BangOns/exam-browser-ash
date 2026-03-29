import {
  ExamDetail,
  ResultDetail,
  ResultRow,
  ResultStudent,
} from "@/types/result";
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
      {
        questionId: 10,
        answer:
          "The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration using oxygen and glucose. The inner membrane folds (cristae) increase surface area for the electron transport chain, generating energy efficiently for cellular processes.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 10,
        answer:
          "Mitochondria produce energy in the form of ATP. They do this through oxidative phosphorylation and the Krebs cycle. The electron transport chain on the inner mitochondrial membrane pumps protons to create a gradient that drives ATP synthase.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 10,
        answer:
          "Mitochondria make ATP for energy. They have an outer and inner membrane. The inner membrane is folded into cristae. Energy production happens inside.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 3,
        answer:
          "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. The light-dependent reactions occur in the thylakoids and the Calvin cycle occurs in the stroma. 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 6,
        answer:
          "The water cycle involves evaporation from oceans and lakes, condensation into clouds, and precipitation as rain or snow. Water then collects in rivers and groundwater, and the cycle repeats.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 10,
        answer:
          "Mitochondria are double-membraned organelles responsible for aerobic respiration. They generate ATP via the electron transport chain located on the inner mitochondrial membrane (cristae). The matrix houses the Krebs cycle enzymes. They also regulate apoptosis and calcium signaling. Their genome suggests endosymbiotic bacterial origin.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 3,
        answer:
          "Photosynthesis converts light energy to chemical energy stored as glucose. Light reactions split water and produce NADPH and ATP. The Calvin cycle uses these to fix CO₂ into glucose. Plants release O₂ as a byproduct.",
        earnedPoints: undefined,
      },
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
      {
        questionId: 10,
        answer:
          "Mitochondria are found in eukaryotic cells and produce ATP through cellular respiration. The process involves glycolysis, the Krebs cycle, and oxidative phosphorylation. Without mitochondria, cells cannot produce enough energy for most functions.",
        earnedPoints: undefined,
      },
    ],
  },
];

export const recentResults: ResultStudent[] = [
  { exam: "Quiz Biology", score: 88, grade: "A-", date: "Mar 20, 2026" },
  { exam: "UTS Indonesian", score: 76, grade: "B+", date: "Mar 18, 2026" },
  { exam: "Quiz History", score: 92, grade: "A", date: "Mar 15, 2026" },
];
export const resultsDetail: ResultDetail[] = [
  {
    id: "1",
    exam: "Quiz Biology",
    subject: "Biology",
    score: 88,
    grade: "A-",
    date: "Mar 20, 2026",
    totalQuestions: 20,
    correctAnswers: 18,
  },
  {
    id: "2",
    exam: "UTS Indonesian",
    subject: "Indonesian",
    score: 76,
    grade: "B+",
    date: "Mar 18, 2026",
    totalQuestions: 40,
    correctAnswers: 30,
  },
  {
    id: "3",
    exam: "Quiz History",
    subject: "History",
    score: 92,
    grade: "A",
    date: "Mar 15, 2026",
    totalQuestions: 25,
    correctAnswers: 23,
  },
  {
    id: "4",
    exam: "UTS Mathematics",
    subject: "Mathematics",
    score: 68,
    grade: "B-",
    date: "Mar 10, 2026",
    totalQuestions: 40,
    correctAnswers: 27,
  },
  {
    id: "5",
    exam: "Quiz English",
    subject: "English",
    score: 95,
    grade: "A+",
    date: "Mar 8, 2026",
    totalQuestions: 30,
    correctAnswers: 29,
  },
  {
    id: "6",
    exam: "UTS Physics",
    subject: "Physics",
    score: 72,
    grade: "B",
    date: "Mar 5, 2026",
    totalQuestions: 35,
    correctAnswers: 25,
  },
];

export const examDetailsMap: Record<string, ExamDetail> = {
  "1": {
    id: "1",
    exam: "Quiz Biology",
    subject: "Biology",
    date: "Mar 20, 2026",
    score: 88,
    grade: "A-",
    totalQuestions: 20,
    correctAnswers: 18,
    timeSpent: "42 min",
    totalTime: "60 min",
    questions: [
      {
        number: 1,
        question: "What is the powerhouse of the cell?",
        type: "Multiple Choice",
        studentAnswer: "Mitochondria",
        correctAnswer: "Mitochondria",
        points: 5,
        maxPoints: 5,
        isCorrect: true,
      },
      {
        number: 2,
        question: "What is the function of chloroplast?",
        type: "Multiple Choice",
        studentAnswer: "Photosynthesis",
        correctAnswer: "Photosynthesis",
        points: 5,
        maxPoints: 5,
        isCorrect: true,
      },
      {
        number: 3,
        question: "Which organelle is responsible for protein synthesis?",
        type: "Multiple Choice",
        studentAnswer: "Ribosome",
        correctAnswer: "Ribosome",
        points: 5,
        maxPoints: 5,
        isCorrect: true,
      },
      {
        number: 4,
        question: "What is osmosis?",
        type: "Multiple Choice",
        studentAnswer: "Movement of water across a membrane",
        correctAnswer: "Movement of water across a semipermeable membrane",
        points: 4,
        maxPoints: 5,
        isCorrect: false,
      },
      {
        number: 5,
        question: "Explain the process of cell division (mitosis) in detail.",
        type: "Essay",
        studentAnswer:
          "Mitosis consists of prophase, metaphase, anaphase, and telophase. During prophase, chromosomes condense. In metaphase, they align. Anaphase pulls them apart, and telophase reforms the nucleus.",
        correctAnswer:
          "Complete explanation covering all phases: prophase (chromosome condensation), metaphase (alignment at metaphase plate), anaphase (sister chromatid separation), telophase (nuclear envelope reformation), and cytokinesis.",
        points: 8,
        maxPoints: 10,
        isCorrect: false,
      },
      {
        number: 6,
        question: "What is DNA replication?",
        type: "Multiple Choice",
        studentAnswer: "Process of copying DNA before cell division",
        correctAnswer: "Process of copying DNA before cell division",
        points: 5,
        maxPoints: 5,
        isCorrect: true,
      },
      {
        number: 7,
        question: "Name the four bases in DNA",
        type: "Multiple Choice",
        studentAnswer: "Adenine, Thymine, Guanine, Cytosine",
        correctAnswer: "Adenine, Thymine, Guanine, Cytosine",
        points: 5,
        maxPoints: 5,
        isCorrect: true,
      },
      {
        number: 8,
        question: "What is natural selection?",
        type: "Multiple Choice",
        studentAnswer: "Survival of the fittest",
        correctAnswer: "Survival of the fittest",
        points: 5,
        maxPoints: 5,
        isCorrect: true,
      },
    ],
  },
  "2": {
    id: "2",
    exam: "UTS Indonesian",
    subject: "Indonesian",
    date: "Mar 18, 2026",
    score: 76,
    grade: "B+",
    totalQuestions: 40,
    correctAnswers: 30,
    timeSpent: "85 min",
    totalTime: "90 min",
    questions: [
      {
        number: 1,
        question: "Apa pengertian dari kalimat efektif?",
        type: "Multiple Choice",
        studentAnswer: "Kalimat yang sesuai kaidah bahasa",
        correctAnswer: "Kalimat yang sesuai kaidah bahasa",
        points: 2,
        maxPoints: 2,
        isCorrect: true,
      },
      {
        number: 2,
        question: "Jelaskan perbedaan kata baku dan tidak baku.",
        type: "Essay",
        studentAnswer:
          "Kata baku adalah kata yang sesuai EYD, sedangkan tidak baku tidak sesuai EYD.",
        correctAnswer:
          "Kata baku sesuai PUEBI/EYD dan digunakan dalam situasi resmi. Kata tidak baku digunakan dalam percakapan sehari-hari.",
        points: 6,
        maxPoints: 10,
        isCorrect: false,
      },
      {
        number: 3,
        question: "Sinonim dari kata 'gundah'?",
        type: "Multiple Choice",
        studentAnswer: "Gelisah",
        correctAnswer: "Gelisah",
        points: 2,
        maxPoints: 2,
        isCorrect: true,
      },
      {
        number: 4,
        question: "Antonim dari kata 'abadi'?",
        type: "Multiple Choice",
        studentAnswer: "Sementara",
        correctAnswer: "Fana",
        points: 0,
        maxPoints: 2,
        isCorrect: false,
      },
    ],
  },
  "3": {
    id: "3",
    exam: "Quiz History",
    subject: "History",
    date: "Mar 15, 2026",
    score: 92,
    grade: "A",
    totalQuestions: 25,
    correctAnswers: 23,
    timeSpent: "35 min",
    totalTime: "45 min",
    questions: [
      {
        number: 1,
        question: "When was the Declaration of Independence signed?",
        type: "Multiple Choice",
        studentAnswer: "August 17, 1945",
        correctAnswer: "August 17, 1945",
        points: 4,
        maxPoints: 4,
        isCorrect: true,
      },
      {
        number: 2,
        question: "Who proclaimed Indonesian independence?",
        type: "Multiple Choice",
        studentAnswer: "Soekarno and Hatta",
        correctAnswer: "Soekarno and Hatta",
        points: 4,
        maxPoints: 4,
        isCorrect: true,
      },
      {
        number: 3,
        question: "Explain the causes and effects of the Youth Pledge.",
        type: "Essay",
        studentAnswer:
          "The Youth Pledge of 1928 united Indonesian youth under one nation, one language, and one homeland. It was driven by growing nationalist sentiment.",
        correctAnswer:
          "Complete analysis of the 1928 Youth Pledge: colonial context, regional youth movements, roles of key figures, and its significance for national unity.",
        points: 8,
        maxPoints: 10,
        isCorrect: false,
      },
    ],
  },
  "4": {
    id: "4",
    exam: "UTS Mathematics",
    subject: "Mathematics",
    date: "Mar 10, 2026",
    score: 68,
    grade: "B-",
    totalQuestions: 40,
    correctAnswers: 27,
    timeSpent: "110 min",
    totalTime: "120 min",
    questions: [
      {
        number: 1,
        question: "Solve: 2x + 5 = 15",
        type: "Multiple Choice",
        studentAnswer: "x = 5",
        correctAnswer: "x = 5",
        points: 2,
        maxPoints: 2,
        isCorrect: true,
      },
      {
        number: 2,
        question: "What is the derivative of x³?",
        type: "Multiple Choice",
        studentAnswer: "3x²",
        correctAnswer: "3x²",
        points: 2,
        maxPoints: 2,
        isCorrect: true,
      },
      {
        number: 3,
        question: "Solve the quadratic equation x² - 5x + 6 = 0",
        type: "Multiple Choice",
        studentAnswer: "x = 2, x = 4",
        correctAnswer: "x = 2, x = 3",
        points: 0,
        maxPoints: 2,
        isCorrect: false,
      },
      {
        number: 4,
        question: "Prove that the sum of angles in a triangle is 180°.",
        type: "Essay",
        studentAnswer:
          "Draw a line parallel to the base through the apex. Alternate angles prove the sum is 180°.",
        correctAnswer:
          "Rigorous proof using parallel lines and alternate interior angles, with clear logical steps.",
        points: 6,
        maxPoints: 10,
        isCorrect: false,
      },
    ],
  },
  "5": {
    id: "5",
    exam: "Quiz English",
    subject: "English",
    date: "Mar 8, 2026",
    score: 95,
    grade: "A+",
    totalQuestions: 30,
    correctAnswers: 29,
    timeSpent: "25 min",
    totalTime: "45 min",
    questions: [
      {
        number: 1,
        question: "What is the past tense of 'buy'?",
        type: "Multiple Choice",
        studentAnswer: "Bought",
        correctAnswer: "Bought",
        points: 3,
        maxPoints: 3,
        isCorrect: true,
      },
      {
        number: 2,
        question: "Choose the correct sentence:",
        type: "Multiple Choice",
        studentAnswer: "She doesn't like coffee.",
        correctAnswer: "She doesn't like coffee.",
        points: 3,
        maxPoints: 3,
        isCorrect: true,
      },
      {
        number: 3,
        question: "Write a short essay about the importance of education.",
        type: "Essay",
        studentAnswer:
          "Education is the key to personal and societal growth. It empowers individuals with knowledge, critical thinking skills, and opportunities for better career prospects.",
        correctAnswer:
          "A well-structured essay discussing personal development, societal impact, economic benefits, and future implications of education.",
        points: 9,
        maxPoints: 10,
        isCorrect: false,
      },
    ],
  },
  "6": {
    id: "6",
    exam: "UTS Physics",
    subject: "Physics",
    date: "Mar 5, 2026",
    score: 72,
    grade: "B",
    totalQuestions: 35,
    correctAnswers: 25,
    timeSpent: "82 min",
    totalTime: "90 min",
    questions: [
      {
        number: 1,
        question: "What is Newton's Second Law?",
        type: "Multiple Choice",
        studentAnswer: "F = ma",
        correctAnswer: "F = ma",
        points: 3,
        maxPoints: 3,
        isCorrect: true,
      },
      {
        number: 2,
        question: "What is the SI unit of force?",
        type: "Multiple Choice",
        studentAnswer: "Newton",
        correctAnswer: "Newton",
        points: 3,
        maxPoints: 3,
        isCorrect: true,
      },
      {
        number: 3,
        question: "What is kinetic energy?",
        type: "Multiple Choice",
        studentAnswer: "Energy of motion",
        correctAnswer: "Energy of motion",
        points: 3,
        maxPoints: 3,
        isCorrect: true,
      },
      {
        number: 4,
        question: "Describe the principle of conservation of energy.",
        type: "Essay",
        studentAnswer:
          "Energy cannot be created or destroyed, only transformed from one form to another.",
        correctAnswer:
          "Complete explanation of the conservation of energy principle with examples of energy transformation, mathematical representation, and real-world applications.",
        points: 6,
        maxPoints: 10,
        isCorrect: false,
      },
    ],
  },
};
