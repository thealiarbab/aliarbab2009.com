import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Usage: cn("px-2", "px-4", condition && "hidden") → "px-4 hidden"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
] as const;

/**
 * Spell out a small count for editorial copy ("Six projects."), so a
 * headline never goes stale when the catalog grows. Falls back to
 * digits above twelve, where words stop reading well.
 */
export function numberWord(n: number, { capitalize = false } = {}): string {
  const word = (Number.isInteger(n) && n >= 0 ? NUMBER_WORDS[n] : undefined) ?? String(n);
  return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

/**
 * Border classes for a shared-border tile slab: one column on mobile,
 * three from md up. Each tile gets a bottom rule unless it sits in the
 * last row, and a right rule unless it ends its row — so any count of
 * tiles closes cleanly instead of only exactly three.
 */
export function slabTileBorders(index: number, total: number): string {
  const classes: string[] = [];
  if (index < total - 1) classes.push("border-b-2");
  const lastRowStart = total - (total % 3 === 0 ? 3 : total % 3);
  if (index >= lastRowStart) classes.push("md:border-b-0");
  else classes.push("md:border-b-2");
  if (index % 3 !== 2 && index !== total - 1) classes.push("md:border-r-2");
  return classes.join(" ");
}
