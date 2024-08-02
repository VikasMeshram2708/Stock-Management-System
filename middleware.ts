import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value;
  // console.log('coo-call-mid', token);

  if (!token) return null;

  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (path === "/profile" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
