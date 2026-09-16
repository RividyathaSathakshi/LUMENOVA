import { Link } from "react-router-dom";
import { useI18n } from "../../../i18n";
import { loadData } from "../../../lib/storage";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import TrendChart from "../../../components/TrendChart";

export default function OpkHistory() {
  const { t } = useI18n();
  const data = loadData();
  const tests = [...data.opkTests].sort((a, b) => a.cycleDay - b.cycleDay);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h2 text-ink">{t("opk.history.title")}</h1>

      {tests.length === 0 ? (
        <p className="mt-6 text-body text-ink-dim">{t("opk.history.empty")}</p>
      ) : (
        <>
          <Card className="mt-6">
            <h2 className="font-display text-h3 text-ink">{t("opk.history.trendTitle")}</h2>
            <div className="mt-4">
              <TrendChart
                labels={tests.map((r) => `Day ${r.cycleDay}`)}
                series={[{ label: "T/C ratio", data: tests.map((r) => Number(r.ratio.toFixed(2))), color: "#B85C56" }]}
              />
            </div>
          </Card>

          <div className="mt-6 space-y-3">
            {[...data.opkTests]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((r) => (
                <Card key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-label text-ink">{new Date(r.date).toLocaleString()}</p>
                    <p className="text-caption text-ink-dim">Cycle day {r.cycleDay} — ratio {r.ratio.toFixed(2)}</p>
                  </div>
                  <Badge>{t(`opk.level.${r.level}`)}</Badge>
                </Card>
              ))}
          </div>
        </>
      )}

      <Link to="/app/opk/capture" className="mt-6 inline-block text-label text-accent-gold hover:underline">
        {t("opk.startScan")}
      </Link>
    </div>
  );
}
