import { useMemo, useState } from "react";
import { useI18n } from "../../i18n";
import { loadData } from "../../lib/storage";
import { cyclesInRange, toISODate } from "../../lib/cycle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export default function CalendarPage() {
  const { t } = useI18n();
  const data = loadData();
  const profile = data.profile!;
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - monthStart.getDay());
  const gridEnd = new Date(monthEnd);
  gridEnd.setDate(gridEnd.getDate() + (6 - monthEnd.getDay()));

  const cycles = useMemo(
    () => cyclesInRange(profile, data.cycleStartDates, gridStart, gridEnd),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, viewMonth]
  );

  const periodDateSet = new Set(cycles.flatMap((c) => c.periodDays.map((d) => toISODate(d))));
  const peakDateSet = new Set(cycles.map((c) => toISODate(c.fertile.peak)));
  const fertileDateSet = new Set(
    cycles.flatMap((c) => {
      const days: string[] = [];
      const cursor = new Date(c.fertile.start);
      while (cursor <= c.fertile.end) {
        days.push(toISODate(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      return days;
    })
  );
  const urineDateSet = new Set(data.urineTests.map((r) => toISODate(new Date(r.date))));
  const opkDateSet = new Set(data.opkTests.map((r) => toISODate(new Date(r.date))));

  const days: Date[] = [];
  const cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  const todayIso = toISODate(new Date());
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-h1 text-ink">{t("calendar.title")}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
          >
            ←
          </Button>
          <span className="min-w-[9ch] text-center text-label text-ink">
            {viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
          >
            →
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <div className="grid grid-cols-7 gap-1.5 text-center text-caption text-ink-dim">
          {weekdayLabels.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {days.map((d) => {
            const iso = toISODate(d);
            const inMonth = d.getMonth() === viewMonth.getMonth();
            const isPeriod = periodDateSet.has(iso);
            const isPeak = peakDateSet.has(iso);
            const isFertile = fertileDateSet.has(iso);
            const hasUrine = urineDateSet.has(iso);
            const hasOpk = opkDateSet.has(iso);
            return (
              <div
                key={iso}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border text-caption ${
                  iso === todayIso ? "border-accent-gold" : "border-transparent"
                } ${!inMonth ? "opacity-30" : ""} ${
                  isPeriod ? "bg-danger/15" : isPeak ? "bg-accent-rose/25" : isFertile ? "bg-accent-rose/10" : "bg-bg-panel-alt"
                }`}
              >
                <span className="text-ink">{d.getDate()}</span>
                <div className="mt-0.5 flex gap-0.5">
                  {hasUrine && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
                  {hasOpk && <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap gap-4 text-caption text-ink-dim">
        <LegendItem swatch="bg-danger/40" label={t("calendar.legendPeriod")} />
        <LegendItem swatch="bg-accent-rose/25" label={t("calendar.legendFertile")} />
        <LegendItem swatch="bg-accent-rose/60" label={t("calendar.legendPeak")} />
        <LegendItem dot="bg-success" label={t("calendar.legendUrineTest")} />
        <LegendItem dot="bg-accent-gold" label={t("calendar.legendOpkTest")} />
      </div>
    </div>
  );
}

function LegendItem({ swatch, dot, label }: { swatch?: string; dot?: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {swatch && <span className={`h-3 w-3 rounded ${swatch}`} />}
      {dot && <span className={`h-2 w-2 rounded-full ${dot}`} />}
      <span>{label}</span>
    </div>
  );
}
