import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  getAccessTokenCookieOptions,
  getAccessTtlSeconds,
  verifyToken,
  signToken,
} from "@/src/lib/authServer";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const payload = verifyToken(refreshToken);

  if (!payload || payload.type !== "refresh") {
    return NextResponse.json({ error: "Session expired. Please sign in again." }, { status: 401 });
  }

  const accessTtl = getAccessTtlSeconds();
  const accessToken = signToken(
    { sub: payload.sub, username: payload.username, role: payload.role, type: "access" },
    accessTtl,
  );

  const response = NextResponse.json({
    user: { id: payload.sub, username: payload.username, role: payload.role },
    expiresAt: Math.floor(Date.now() / 1000) + accessTtl,
  });

  response.cookies.set(ACCESS_COOKIE, accessToken, getAccessTokenCookieOptions(accessTtl));

  return response;
}
