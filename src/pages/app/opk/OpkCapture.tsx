import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../i18n";
import CameraCapture from "../../../components/CameraCapture";
import Button from "../../../components/ui/Button";
import { averageColorInRegion, lineIntensity } from "../../../lib/colorSampling";
import { classifyRatio } from "../../../lib/opkAnalysis";
import { addOpkTest, loadData } from "../../../lib/storage";
import { cycleDay } from "../../../lib/cycle";
import type { OpkTestRecord } from "../../../lib/types";

const CONTROL_REGION = { x: 0.42, y: 0.3, width: 0.16, height: 0.4 };
const TEST_REGION = { x: 0.62, y: 0.3, width: 0.16, height: 0.4 };

export default function OpkCapture() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [manualControl, setManualControl] = useState(70);
  const [manualTest, setManualTest] = useState(40);

  function finalizeResult(controlIntensity: number, testIntensity: number) {
    const data = loadData();
    const profile = data.profile!;
    const ratio = controlIntensity > 0.001 ? testIntensity / controlIntensity : 0;
    const record: OpkTestRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      cycleDay: cycleDay(profile, new Date(), data.cycleStartDates),
      controlIntensity,
      testIntensity,
      ratio,
      level: classifyRatio(ratio),
    };
    addOpkTest(record);
    navigate(`/app/opk/results/${record.id}`);
  }

  function handleCapture(canvas: HTMLCanvasElement) {
    setAnalyzing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const controlRgb = averageColorInRegion(ctx, canvas.width, canvas.height, CONTROL_REGION);
    const testRgb = averageColorInRegion(ctx, canvas.width, canvas.height, TEST_REGION);
    const controlIntensity = lineIntensity(controlRgb);
    const testIntensity = lineIntensity(testRgb);
    setTimeout(() => finalizeResult(controlIntensity, testIntensity), 700);
  }

  const overlay = (
    <div className="absolute inset-0">
      <RegionBox region={CONTROL_REGION} label="C" />
      <RegionBox region={TEST_REGION} label="T" />
    </div>
  );

  const manualEntry = (
    <div className="space-y-5">
      <SliderField label="Control line darkness" value={manualControl} onChange={setManualControl} />
      <SliderField label="Test line darkness" value={manualTest} onChange={setManualTest} />
      <Button onClick={() => finalizeResult(manualControl / 100, manualTest / 100)}>{t("common.continue")}</Button>
    </div>
  );

  if (analyzing) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-24 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-gold border-t-transparent" />
        <p className="mt-5 text-body text-ink-dim">{t("opk.capture.analyzing")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h2 text-ink">{t("opk.capture.title")}</h1>
      <p className="mt-2 text-body text-ink-dim">{t("opk.capture.instructions")}</p>
      <div className="mt-6">
        <CameraCapture overlay={overlay} onCapture={handleCapture} manualEntry={manualEntry} countdownSeconds={3} />
      </div>
    </div>
  );
}

function RegionBox({ region, label }: { region: { x: number; y: number; width: number; height: number }; label: string }) {
  return (
    <div
      className="absolute flex items-end justify-center border-2 border-dashed border-white/80"
      style={{
        left: `${region.x * 100}%`,
        top: `${region.y * 100}%`,
        width: `${region.width * 100}%`,
        height: `${region.height * 100}%`,
      }}
    >
      <span className="mb-1 rounded bg-black/60 px-2 py-0.5 text-caption text-white">{label}</span>
    </div>
  );
}

function SliderField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-label text-ink">{label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-accent-gold"
      />
    </label>
  );
}
