import type { CrashData, ProcessedData } from "./types"
import { crashData } from "./crash-data"

// Replace the fetchCrashData function with a simpler one that returns the imported data
export function getCrashData(): CrashData[] {
  return crashData
}

export function processCrashData(data: CrashData[]): ProcessedData {
  // Process yearly trends
  const yearlyTrends = processYearlyTrends(data)

  // Process top makes
  const topMakes = processTopMakes(data)

  // Process age patterns
  const agePatterns = processAgePatterns(data)

  // Process model comparison
  const modelComparison = processModelComparison(data)

  // Process vehicle age vs model year
  const vehicleAgeVsModelYear = processVehicleAgeVsModelYear(data)

  return {
    yearlyTrends,
    topMakes,
    agePatterns,
    modelComparison,
    vehicleAgeVsModelYear,
  }
}

function processYearlyTrends(data: CrashData[]) {
  // Get unique years
  const years = Array.from(new Set(data.map((item) => item.CrashYear))).sort()

  // Calculate total crashes per year
  return years.map((year) => {
    const yearData = data.filter((item) => item.CrashYear === year)
    const totalCrashes = yearData.reduce((sum, item) => sum + item.crash_count, 0)

    return {
      year,
      totalCrashes,
    }
  })
}

function processTopMakes(data: CrashData[]) {
  // Group by make
  const makeGroups = data.reduce(
    (groups, item) => {
      const make = item.Veh_Make_ID
      if (!groups[make]) {
        groups[make] = []
      }
      groups[make].push(item)
      return groups
    },
    {} as Record<string, CrashData[]>,
  )

  // Calculate total crashes per make
  const makeCrashes = Object.entries(makeGroups).map(([make, items]) => {
    const crashes = items.reduce((sum, item) => sum + item.crash_count, 0)
    return { make, crashes }
  })

  // Sort by crash count and take top 8
  return makeCrashes.sort((a, b) => b.crashes - a.crashes).slice(0, 8)
}

function processAgePatterns(data: CrashData[]) {
  // Calculate vehicle age at crash time
  const withAge = data.map((item) => ({
    ...item,
    vehicleAge: item.CrashYear - item.Veh_Mod_Year,
  }))

  // Group by age
  const ageGroups = withAge.reduce(
    (groups, item) => {
      const age = item.vehicleAge
      if (age >= 0 && age <= 20) {
        // Filter out unreasonable ages
        if (!groups[age]) {
          groups[age] = []
        }
        groups[age].push(item)
      }
      return groups
    },
    {} as Record<number, any[]>,
  )

  // Calculate crashes per age
  const ageCrashes = Object.entries(ageGroups).map(([age, items]) => {
    const crashes = items.reduce((sum, item) => sum + item.crash_count, 0)
    return { age: Number.parseInt(age), crashes }
  })

  // Sort by age
  return ageCrashes.sort((a, b) => a.age - b.age)
}

function processModelComparison(data: CrashData[]) {
  // Group by model and make
  const modelGroups = data.reduce(
    (groups, item) => {
      const key = `${item.Veh_Make_ID}-${item.Veh_Mod_ID}`
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(item)
      return groups
    },
    {} as Record<string, CrashData[]>,
  )

  // Calculate total crashes per model
  const modelCrashes = Object.entries(modelGroups).map(([key, items]) => {
    const [make, model] = key.split("-")
    const crashes = items.reduce((sum, item) => sum + item.crash_count, 0)
    return { model, make, crashes }
  })

  // Sort by crash count and take top 10
  return modelCrashes.sort((a, b) => b.crashes - a.crashes).slice(0, 10)
}

function processVehicleAgeVsModelYear(data: CrashData[]) {
  // Group by model year
  const yearGroups = data.reduce(
    (groups, item) => {
      const year = item.Veh_Mod_Year
      if (!groups[year]) {
        groups[year] = []
      }
      groups[year].push(item)
      return groups
    },
    {} as Record<number, CrashData[]>,
  )

  // Calculate crashes per model year
  const yearCrashes = Object.entries(yearGroups).map(([year, items]) => {
    const crashes = items.reduce((sum, item) => sum + item.crash_count, 0)
    return { modelYear: Number.parseInt(year), crashes }
  })

  // Sort by model year
  return yearCrashes.sort((a, b) => a.modelYear - b.modelYear)
}

