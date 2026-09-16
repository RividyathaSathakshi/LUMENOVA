import { Link } from "react-router-dom";
import { useI18n } from "../../../i18n";
import { loadData } from "../../../lib/storage";
import { cycleDay } from "../../../lib/cycle";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import DisclaimerBanner from "../../../components/Disclaimer";

export default function OpkHome() {
  const { t } = useI18n();
  const data = loadData();
  const profile = data.profile!;
  const day = cycleDay(profile, new Date(), data.cycleStartDates);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h1 text-ink">{t("opk.moduleTitle")}</h1>

      <Card className="mt-6">
        <h2 className="font-display text-h3 text-ink">{t("opk.guidanceTitle")}</h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-label text-ink">{t("opk.guidanceWhen")}</p>
            <p className="mt-1 text-body text-ink-dim">{t("opk.guidanceWhenBody")}</p>
          </div>
          <div>
            <p className="text-label text-ink">{t("opk.guidanceHow")}</p>
            <p className="mt-1 text-body text-ink-dim">{t("opk.guidanceHowBody")}</p>
          </div>
        </div>
      </Card>

      <Card className="mt-6" alt>
        <h2 className="font-display text-h3 text-ink">{t("opk.cycleInputTitle")}</h2>
        <p className="mt-2 text-body-lg text-ink">
          {t("dashboard.cycleDay")}: <span className="font-display text-h3 text-accent-rose">{day}</span> / {profile.avgCycleLength}
        </p>
      </Card>

      <div className="mt-6">
        <DisclaimerBanner compact />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/app/opk/capture">
          <Button size="lg">{t("opk.startScan")}</Button>
        </Link>
        <Link to="/app/opk/history">
          <Button size="lg" variant="secondary">
            {t("opk.history.title")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
