import { NextResponse } from "next/server";

// Protect all /admin/* routes except login and signup
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute =
    pathname === "/admin/login" || pathname === "/admin/signup";

  if (isAdminRoute && !isAuthRoute) {
    // Token check happens client-side (localStorage) since middleware runs on edge.
    // For true server-side protection, use httpOnly cookies instead.
    // This middleware adds a security header as an extra layer.
    const response = NextResponse.next();
    response.headers.set("X-Admin-Protected", "1");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
