"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/src/lib/http";

export type AuthUser = {
  id: string;
  username: string;
  role: string;
};

export type AuthSession = {
  user: AuthUser;
  expiresAt: number;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const REFRESH_BUFFER_MS = 30_000;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlightRefresh = useRef<Promise<AuthSession> | null>(null);
  const refreshRef = useRef<() => Promise<void>>(async () => {});
  const sessionGenRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const armRefreshTimer = useCallback(
    (expiresAt: number) => {
      clearTimer();
      const remaining = expiresAt * 1000 - Date.now();
      const delay = Math.max(remaining - REFRESH_BUFFER_MS, 1_000);
      timerRef.current = setTimeout(() => {
        refreshRef.current().catch(() => setStatus("unauthenticated"));
      }, delay);
    },
    [clearTimer],
  );

  const applySession = useCallback(
    (session: AuthSession) => {
      setUser(session.user);
      setStatus("authenticated");
      armRefreshTimer(session.expiresAt);
    },
    [armRefreshTimer],
  );

  const refreshSession = useCallback(async () => {
    const gen = sessionGenRef.current;
    if (!inFlightRefresh.current) {
      inFlightRefresh.current = api
        .post<AuthSession>("/api/auth/refresh")
        .finally(() => {
          inFlightRefresh.current = null;
        });
    }
    const session = await inFlightRefresh.current;
    if (sessionGenRef.current !== gen) return;
    applySession(session);
  }, [applySession]);

  useEffect(() => {
    refreshRef.current = refreshSession;
  }, [refreshSession]);

  const login = useCallback(
    async (username: string, password: string) => {
      const gen = sessionGenRef.current;
      const session = await api.post<AuthSession>("/api/auth/login", { username, password });
      if (sessionGenRef.current !== gen) return;
      applySession(session);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    clearTimer();
    sessionGenRef.current += 1;
    inFlightRefresh.current = null;
    await api.post("/api/auth/logout");
    setUser(null);
    setStatus("unauthenticated");
  }, [clearTimer]);

  useEffect(() => {
    let active = true;
    const gen = sessionGenRef.current;
    api
      .get<AuthSession>("/api/auth/me")
      .then((session) => {
        if (active && sessionGenRef.current === gen) applySession(session);
      })
      .catch(() => {
        if (!active || sessionGenRef.current !== gen) return;
        refreshSession().catch(() => {
          if (!active || sessionGenRef.current !== gen) return;
          setUser(null);
          setStatus("unauthenticated");
        });
      });

    return () => {
      active = false;
      clearTimer();
    };
  }, [applySession, clearTimer, refreshSession]);

  useEffect(() => {
    const handleFocus = () => {
      if (status !== "authenticated") return;
      const gen = sessionGenRef.current;
      api
        .get<AuthSession>("/api/auth/me")
        .then((session) => {
          if (sessionGenRef.current === gen) applySession(session);
        })
        .catch(() => {
          if (sessionGenRef.current !== gen) return;
          refreshSession().catch(() => {
            if (sessionGenRef.current !== gen) return;
            setUser(null);
            setStatus("unauthenticated");
          });
        });
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [status, applySession, refreshSession]);

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}