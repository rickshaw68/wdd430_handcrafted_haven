import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Only protect routes starting with /dashboard
  const isProtectedRoute = path.startsWith("/dashboard");

  if (path === "/login") {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
}

  if (isProtectedRoute) {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    // If no session, force redirect to login
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Role-based restriction logic
    if (path.startsWith("/dashboard/seller") && session.role !== "seller") {
      return NextResponse.redirect(new URL("/dashboard/userdashboard", req.nextUrl));
    }

    if (path.startsWith("/dashboard/user") && session.role !== "user") {
      return NextResponse.redirect(new URL("/dashboard/sellerdashboard", req.nextUrl));
    }
  }

  // 2. Everything else (home, about, contact, etc.) is automatically allowed
  return NextResponse.next();
}

export const config = {
  // Keep the matcher broad so the middleware runs, 
  // but let the logic inside determine the protection
  matcher: ['/((?!api|_next/static|_next/image|images/|favicon.ico).*)'],
};


