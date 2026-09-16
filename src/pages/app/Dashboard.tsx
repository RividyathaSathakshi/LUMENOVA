import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n";
import { clearAllData, loadData } from "../../lib/storage";
import { cycleDay, daysUntilNextPeriod, fertileWindow, toISODate } from "../../lib/cycle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DisclaimerBanner from "../../components/Disclaimer";
import TrendChart from "../../components/TrendChart";

export default function Dashboard() {
  const { t } = useI18n();
  const [confirmClear, setConfirmClear] = useState(false);
  const data = loadData();
  const profile = data.profile!;
  const today = new Date();

  const day = cycleDay(profile, today, data.cycleStartDates);
  const daysUntil = daysUntilNextPeriod(profile, today, data.cycleStartDates);
  const fw = fertileWindow(profile, today, data.cycleStartDates);
  const inFertileWindow = today >= fw.start && today <= fw.end;

  const recentUrine = [...data.urineTests].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const recentOpk = [...data.opkTests].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  const opkByCycleDay = [...data.opkTests].sort((a, b) => a.cycleDay - b.cycleDay);
  const showUrine = profile.goal === "urine" || profile.goal === "both";
  const showFertility = profile.goal === "fertility" || profile.goal === "both";

  function handleClearData() {
    clearAllData();
    window.location.href = "/onboarding";
  }

  return (
    <div>
      <h1 className="font-display text-h1 text-ink">{t("dashboard.title")}</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-label text-ink-dim">{t("dashboard.cycleDay")}</p>
          <p className="mt-2 font-display text-h1 text-ink">
            {day} <span className="text-body text-ink-dim">/ {profile.avgCycleLength}</span>
          </p>
        </Card>
        <Card>
          <p className="text-label text-ink-dim">{daysUntil <= 0 ? t("dashboard.nextPeriodToday") : t("dashboard.nextPeriodIn")}</p>
          <p className="mt-2 font-display text-h1 text-ink">{daysUntil > 0 ? daysUntil : "•"}</p>
        </Card>
        <Card className={inFertileWindow ? "border-accent-rose/50 bg-accent-rose/5" : ""}>
          <p className="text-label text-ink-dim">{t("dashboard.fertileWindow")}</p>
          <p className="mt-2 text-body text-ink">
            {toISODate(fw.start)} — {toISODate(fw.end)}
          </p>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {showUrine && (
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-h3 text-ink">{t("dashboard.recentUrine")}</h2>
              <Link to="/app/urine/history" className="text-caption text-accent-gold hover:underline">
                {t("common.seeAll")}
              </Link>
            </div>
            {recentUrine.length === 0 ? (
              <p className="mt-3 text-body text-ink-dim">{t("dashboard.noTestsYet")}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {recentUrine.map((r) => (
                  <li key={r.id} className="flex items-center justify-between text-body text-ink-dim">
                    <span>{new Date(r.date).toLocaleDateString()}</span>
                    <span>{r.flagged.length === 0 ? t("status.normal") : `${r.flagged.length} flagged`}</span>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/app/urine/capture" className="mt-4 inline-block">
              <Button size="sm" variant="secondary">
                {t("dashboard.runUrineTest")}
              </Button>
            </Link>
          </Card>
        )}

        {showFertility && (
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-h3 text-ink">{t("dashboard.recentOpk")}</h2>
              <Link to="/app/opk/history" className="text-caption text-accent-gold hover:underline">
                {t("common.seeAll")}
              </Link>
            </div>
            {recentOpk.length === 0 ? (
              <p className="mt-3 text-body text-ink-dim">{t("dashboard.noTestsYet")}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {recentOpk.map((r) => (
                  <li key={r.id} className="flex items-center justify-between text-body text-ink-dim">
                    <span>{new Date(r.date).toLocaleDateString()}</span>
                    <span>{t(`opk.level.${r.level}`)}</span>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/app/opk/capture" className="mt-4 inline-block">
              <Button size="sm" variant="secondary">
                {t("dashboard.runOpkTest")}
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {profile.goal === "both" && opkByCycleDay.length > 0 && (
        <Card className="mt-6">
          <h2 className="font-display text-h3 text-ink">{t("dashboard.trendsTitle")}</h2>
          <div className="mt-4">
            <TrendChart
              labels={opkByCycleDay.map((r) => `Day ${r.cycleDay}`)}
              series={[{ label: "T/C ratio", data: opkByCycleDay.map((r) => Number(r.ratio.toFixed(2))), color: "#B85C56" }]}
            />
          </div>
        </Card>
      )}

      <div className="mt-6">
        <Link to="/app/calendar">
          <Button variant="secondary">{t("dashboard.viewCalendar")}</Button>
        </Link>
      </div>

      <div className="mt-8">
        <DisclaimerBanner compact />
      </div>

      <Card className="mt-8" alt>
        <h2 className="font-display text-h3 text-ink">{t("dashboard.clearDataTitle")}</h2>
        <p className="mt-2 text-body text-ink-dim">{t("dashboard.clearDataBody")}</p>
        {confirmClear ? (
          <div className="mt-4">
            <p className="text-body text-danger">{t("dashboard.clearDataConfirm")}</p>
            <div className="mt-3 flex gap-3">
              <Button variant="danger" onClick={handleClearData}>
                {t("dashboard.clearDataButton")}
              </Button>
              <Button variant="ghost" onClick={() => setConfirmClear(false)}>
                {t("common.cancel")}
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="danger" className="mt-4" onClick={() => setConfirmClear(true)}>
            {t("dashboard.clearDataButton")}
          </Button>
        )}
      </Card>
    </div>
  );
}
