import { User } from "@/types/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const url = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  try {
    const request = await fetch(`${url}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!request.ok) {
      const errorData = await request.json();
      throw new Error(errorData.message || "Gagal mengambil data user");
    }
    const data = (await request.json()) as User;
    const response = NextResponse.json(data);

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Login gagal" },
      { status: 500 },
    );
  }
}
