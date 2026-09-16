# Lumenova

A browser-based women's health **screening** companion — urine strip analysis and
ovulation (OPK) strip analysis using camera-based color detection. Built as a
working prototype for a science exhibition (health department category), fully
client-side and deployable as a static site.

**Lumenova is a screening and wellness aid, not a diagnostic device.** It never
claims clinical accuracy and always points users toward a licensed healthcare
provider for diagnosis or treatment.

## Stack

- React + TypeScript + Vite
- Tailwind CSS (custom "warm & clinical" design tokens — see `tailwind.config.js` / `src/index.css`)
- Chart.js (via `react-chartjs-2`) for trend graphs
- Browser `getUserMedia` + Canvas for strip capture and on-device color analysis
- `localStorage` only — no backend, no account, nothing leaves the device
- Lightweight i18n context (`src/i18n`) — English shipped fully, structured for more locales

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build
```

## Structure

- `src/pages/marketing` — Home, How It Works, Modules, About, Privacy & Disclaimer, Contact
- `src/pages/onboarding` — profile setup + disclaimer acceptance
- `src/pages/app` — the working product: dashboard, calendar, urine module, OPK module
- `src/lib` — cycle math, color-classification reference data, canvas sampling, localStorage persistence
- `src/components` — shared UI (camera capture, disclaimer banner, charts, layout)
- `src/i18n` — translation context + English dictionary

## Data & privacy

All profile, test, and cycle data is stored only in the browser's `localStorage`.
There is no server component. Camera frames are processed on-device and are
never uploaded or persisted beyond the derived result values. Use the "Clear my
data" control in the dashboard to permanently delete everything.
