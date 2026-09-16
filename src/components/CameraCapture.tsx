import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useCamera } from "../hooks/useCamera";
import { useI18n } from "../i18n";
import Button from "./ui/Button";

interface CameraCaptureProps {
  overlay: ReactNode;
  onCapture: (canvas: HTMLCanvasElement) => void;
  manualEntry: ReactNode;
  countdownSeconds?: number;
}

export default function CameraCapture({ overlay, onCapture, manualEntry, countdownSeconds = 3 }: CameraCaptureProps) {
  const { t } = useI18n();
  const { videoRef, status, start, captureFrame } = useCamera();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [forceManual, setForceManual] = useState(false);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      const canvas = captureFrame();
      if (canvas) onCapture(canvas);
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, captureFrame, onCapture]);

  const showManual = forceManual || status === "denied" || status === "unavailable";

  if (showManual) {
    return (
      <div className="rounded-2xl border border-border bg-bg-panel p-6">
        {!forceManual && (
          <div className="mb-5 rounded-xl border border-warning/40 bg-warning/10 p-4">
            <p className="text-body text-ink">
              {status === "unavailable" ? t("camera.noCameraFound") : t("camera.permissionDenied")}
            </p>
            <p className="mt-1 text-caption text-ink-dim">{t("camera.permissionDeniedBody")}</p>
          </div>
        )}
        <h3 className="font-display text-h3 text-ink">{t("camera.manualEntryTitle")}</h3>
        <div className="mt-4">{manualEntry}</div>
        <button
          className="focus-ring mt-4 text-label text-accent-gold hover:underline"
          onClick={() => {
            setForceManual(false);
            start();
          }}
        >
          {t("camera.switchToCamera")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-black">
        <video ref={videoRef} playsInline muted className="aspect-[3/4] w-full object-cover sm:aspect-video" />
        <div className="pointer-events-none absolute inset-0">{overlay}</div>
        {countdown !== null && countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="font-display text-display text-white">{countdown}</span>
          </div>
        )}
        {status === "requesting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-body text-white">
            {t("common.loading")}
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button className="focus-ring text-label text-ink-dim hover:text-ink" onClick={() => setForceManual(true)}>
          {t("camera.switchToManual")}
        </button>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setCountdown(countdownSeconds)} disabled={status !== "active" || countdown !== null}>
            {t("camera.startCountdown")}
          </Button>
          <Button
            onClick={() => {
              const canvas = captureFrame();
              if (canvas) onCapture(canvas);
            }}
            disabled={status !== "active"}
          >
            {t("camera.manualCapture")}
          </Button>
        </div>
      </div>
    </div>
  );
}
