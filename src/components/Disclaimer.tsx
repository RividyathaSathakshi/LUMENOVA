import { useI18n } from "../i18n";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 text-ink ${
        compact ? "px-3.5 py-2.5" : "px-5 py-4"
      }`}
    >
      <svg
        className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      </svg>
      <p className={compact ? "text-caption text-ink-dim" : "text-body text-ink-dim"}>
        {compact ? t("disclaimer.short") : t("disclaimer.banner")}
      </p>
    </div>
  );
}

export default DisclaimerBanner;
