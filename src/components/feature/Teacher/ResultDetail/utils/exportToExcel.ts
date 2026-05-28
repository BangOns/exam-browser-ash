import { ExamAttemptResource } from "@/types/result";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver"; // npm install file-saver

const exportExamResultsToExcel = async (
  responseData: ExamAttemptResource[],
) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Hasil Ujian");

  // ── Header styling ──────────────────────────────────────────
  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFFFF" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF4472C4" } },
    alignment: { horizontal: "center", vertical: "middle" },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const cellStyle = {
    alignment: { horizontal: "left", vertical: "middle" },
    border: {
      top: { style: "thin", color: { argb: "FFD0D0D0" } },
      left: { style: "thin", color: { argb: "FFD0D0D0" } },
      bottom: { style: "thin", color: { argb: "FFD0D0D0" } },
      right: { style: "thin", color: { argb: "FFD0D0D0" } },
    },
  };

  // ── Columns ─────────────────────────────────────────────────
  sheet.columns = [
    { key: "no", width: 5 },
    { key: "nama", width: 20 },
    { key: "nisn", width: 18 },
    { key: "kelas", width: 16 },
    { key: "exam", width: 22 },
    { key: "status", width: 12 },
    { key: "total_score", width: 12 },
    { key: "exit_count", width: 12 },
    { key: "started_at", width: 24 },
    { key: "submitted_at", width: 24 },
  ];

  // ── Header row ───────────────────────────────────────────────
  const headers = [
    "No",
    "Nama",
    "NISN",
    "Kelas",
    "Ujian",
    "Status",
    "Nilai",
    "Keluar",
    "Mulai",
    "Dikumpulkan",
  ];
  const headerRow = sheet.addRow(headers);
  headerRow.height = 30;
  headerRow.eachCell((cell) => Object.assign(cell, headerStyle));

  // ── Data rows ────────────────────────────────────────────────
  let rowNumber = 1;

  responseData.forEach((student) => {
    if (student.attempts.length === 0) {
      // Student tanpa attempt
      const row = sheet.addRow([
        rowNumber++,
        student.nama,
        student.nisn,
        student.kelas,
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ]);
      row.height = 22;
      row.eachCell((cell) => Object.assign(cell, cellStyle));
      return;
    }

    student.attempts.forEach((attempt, idx) => {
      const row = sheet.addRow([
        idx === 0 ? rowNumber++ : "", // No hanya di baris pertama
        idx === 0 ? student.nama : "",
        idx === 0 ? student.nisn : "",
        idx === 0 ? student.kelas : "",
        attempt.exam,
        attempt.status,
        attempt.total_score,
        attempt.exit_count,
        attempt.started_at ?? "-",
        attempt.submitted_at ?? "-",
      ]);

      row.height = 22;
      row.eachCell((cell) => Object.assign(cell, cellStyle));

      // Warna status
      const statusCell = row.getCell("status");
      if (attempt.status === "Submitted") {
        statusCell.font = { bold: true, color: { argb: "FF217346" } };
      } else if (attempt.status === "Exited") {
        statusCell.font = { bold: true, color: { argb: "FFC00000" } };
      }

      // Warna nilai rendah
      const scoreCell = row.getCell("total_score");
      if (attempt.total_score === 0) {
        scoreCell.font = { color: { argb: "FFC00000" } };
      }
    });

    // Merge cells kolom siswa jika attempts > 1
    if (student.attempts.length > 1) {
      const startRow = sheet.rowCount - student.attempts.length + 1;
      const endRow = sheet.rowCount;
      ["no", "nama", "nisn", "kelas"].forEach((key) => {
        const col = sheet.getColumn(key).number;
        sheet.mergeCells(startRow, col, endRow, col);
      });
    }
  });

  // ── Freeze header & auto filter ──────────────────────────────
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = { from: "A1", to: "J1" };

  // ── Export ───────────────────────────────────────────────────
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `Hasil_Ujian_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export default exportExamResultsToExcel;
