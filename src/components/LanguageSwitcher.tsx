import { AVAILABLE_LOCALES, useI18n } from "../i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="focus-ring cursor-pointer appearance-none rounded-lg border border-border bg-bg-panel px-3 py-1.5 pr-7 text-label text-ink"
        aria-label="Select language"
      >
        {AVAILABLE_LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeName}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-ink-dim"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
