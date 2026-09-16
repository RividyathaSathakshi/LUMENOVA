import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import en from "./locales/en";
import type { Translations } from "./locales/en";

export interface LocaleInfo {
  code: string;
  nativeName: string;
}

export const AVAILABLE_LOCALES: LocaleInfo[] = [{ code: "en", nativeName: "English" }];

const dictionaries: Record<string, Translations> = {
  en,
};

const STORAGE_KEY = "lumenova.locale";

function detectLocale(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && dictionaries[stored]) return stored;
  } catch {
    /* ignore */
  }
  const browserLangs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const lang of browserLangs) {
    const short = lang.split("-")[0];
    if (dictionaries[short]) return short;
  }
  return "en";
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

interface I18nContextValue {
  locale: string;
  setLocale: (code: string) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<string>(() => detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((code: string) => {
    const resolved = dictionaries[code] ? code : "en";
    setLocaleState(resolved);
    try {
      localStorage.setItem(STORAGE_KEY, resolved);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] ?? dictionaries.en;
      let value = getByPath(dict, key);
      if (typeof value !== "string") {
        value = getByPath(dictionaries.en, key);
      }
      if (typeof value !== "string") {
        return key;
      }
      if (!vars) return value;
      return Object.entries(vars).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
        value
      );
    },
    [locale]
  );

  const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
