import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ThemePref = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: ThemePref;
  setTheme: (t: ThemePref) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "lumenova.theme";

function getSystemPref(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePref>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePref | null;
      return stored ?? "system";
    } catch {
      return "system";
    }
  });
  const [systemPref, setSystemPref] = useState<"light" | "dark">(getSystemPref);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setSystemPref(getSystemPref());
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedTheme = theme === "system" ? systemPref : theme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = (t: ThemePref) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => ({ theme, setTheme, resolvedTheme }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
