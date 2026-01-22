// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "./lib/edgeAuth";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const user = token ? decodeJwt(token) : null;

  // 🔒 Dashboard protected
  if (path.startsWith("/dashboard") && !user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ✍️ Writer routes
  if (path.startsWith("/dashboard/writer")) {
    if (!user || !["writer", "admin"].includes(user.role)) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  // 👑 Admin routes
  if (path.startsWith("/dashboard/admin")) {
    if (!user || user.role !== "admin") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
