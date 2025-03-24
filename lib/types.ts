export interface CrashData {
  Veh_Make_ID: string
  Veh_Mod_ID: string
  Veh_Mod_Year: number
  CrashYear: number
  crash_count: number
}

export interface ProcessedData {
  yearlyTrends: YearlyTrend[]
  topMakes: MakeCrash[]
  agePatterns: AgePattern[]
  modelComparison: ModelComparison[]
  vehicleAgeVsModelYear: VehicleAgeVsModelYear[]
}

export interface YearlyTrend {
  year: number
  totalCrashes: number
}

export interface MakeCrash {
  make: string
  crashes: number
}

export interface AgePattern {
  age: number
  crashes: number
}

export interface ModelComparison {
  model: string
  make: string
  crashes: number
}

export interface VehicleAgeVsModelYear {
  modelYear: number
  crashes: number
}

export interface CountyData {
  county: string
  crashes: number
}

export interface DriverDemographics {
  ageGroup: string
  gender: string
  crashes: number
}

export interface TimeOfDayData {
  timeOfDay: string
  crashes: number
}

export interface VehicleTypeData {
  vehicleType: string
  crashes: number
}

export interface WeatherData {
  weatherCondition: string
  crashes: number
}

