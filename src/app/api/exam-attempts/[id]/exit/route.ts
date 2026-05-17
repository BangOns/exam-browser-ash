import { ApiResponse } from "@/types/api-response";
import { ExamToken } from "@/types/exam-token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("access_token")?.value;
  const { id: examId } = await params;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type } = await req.json();

    const res = await fetch(
      `${process.env.API_URL}/exam-attempts/${examId}/exit`,
      {
        method: "POST",
        body: JSON.stringify({ type }),
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
