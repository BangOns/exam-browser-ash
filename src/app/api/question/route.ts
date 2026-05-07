import { ApiResponse } from "@/types/api-response";
import { ClassList } from "@/types/class";
import { QuestionList } from "@/types/question";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/question`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await res.json()) as ApiResponse<QuestionList>;

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
