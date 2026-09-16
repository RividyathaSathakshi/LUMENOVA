import { Link } from "react-router-dom";
import { useI18n } from "../../../i18n";
import { URINE_PARAMETERS } from "../../../lib/urineReference";
import { rgbToCss } from "../../../lib/colorSampling";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import DisclaimerBanner from "../../../components/Disclaimer";

export default function UrineHome() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-h1 text-ink">{t("urine.moduleTitle")}</h1>

      <Card className="mt-6">
        <h2 className="font-display text-h3 text-ink">{t("urine.guidanceTitle")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-label text-ink">{t("urine.guidanceCollection")}</p>
            <p className="mt-1 text-caption text-ink-dim">{t("urine.guidanceCollectionBody")}</p>
          </div>
          <div>
            <p className="text-label text-ink">{t("urine.guidanceFasting")}</p>
            <p className="mt-1 text-caption text-ink-dim">{t("urine.guidanceFastingBody")}</p>
          </div>
          <div>
            <p className="text-label text-ink">{t("urine.guidanceTiming")}</p>
            <p className="mt-1 text-caption text-ink-dim">{t("urine.guidanceTimingBody")}</p>
          </div>
        </div>
      </Card>

      <Card className="mt-6" alt>
        <h2 className="font-display text-h3 text-ink">{t("urine.referenceTitle")}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-caption">
            <thead>
              <tr className="text-ink-dim">
                <th className="pb-2 pr-4">{t("urine.param.glucose").replace("Glucose", "Parameter")}</th>
                <th className="pb-2">Color scale (low → high)</th>
              </tr>
            </thead>
            <tbody>
              {URINE_PARAMETERS.map((p) => (
                <tr key={p.key} className="border-t border-border">
                  <td className="py-2.5 pr-4 text-label text-ink">{t(p.labelKey)}</td>
                  <td className="py-2.5">
                    <div className="flex gap-1.5">
                      {p.swatches.map((s) => (
                        <span
                          key={s.level}
                          title={s.value}
                          className="h-5 w-8 rounded"
                          style={{ background: rgbToCss(s.rgb) }}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 space-y-2">
          {URINE_PARAMETERS.map((p) => (
            <p key={p.key} className="text-caption text-ink-dim">
              <span className="text-ink">{t(p.labelKey)}:</span> {t(`urine.paramExplain.${p.key}`)}
            </p>
          ))}
        </div>
      </Card>

      <div className="mt-6">
        <DisclaimerBanner compact />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/app/urine/capture">
          <Button size="lg">{t("urine.startScan")}</Button>
        </Link>
        <Link to="/app/urine/history">
          <Button size="lg" variant="secondary">
            {t("urine.history.title")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
