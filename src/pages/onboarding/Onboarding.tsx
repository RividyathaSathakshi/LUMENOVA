import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";
import { saveProfile } from "../../lib/storage";
import type { Goal, HealthGoal, Profile } from "../../lib/types";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DisclaimerBanner from "../../components/Disclaimer";
import { toISODate } from "../../lib/cycle";

const TOTAL_STEPS = 4;

export default function Onboarding() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [age, setAge] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState(toISODate(new Date()));
  const [avgCycleLength, setAvgCycleLength] = useState("28");
  const [avgPeriodLength, setAvgPeriodLength] = useState("5");
  const [healthGoal, setHealthGoal] = useState<HealthGoal | null>(null);
  const [accepted, setAccepted] = useState(false);

  const goalOptions: { value: Goal; title: string; desc: string }[] = [
    { value: "urine", title: t("onboarding.stepGoalUrine"), desc: t("onboarding.stepGoalUrineDesc") },
    { value: "fertility", title: t("onboarding.stepGoalFertility"), desc: t("onboarding.stepGoalFertilityDesc") },
    { value: "both", title: t("onboarding.stepGoalBoth"), desc: t("onboarding.stepGoalBothDesc") },
  ];

  const healthGoalOptions: { value: HealthGoal; label: string }[] = [
    { value: "ttc", label: t("onboarding.healthGoalTtc") },
    { value: "wellness", label: t("onboarding.healthGoalWellness") },
    { value: "pcos", label: t("onboarding.healthGoalPcos") },
    { value: "cycle-awareness", label: t("onboarding.healthGoalCycle") },
    { value: "other", label: t("onboarding.healthGoalOther") },
  ];

  const canProceedStep1 = goal !== null;
  const canProceedStep2 = age !== "" && lastPeriodDate !== "" && avgCycleLength !== "" && avgPeriodLength !== "";
  const canProceedStep3 = healthGoal !== null;

  function finish() {
    if (!goal || !healthGoal) return;
    const profile: Profile = {
      goal,
      age: Number(age),
      lastPeriodDate,
      avgCycleLength: Number(avgCycleLength),
      avgPeriodLength: Number(avgPeriodLength),
      healthGoal,
      disclaimerAcceptedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    saveProfile(profile);
    navigate("/app");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-panel-alt px-5 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-accent-gold" : "bg-border"}`}
            />
          ))}
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div>
              <h1 className="font-display text-h2 text-ink">{t("onboarding.stepGoalTitle")}</h1>
              <div className="mt-6 space-y-3">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGoal(opt.value)}
                    className={`focus-ring block w-full rounded-xl border p-4 text-left transition-colors ${
                      goal === opt.value
                        ? "border-accent-gold bg-accent-gold/10"
                        : "border-border hover:bg-bg-panel-alt"
                    }`}
                  >
                    <p className="text-label text-ink">{opt.title}</p>
                    <p className="mt-1 text-caption text-ink-dim">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="font-display text-h2 text-ink">{t("onboarding.stepProfileTitle")}</h1>
              <div className="mt-6 space-y-4">
                <Field label={t("onboarding.ageLabel")}>
                  <input
                    type="number"
                    min={10}
                    max={70}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="focus-ring w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
                  />
                </Field>
                <Field label={t("onboarding.lastPeriodLabel")}>
                  <input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    max={toISODate(new Date())}
                    className="focus-ring w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label={t("onboarding.avgCycleLabel")}>
                    <input
                      type="number"
                      min={15}
                      max={60}
                      value={avgCycleLength}
                      onChange={(e) => setAvgCycleLength(e.target.value)}
                      className="focus-ring w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
                    />
                  </Field>
                  <Field label={t("onboarding.avgPeriodLabel")}>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={avgPeriodLength}
                      onChange={(e) => setAvgPeriodLength(e.target.value)}
                      className="focus-ring w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
                    />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="font-display text-h2 text-ink">{t("onboarding.stepGoalHealthTitle")}</h1>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {healthGoalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setHealthGoal(opt.value)}
                    className={`focus-ring rounded-xl border p-4 text-left text-label transition-colors ${
                      healthGoal === opt.value
                        ? "border-accent-gold bg-accent-gold/10 text-ink"
                        : "border-border text-ink-dim hover:bg-bg-panel-alt"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="font-display text-h2 text-ink">{t("onboarding.stepDisclaimerTitle")}</h1>
              <div className="mt-5">
                <DisclaimerBanner />
              </div>
              <p className="mt-4 text-body text-ink-dim">{t("privacy.disclaimerBody")}</p>
              <label className="mt-6 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="focus-ring mt-1 h-4 w-4 rounded border-border"
                />
                <span className="text-body text-ink">{t("disclaimer.acceptLabel")}</span>
              </label>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              {t("common.back")}
            </Button>
            {step < TOTAL_STEPS ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2) || (step === 3 && !canProceedStep3)}
              >
                {t("common.next")}
              </Button>
            ) : (
              <Button onClick={finish} disabled={!accepted}>
                {t("onboarding.finish")}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-label text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
