import type { QualitativeLevel, UrineParameterKey, UrineStatus } from "./types";

export interface ColorSwatch {
  level: QualitativeLevel;
  status: UrineStatus;
  value: string;
  rgb: [number, number, number];
}

export interface UrineParameterDef {
  key: UrineParameterKey;
  labelKey: string;
  swatches: ColorSwatch[];
}

/**
 * Approximate, illustrative color-to-level mappings modeled on typical clinical
 * urinalysis reagent strip charts. These RGB values are stylized reference points
 * for a screening prototype, not calibrated clinical color standards.
 */
export const URINE_PARAMETERS: UrineParameterDef[] = [
  {
    key: "glucose",
    labelKey: "urine.param.glucose",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [56, 130, 140] },
      { level: "trace", status: "borderline", value: "Trace (~100 mg/dL)", rgb: [78, 140, 110] },
      { level: "plus1", status: "borderline", value: "1+ (~250 mg/dL)", rgb: [120, 150, 70] },
      { level: "plus2", status: "abnormal", value: "2+ (~500 mg/dL)", rgb: [165, 150, 60] },
      { level: "plus3", status: "abnormal", value: "3+ (~1000+ mg/dL)", rgb: [150, 110, 60] },
    ],
  },
  {
    key: "protein",
    labelKey: "urine.param.protein",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [225, 210, 90] },
      { level: "trace", status: "borderline", value: "Trace (~15 mg/dL)", rgb: [190, 205, 95] },
      { level: "plus1", status: "borderline", value: "1+ (~30 mg/dL)", rgb: [140, 190, 110] },
      { level: "plus2", status: "abnormal", value: "2+ (~100 mg/dL)", rgb: [90, 170, 130] },
      { level: "plus3", status: "abnormal", value: "3+ (~300+ mg/dL)", rgb: [60, 140, 140] },
    ],
  },
  {
    key: "ph",
    labelKey: "urine.param.ph",
    swatches: [
      { level: "negative", status: "abnormal", value: "5.0", rgb: [230, 120, 70] },
      { level: "trace", status: "borderline", value: "6.0", rgb: [225, 170, 70] },
      { level: "plus1", status: "normal", value: "6.5", rgb: [190, 190, 80] },
      { level: "plus2", status: "normal", value: "7.5", rgb: [120, 175, 110] },
      { level: "plus3", status: "borderline", value: "8.5+", rgb: [70, 130, 150] },
    ],
  },
  {
    key: "ketones",
    labelKey: "urine.param.ketones",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [235, 210, 190] },
      { level: "trace", status: "borderline", value: "Trace (~5 mg/dL)", rgb: [225, 170, 175] },
      { level: "plus1", status: "borderline", value: "1+ (~15 mg/dL)", rgb: [205, 130, 165] },
      { level: "plus2", status: "abnormal", value: "2+ (~40 mg/dL)", rgb: [170, 100, 155] },
      { level: "plus3", status: "abnormal", value: "3+ (~80+ mg/dL)", rgb: [130, 80, 145] },
    ],
  },
  {
    key: "blood",
    labelKey: "urine.param.blood",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [230, 190, 90] },
      { level: "trace", status: "borderline", value: "Trace (hemolyzed)", rgb: [180, 190, 100] },
      { level: "plus1", status: "abnormal", value: "1+ (~10 RBC/µL)", rgb: [130, 175, 100] },
      { level: "plus2", status: "abnormal", value: "2+ (~50 RBC/µL)", rgb: [90, 150, 95] },
      { level: "plus3", status: "abnormal", value: "3+ (~250+ RBC/µL)", rgb: [60, 100, 90] },
    ],
  },
  {
    key: "leukocytes",
    labelKey: "urine.param.leukocytes",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [245, 235, 220] },
      { level: "trace", status: "borderline", value: "Trace (~15 WBC/µL)", rgb: [230, 210, 220] },
      { level: "plus1", status: "abnormal", value: "1+ (~70 WBC/µL)", rgb: [205, 180, 210] },
      { level: "plus2", status: "abnormal", value: "2+ (~125 WBC/µL)", rgb: [175, 140, 195] },
      { level: "plus3", status: "abnormal", value: "3+ (~500+ WBC/µL)", rgb: [140, 100, 175] },
    ],
  },
  {
    key: "nitrites",
    labelKey: "urine.param.nitrites",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [250, 245, 235] },
      { level: "plus1", status: "abnormal", value: "Positive", rgb: [235, 175, 175] },
      { level: "plus3", status: "abnormal", value: "Strong positive", rgb: [215, 120, 120] },
    ],
  },
  {
    key: "specificGravity",
    labelKey: "urine.param.specificGravity",
    swatches: [
      { level: "negative", status: "borderline", value: "1.000", rgb: [225, 150, 90] },
      { level: "trace", status: "normal", value: "1.010", rgb: [150, 170, 100] },
      { level: "plus1", status: "normal", value: "1.020", rgb: [100, 165, 130] },
      { level: "plus2", status: "normal", value: "1.025", rgb: [80, 150, 155] },
      { level: "plus3", status: "borderline", value: "1.030", rgb: [70, 120, 165] },
    ],
  },
  {
    key: "urobilinogen",
    labelKey: "urine.param.urobilinogen",
    swatches: [
      { level: "negative", status: "normal", value: "Normal (~0.2 mg/dL)", rgb: [240, 200, 175] },
      { level: "trace", status: "normal", value: "Normal (~1 mg/dL)", rgb: [230, 170, 150] },
      { level: "plus1", status: "borderline", value: "2 mg/dL", rgb: [215, 130, 120] },
      { level: "plus2", status: "abnormal", value: "4 mg/dL", rgb: [190, 100, 100] },
      { level: "plus3", status: "abnormal", value: "8+ mg/dL", rgb: [160, 80, 90] },
    ],
  },
  {
    key: "bilirubin",
    labelKey: "urine.param.bilirubin",
    swatches: [
      { level: "negative", status: "normal", value: "Negative", rgb: [245, 235, 210] },
      { level: "trace", status: "borderline", value: "Trace", rgb: [225, 210, 170] },
      { level: "plus1", status: "abnormal", value: "1+", rgb: [200, 175, 150] },
      { level: "plus2", status: "abnormal", value: "2+", rgb: [175, 145, 145] },
      { level: "plus3", status: "abnormal", value: "3+", rgb: [150, 110, 140] },
    ],
  },
];

function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

export function classifySwatch(
  param: UrineParameterDef,
  sampled: [number, number, number]
): { swatch: ColorSwatch; confidence: "high" | "medium" | "low" } {
  let best = param.swatches[0];
  let bestDist = Infinity;
  let secondDist = Infinity;
  for (const swatch of param.swatches) {
    const dist = colorDistance(swatch.rgb, sampled);
    if (dist < bestDist) {
      secondDist = bestDist;
      bestDist = dist;
      best = swatch;
    } else if (dist < secondDist) {
      secondDist = dist;
    }
  }
  const margin = secondDist - bestDist;
  const confidence: "high" | "medium" | "low" =
    bestDist < 25 && margin > 20 ? "high" : bestDist < 60 && margin > 8 ? "medium" : "low";
  return { swatch: best, confidence };
}
