import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; 
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Only handle admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Protect `/admin` routes (redirect to login if no token)
  if (pathname.startsWith("/admin")) {
    const isAuthPage = pathname === "/admin/login";
    
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    
    if (!isAuthPage && !token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to admin routes
export const config = {
  matcher: ["/admin/:path*"]
};
