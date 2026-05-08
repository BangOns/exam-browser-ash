import { ApiResponse } from "@/types/api-response";
import { QuestionList, QuestionRequest } from "@/types/question";
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

export async function POST(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const datas = (await req.json()) as QuestionRequest; // ✅ fix
    const res = await fetch(`${process.env.API_URL}/question`, {
      method: "POST",
      body: JSON.stringify(datas), // ✅ fix
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // ✅ tambah
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
