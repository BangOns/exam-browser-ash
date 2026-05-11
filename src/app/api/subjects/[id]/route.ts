import { ApiResponse } from "@/types/api-response";
import { StudentList, StudentRequestEdit } from "@/types/student";
import { SubjectList, SubjectRequestEdit } from "@/types/subject";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("access_token")?.value;
  const subjectId = (await params).id;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/student/${subjectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await res.json()) as ApiResponse<StudentList>;

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
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("access_token")?.value;
  const subjectId = (await params).id;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const datas = (await req.json()) as SubjectRequestEdit; // ✅ fix
    const res = await fetch(`${process.env.API_URL}/subjects/${subjectId}`, {
      method: "PUT",
      body: JSON.stringify(datas), // ✅ fix
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // ✅ tambah
      },
    });

    const data = (await res.json()) as ApiResponse<SubjectList>;

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
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("access_token")?.value;
  const subjectId = (await params).id;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/subjects/${subjectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await res.json()) as ApiResponse<SubjectList>;

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
