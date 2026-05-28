import { AnswerRequest } from "@/types/answer";
import { ApiResponse } from "@/types/api-response";
import { ExamToken } from "@/types/exam-token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("access_token")?.value;
  const studentId = req.nextUrl.searchParams.get("student_id");
  const { id: examId } = await params;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const datas = (await req.json()) as AnswerRequest;
    const res = await fetch(
      `${process.env.API_URL}/exam-attempts/${examId}/edit?student_id=${studentId}`,
      {
        method: "PUT",
        body: JSON.stringify(datas),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ tambah
        },
      },
    );

    const data = (await res.json()) as ApiResponse<ExamToken>;

    return NextResponse.json(
      {
        data: data.data,
        message: data.message,
        status: data.status,
        meta: data.meta,
      },
      { status: res.status },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
