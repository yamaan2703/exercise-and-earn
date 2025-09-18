import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = getCookie("token");

  const publicRoutes = ["/login"];

  const privateRoutes = [
    "/dashboard",
    "/users",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  const isPrivateRoute = privateRoutes.includes(pathname);

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
