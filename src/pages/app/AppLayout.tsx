import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useI18n } from "../../i18n";
import { loadData } from "../../lib/storage";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import ThemeToggle from "../../components/ThemeToggle";

const navItems = [
  { to: "/app", key: "dashboard.title", end: true },
  { to: "/app/urine", key: "urine.moduleTitle", end: false },
  { to: "/app/opk", key: "opk.moduleTitle", end: false },
  { to: "/app/calendar", key: "calendar.title", end: false },
];

export default function AppLayout() {
  const { t } = useI18n();
  const data = loadData();

  if (!data.profile) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="min-h-screen bg-bg pb-16 lg:pb-0">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <NavLink to="/app" end className="focus-ring flex items-center gap-2 rounded-lg">
            <svg viewBox="0 0 32 32" className="h-7 w-7">
              <rect width="32" height="32" rx="8" className="fill-ink" />
              <path d="M16 6c4 6 8 10.5 8 15a8 8 0 0 1-16 0c0-4.5 4-9 8-15z" className="fill-accent-gold" />
            </svg>
            <span className="font-display text-h3 text-ink">Lumenova</span>
          </NavLink>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `focus-ring rounded-lg px-3 py-2 text-label transition-colors ${
                    isActive ? "bg-bg-panel-alt text-ink" : "text-ink-dim hover:text-ink"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg-panel lg:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `focus-ring flex-1 py-3 text-center text-caption ${isActive ? "text-accent-gold" : "text-ink-dim"}`
            }
          >
            {t(item.key)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
