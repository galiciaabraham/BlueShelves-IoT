// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const ROUTES = {
  protected: ["/", "/profile", "/print"] as const,
  public: ["/login", "/register"] as const,
  admin: ["/print"] as const,
};

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = (ROUTES.protected as ReadonlyArray<string>).includes(path);
  const isPublicRoute = (ROUTES.public as ReadonlyArray<string>).includes(path);
  const isAdminRoute = (ROUTES.admin as ReadonlyArray<string>).includes(path);

  if (isProtectedRoute) {
    const session = await getSession();
    if (!session?.id) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isAdminRoute && session.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  else if (isPublicRoute) {
    const session = await getSession();
    if (session?.id) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}
