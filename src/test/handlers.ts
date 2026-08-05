import { http, HttpResponse } from "msw";
import { STAR_WARS_PUBLIC_URL } from "@/src/lib/constants";
import { films, people, planets, species } from "@/src/test/fixtures";

const AUTH_USER = { id: "usr_1", username: "admin", role: "viewer" };

export const handlers = [
  http.get(`${STAR_WARS_PUBLIC_URL}/people`, () => HttpResponse.json(people)),
  http.get(`${STAR_WARS_PUBLIC_URL}/planets`, () => HttpResponse.json(planets)),
  http.get(`${STAR_WARS_PUBLIC_URL}/species`, () => HttpResponse.json(species)),
  http.get(`${STAR_WARS_PUBLIC_URL}/films`, () => HttpResponse.json(films)),

  http.get(`*/api/auth/me`, () =>
    HttpResponse.json({
      user: AUTH_USER,
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 60,
    }),
  ),
  http.post(`*/api/auth/refresh`, () =>
    HttpResponse.json({
      user: AUTH_USER,
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 60,
    }),
  ),
  http.post(`*/api/auth/logout`, () => HttpResponse.json({ ok: true })),
];