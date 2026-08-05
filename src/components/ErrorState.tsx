"use client";

import { AlertTriangleIcon, RotateCwIcon } from "lucide-react";
import { API_ERROR_MESSAGE } from "@/src/lib/constants";
import { Button } from "@/src/components/ui/button";

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export function ErrorState({ message = API_ERROR_MESSAGE, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      data-testid="error-state"
      className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangleIcon className="size-6" />
      </span>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        <RotateCwIcon data-icon="inline-start" />
        Retry
      </Button>
    </div>
  );
}
