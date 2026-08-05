const UNKNOWN = "unknown";
const NOT_AVAILABLE = "n/a";

export function isKnown(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized !== UNKNOWN && normalized !== NOT_AVAILABLE && normalized !== "";
}

export function toMeters(heightCm: string): string {
  if (!isKnown(heightCm)) {
    return UNKNOWN;
  }
  const cm = Number.parseFloat(heightCm);
  if (Number.isNaN(cm)) {
    return UNKNOWN;
  }
  const meters = cm / 100;
  return `${meters.toFixed(2)} m`;
}

export function toKilograms(massKg: string): string {
  if (!isKnown(massKg)) {
    return UNKNOWN;
  }
  const numeric = Number.parseFloat(massKg.replace(/,/g, ""));
  if (Number.isNaN(numeric)) {
    return UNKNOWN;
  }
  return `${numeric.toLocaleString("en-US")} kg`;
}

export function formatDateAdded(created: string): string {
  const date = new Date(created);
  if (Number.isNaN(date.getTime())) {
    return UNKNOWN;
  }
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

export function formatNumber(value: string, unit = ""): string {
  if (!isKnown(value)) {
    return UNKNOWN;
  }
  const numeric = Number.parseFloat(value.replace(/,/g, ""));
  if (Number.isNaN(numeric)) {
    return UNKNOWN;
  }
  const formatted = Number.isInteger(numeric)
    ? numeric.toLocaleString("en-US")
    : numeric.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return unit ? `${formatted} ${unit}` : formatted;
}

export function titleCase(value: string): string {
  if (!value) return value;
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
