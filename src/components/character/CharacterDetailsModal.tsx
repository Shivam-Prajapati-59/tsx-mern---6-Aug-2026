"use client";

import {
  GlobeIcon,
  HomeIcon,
  RulerIcon,
  ScaleIcon,
  CalendarDaysIcon,
  ClapperboardIcon,
  CakeIcon,
  Loader2Icon,
  HourglassIcon,
  OrbitIcon,
  GaugeIcon,
  MountainIcon,
  SunIcon,
  DropletsIcon,
  UsersIcon,
  WeightIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { formatDateAdded, formatNumber, toKilograms, toMeters, titleCase } from "@/src/lib/format";
import { idFromUrl, type Person, type Planet } from "@/src/lib/swapi";
import { usePlanets } from "@/src/hooks/useSwapi";

type CharacterDetailsModalProps = {
  person: Person | null;
  onClose: () => void;
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 rounded-md border border-border/70 bg-muted/40 px-2.5 py-2">
      <span className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
        <Icon className="size-4" />
        <span className="font-heading text-[0.68rem] font-medium uppercase tracking-wide">{label}</span>
      </span>
      <span className="min-w-0 flex-1 truncate text-right font-sans text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

function HomeworldSection({ planetUrl }: { planetUrl: string }) {
  const { data: planets, isLoading, isError } = usePlanets();
  const planetId = idFromUrl(planetUrl);
  const planet = planets?.find((p: Planet) => idFromUrl(p.url) === planetId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
        <Loader2Icon className="size-4 animate-spin" />
        <span>Loading homeworld…</span>
      </div>
    );
  }

  if (isError || !planet) {
    return (
      <p className="text-sm text-destructive" role="alert">
        Couldn&apos;t load {planetId ? `planet #${planetId}` : "homeworld"} details.
      </p>
    );
  }

  return (
    <section className="rounded-md border border-border p-3">
      <div className="mb-2 flex items-center gap-2">
        <HomeIcon className="size-4 text-muted-foreground" />
        <h4 className="font-heading text-sm font-semibold">Homeworld</h4>
      </div>
      <div className="space-y-2">
        <p className="font-heading text-base font-semibold">{planet.name}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <DetailRow icon={HourglassIcon} label="Rotation" value={formatNumber(planet.rotation_period, "h")} />
          <DetailRow icon={OrbitIcon} label="Orbital Period" value={formatNumber(planet.orbital_period, "days")} />
          <DetailRow icon={GaugeIcon} label="Diameter" value={formatNumber(planet.diameter, "km")} />
          <DetailRow icon={MountainIcon} label="Terrain" value={titleCase(planet.terrain)} />
          <DetailRow icon={SunIcon} label="Climate" value={titleCase(planet.climate)} />
          <DetailRow icon={WeightIcon} label="Gravity" value={planet.gravity} />
          <DetailRow icon={DropletsIcon} label="Surface Water" value={formatNumber(planet.surface_water, "%")} />
          <DetailRow icon={UsersIcon} label="Population" value={formatNumber(planet.population)} />
          <DetailRow icon={GlobeIcon} label="Residents" value={planet.residents.length} />
        </div>
      </div>
    </section>
  );
}

export function CharacterDetailsModal({ person, onClose }: CharacterDetailsModalProps) {
  if (!person) {
    return null;
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[88vh] gap-3 overflow-y-auto p-3 sm:max-w-xl">
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl font-bold">{person.name}</DialogTitle>
          <DialogDescription className="font-sans text-sm">
            Character profile and homeworld details
          </DialogDescription>
        </DialogHeader>

        <section aria-label="Character details" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <DetailRow icon={RulerIcon} label="Height" value={toMeters(person.height)} />
          <DetailRow icon={ScaleIcon} label="Mass" value={toKilograms(person.mass)} />
          <DetailRow
            icon={CalendarDaysIcon}
            label="Added"
            value={formatDateAdded(person.created)}
          />
          <DetailRow icon={ClapperboardIcon} label="Films" value={`${person.films.length}`} />
          <DetailRow icon={CakeIcon} label="Birth Year" value={person.birth_year} />
        </section>

        <HomeworldSection planetUrl={person.homeworld} />
      </DialogContent>
    </Dialog>
  );
}
