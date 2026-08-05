import type { Person, Species } from "@/src/lib/swapi";
import { idFromUrl } from "@/src/lib/swapi";

export const SPECIES_PALETTE = [
  "violet",
  "emerald",
  "amber",
  "rose",
  "sky",
  "lime",
  "orange",
  "teal",
  "fuchsia",
  "indigo",
  "cyan",
  "red",
] as const;

export type SpeciesColor = (typeof SPECIES_PALETTE)[number];

const CURATED_SPECIES_COLORS: Record<string, SpeciesColor> = {
  "1": "sky", // Human
  "2": "violet", // Droid
  "3": "amber", // Wookiee
  "4": "emerald", // Rodian
  "5": "orange", // Hutt
  "6": "lime", // Yoda's species
  "7": "rose", // Trandoshan
  "8": "cyan", // Mon Calamari
  "9": "fuchsia", // Ewok
  "10": "teal", // Sullustan
  "11": "indigo", // Neimodian
  "12": "emerald", // Gungan
  "13": "amber", // Toydarian
  "14": "orange", // Dug
  "15": "rose", // Twi'lek
  "16": "teal", // Aleena
  "17": "sky", // Vulptereen
  "18": "cyan", // Xextan
  "19": "indigo", // Toong
  "20": "lime", // Cerean
  "21": "emerald", // Nautolan
  "22": "fuchsia", // Zabrak
  "23": "violet", // Tholothian
  "24": "sky", // Iktotchi
  "25": "cyan", // Quermian
  "26": "orange", // Kel Dor
  "27": "teal", // Chagrian
  "28": "rose", // Geonosian
  "29": "lime", // Mirialan
  "30": "amber", // Clawdite
  "31": "indigo", // Besalisk
  "32": "sky", // Kaminoan
  "33": "teal", // Skakoan
  "34": "cyan", // Muun
  "35": "fuchsia", // Togruta
  "36": "emerald", // Kaleesh
  "37": "orange", // Pau'an
};

function hashCode(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getSpeciesName(person: Person, speciesMap: Map<string, Species>): string {
  if (person.species.length === 0) {
    return "Human";
  }
  const speciesUrl = person.species[0];
  const species = speciesMap.get(idFromUrl(speciesUrl));
  return species?.name ?? "Unknown";
}

export function getSpeciesColor(person: Person): SpeciesColor {
  if (person.species.length === 0) {
    return "sky";
  }
  const speciesId = idFromUrl(person.species[0]);
  const curated = CURATED_SPECIES_COLORS[speciesId];
  if (curated) {
    return curated;
  }
  return SPECIES_PALETTE[hashCode(speciesId) % SPECIES_PALETTE.length];
}
