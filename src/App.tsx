import { Navigate, Route, Routes } from "react-router-dom";
import MarketingLayout from "./components/Layout";
import Home from "./pages/marketing/Home";
import HowItWorks from "./pages/marketing/HowItWorks";
import Modules from "./pages/marketing/Modules";
import About from "./pages/marketing/About";
import Privacy from "./pages/marketing/Privacy";
import Contact from "./pages/marketing/Contact";
import Onboarding from "./pages/onboarding/Onboarding";
import AppLayout from "./pages/app/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import CalendarPage from "./pages/app/CalendarPage";
import UrineHome from "./pages/app/urine/UrineHome";
import UrineCapture from "./pages/app/urine/UrineCapture";
import UrineResults from "./pages/app/urine/UrineResults";
import UrineHistory from "./pages/app/urine/UrineHistory";
import OpkHome from "./pages/app/opk/OpkHome";
import OpkCapture from "./pages/app/opk/OpkCapture";
import OpkResults from "./pages/app/opk/OpkResults";
import OpkHistory from "./pages/app/opk/OpkHistory";

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/onboarding" element={<Onboarding />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="urine" element={<UrineHome />} />
        <Route path="urine/capture" element={<UrineCapture />} />
        <Route path="urine/results/:id" element={<UrineResults />} />
        <Route path="urine/history" element={<UrineHistory />} />
        <Route path="opk" element={<OpkHome />} />
        <Route path="opk/capture" element={<OpkCapture />} />
        <Route path="opk/results/:id" element={<OpkResults />} />
        <Route path="opk/history" element={<OpkHistory />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
