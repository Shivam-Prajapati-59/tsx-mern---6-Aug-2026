import "server-only";

import { createHmac } from "node:crypto";

export const ACCESS_COOKIE = "sw_access";
export const REFRESH_COOKIE = "sw_refresh";

const DEFAULT_SECRET = "dev-insecure-secret-change-me";
const DEFAULT_ACCESS_TTL_SECONDS = 120; // short so silent refresh is demonstrable
const DEFAULT_REFRESH_TTL_SECONDS = 60 * 60; // 1 hour

export type TokenPayload = {
  sub: string;
  username: string;
  role: string;
  exp: number;
  iat: number;
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function getSecret(): string {
  return process.env.JWT_SECRET ?? DEFAULT_SECRET;
}

export function getAccessTtlSeconds(): number {
  const parsed = Number.parseInt(process.env.JWT_ACCESS_EXPIRES ?? "", 10);
  return Number.isNaN(parsed) ? DEFAULT_ACCESS_TTL_SECONDS : parsed;
}

export function getRefreshTtlSeconds(): number {
  const parsed = Number.parseInt(process.env.JWT_REFRESH_EXPIRES ?? "", 10);
  return Number.isNaN(parsed) ? DEFAULT_REFRESH_TTL_SECONDS : parsed;
}

function sign(data: string): string {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function signToken(
  payload: Omit<TokenPayload, "exp" | "iat">,
  ttlSeconds: number,
): string {
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: now,
    exp: now + ttlSeconds,
  };
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(body));
  const signature = sign(`${encodedHeader}.${encodedPayload}`);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(token: string | undefined | null): TokenPayload | null {
  if (!token) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }
  const [encodedHeader, encodedPayload, signature] = parts;
  const expected = sign(`${encodedHeader}.${encodedPayload}`);
  if (expected !== signature) {
    return null;
  }
  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as TokenPayload;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function getAccessTokenCookieOptions(ttlSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ttlSeconds,
  };
}

export function getRefreshTokenCookieOptions(ttlSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth",
    maxAge: ttlSeconds,
  };
}