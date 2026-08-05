"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type CharacterPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const MAX_VISIBLE = 5;

function getPageWindow(page: number, totalPages: number): number[] {
  if (totalPages <= MAX_VISIBLE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const start = Math.max(1, Math.min(page - 2, totalPages - MAX_VISIBLE + 1));
  return Array.from({ length: MAX_VISIBLE }, (_, i) => start + i);
}

export function CharacterPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: CharacterPaginationProps) {
  if (totalPages <= 1 && total <= pageSize) {
    return null;
  }

  const pages = getPageWindow(page, totalPages);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex flex-col items-center gap-2 py-2"
    >
      <p className="text-sm text-muted-foreground">
        Showing {total ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, total)} of{" "}
        {total} characters
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "ghost"}
            size="icon-sm"
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            onClick={() => onPageChange(p)}
            className={cn(p === page && "font-semibold")}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </nav>
  );
}
