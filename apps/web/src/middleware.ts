import { NextRequest, NextResponse } from "next/server";

const AUTH_ENABLED = false;

const USER = process.env.BASIC_AUTH_USER;
const PASS = process.env.BASIC_AUTH_PASS;

export function middleware(req: NextRequest) {
  if (!AUTH_ENABLED) {
    return NextResponse.next();
  }

  // Se non sono definite le credenziali → lascia passare
  if (!USER || !PASS) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const encoded = authHeader.split(" ")[1];
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === USER && pass === PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Access denied", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected"',
    },
  });
}

export const config = {
  matcher: "/:path*",
};