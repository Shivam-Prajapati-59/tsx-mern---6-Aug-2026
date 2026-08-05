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

const HEADERS = {
  Accept: "application/json",
};

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${STAR_WARS_PUBLIC_URL}${path}`, {
    headers: HEADERS,
    signal,
  });

  if (!response.ok) {
    throw new Error(`SWAPI request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export function getPeople(signal?: AbortSignal): Promise<Person[]> {
  return fetchJson<Person[]>("/people", signal);
}

export function getPlanets(signal?: AbortSignal): Promise<Planet[]> {
  return fetchJson<Planet[]>("/planets", signal);
}

export function getSpecies(signal?: AbortSignal): Promise<Species[]> {
  return fetchJson<Species[]>("/species", signal);
}

export function getFilms(signal?: AbortSignal): Promise<Film[]> {
  return fetchJson<Film[]>("/films", signal);
}

export function idFromUrl(url: string): string {
  const segments = url.replace(/\/+$/, "").split("/");
  return segments[segments.length - 1] ?? "";
}
