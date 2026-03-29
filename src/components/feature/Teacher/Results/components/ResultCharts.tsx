"use client";

import {
  Chart,
  BarController,
  BarElement,
  ArcElement,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { useEffect, useRef } from "react";
import { resultsData, submissionsData } from "@/data/dummy/result";
import { initialQuestions } from "@/data/dummy/questions";

Chart.register(
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

// ─── Derived data ────────────────────────────────────────────────────────────

/** 1. Score distribution buckets */
const buckets = [
  { range: "0–20", min: 0, max: 20 },
  { range: "21–40", min: 21, max: 40 },
  { range: "41–60", min: 41, max: 60 },
  { range: "61–80", min: 61, max: 80 },
  { range: "81–100", min: 81, max: 100 },
];
const bucketCounts = buckets.map(
  (b) => resultsData.filter((r) => r.score >= b.min && r.score <= b.max).length,
);

/** 2. MCQ correct vs incorrect across all submissions */
let totalCorrect = 0;
let totalWrong = 0;
submissionsData.forEach((sub) => {
  sub.answers.forEach((a) => {
    const q = initialQuestions.find((q) => q.id === a.questionId);
    if (!q || q.type !== "Multiple Choice") return;
    if (q.correctAnswer === a.answer) totalCorrect++;
    else totalWrong++;
  });
});

/** 3. Per-student breakdown: score bar */
const studentNames = resultsData.map((r) => r.student.split(" ")[0]);
const studentScores = resultsData.map((r) => r.score);

// ─── Chart hook ──────────────────────────────────────────────────────────────
function useChart<T extends "bar" | "doughnut">(
  type: T,
  data: ChartData<T>,
  options: ChartOptions<T>,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<T> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart<T>(ref.current, { type, data, options });
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

// ─── Sub-charts ──────────────────────────────────────────────────────────────

function ScoreDistributionChart() {
  const ref = useChart(
    "bar",
    {
      labels: buckets.map((b) => b.range),
      datasets: [
        {
          label: "Students",
          data: bucketCounts,
          backgroundColor: [
            "rgba(239,68,68,0.75)",
            "rgba(239,68,68,0.75)",
            "rgba(245,158,11,0.75)",
            "rgba(34,197,94,0.75)",
            "rgba(34,197,94,0.75)",
          ],
          borderColor: [
            "#ef4444",
            "#ef4444",
            "#f59e0b",
            "#22c55e",
            "#22c55e",
          ],
          borderWidth: 1.5,
          borderRadius: 6,
        },
      ],
    } satisfies ChartData<"bar">,
    {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              ` ${ctx.parsed.y} student${ctx.parsed.y !== 1 ? "s" : ""}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: "#94a3b8", font: { size: 11 } },
          grid: { color: "rgba(148,163,184,0.15)" },
        },
      },
    } satisfies ChartOptions<"bar">,
  );
  return <canvas ref={ref} />;
}

function CorrectVsIncorrectChart() {
  const ref = useChart(
    "doughnut",
    {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          data: [totalCorrect, totalWrong],
          backgroundColor: ["rgba(34,197,94,0.8)", "rgba(239,68,68,0.8)"],
          borderColor: ["#22c55e", "#ef4444"],
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    } satisfies ChartData<"doughnut">,
    {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#64748b", font: { size: 11 }, padding: 16 },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const total = totalCorrect + totalWrong;
              const pct = total
                ? Math.round((ctx.parsed / total) * 100)
                : 0;
              return ` ${ctx.parsed} answers (${pct}%)`;
            },
          },
        },
      },
    } satisfies ChartOptions<"doughnut">,
  );
  return <canvas ref={ref} />;
}

function PerStudentScoreChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    /** Inline plugin: draw a dashed horizontal line at y=60 */
    const thresholdPlugin = {
      id: "thresholdLine",
      afterDraw(chart: Chart) {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea) return;
        const y = scales.y.getPixelForValue(60);
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = "rgba(148,163,184,0.7)";
        ctx.lineWidth = 1.5;
        ctx.moveTo(chartArea.left, y);
        ctx.lineTo(chartArea.right, y);
        ctx.stroke();
        ctx.setLineDash([]);
        // label
        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText("Pass (60)", chartArea.left + 4, y - 4);
        ctx.restore();
      },
    };

    chartRef.current = new Chart<"bar">(canvasRef.current, {
      type: "bar",
      data: {
        labels: studentNames,
        datasets: [
          {
            label: "Score",
            data: studentScores,
            backgroundColor: studentScores.map((s) =>
              s >= 80
                ? "rgba(34,197,94,0.75)"
                : s >= 60
                  ? "rgba(245,158,11,0.75)"
                  : "rgba(239,68,68,0.75)",
            ),
            borderColor: studentScores.map((s) =>
              s >= 80 ? "#22c55e" : s >= 60 ? "#f59e0b" : "#ef4444",
            ),
            borderWidth: 1.5,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Score: ${ctx.parsed.y ?? ""}`,
              afterLabel: (ctx) =>
                (ctx.parsed.y ?? 0) >= 60 ? "✓ Passed" : "✗ Below threshold",
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#94a3b8", font: { size: 11 } },
          },
          y: {
            min: 0,
            max: 100,
            ticks: { stepSize: 20, color: "#94a3b8", font: { size: 11 } },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
        },
      },
      plugins: [thresholdPlugin],
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} />;
}


// ─── Public component ─────────────────────────────────────────────────────────

export default function ResultCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Score Distribution */}
      <div className="glass-card p-5 animate-slide-up">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Score Distribution
        </p>
        <p className="text-xs text-slate-400 mb-4">Students per score range</p>
        <div className="h-44">
          <ScoreDistributionChart />
        </div>
      </div>

      {/* Correct vs Incorrect MCQ */}
      <div className="glass-card p-5 animate-slide-up">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          MCQ Accuracy
        </p>
        <p className="text-xs text-slate-400 mb-4">
          Correct vs incorrect answers across all submissions
        </p>
        <div className="h-44">
          <CorrectVsIncorrectChart />
        </div>
      </div>

      {/* Per-student score */}
      <div className="glass-card p-5 animate-slide-up">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Student Scores
        </p>
        <p className="text-xs text-slate-400 mb-4">
          Individual score vs pass threshold (60)
        </p>
        <div className="h-44">
          <PerStudentScoreChart />
        </div>
      </div>
    </div>
  );
}
