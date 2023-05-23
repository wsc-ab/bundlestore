import { authMiddleware } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, request) {
    // if calling api
    if (request.nextUrl.pathname.includes("/api/")) {
      return NextResponse.next();
    }

    // if not calling api

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/";

      return NextResponse.redirect(url);
    }

    // handle authenticated users
    return NextResponse.next();
  },
  publicRoutes: ["/", "/register"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
