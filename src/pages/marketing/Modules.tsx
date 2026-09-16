import { Link } from "react-router-dom";
import { useI18n } from "../../i18n";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function Modules() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-display text-h1 text-ink">{t("modules.title")}</h1>
      <p className="mt-4 max-w-[65ch] text-body-lg text-ink-dim">{t("modules.intro")}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <div className="h-1.5 w-12 rounded-full bg-success" />
          <h2 className="mt-4 font-display text-h2 text-ink">{t("modules.urineTitle")}</h2>
          <p className="mt-3 flex-1 text-body text-ink-dim">{t("modules.urineBody")}</p>
          <Link to="/onboarding" className="mt-6">
            <Button variant="secondary">{t("modules.urineCta")}</Button>
          </Link>
        </Card>
        <Card className="flex flex-col">
          <div className="h-1.5 w-12 rounded-full bg-accent-rose" />
          <h2 className="mt-4 font-display text-h2 text-ink">{t("modules.fertilityTitle")}</h2>
          <p className="mt-3 flex-1 text-body text-ink-dim">{t("modules.fertilityBody")}</p>
          <Link to="/onboarding" className="mt-6">
            <Button variant="secondary">{t("modules.fertilityCta")}</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
