import type { Film, Person, Planet, Species } from "@/src/lib/swapi";

export const AU = "https://swapi.info/api";

export const LUKE: Person = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: `${AU}/planets/1`,
  films: [`${AU}/films/1`, `${AU}/films/2`, `${AU}/films/3`, `${AU}/films/6`],
  species: [],
  vehicles: [`${AU}/vehicles/14`],
  starships: [`${AU}/starships/12`],
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: `${AU}/people/1`,
};

export const C3PO: Person = {
  name: "C-3PO",
  height: "167",
  mass: "75",
  hair_color: "n/a",
  skin_color: "gold",
  eye_color: "yellow",
  birth_year: "112BBY",
  gender: "n/a",
  homeworld: `${AU}/planets/1`,
  films: [`${AU}/films/1`, `${AU}/films/2`, `${AU}/films/3`],
  species: [`${AU}/species/2`],
  vehicles: [],
  starships: [],
  created: "2014-12-10T15:10:51.357000Z",
  edited: "2014-12-20T21:17:50.309000Z",
  url: `${AU}/people/2`,
};

export const TATOOINE: Planet = {
  name: "Tatooine",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: [`${AU}/people/1`, `${AU}/people/2`],
  films: [`${AU}/films/1`],
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
  url: `${AU}/planets/1`,
};

export const HUMAN: Species = {
  name: "Human",
  classification: "mammal",
  designation: "sentient",
  average_height: "180",
  skin_colors: "caucasian, black, asian, hispanic",
  hair_colors: "blonde, brown, black, red",
  eye_colors: "brown, blue, green, hazel, grey, amber",
  average_lifespan: "120",
  homeworld: `${AU}/planets/9`,
  language: "Galactic Basic",
  people: [`${AU}/people/1`],
  films: [`${AU}/films/1`],
  created: "2014-12-10T13:52:11.567000Z",
  edited: "2014-12-20T21:36:42.136000Z",
  url: `${AU}/species/1`,
};

export const DROID: Species = {
  ...HUMAN,
  name: "Droid",
  classification: "artificial",
  designation: "sentient",
  average_height: "n/a",
  language: "n/a",
  url: `${AU}/species/2`,
};

export const NEW_HOPE: Film = {
  title: "A New Hope",
  episode_id: 4,
  opening_crawl: "It is a period of civil war.",
  director: "George Lucas",
  producer: "Gary Kurtz",
  release_date: "1977-05-25",
  characters: [`${AU}/people/1`, `${AU}/people/2`],
  planets: [`${AU}/planets/1`],
  starships: [],
  vehicles: [],
  species: [`${AU}/species/1`],
  created: "2014-12-10T14:23:31.880000Z",
  edited: "2014-12-20T19:49:45.256000Z",
  url: `${AU}/films/1`,
};

export const people: Person[] = [LUKE, C3PO];
export const planets: Planet[] = [TATOOINE];
export const species: Species[] = [HUMAN, DROID];
export const films: Film[] = [NEW_HOPE];