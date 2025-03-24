import type { CrashData } from "./types";
import rawCrashData from "@/data/crash-data.json";

// Direct array of crash data objects without the nested "crashes" property
export const crashData: CrashData[] = rawCrashData as CrashData[];
