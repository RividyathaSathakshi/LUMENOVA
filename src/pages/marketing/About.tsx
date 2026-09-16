import { useI18n } from "../../i18n";
import Card from "../../components/ui/Card";

export default function About() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-h1 text-ink">{t("about.title")}</h1>
      <p className="mt-4 max-w-[65ch] text-body-lg text-ink-dim">{t("about.intro")}</p>

      <Card className="mt-8" alt>
        <h2 className="font-display text-h3 text-ink">{t("about.contextTitle")}</h2>
        <p className="mt-3 text-body text-ink-dim">{t("about.contextBody")}</p>
      </Card>

      <div className="mt-8">
        <h2 className="font-display text-h3 text-ink">{t("about.missionTitle")}</h2>
        <p className="mt-3 text-body text-ink-dim">{t("about.missionBody")}</p>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-h3 text-ink">{t("about.teamTitle")}</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {["Concept & Product", "Engineering", "Design", "Science Advisor"].map((role) => (
            <Card key={role} className="w-40 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-bg-panel-alt" />
              <p className="mt-3 text-label text-ink">{role}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
