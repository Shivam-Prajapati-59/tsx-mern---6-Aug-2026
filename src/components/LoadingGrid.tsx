"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { Card, CardContent } from "@/src/components/ui/card";

export function LoadingGrid() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading characters"
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card
            key={index}
            data-testid="loading-card"
            className="h-full"
          >
            <Skeleton className="aspect-[16/10] w-full rounded-none" />
            <CardContent className="flex flex-col gap-2 pt-0">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-5 w-2/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
