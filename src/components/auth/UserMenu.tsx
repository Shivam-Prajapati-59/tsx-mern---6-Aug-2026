"use client";

import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/providers/AuthProvider";

export function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-sm font-medium">
        <UserIcon className="size-4 text-muted-foreground" />
        {user?.username}
      </span>
      <Button variant="outline" size="sm" onClick={() => void logout()}>
        <LogOutIcon data-icon="inline-start" />
        Log out
      </Button>
    </div>
  );
}