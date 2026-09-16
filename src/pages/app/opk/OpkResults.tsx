import { Link, Navigate, useParams } from "react-router-dom";
import { useI18n } from "../../../i18n";
import { loadData } from "../../../lib/storage";
import { fertileWindow, toISODate, addDays } from "../../../lib/cycle";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import DisclaimerBanner from "../../../components/Disclaimer";
import Badge from "../../../components/ui/Badge";

const levelColor: Record<string, string> = {
  low: "text-ink-dim",
  rising: "text-warning",
  peak: "text-danger",
};

export default function OpkResults() {
  const { t } = useI18n();
  const { id } = useParams();
  const data = loadData();
  const record = data.opkTests.find((r) => r.id === id);

  if (!record || !data.profile) return <Navigate to="/app/opk" replace />;

  const fw = fertileWindow(data.profile, new Date(), data.cycleStartDates);
  const bestDays = [addDays(fw.peak, -1), fw.peak, addDays(fw.peak, 1)];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h2 text-ink">{t("opk.results.title")}</h1>

      <Card className="mt-6 text-center">
        <p className="text-label text-ink-dim">{t("opk.results.ratioLabel")}</p>
        <p className={`mt-2 font-display text-display ${levelColor[record.level]}`}>{record.ratio.toFixed(2)}</p>
        <Badge className="mt-2">{t(`opk.level.${record.level}`)}</Badge>
      </Card>

      <Card className="mt-6" alt>
        <h2 className="font-display text-h3 text-ink">{t("opk.results.fertileWindowTitle")}</h2>
        <p className="mt-2 text-body text-ink-dim">
          {toISODate(fw.start)} — {toISODate(fw.end)}
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-display text-h3 text-ink">{t("opk.results.bestDaysTitle")}</h2>
        <p className="mt-2 text-body text-ink-dim">{t("opk.results.bestDaysBody")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {bestDays.map((d) => (
            <span key={d.toISOString()} className="rounded-full bg-accent-rose/15 px-3 py-1.5 text-label text-accent-rose">
              {toISODate(d)}
            </span>
          ))}
        </div>
      </Card>

      <div className="mt-6">
        <DisclaimerBanner />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/app/opk/history">
          <Button variant="secondary">{t("opk.history.title")}</Button>
        </Link>
        <Link to="/app">
          <Button variant="ghost">{t("dashboard.title")}</Button>
        </Link>
      </div>
    </div>
  );
}
