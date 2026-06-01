// ig in next.js 16 it got replaced by a proxy.js and proxy function, but ig they have similar working principle

// our custom Middleware
/*
import { NextResponse } from "next/server";

export function middleware(request) {
  // redirecting user to about with middleware
  // will get too many redirects error though because redirect run on every request even on that redirect
  return NextResponse.redirect(new URL(`/about`, request.url));
}

// with matcher we can config on which routes middleware will run
export const config = { matcher: [`/account`, `/cabins`] };
*/

// using middleware from auth.js (yes it's also an auth function) but we need to specify callbacks in authConfig
import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = { matcher: ["/account/:path*"] };
