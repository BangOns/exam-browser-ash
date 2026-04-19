import { ApiResponse } from "@/types/response";
import { DataUserLogin } from "@/types/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const url = process.env.API_URL;
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("access_token")?.value;
  try {
    const request = await fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      credentials: "include",
    });
    if (!request.ok) {
      throw new Error("Login gagal");
    }
    const data = (await request.json()) as ApiResponse<DataUserLogin>;
    const response = NextResponse.json(data);

    response.cookies.delete("refresh_token");
    response.cookies.delete("access_token");
    response.cookies.delete("role");

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Login gagal" }, { status: 500 });
  }
}
