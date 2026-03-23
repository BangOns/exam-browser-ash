"use client";

import Link from "next/link";
import { use } from "react";

type QuestionResult = {
  number: number;
  question: string;
  type: "Multiple Choice" | "Essay";
  studentAnswer: string;
  correctAnswer: string;
  points: number;
  maxPoints: number;
  isCorrect: boolean;
};

type ExamDetail = {
  id: string;
  exam: string;
  subject: string;
  date: string;
  score: number;
  grade: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
  totalTime: string;
  questions: QuestionResult[];
};

const examDetailsMap: Record<string, ExamDetail> = {
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
      { number: 1, question: "What is the powerhouse of the cell?", type: "Multiple Choice", studentAnswer: "Mitochondria", correctAnswer: "Mitochondria", points: 5, maxPoints: 5, isCorrect: true },
      { number: 2, question: "What is the function of chloroplast?", type: "Multiple Choice", studentAnswer: "Photosynthesis", correctAnswer: "Photosynthesis", points: 5, maxPoints: 5, isCorrect: true },
      { number: 3, question: "Which organelle is responsible for protein synthesis?", type: "Multiple Choice", studentAnswer: "Ribosome", correctAnswer: "Ribosome", points: 5, maxPoints: 5, isCorrect: true },
      { number: 4, question: "What is osmosis?", type: "Multiple Choice", studentAnswer: "Movement of water across a membrane", correctAnswer: "Movement of water across a semipermeable membrane", points: 4, maxPoints: 5, isCorrect: false },
      { number: 5, question: "Explain the process of cell division (mitosis) in detail.", type: "Essay", studentAnswer: "Mitosis consists of prophase, metaphase, anaphase, and telophase. During prophase, chromosomes condense. In metaphase, they align. Anaphase pulls them apart, and telophase reforms the nucleus.", correctAnswer: "Complete explanation covering all phases: prophase (chromosome condensation), metaphase (alignment at metaphase plate), anaphase (sister chromatid separation), telophase (nuclear envelope reformation), and cytokinesis.", points: 8, maxPoints: 10, isCorrect: false },
      { number: 6, question: "What is DNA replication?", type: "Multiple Choice", studentAnswer: "Process of copying DNA before cell division", correctAnswer: "Process of copying DNA before cell division", points: 5, maxPoints: 5, isCorrect: true },
      { number: 7, question: "Name the four bases in DNA", type: "Multiple Choice", studentAnswer: "Adenine, Thymine, Guanine, Cytosine", correctAnswer: "Adenine, Thymine, Guanine, Cytosine", points: 5, maxPoints: 5, isCorrect: true },
      { number: 8, question: "What is natural selection?", type: "Multiple Choice", studentAnswer: "Survival of the fittest", correctAnswer: "Survival of the fittest", points: 5, maxPoints: 5, isCorrect: true },
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
      { number: 1, question: "Apa pengertian dari kalimat efektif?", type: "Multiple Choice", studentAnswer: "Kalimat yang sesuai kaidah bahasa", correctAnswer: "Kalimat yang sesuai kaidah bahasa", points: 2, maxPoints: 2, isCorrect: true },
      { number: 2, question: "Jelaskan perbedaan kata baku dan tidak baku.", type: "Essay", studentAnswer: "Kata baku adalah kata yang sesuai EYD, sedangkan tidak baku tidak sesuai EYD.", correctAnswer: "Kata baku sesuai PUEBI/EYD dan digunakan dalam situasi resmi. Kata tidak baku digunakan dalam percakapan sehari-hari.", points: 6, maxPoints: 10, isCorrect: false },
      { number: 3, question: "Sinonim dari kata 'gundah'?", type: "Multiple Choice", studentAnswer: "Gelisah", correctAnswer: "Gelisah", points: 2, maxPoints: 2, isCorrect: true },
      { number: 4, question: "Antonim dari kata 'abadi'?", type: "Multiple Choice", studentAnswer: "Sementara", correctAnswer: "Fana", points: 0, maxPoints: 2, isCorrect: false },
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
      { number: 1, question: "When was the Declaration of Independence signed?", type: "Multiple Choice", studentAnswer: "August 17, 1945", correctAnswer: "August 17, 1945", points: 4, maxPoints: 4, isCorrect: true },
      { number: 2, question: "Who proclaimed Indonesian independence?", type: "Multiple Choice", studentAnswer: "Soekarno and Hatta", correctAnswer: "Soekarno and Hatta", points: 4, maxPoints: 4, isCorrect: true },
      { number: 3, question: "Explain the causes and effects of the Youth Pledge.", type: "Essay", studentAnswer: "The Youth Pledge of 1928 united Indonesian youth under one nation, one language, and one homeland. It was driven by growing nationalist sentiment.", correctAnswer: "Complete analysis of the 1928 Youth Pledge: colonial context, regional youth movements, roles of key figures, and its significance for national unity.", points: 8, maxPoints: 10, isCorrect: false },
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
      { number: 1, question: "Solve: 2x + 5 = 15", type: "Multiple Choice", studentAnswer: "x = 5", correctAnswer: "x = 5", points: 2, maxPoints: 2, isCorrect: true },
      { number: 2, question: "What is the derivative of x³?", type: "Multiple Choice", studentAnswer: "3x²", correctAnswer: "3x²", points: 2, maxPoints: 2, isCorrect: true },
      { number: 3, question: "Solve the quadratic equation x² - 5x + 6 = 0", type: "Multiple Choice", studentAnswer: "x = 2, x = 4", correctAnswer: "x = 2, x = 3", points: 0, maxPoints: 2, isCorrect: false },
      { number: 4, question: "Prove that the sum of angles in a triangle is 180°.", type: "Essay", studentAnswer: "Draw a line parallel to the base through the apex. Alternate angles prove the sum is 180°.", correctAnswer: "Rigorous proof using parallel lines and alternate interior angles, with clear logical steps.", points: 6, maxPoints: 10, isCorrect: false },
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
      { number: 1, question: "What is the past tense of 'buy'?", type: "Multiple Choice", studentAnswer: "Bought", correctAnswer: "Bought", points: 3, maxPoints: 3, isCorrect: true },
      { number: 2, question: "Choose the correct sentence:", type: "Multiple Choice", studentAnswer: "She doesn't like coffee.", correctAnswer: "She doesn't like coffee.", points: 3, maxPoints: 3, isCorrect: true },
      { number: 3, question: "Write a short essay about the importance of education.", type: "Essay", studentAnswer: "Education is the key to personal and societal growth. It empowers individuals with knowledge, critical thinking skills, and opportunities for better career prospects.", correctAnswer: "A well-structured essay discussing personal development, societal impact, economic benefits, and future implications of education.", points: 9, maxPoints: 10, isCorrect: false },
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
      { number: 1, question: "What is Newton's Second Law?", type: "Multiple Choice", studentAnswer: "F = ma", correctAnswer: "F = ma", points: 3, maxPoints: 3, isCorrect: true },
      { number: 2, question: "What is the SI unit of force?", type: "Multiple Choice", studentAnswer: "Newton", correctAnswer: "Newton", points: 3, maxPoints: 3, isCorrect: true },
      { number: 3, question: "What is kinetic energy?", type: "Multiple Choice", studentAnswer: "Energy of motion", correctAnswer: "Energy of motion", points: 3, maxPoints: 3, isCorrect: true },
      { number: 4, question: "Describe the principle of conservation of energy.", type: "Essay", studentAnswer: "Energy cannot be created or destroyed, only transformed from one form to another.", correctAnswer: "Complete explanation of the conservation of energy principle with examples of energy transformation, mathematical representation, and real-world applications.", points: 6, maxPoints: 10, isCorrect: false },
    ],
  },
};

export default function StudentResultDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const detail = examDetailsMap[id];

  if (!detail) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-12 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Result Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">The exam result you are looking for does not exist.</p>
          <Link
            href="/student/results"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors"
          >
            ← Back to Results
          </Link>
        </div>
      </div>
    );
  }

  const scoreColor =
    detail.score >= 85
      ? "#22c55e"
      : detail.score >= 70
      ? "#0ea5e9"
      : detail.score >= 60
      ? "#f59e0b"
      : "#ef4444";

  const scoreGradient =
    detail.score >= 85
      ? "from-emerald-500 to-emerald-600"
      : detail.score >= 70
      ? "from-sky-500 to-sky-600"
      : detail.score >= 60
      ? "from-amber-500 to-amber-600"
      : "from-red-500 to-red-600";

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/student/results"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Results
      </Link>

      {/* Header card */}
      <div className="glass-card overflow-hidden">
        <div className={`bg-linear-to-r ${scoreGradient} px-6 py-5 text-white`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{detail.exam}</h1>
              <p className="text-white/80 text-sm mt-1">{detail.subject} · {detail.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold">{detail.score}</p>
                <p className="text-white/70 text-xs mt-0.5">Score</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl font-bold">{detail.grade}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
          {[
            { label: "Correct Answers", value: `${detail.correctAnswers}/${detail.totalQuestions}` },
            { label: "Accuracy", value: `${Math.round((detail.correctAnswers / detail.totalQuestions) * 100)}%` },
            { label: "Time Spent", value: detail.timeSpent },
            { label: "Total Time", value: detail.totalTime },
          ].map((stat, i) => (
            <div key={i} className="p-4 text-center">
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Score distribution */}
      <div className="glass-card p-6">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Score Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: "Correct", count: detail.questions.filter((q) => q.isCorrect).length, color: "#22c55e" },
            { label: "Partial", count: detail.questions.filter((q) => !q.isCorrect && q.points > 0).length, color: "#f59e0b" },
            { label: "Wrong", count: detail.questions.filter((q) => q.points === 0).length, color: "#ef4444" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-16 font-medium">{item.label}</span>
              <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${detail.questions.length > 0 ? (item.count / detail.questions.length) * 100 : 0}%`,
                    background: item.color,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-slate-700 w-8 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Question breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800">Question Details</h3>
        {detail.questions.map((q) => (
          <div
            key={q.number}
            className={`glass-card p-5 border-l-4 animate-slide-up`}
            style={{ borderLeftColor: q.isCorrect ? "#22c55e" : q.points > 0 ? "#f59e0b" : "#ef4444" }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: q.isCorrect ? "#22c55e" : q.points > 0 ? "#f59e0b" : "#ef4444" }}
                >
                  {q.number}
                </div>
                <div>
                  <p className="font-medium text-slate-700 text-sm">{q.question}</p>
                  <span className={`badge mt-1 ${q.type === "Multiple Choice" ? "badge-info" : "badge-neutral"}`}>
                    {q.type}
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-600 shrink-0" style={{ color: scoreColor }}>
                {q.points}/{q.maxPoints}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Your Answer</p>
                <p className={`text-sm ${q.isCorrect ? "text-emerald-700" : "text-red-600"}`}>{q.studentAnswer}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-semibold mb-1">Correct Answer</p>
                <p className="text-sm text-emerald-700">{q.correctAnswer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
