"use client";

import { useMemo, useState } from "react";
import { usePeopleWithLookups } from "@/src/hooks/useSwapi";
import { useCharacters } from "@/src/hooks/useCharacters";
import { LoadingGrid } from "@/src/components/LoadingGrid";
import { ErrorState } from "@/src/components/ErrorState";
import { CharacterCard } from "@/src/components/character/CharacterCard";
import { CharacterDetailsModal } from "@/src/components/character/CharacterDetailsModal";
import { CharacterPagination } from "@/src/components/character/CharacterPagination";
import { SearchAndFilterBar } from "@/src/components/character/SearchAndFilterBar";
import { UserMenu } from "@/src/components/auth/UserMenu";
import { DEFAULT_PAGE_SIZE, IMAGE_SEED } from "@/src/lib/constants";
import type { Person } from "@/src/lib/swapi";

export function CharacterExplorer() {
  const { people, lookups, isLoading, isError, refetch } = usePeopleWithLookups();
  const controller = useCharacters({ people, pageSize: DEFAULT_PAGE_SIZE });
  const [selected, setSelected] = useState<Person | null>(null);
  const [imageSeed] = useState<number>(() => IMAGE_SEED);

  const emptyResults = useMemo(
    () => !isLoading && !isError && people.length > 0 && controller.currentItems.length === 0,
    [isLoading, isError, people.length, controller.currentItems.length],
  );

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex shrink-0 items-center justify-between">
            <span className="font-heading text-lg font-bold">Star Wars Characters</span>
            <div className="lg:hidden">
              <UserMenu />
            </div>
          </div>
          <div className="hidden shrink-0 lg:block">
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-3 overflow-y-auto px-4 py-3 lg:overflow-hidden">
        <div className="shrink-0">
          <SearchAndFilterBar
            filters={controller.filters}
            onFiltersChange={controller.updateFilters}
            onClear={controller.clearFilters}
            lookups={lookups}
            peopleCount={people.length}
            filteredCount={controller.total}
          />
        </div>

        <div className="min-h-0 flex-1 pr-1">
          {isLoading && <LoadingGrid />}

          {isError && <ErrorState onRetry={refetch} />}

          {emptyResults && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <p className="text-lg font-medium">No characters match your filters.</p>
              <p className="mt-1 text-sm">Try adjusting the search or clearing the filters.</p>
            </div>
          )}

          {!isLoading && !isError && controller.currentItems.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:h-full lg:grid-cols-4 lg:grid-rows-3 lg:gap-3">
              {controller.currentItems.map((person) => (
                <CharacterCard
                  key={person.url}
                  person={person}
                  speciesMap={lookups.species}
                  imageSeed={imageSeed}
                  onOpen={setSelected}
                />
              ))}
            </div>
          )}
        </div>

        {!isLoading && !isError && controller.total > 0 && (
          <div className="shrink-0">
            <CharacterPagination
              page={controller.page}
              totalPages={controller.totalPages}
              total={controller.total}
              pageSize={controller.pageSize}
              onPageChange={controller.goToPage}
            />
          </div>
        )}

        <CharacterDetailsModal person={selected} onClose={() => setSelected(null)} />
      </main>
    </div>
  );
}
