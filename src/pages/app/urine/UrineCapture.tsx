import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../i18n";
import CameraCapture from "../../../components/CameraCapture";
import Button from "../../../components/ui/Button";
import { averageColorInRegion } from "../../../lib/colorSampling";
import { URINE_PARAMETERS, classifySwatch } from "../../../lib/urineReference";
import { addUrineTest } from "../../../lib/storage";
import type { UrineParameterResult, UrineTestRecord } from "../../../lib/types";

const STRIP_X = 0.32;
const STRIP_WIDTH = 0.36;
const STRIP_Y = 0.04;
const STRIP_HEIGHT = 0.92;
const PAD_COUNT = URINE_PARAMETERS.length;

function padRegion(index: number) {
  const padHeight = STRIP_HEIGHT / PAD_COUNT;
  return {
    x: STRIP_X,
    y: STRIP_Y + index * padHeight,
    width: STRIP_WIDTH,
    height: padHeight * 0.8,
  };
}

export default function UrineCapture() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [manualLevels, setManualLevels] = useState<Record<string, string>>(
    Object.fromEntries(URINE_PARAMETERS.map((p) => [p.key, "negative"]))
  );

  function finalizeResults(results: UrineParameterResult[]) {
    const record: UrineTestRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      results,
      flagged: results.filter((r) => r.status !== "normal").map((r) => r.key),
    };
    addUrineTest(record);
    navigate(`/app/urine/results/${record.id}`);
  }

  function handleCapture(canvas: HTMLCanvasElement) {
    setAnalyzing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const results: UrineParameterResult[] = URINE_PARAMETERS.map((param, i) => {
      const rgb = averageColorInRegion(ctx, canvas.width, canvas.height, padRegion(i));
      const { swatch, confidence } = classifySwatch(param, rgb);
      return { key: param.key, level: swatch.level, value: swatch.value, status: swatch.status, confidence };
    });
    setTimeout(() => finalizeResults(results), 900);
  }

  function handleManualSubmit() {
    const results: UrineParameterResult[] = URINE_PARAMETERS.map((param) => {
      const level = manualLevels[param.key] as UrineParameterResult["level"];
      const swatch = param.swatches.find((s) => s.level === level) ?? param.swatches[0];
      return { key: param.key, level: swatch.level, value: swatch.value, status: swatch.status };
    });
    finalizeResults(results);
  }

  const overlay = (
    <div className="absolute inset-0">
      {URINE_PARAMETERS.map((param, i) => {
        const region = padRegion(i);
        return (
          <div
            key={param.key}
            className="absolute flex items-center justify-end border-2 border-dashed border-white/70 pr-1"
            style={{
              left: `${region.x * 100}%`,
              top: `${region.y * 100}%`,
              width: `${region.width * 100}%`,
              height: `${region.height * 100}%`,
            }}
          >
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] leading-none text-white">
              {i + 1}
            </span>
          </div>
        );
      })}
    </div>
  );

  const manualEntry = (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {URINE_PARAMETERS.map((param) => (
          <label key={param.key} className="block">
            <span className="text-label text-ink">{t(param.labelKey)}</span>
            <select
              value={manualLevels[param.key]}
              onChange={(e) => setManualLevels((prev) => ({ ...prev, [param.key]: e.target.value }))}
              className="focus-ring mt-1 w-full rounded-lg border border-border bg-bg-panel px-3 py-2 text-body text-ink"
            >
              {param.swatches.map((s) => (
                <option key={s.level} value={s.level}>
                  {s.value}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <Button onClick={handleManualSubmit}>{t("common.continue")}</Button>
    </div>
  );

  if (analyzing) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-24 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-gold border-t-transparent" />
        <p className="mt-5 text-body text-ink-dim">{t("urine.capture.analyzing")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-h2 text-ink">{t("urine.capture.title")}</h1>
      <p className="mt-2 text-body text-ink-dim">{t("urine.capture.instructions")}</p>
      <div className="mt-6">
        <CameraCapture overlay={overlay} onCapture={handleCapture} manualEntry={manualEntry} countdownSeconds={3} />
      </div>
    </div>
  );
}
