"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { IMAGE_BASE, IMAGE_DIMENSIONS } from "@/src/lib/constants";
import { getSpeciesColor, getSpeciesName } from "@/src/lib/speciesColor";
import { idFromUrl, type Person, type Species } from "@/src/lib/swapi";
import { buildCardClasses, SPECIES_STYLE } from "@/src/components/character/speciesStyles";
import { Card, CardContent } from "@/src/components/ui/card";

type CharacterCardProps = {
  person: Person;
  speciesMap: Map<string, Species>;
  imageSeed: number;
  onOpen: (person: Person) => void;
};

export function CharacterCard({ person, speciesMap, imageSeed, onOpen }: CharacterCardProps) {
  const color = getSpeciesColor(person);
  const speciesName = getSpeciesName(person, speciesMap);
  const style = SPECIES_STYLE[color];

  const imageSrc = `${IMAGE_BASE}/${idFromUrl(person.url)}-${imageSeed}/${IMAGE_DIMENSIONS.width}/${IMAGE_DIMENSIONS.height}`;

  return (
    <motion.button
      type="button"
      data-testid="character-card"
      onClick={() => onOpen(person)}
      aria-label={`View details for ${person.name}`}
      className="group h-full w-full min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 340, damping: 24 }}
    >
      <Card className={`h-full min-h-0 gap-0 p-0 ${buildCardClasses(color)}`}>
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted lg:min-h-0 lg:flex-1 lg:shrink lg:aspect-auto">
          <Image
            src={imageSrc}
            alt={`Random image for ${person.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
            priority={false}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${style.accent}`}
          />
        </div>
        <CardContent className="flex shrink-0 items-center justify-between gap-2 pt-3 lg:min-h-8">
          <h3 className="min-w-0 truncate font-heading text-base font-semibold">{person.name}</h3>
          <span className={`${style.badge} shrink-0`}>{speciesName}</span>
        </CardContent>
      </Card>
    </motion.button>
  );
}
