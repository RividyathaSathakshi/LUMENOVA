import type { OpkLevel } from "./types";

export function classifyRatio(ratio: number): OpkLevel {
  if (ratio >= 1.0) return "peak";
  if (ratio >= 0.8) return "rising";
  return "low";
}

export function ratioLabelKey(level: OpkLevel): string {
  switch (level) {
    case "peak":
      return "opk.level.peak";
    case "rising":
      return "opk.level.rising";
    case "low":
      return "opk.level.low";
  }
}
