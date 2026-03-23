import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Redirect to login if accessing protected routes without token
  if (
    !token &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/teacher") ||
      pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect to dashboard based on role
  if (token) {
    const role = request.cookies.get("role")?.value;
    if (pathname === "/") {
      if (role === "admin")
        return NextResponse.redirect(new URL("/admin", request.url));
      if (role === "teacher")
        return NextResponse.redirect(new URL("/teacher", request.url));
      if (role === "student")
        return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/about/:path*",
};
