import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "auth_token";

const AUTH_PAGES = new Set(["/login", "/register"]);

const PUBLIC_PAGES = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
]);

const isProtectedPath = (pathname: string) => {
  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/subscribe" ||
    pathname.startsWith("/subscribe/")
  );
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/suscribe") {
    const url = request.nextUrl.clone();
    url.pathname = "/subscribe";
    return NextResponse.redirect(url);
  }

  // Ignore Next internals and common static assets.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/assets/")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  // Block protected routes when not authenticated.
  if (isProtectedPath(pathname) && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/subscribe") ? "/register" : "/login";
    return NextResponse.redirect(url);
  }

  // If authenticated, don't allow auth pages (login/register).
  if (isAuthenticated && AUTH_PAGES.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Explicit allow-list for public pages; everything else is currently allowed.
  // (If you later add more private sections, add them to isProtectedPath.)
  if (PUBLIC_PAGES.has(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
