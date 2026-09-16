import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../i18n";
import { loadData } from "../../../lib/storage";
import { URINE_PARAMETERS } from "../../../lib/urineReference";
import type { QualitativeLevel, UrineParameterKey } from "../../../lib/types";
import Card from "../../../components/ui/Card";
import { StatusBadge } from "../../../components/ui/Badge";
import TrendChart from "../../../components/TrendChart";

const LEVEL_SCORE: Record<QualitativeLevel, number> = {
  negative: 0,
  trace: 1,
  plus1: 2,
  plus2: 3,
  plus3: 4,
};

export default function UrineHistory() {
  const { t } = useI18n();
  const data = loadData();
  const tests = [...data.urineTests].sort((a, b) => a.date.localeCompare(b.date));
  const [selectedParam, setSelectedParam] = useState<UrineParameterKey>("glucose");

  const trendData = tests
    .map((test) => {
      const result = test.results.find((r) => r.key === selectedParam);
      return result ? { date: test.date, score: LEVEL_SCORE[result.level] } : null;
    })
    .filter((v): v is { date: string; score: number } => v !== null);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h2 text-ink">{t("urine.history.title")}</h1>

      {tests.length === 0 ? (
        <p className="mt-6 text-body text-ink-dim">{t("urine.history.empty")}</p>
      ) : (
        <>
          <Card className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-h3 text-ink">{t("urine.history.trendTitle")}</h2>
              <select
                value={selectedParam}
                onChange={(e) => setSelectedParam(e.target.value as UrineParameterKey)}
                className="focus-ring rounded-lg border border-border bg-bg-panel px-2.5 py-1.5 text-caption text-ink"
                aria-label={t("urine.history.selectParam")}
              >
                {URINE_PARAMETERS.map((p) => (
                  <option key={p.key} value={p.key}>
                    {t(p.labelKey)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <TrendChart
                labels={trendData.map((d) => new Date(d.date).toLocaleDateString())}
                series={[{ label: t(`urine.param.${selectedParam}`), data: trendData.map((d) => d.score), color: "#3E8A6D" }]}
              />
            </div>
          </Card>

          <div className="mt-6 space-y-3">
            {[...data.urineTests]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((r) => (
                <Card key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-label text-ink">{new Date(r.date).toLocaleString()}</p>
                    <p className="text-caption text-ink-dim">
                      {r.flagged.length === 0 ? "No flags" : `${r.flagged.length} flagged`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={r.flagged.length === 0 ? "normal" : "abnormal"}>
                      {r.flagged.length === 0 ? t("status.normal") : t("status.abnormal")}
                    </StatusBadge>
                    <Link to={`/app/urine/results/${r.id}`} className="focus-ring text-label text-accent-gold hover:underline">
                      {t("urine.history.viewDetail")}
                    </Link>
                  </div>
                </Card>
              ))}
          </div>
        </>
      )}

      <Link to="/app/urine/capture" className="mt-6 inline-block text-label text-accent-gold hover:underline">
        {t("urine.startScan")}
      </Link>
    </div>
  );
}
