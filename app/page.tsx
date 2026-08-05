"use client";

import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/src/providers/AuthProvider";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { CharacterExplorer } from "@/src/components/character/CharacterExplorer";

export default function Home() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" aria-label="Loading" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <LoginForm />
      </div>
    );
  }

  return <CharacterExplorer />;
}
