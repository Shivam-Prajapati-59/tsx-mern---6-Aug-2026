"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/constants";
import { idFromUrl, type Person } from "@/src/lib/swapi";

export type CharacterFilters = {
  search: string;
  homeworld: string;
  species: string;
  film: string;
};

export const EMPTY_FILTERS: CharacterFilters = {
  search: "",
  homeworld: "",
  species: "",
  film: "",
};

type UseCharactersOptions = {
  people: Person[];
  pageSize?: number;
};

export function useCharacters({ people, pageSize = DEFAULT_PAGE_SIZE }: UseCharactersOptions) {
  const [filters, setFilters] = useState<CharacterFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(filters.search.trim().toLowerCase());

  const resetPage = () => setPage(1);

  const updateFilters = (patch: Partial<CharacterFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
    resetPage();
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    resetPage();
  };

  const filtered = useMemo(() => {
    const hasActiveFilter =
      deferredSearch.length > 0 ||
      filters.homeworld !== "" ||
      filters.species !== "" ||
      filters.film !== "";

    if (!hasActiveFilter) {
      return people;
    }

    return people.filter((person) => {
      if (deferredSearch.length > 0 && !person.name.toLowerCase().includes(deferredSearch)) {
        return false;
      }
      if (filters.homeworld !== "" && idFromUrl(person.homeworld) !== filters.homeworld) {
        return false;
      }
      if (
        filters.species !== "" &&
        !person.species.some((speciesUrl) => idFromUrl(speciesUrl) === filters.species)
      ) {
        return false;
      }
      if (
        filters.film !== "" &&
        !person.films.some((filmUrl) => idFromUrl(filmUrl) === filters.film)
      ) {
        return false;
      }
      return true;
    });
  }, [people, deferredSearch, filters.homeworld, filters.species, filters.film]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const currentItems = filtered.slice(pageStart, pageStart + pageSize);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return {
    filters,
    updateFilters,
    clearFilters,
    currentItems,
    total: filtered.length,
    totalPages,
    page: safePage,
    goToPage,
    pageSize,
  };
}
