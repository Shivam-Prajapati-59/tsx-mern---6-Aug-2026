"use client";

import { useState, type FormEvent } from "react";
import { Loader2Icon, LogInIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { MOCK_CREDENTIALS } from "@/src/lib/constants";
import { useAuth } from "@/src/providers/AuthProvider";

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold">Star Wars Characters</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to explore the galaxy&apos;s characters.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-md border border-foreground/10 bg-card p-6"
        data-testid="login-form"
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Username</span>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            autoComplete="username"
            required
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <Loader2Icon className="animate-spin" data-icon="inline-start" />
          ) : (
            <LogInIcon data-icon="inline-start" />
          )}
          {submitting ? "Signing in…" : "Sign in"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Demo credentials: <code className="font-mono">{MOCK_CREDENTIALS.username}</code> /{" "}
          <code className="font-mono">{MOCK_CREDENTIALS.password}</code>
        </p>
      </form>
    </div>
  );
}