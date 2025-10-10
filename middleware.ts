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
    Routes.GOALS,
    Routes.BRAND,
    Routes.CATEGORY,
    Routes.ORDERS,
    Routes.PRIVACY_POLICY,
    Routes.TERMS_AND_CONDITIONS,
    Routes.FAQS,
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  const isPrivateRoute = privateRoutes.includes(pathname);

  const isDynamicPrivateRoute =
    pathname.startsWith("/user-detail/") ||
    pathname.startsWith("/product-detail/") ||
    pathname.startsWith("edit-product/") ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/category/");

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
  }

  if (!token && (isPrivateRoute || isDynamicPrivateRoute)) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  return NextResponse.next();
}
