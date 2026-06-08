import { ApiResponse } from "@/types/api-response";
import { ExamList } from "@/types/exam";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = req.nextUrl;
    const params = new URLSearchParams(
      Object.entries({
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
        search: searchParams.get("search"),
        status: searchParams.get("status"),
      })
        .filter(([, v]) => v !== null && v !== "")
        .map(([k, v]) => [k, String(v)]),
    );

    const res = await fetch(
      `${process.env.API_URL}/exam-teacher?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = (await res.json()) as ApiResponse<ExamList>;

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
