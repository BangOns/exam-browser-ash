import { ApiResponse } from "@/types/api-response";
import { ClassList, ClassRequestEdit } from "@/types/class";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("access_token")?.value;
  const classId = (await params).id;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/class/${classId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await res.json()) as ApiResponse<ClassList>;

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
  const classId = (await params).id;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const datas = (await req.json()) as ClassRequestEdit; // ✅ fix
    const res = await fetch(`${process.env.API_URL}/class/${classId}`, {
      method: "PUT",
      body: JSON.stringify(datas), // ✅ fix
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // ✅ tambah
      },
    });

    const data = (await res.json()) as ApiResponse<ClassList>;

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
  const classId = (await params).id;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/class/${classId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await res.json()) as ApiResponse<ClassList>;

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
