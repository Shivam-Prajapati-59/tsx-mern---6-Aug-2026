import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "@/src/lib/authServer";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, "", { ...getAccessTokenCookieOptions(0), maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, "", { ...getRefreshTokenCookieOptions(0), maxAge: 0 });
  return response;
}
