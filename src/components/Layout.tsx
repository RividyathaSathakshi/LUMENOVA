import { NavLink, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/modules", key: "nav.modules" },
  { to: "/about", key: "nav.about" },
  { to: "/privacy", key: "nav.privacy" },
  { to: "/contact", key: "nav.contact" },
];

function Logo() {
  return (
    <Link to="/" className="focus-ring flex items-center gap-2 rounded-lg">
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="8" className="fill-ink" />
        <path
          d="M16 6c4 6 8 10.5 8 15a8 8 0 0 1-16 0c0-4.5 4-9 8-15z"
          className="fill-accent-gold"
        />
      </svg>
      <span className="font-display text-h3 text-ink">Lumenova</span>
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `focus-ring rounded-lg px-3 py-2 text-label transition-colors ${
                  isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/app">
            <Button size="sm">{t("nav.openApp")}</Button>
          </Link>
        </div>
        <button
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {open ? <path d="M6 6l12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-bg px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `focus-ring rounded-lg px-3 py-2.5 text-label ${
                    isActive ? "bg-bg-panel-alt text-ink" : "text-ink-dim"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Link to="/app" onClick={() => setOpen(false)}>
              <Button size="sm">{t("nav.openApp")}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-bg-panel-alt">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 max-w-[32ch] text-caption text-ink-dim">{t("disclaimer.short")}</p>
          </div>
          <div>
            <h4 className="text-label text-ink">{t("nav.modules")}</h4>
            <ul className="mt-3 space-y-2 text-body text-ink-dim">
              <li><Link className="focus-ring hover:text-ink" to="/modules">{t("modules.urineTitle")}</Link></li>
              <li><Link className="focus-ring hover:text-ink" to="/modules">{t("modules.fertilityTitle")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-label text-ink">{t("nav.about")}</h4>
            <ul className="mt-3 space-y-2 text-body text-ink-dim">
              <li><Link className="focus-ring hover:text-ink" to="/how-it-works">{t("nav.howItWorks")}</Link></li>
              <li><Link className="focus-ring hover:text-ink" to="/about">{t("nav.about")}</Link></li>
              <li><Link className="focus-ring hover:text-ink" to="/contact">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-label text-ink">{t("nav.privacy")}</h4>
            <ul className="mt-3 space-y-2 text-body text-ink-dim">
              <li><Link className="focus-ring hover:text-ink" to="/privacy">{t("nav.privacy")}</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-caption text-ink-dim">
          © {new Date().getFullYear()} {t("common.year")} — {t("disclaimer.short")}
        </p>
      </div>
    </footer>
  );
}

export default function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
