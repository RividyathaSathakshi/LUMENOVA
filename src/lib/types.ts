export type Goal = "urine" | "fertility" | "both";

export type HealthGoal =
  | "ttc"
  | "wellness"
  | "pcos"
  | "cycle-awareness"
  | "other";

export interface Profile {
  goal: Goal;
  age: number;
  lastPeriodDate: string; // ISO date
  avgCycleLength: number; // days
  avgPeriodLength: number; // days
  healthGoal: HealthGoal;
  disclaimerAcceptedAt: string; // ISO datetime
  createdAt: string;
  theme?: "light" | "dark" | "system";
}

export type UrineParameterKey =
  | "glucose"
  | "protein"
  | "ph"
  | "ketones"
  | "blood"
  | "leukocytes"
  | "nitrites"
  | "specificGravity"
  | "urobilinogen"
  | "bilirubin";

export type QualitativeLevel =
  | "negative"
  | "trace"
  | "plus1"
  | "plus2"
  | "plus3";

export type UrineStatus = "normal" | "borderline" | "abnormal";

export interface UrineParameterResult {
  key: UrineParameterKey;
  level: QualitativeLevel;
  value: string; // display value e.g. "7.0" for pH, "1.020" for SG
  status: UrineStatus;
  confidence?: "high" | "medium" | "low";
}

export interface UrineTestRecord {
  id: string;
  date: string; // ISO datetime
  results: UrineParameterResult[];
  flagged: UrineParameterKey[];
  notes?: string;
}

export type OpkLevel = "low" | "rising" | "peak";

export interface OpkTestRecord {
  id: string;
  date: string; // ISO datetime
  cycleDay: number;
  controlIntensity: number;
  testIntensity: number;
  ratio: number;
  level: OpkLevel;
}

export interface SymptomLog {
  date: string; // ISO date (day)
  mood?: string;
  sleepHours?: number;
  exercise?: boolean;
  stress?: "low" | "medium" | "high";
}

export interface AppData {
  profile: Profile | null;
  urineTests: UrineTestRecord[];
  opkTests: OpkTestRecord[];
  symptomLogs: SymptomLog[];
  cycleStartDates: string[]; // logged period start dates
}
