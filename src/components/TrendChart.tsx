import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../theme/ThemeProvider";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface TrendSeries {
  label: string;
  data: number[];
  color: string;
}

export default function TrendChart({ labels, series, height = 220 }: { labels: string[]; series: TrendSeries[]; height?: number }) {
  const { resolvedTheme } = useTheme();
  const tickColor = resolvedTheme === "dark" ? "#A6ABC4" : "#5B6178";
  const gridColor = resolvedTheme === "dark" ? "rgba(243,239,230,0.1)" : "rgba(30,36,56,0.08)";

  return (
    <div style={{ height }}>
      <Line
        data={{
          labels,
          datasets: series.map((s) => ({
            label: s.label,
            data: s.data,
            borderColor: s.color,
            backgroundColor: s.color,
            tension: 0.35,
            pointRadius: 3,
          })),
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: series.length > 1, labels: { color: tickColor } },
          },
          scales: {
            x: { ticks: { color: tickColor }, grid: { display: false } },
            y: { ticks: { color: tickColor }, grid: { color: gridColor } },
          },
        }}
      />
    </div>
  );
}
