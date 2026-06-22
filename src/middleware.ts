import { NextRequest, NextResponse } from "next/server";

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("accessToken")?.value ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  const isAdminRoute = pathname.startsWith("/admin");
  const isStudentRoute = pathname.startsWith("/student");

  if (!isAdminRoute && !isStudentRoute) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = parseJwtPayload(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = payload.role as string;

  if (isAdminRoute && role !== "admin" && role !== "super_admin") {
    return NextResponse.redirect(new URL("/student", request.url));
  }

  if (isStudentRoute && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isStudentRoute && role === "super_admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
};
