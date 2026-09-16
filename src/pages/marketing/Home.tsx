import { Link } from "react-router-dom";
import { useI18n } from "../../i18n";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DisclaimerBanner from "../../components/Disclaimer";

export default function Home() {
  const { t } = useI18n();

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-label font-medium text-accent-rose">{t("home.heroEyebrow")}</p>
            <h1 className="mt-3 font-display text-h1 text-ink sm:text-display">{t("home.heroTitle")}</h1>
            <p className="mt-5 max-w-[60ch] text-body-lg text-ink-dim">{t("home.heroSubtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/onboarding">
                <Button size="lg">{t("home.heroCtaPrimary")}</Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="secondary">
                  {t("home.heroCtaSecondary")}
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <DisclaimerBanner compact />
            </div>
          </div>
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-label text-ink-dim">Urine Screening</span>
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-caption uppercase text-success">Normal</span>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {["Glucose", "Protein", "pH", "Ketones", "Blood", "Leuko.", "Nitrite", "S.G.", "Urobil.", "Bilirub."].map(
                (p, i) => (
                  <div key={p} className="rounded-lg border border-border bg-bg-panel-alt p-2 text-center">
                    <div
                      className="mx-auto mb-1.5 h-6 w-6 rounded-full"
                      style={{
                        background: [
                          "#3a8a86", "#e4d15c", "#c8c852", "#e8cfd4", "#e6bf5c",
                          "#f0e8dc", "#faf6ec", "#66a68b", "#eebfa8", "#f1e4c8",
                        ][i],
                      }}
                    />
                    <span className="text-[10px] text-ink-dim">{p}</span>
                  </div>
                )
              )}
            </div>
            <p className="mt-6 text-caption text-ink-dim">
              Sample results view — every parameter compared against a reference chart, on-device.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-bg-panel-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-h2 text-ink">{t("home.problemTitle")}</h2>
            <p className="mt-4 max-w-[65ch] text-body text-ink-dim">{t("home.problemBody")}</p>
          </div>
          <div>
            <h2 className="font-display text-h2 text-ink">{t("home.solutionTitle")}</h2>
            <p className="mt-4 max-w-[65ch] text-body text-ink-dim">{t("home.solutionBody")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-h2 text-ink">{t("home.howPreviewTitle")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { n: "1", title: t("home.howStep1Title"), body: t("home.howStep1Body") },
            { n: "2", title: t("home.howStep2Title"), body: t("home.howStep2Body") },
            { n: "3", title: t("home.howStep3Title"), body: t("home.howStep3Body") },
          ].map((step) => (
            <Card key={step.n}>
              <span className="font-display text-h3 text-accent-gold">{step.n}</span>
              <h3 className="mt-2 font-display text-h3 text-ink">{step.title}</h3>
              <p className="mt-2 text-body text-ink-dim">{step.body}</p>
            </Card>
          ))}
        </div>
        <Link to="/how-it-works" className="focus-ring mt-6 inline-block text-label text-accent-gold hover:underline">
          {t("common.learnMore")}
        </Link>
      </section>

      <section className="bg-bg-panel-alt py-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-h2 text-ink">{t("home.trustTitle")}</h2>
          <p className="mt-4 text-body text-ink-dim">{t("home.trustBody")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="font-display text-h2 text-ink">{t("home.ctaTitle")}</h2>
        <p className="mx-auto mt-4 max-w-[55ch] text-body-lg text-ink-dim">{t("home.ctaBody")}</p>
        <Link to="/onboarding" className="mt-8 inline-block">
          <Button size="lg">{t("common.getStarted")}</Button>
        </Link>
      </section>
    </div>
  );
}
