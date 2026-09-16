import { Link, Navigate, useParams } from "react-router-dom";
import { useI18n } from "../../../i18n";
import { loadData } from "../../../lib/storage";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import DisclaimerBanner from "../../../components/Disclaimer";
import { StatusBadge } from "../../../components/ui/Badge";

export default function UrineResults() {
  const { t } = useI18n();
  const { id } = useParams();
  const data = loadData();
  const record = data.urineTests.find((r) => r.id === id);

  if (!record) return <Navigate to="/app/urine" replace />;

  const hasAbnormal = record.results.some((r) => r.status === "abnormal");
  const hasBorderline = record.results.some((r) => r.status === "borderline");
  const urgency = hasAbnormal ? "high" : hasBorderline ? "medium" : "low";
  const urgencyKey = { high: "urgencyHigh", medium: "urgencyMedium", low: "urgencyLow" }[urgency];
  const urgencyColor = { high: "text-danger", medium: "text-warning", low: "text-success" }[urgency];

  const flagged = record.results.filter((r) => r.status !== "normal");
  const specialists = Array.from(new Set(flagged.map((r) => t(`urine.specialist.${r.key}`))));

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h2 text-ink">{t("urine.results.title")}</h1>
      <p className="mt-1 text-caption text-ink-dim">{new Date(record.date).toLocaleString()}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {record.results.map((r) => (
          <Card key={r.key} className="flex items-center justify-between">
            <div>
              <p className="text-label text-ink">{t(`urine.param.${r.key}`)}</p>
              <p className="text-caption text-ink-dim">{r.value}</p>
              {r.confidence && <p className="mt-0.5 text-[11px] text-ink-dim">{t("urine.results.confidence")}: {r.confidence}</p>}
            </div>
            <StatusBadge status={r.status}>{t(`status.${r.status}`)}</StatusBadge>
          </Card>
        ))}
      </div>

      <Card className="mt-6" alt>
        <h2 className="font-display text-h3 text-ink">{t("urine.results.flaggedTitle")}</h2>
        {flagged.length === 0 ? (
          <p className="mt-2 text-body text-ink-dim">{t("urine.results.noneFlagged")}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {flagged.map((r) => (
              <li key={r.key} className="text-body text-ink-dim">
                <span className="text-ink">{t(`urine.param.${r.key}`)}:</span> {t(`urine.paramExplain.${r.key}`)}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-h3 text-ink">{t("urine.results.nextStepsTitle")}</h2>
          <span className={`text-label ${urgencyColor}`}>{t(`urine.results.${urgencyKey}`)}</span>
        </div>
        <p className="mt-2 text-body text-ink-dim">
          {flagged.length > 0 ? t("urine.results.nextStepsFlagged") : t("urine.results.nextStepsClear")}
        </p>
        {specialists.length > 0 && (
          <p className="mt-3 text-caption text-ink-dim">
            Consider: {specialists.join(", ")}
          </p>
        )}
      </Card>

      <div className="mt-6">
        <DisclaimerBanner />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/app/urine/history">
          <Button variant="secondary">{t("urine.history.title")}</Button>
        </Link>
        <Link to="/app">
          <Button variant="ghost">{t("dashboard.title")}</Button>
        </Link>
      </div>
    </div>
  );
}
