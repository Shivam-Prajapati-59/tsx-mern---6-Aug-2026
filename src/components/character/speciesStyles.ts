import type { SpeciesColor } from "@/src/lib/speciesColor";

type SpeciesStyle = {
  border: string;
  badge: string;
  accent: string;
};

const BASE_BORDER = "border-t-4";
const BASE_BADGE =
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ring-1";

export const SPECIES_STYLE: Record<SpeciesColor, SpeciesStyle> = {
  violet: {
    border: "border-t-violet-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-violet-100 text-violet-700 ring-violet-200`,
    accent: "bg-gradient-to-br from-violet-500/35 via-violet-400/5 to-transparent",
  },
  emerald: {
    border: "border-t-emerald-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-emerald-100 text-emerald-700 ring-emerald-200`,
    accent: "bg-gradient-to-br from-emerald-500/35 via-emerald-400/5 to-transparent",
  },
  amber: {
    border: "border-t-amber-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-amber-100 text-amber-700 ring-amber-200`,
    accent: "bg-gradient-to-br from-amber-500/35 via-amber-400/5 to-transparent",
  },
  rose: {
    border: "border-t-rose-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-rose-100 text-rose-700 ring-rose-200`,
    accent: "bg-gradient-to-br from-rose-500/35 via-rose-400/5 to-transparent",
  },
  sky: {
    border: "border-t-sky-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-sky-100 text-sky-700 ring-sky-200`,
    accent: "bg-gradient-to-br from-sky-500/35 via-sky-400/5 to-transparent",
  },
  lime: {
    border: "border-t-lime-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-lime-100 text-lime-700 ring-lime-200`,
    accent: "bg-gradient-to-br from-lime-500/35 via-lime-400/5 to-transparent",
  },
  orange: {
    border: "border-t-orange-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-orange-100 text-orange-700 ring-orange-200`,
    accent: "bg-gradient-to-br from-orange-500/35 via-orange-400/5 to-transparent",
  },
  teal: {
    border: "border-t-teal-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-teal-100 text-teal-700 ring-teal-200`,
    accent: "bg-gradient-to-br from-teal-500/35 via-teal-400/5 to-transparent",
  },
  fuchsia: {
    border: "border-t-fuchsia-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200`,
    accent: "bg-gradient-to-br from-fuchsia-500/35 via-fuchsia-400/5 to-transparent",
  },
  indigo: {
    border: "border-t-indigo-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-indigo-100 text-indigo-700 ring-indigo-200`,
    accent: "bg-gradient-to-br from-indigo-500/35 via-indigo-400/5 to-transparent",
  },
  cyan: {
    border: "border-t-cyan-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-cyan-100 text-cyan-700 ring-cyan-200`,
    accent: "bg-gradient-to-br from-cyan-500/35 via-cyan-400/5 to-transparent",
  },
  red: {
    border: "border-t-red-500 border-t-[3px]",
    badge: `${BASE_BADGE} bg-red-100 text-red-700 ring-red-200`,
    accent: "bg-gradient-to-br from-red-500/35 via-red-400/5 to-transparent",
  },
};

export function buildCardClasses(color: SpeciesColor): string {
  const style = SPECIES_STYLE[color];
  return `group flex cursor-pointer flex-col overflow-hidden rounded-md bg-card pb-3 text-left ring-1 ring-foreground/10 transition-colors duration-200 ${BASE_BORDER} ${style.border}`;
}
