import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;
  const protectedPrefixes = ["/admin", "/teacher", "/student"];
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  // Belum login, akses protected route → ke login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Sudah login, akses halaman login → redirect ke dashboard sesuai role
  if (token && pathname === "/") {
    const dashboardMap: Record<string, string> = {
      admin: "/admin",
      teacher: "/teacher",
      student: "/student",
    };
    const destination = role ? dashboardMap[role] : null;

    if (destination) {
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  // Sudah login, akses route role lain → redirect ke dashboard sendiri
  if (token && role && isProtectedRoute) {
    const isOwnArea = pathname.startsWith(`/${role}`);
    if (!isOwnArea) {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
  }

  return NextResponse.next();
}
