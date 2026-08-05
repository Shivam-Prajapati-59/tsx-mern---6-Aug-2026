"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getFilms,
  getPeople,
  getPlanets,
  getSpecies,
  idFromUrl,
  type Film,
  type Person,
  type Planet,
  type Species,
} from "@/src/lib/swapi";

export function usePeople() {
  return useQuery({
    queryKey: ["swapi", "people"],
    queryFn: ({ signal }) => getPeople(signal),
  });
}

export function usePlanets() {
  return useQuery({
    queryKey: ["swapi", "planets"],
    queryFn: ({ signal }) => getPlanets(signal),
  });
}

export function useSpecies() {
  return useQuery({
    queryKey: ["swapi", "species"],
    queryFn: ({ signal }) => getSpecies(signal),
  });
}

export function useFilms() {
  return useQuery({
    queryKey: ["swapi", "films"],
    queryFn: ({ signal }) => getFilms(signal),
  });
}

export type Lookups = {
  planets: Map<string, Planet>;
  species: Map<string, Species>;
  films: Map<string, Film>;
};

function toMapById<T extends { url: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [idFromUrl(item.url), item]));
}

export function useLookups(): Lookups {
  const planetsQuery = usePlanets();
  const speciesQuery = useSpecies();
  const filmsQuery = useFilms();

  return useMemo(
    () => ({
      planets: toMapById(planetsQuery.data ?? []),
      species: toMapById(speciesQuery.data ?? []),
      films: toMapById(filmsQuery.data ?? []),
    }),
    [planetsQuery.data, speciesQuery.data, filmsQuery.data],
  );
}

export function usePeopleWithLookups(): {
  people: Person[];
  lookups: Lookups;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
} {
  const peopleQuery = usePeople();
  const lookups = useLookups();

  return {
    people: peopleQuery.data ?? [],
    lookups,
    isLoading: peopleQuery.isLoading || peopleQuery.isPending,
    isError: peopleQuery.isError,
    refetch: peopleQuery.refetch,
  };
}
