"use client";

import { ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { idFromUrl, type Film, type Planet, type Species } from "@/src/lib/swapi";
import { titleCase } from "@/src/lib/format";
import type { CharacterFilters } from "@/src/hooks/useCharacters";

type SearchAndFilterBarProps = {
  filters: CharacterFilters;
  onFiltersChange: (patch: Partial<CharacterFilters>) => void;
  onClear: () => void;
  lookups: {
    planets: Map<string, Planet>;
    species: Map<string, Species>;
    films: Map<string, Film>;
  };
  peopleCount: number;
  filteredCount: number;
};

type SelectOption = {
  value: string;
  label: string;
};

function FilterSelect({
  value,
  onValueChange,
  options,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        role="combobox"
        className="inline-flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="truncate">{options.find((option) => option.value === value)?.label ?? placeholder}</span>
        <ChevronDownIcon className="size-4 shrink-0 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-(--anchor-width)">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            role="option"
            aria-selected={option.value === value}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SearchAndFilterBar({
  filters,
  onFiltersChange,
  onClear,
  lookups,
  peopleCount,
  filteredCount,
}: SearchAndFilterBarProps) {
  const homeworldOptions: SelectOption[] = [
    { value: "", label: "All homeworlds" },
    ...[...lookups.planets.values()]
      .map((p) => ({ value: idFromUrl(p.url), label: titleCase(p.name) }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  ];

  const speciesOptions: SelectOption[] = [
    { value: "", label: "All species" },
    ...[...lookups.species.values()]
      .map((s) => ({ value: idFromUrl(s.url), label: s.name }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  ];

  const filmOptions: SelectOption[] = [
    { value: "", label: "All films" },
    ...[...lookups.films.values()]
      .map((f) => ({ value: idFromUrl(f.url), label: f.title }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  ];

  const hasActiveFilters =
    filters.search !== "" || filters.homeworld !== "" || filters.species !== "" || filters.film !== "";

  return (
    <div className="flex flex-col gap-2 rounded-md bg-card p-1">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            placeholder="Search characters by name…"
            aria-label="Search characters"
            className={hasActiveFilters ? "pr-9 pl-8" : "pl-8"}
          />
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Clear search and filters"
              onClick={onClear}
              className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XIcon />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[min(56%,34rem)]">
          <FilterSelect
            value={filters.homeworld}
            onValueChange={(v) => onFiltersChange({ homeworld: v })}
            options={homeworldOptions}
            placeholder="Homeworld"
            ariaLabel="Filter by homeworld"
          />
          <FilterSelect
            value={filters.species}
            onValueChange={(v) => onFiltersChange({ species: v })}
            options={speciesOptions}
            placeholder="Species"
            ariaLabel="Filter by species"
          />
          <FilterSelect
            value={filters.film}
            onValueChange={(v) => onFiltersChange({ film: v })}
            options={filmOptions}
            placeholder="Film"
            ariaLabel="Filter by film"
          />
        </div>
        <p className="px-1 text-sm text-muted-foreground">
          Showing <strong>{filteredCount}</strong> of <strong>{peopleCount}</strong> results
        </p>
      </div>
    </div>
  );
}
