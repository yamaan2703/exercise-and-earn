import { NextRequest, NextResponse } from "next/server";
import { Routes } from "./routes/Routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const publicRoutes = [Routes.LOGIN];

  const privateRoutes = [
    Routes.DASHBOARD,
    Routes.USERS,
    Routes.PRODUCTS,
    Routes.ADD_PRODUCT,
    Routes.ORDERS,
    Routes.ORDER_HISTORY,
    Routes.PRIVACY_POLICY,
    Routes.TERMS_AND_CONDITIONS,
    Routes.FAQS,
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  const isPrivateRoute = privateRoutes.includes(pathname);

  const isDynamicPrivateRoute =
    pathname.startsWith("/user-detail/") ||
    pathname.startsWith("/product-detail/");

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && (isPrivateRoute || isDynamicPrivateRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
