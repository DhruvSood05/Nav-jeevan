import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Skip middleware for auth callback
  if (req.nextUrl.pathname === "/auth/callback") {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is signed in and the current path is /login redirect the user to /dashboard
  if (session && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not signed in and the current path is /dashboard redirect the user to /login
  if (!session && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard", "/login", "/auth/callback"],
};
