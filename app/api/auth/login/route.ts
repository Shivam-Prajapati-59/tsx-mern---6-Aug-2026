import { NextResponse, type NextRequest } from "next/server";
import { MOCK_CREDENTIALS } from "@/src/lib/constants";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  getAccessTokenCookieOptions,
  getAccessTtlSeconds,
  getRefreshTokenCookieOptions,
  getRefreshTtlSeconds,
  signToken,
} from "@/src/lib/authServer";

const USER = { id: "usr_1", username: MOCK_CREDENTIALS.username, role: "viewer" };

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };

    if (
      body.username !== MOCK_CREDENTIALS.username ||
      body.password !== MOCK_CREDENTIALS.password
    ) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const accessTtl = getAccessTtlSeconds();
    const refreshTtl = getRefreshTtlSeconds();

    const accessToken = signToken({ sub: USER.id, username: USER.username, role: USER.role }, accessTtl);
    const refreshToken = signToken({ sub: USER.id, username: USER.username, role: USER.role }, refreshTtl);

    const response = NextResponse.json({
      user: { id: USER.id, username: USER.username, role: USER.role },
      expiresAt: Math.floor(Date.now() / 1000) + accessTtl,
    });

    response.cookies.set(ACCESS_COOKIE, accessToken, getAccessTokenCookieOptions(accessTtl));
    response.cookies.set(REFRESH_COOKIE, refreshToken, getRefreshTokenCookieOptions(refreshTtl));

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
