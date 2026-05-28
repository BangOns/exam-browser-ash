import { ApiResponse } from "@/types/response";
import { DataUserLogin } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = process.env.API_URL || "http://localhost:8000/api";

  try {
    const { username, password } = (await req.json()) as {
      username: string;
      password: string;
    };
    const request = await fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!request.ok) {
      const errorData = await request.json();
      throw new Error(errorData.message || "Login gagal");
    }
    const data = (await request.json()) as ApiResponse<DataUserLogin>;
    const response = NextResponse.json(data);
    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("refresh_token", data.data.refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("access_token", data.data.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("role", data.data.user.role, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Login gagal" },
      { status: 500 },
    );
  }
}
