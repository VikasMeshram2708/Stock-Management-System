import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value;
  // console.log("coo-call-mid", token);

  const path = request.nextUrl.pathname;
  // console.log("path", path);

  const isPublicPath = path === "/login" || path === "/signup";
  const isPrivatePath = path === "/profile";

  // is user isn't having token and wanted to 
  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
