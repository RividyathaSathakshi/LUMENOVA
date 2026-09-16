import type { AppData, OpkTestRecord, Profile, SymptomLog, UrineTestRecord } from "./types";

const KEY = "lumenova.data.v1";

const empty: AppData = {
  profile: null,
  urineTests: [],
  opkTests: [],
  symptomLogs: [],
  cycleStartDates: [],
};

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return { ...empty, ...parsed };
  } catch {
    return { ...empty };
  }
}

function saveData(data: AppData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function saveProfile(profile: Profile) {
  const data = loadData();
  data.profile = profile;
  saveData(data);
}

export function addUrineTest(record: UrineTestRecord) {
  const data = loadData();
  data.urineTests = [record, ...data.urineTests];
  saveData(data);
}

export function addOpkTest(record: OpkTestRecord) {
  const data = loadData();
  data.opkTests = [record, ...data.opkTests];
  saveData(data);
}

export function addSymptomLog(log: SymptomLog) {
  const data = loadData();
  const rest = data.symptomLogs.filter((l) => l.date !== log.date);
  data.symptomLogs = [...rest, log];
  saveData(data);
}

export function addCycleStartDate(date: string) {
  const data = loadData();
  if (!data.cycleStartDates.includes(date)) {
    data.cycleStartDates = [...data.cycleStartDates, date].sort();
  }
  saveData(data);
}

export function clearAllData() {
  localStorage.removeItem(KEY);
}

export function hasProfile(): boolean {
  return !!loadData().profile;
}
