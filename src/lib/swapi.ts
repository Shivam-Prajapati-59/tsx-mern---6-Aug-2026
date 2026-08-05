import { STAR_WARS_PUBLIC_URL } from "@/src/lib/constants";

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

type PageEnvelope<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

const HEADERS = {
  Accept: "application/json",
};

function resolveSwapiUrl(pathOrUrl: string): string {
  return /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : `${STAR_WARS_PUBLIC_URL}${pathOrUrl}`;
}

async function fetchJson<T>(pathOrUrl: string, signal?: AbortSignal): Promise<PageEnvelope<T>> {
  const response = await fetch(resolveSwapiUrl(pathOrUrl), {
    headers: HEADERS,
    signal,
  });

  if (!response.ok) {
    throw new Error(`SWAPI request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T[] | Partial<PageEnvelope<T>>;

  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data };
  }

  if (
    !data ||
    typeof data !== "object" ||
    !Array.isArray(data.results) ||
    typeof data.count !== "number" ||
    (data.next !== null && typeof data.next !== "string") ||
    (data.previous !== null && typeof data.previous !== "string")
  ) {
    throw new Error(`SWAPI response for ${pathOrUrl} did not contain a results array`);
  }

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results,
  };
}

async function fetchAll<T>(path: string, signal?: AbortSignal): Promise<T[]> {
  const results: T[] = [];
  const visited = new Set<string>();
  let nextUrl: string | null = resolveSwapiUrl(path);

  while (nextUrl) {
    if (visited.has(nextUrl)) {
      throw new Error(`SWAPI pagination loop detected at ${nextUrl}`);
    }
    visited.add(nextUrl);
    const page: PageEnvelope<T> = await fetchJson<T>(nextUrl, signal);
    results.push(...page.results);
    nextUrl = page.next;
  }

  return results;
}

export function getPeople(signal?: AbortSignal): Promise<Person[]> {
  return fetchAll<Person>("/people", signal);
}

export function getPlanets(signal?: AbortSignal): Promise<Planet[]> {
  return fetchAll<Planet>("/planets", signal);
}

export function getSpecies(signal?: AbortSignal): Promise<Species[]> {
  return fetchAll<Species>("/species", signal);
}

export function getFilms(signal?: AbortSignal): Promise<Film[]> {
  return fetchAll<Film>("/films", signal);
}

export function idFromUrl(url: string): string {
  const segments = url.replace(/\/+$/, "").split("/");
  return segments[segments.length - 1] ?? "";
}
