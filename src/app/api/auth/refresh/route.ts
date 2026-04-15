import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!request.ok) {
    return NextResponse.json(
      { message: "Refresh failed" },
      { status: request.status },
    );
  }

  const data = await request.json();

  return NextResponse.json({
    access_token: data.access_token,
  });
}
