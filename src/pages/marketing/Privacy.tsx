import { useI18n } from "../../i18n";
import Card from "../../components/ui/Card";
import DisclaimerBanner from "../../components/Disclaimer";

export default function Privacy() {
  const { t } = useI18n();
  const roadmapItems = [
    t("roadmap.community"),
    t("roadmap.aiChat"),
    t("roadmap.sharing"),
    t("roadmap.library"),
    t("roadmap.qr"),
    t("roadmap.pdf"),
    t("roadmap.locator"),
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-h1 text-ink">{t("privacy.title")}</h1>

      <Card className="mt-8">
        <h2 className="font-display text-h3 text-ink">{t("privacy.dataTitle")}</h2>
        <p className="mt-3 text-body text-ink-dim">{t("privacy.dataBody")}</p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-display text-h3 text-ink">{t("privacy.cameraTitle")}</h2>
        <p className="mt-3 text-body text-ink-dim">{t("privacy.cameraBody")}</p>
      </Card>

      <div className="mt-8">
        <h2 className="font-display text-h3 text-ink">{t("privacy.disclaimerTitle")}</h2>
        <div className="mt-3">
          <DisclaimerBanner />
        </div>
        <p className="mt-4 text-body text-ink-dim">{t("privacy.disclaimerBody")}</p>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-6">
        <h2 className="font-display text-h3 text-ink">{t("roadmap.title")}</h2>
        <p className="mt-2 text-body text-ink-dim">{t("roadmap.intro")}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {roadmapItems.map((item) => (
            <li key={item} className="flex items-center gap-2 text-body text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-dim" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
