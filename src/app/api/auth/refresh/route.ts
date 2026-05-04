import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/response";
import { RefreshResponse } from "@/types/refresh";

export async function POST(req: Request) {
  const url = process.env.API_URL;

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  const request = await fetch(`${url}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!request.ok) {
    const response = NextResponse.json(
      { message: "Refresh failed" },
      { status: request.status },
    );
    response.cookies.delete("refresh_token");
    response.cookies.delete("access_token");
    response.cookies.delete("role");
    return response;
  }

  const data = (await request.json()) as ApiResponse<RefreshResponse>;

  const response = NextResponse.json({
    access_token: data.data.token,
  });

  response.cookies.set("access_token", data.data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
