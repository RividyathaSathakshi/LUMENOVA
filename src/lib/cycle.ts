import type { Profile } from "./types";

const DAY = 24 * 60 * 60 * 1000;

export function daysBetween(a: Date, b: Date): number {
  const start = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const end = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((end - start) / DAY);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Most recent cycle start on/before `today`, given the logged last period date and cycle length. */
export function currentCycleStart(profile: Profile, today: Date, extraStarts: string[] = []): Date {
  const allStarts = [profile.lastPeriodDate, ...extraStarts]
    .map((s) => new Date(s + "T00:00:00"))
    .filter((d) => d.getTime() <= today.getTime())
    .sort((a, b) => b.getTime() - a.getTime());

  if (allStarts.length > 0) {
    const latestLogged = allStarts[0];
    const sinceLogged = daysBetween(latestLogged, today);
    const cyclesElapsed = Math.floor(sinceLogged / profile.avgCycleLength);
    return addDays(latestLogged, cyclesElapsed * profile.avgCycleLength);
  }
  return new Date(profile.lastPeriodDate + "T00:00:00");
}

export function cycleDay(profile: Profile, today: Date = new Date(), extraStarts: string[] = []): number {
  const start = currentCycleStart(profile, today, extraStarts);
  return daysBetween(start, today) + 1;
}

export function nextPeriodDate(profile: Profile, today: Date = new Date(), extraStarts: string[] = []): Date {
  const start = currentCycleStart(profile, today, extraStarts);
  return addDays(start, profile.avgCycleLength);
}

export function daysUntilNextPeriod(profile: Profile, today: Date = new Date(), extraStarts: string[] = []): number {
  return daysBetween(today, nextPeriodDate(profile, today, extraStarts));
}

/** Estimated ovulation day = cycleLength - 14 (luteal phase ~14 days), clamped to sane range. */
export function estimatedOvulationDay(profile: Profile): number {
  const day = profile.avgCycleLength - 14;
  return Math.min(Math.max(day, 8), profile.avgCycleLength - 2);
}

export interface FertileWindow {
  start: Date;
  peak: Date;
  end: Date;
}

export function fertileWindow(profile: Profile, today: Date = new Date(), extraStarts: string[] = []): FertileWindow {
  const start = currentCycleStart(profile, today, extraStarts);
  const ovDay = estimatedOvulationDay(profile);
  const peak = addDays(start, ovDay - 1);
  return {
    start: addDays(peak, -5),
    peak,
    end: addDays(peak, 1),
  };
}

export function periodDaysInCycle(profile: Profile, cycleStart: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < profile.avgPeriodLength; i++) {
    days.push(addDays(cycleStart, i));
  }
  return days;
}

export interface CycleInstance {
  start: Date;
  periodDays: Date[];
  fertile: FertileWindow;
}

/** Generates predicted/logged cycle instances (period + fertile window) overlapping [rangeStart, rangeEnd]. */
export function cyclesInRange(profile: Profile, extraStarts: string[], rangeStart: Date, rangeEnd: Date): CycleInstance[] {
  const anchor = new Date(profile.lastPeriodDate + "T00:00:00");
  const instances: CycleInstance[] = [];

  const paddedStart = addDays(rangeStart, -profile.avgCycleLength);
  const paddedEnd = addDays(rangeEnd, profile.avgCycleLength);

  let cursor = anchor;
  while (cursor.getTime() > paddedStart.getTime()) {
    cursor = addDays(cursor, -profile.avgCycleLength);
  }

  while (cursor.getTime() < paddedEnd.getTime()) {
    const ovDay = estimatedOvulationDay(profile);
    const peak = addDays(cursor, ovDay - 1);
    instances.push({
      start: cursor,
      periodDays: periodDaysInCycle(profile, cursor),
      fertile: { start: addDays(peak, -5), peak, end: addDays(peak, 1) },
    });
    cursor = addDays(cursor, profile.avgCycleLength);
  }

  for (const iso of extraStarts) {
    const start = new Date(iso + "T00:00:00");
    if (start >= paddedStart && start <= paddedEnd && !instances.some((i) => daysBetween(i.start, start) === 0)) {
      const ovDay = estimatedOvulationDay(profile);
      const peak = addDays(start, ovDay - 1);
      instances.push({
        start,
        periodDays: periodDaysInCycle(profile, start),
        fertile: { start: addDays(peak, -5), peak, end: addDays(peak, 1) },
      });
    }
  }

  return instances;
}
