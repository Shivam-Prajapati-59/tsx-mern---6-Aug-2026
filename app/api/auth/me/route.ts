import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, verifyToken } from "@/src/lib/authServer";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const payload = verifyToken(accessToken);

  if (!payload || payload.type !== "access") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: payload.sub, username: payload.username, role: payload.role },
    expiresAt: payload.exp,
  });
}
