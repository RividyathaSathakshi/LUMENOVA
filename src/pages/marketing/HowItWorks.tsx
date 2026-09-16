import { useI18n } from "../../i18n";
import Card from "../../components/ui/Card";
import DisclaimerBanner from "../../components/Disclaimer";

export default function HowItWorks() {
  const { t } = useI18n();

  const sections = [
    { title: t("howItWorks.colorChemistryTitle"), body: t("howItWorks.colorChemistryBody") },
    { title: t("howItWorks.calibrationTitle"), body: t("howItWorks.calibrationBody") },
    { title: t("howItWorks.ratioTitle"), body: t("howItWorks.ratioBody") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-h1 text-ink">{t("howItWorks.title")}</h1>
      <p className="mt-4 max-w-[70ch] text-body-lg text-ink-dim">{t("howItWorks.intro")}</p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <Card key={s.title}>
            <h2 className="font-display text-h3 text-ink">{s.title}</h2>
            <p className="mt-3 max-w-[70ch] text-body text-ink-dim">{s.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-h3 text-ink">{t("howItWorks.limitsTitle")}</h2>
        <p className="mt-3 max-w-[70ch] text-body text-ink-dim">{t("howItWorks.limitsBody")}</p>
        <div className="mt-5">
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  );
}
