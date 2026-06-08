import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { ExamAttemptResource } from "@/types/result";

const exportExamResultsToExcel = async (
  responseData: ExamAttemptResource[],
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Hasil Ujian");

  const headerStyle = {
    font: {
      bold: true,
      color: { argb: "FFFFFFFF" },
    },
    fill: {
      type: "pattern" as const,
      pattern: "solid" as const,
      fgColor: { argb: "FF4472C4" },
    },
    alignment: {
      horizontal: "center" as const,
      vertical: "middle" as const,
    },
    border: {
      top: { style: "thin" as const },
      left: { style: "thin" as const },
      bottom: { style: "thin" as const },
      right: { style: "thin" as const },
    },
  };

  const cellStyle = {
    alignment: {
      horizontal: "left" as const,
      vertical: "middle" as const,
    },
    border: {
      top: { style: "thin" as const, color: { argb: "FFD0D0D0" } },
      left: { style: "thin" as const, color: { argb: "FFD0D0D0" } },
      bottom: { style: "thin" as const, color: { argb: "FFD0D0D0" } },
      right: { style: "thin" as const, color: { argb: "FFD0D0D0" } },
    },
  };

  worksheet.columns = [
    { header: "No", key: "no", width: 8 },
    { header: "Nama", key: "nama", width: 25 },
    { header: "NISN", key: "nisn", width: 18 },
    { header: "Kelas", key: "kelas", width: 16 },
    { header: "Ujian", key: "exam", width: 24 },
    { header: "Status", key: "status", width: 16 },
    { header: "Nilai", key: "total_score", width: 12 },
    { header: "Keluar", key: "exit_count", width: 12 },
    { header: "Mulai", key: "started_at", width: 24 },
    { header: "Dikumpulkan", key: "submitted_at", width: 24 },
  ];

  const headerRow = worksheet.getRow(1);

  headerRow.height = 30;
  headerRow.eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  responseData.forEach((student, index) => {
    const row = worksheet.addRow({
      no: index + 1,
      nama: student.nama,
      nisn: student.nisn,
      kelas: student.kelas,
      exam: student.attempts.exam,
      status: student.attempts.status,
      total_score: student.attempts.total_score,
      exit_count: student.attempts.exit_count,
      started_at: student.attempts.started_at ?? "-",
      submitted_at: student.attempts.submitted_at ?? "-",
    });

    row.height = 22;

    row.eachCell((cell) => {
      Object.assign(cell, cellStyle);
    });

    const statusCell = row.getCell("status");

    switch (student.attempts.status) {
      case "Submitted":
        statusCell.font = {
          bold: true,
          color: { argb: "FF217346" },
        };
        break;

      case "Exited":
        statusCell.font = {
          bold: true,
          color: { argb: "FFC00000" },
        };
        break;
    }

    const scoreCell = row.getCell("total_score");

    if (student.attempts.total_score === 0) {
      scoreCell.font = {
        color: { argb: "FFC00000" },
      };
    }
  });

  worksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  worksheet.autoFilter = {
    from: "A1",
    to: "J1",
  };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Hasil_Ujian_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export default exportExamResultsToExcel;
