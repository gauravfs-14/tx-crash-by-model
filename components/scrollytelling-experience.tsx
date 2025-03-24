"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, AnimatePresence, motion } from "framer-motion";
import IntroSection from "./sections/intro-section";
import FeaturesSection from "./sections/features-section";
import ModelComparisonSection from "./sections/model-comparison-section";
import ModelYearSection from "./sections/model-year-section";
import DataExplorerSection from "./sections/data-explorer-section";
import { getCrashData, processCrashData } from "@/lib/data-processing";
import type { CrashData, ProcessedData } from "@/lib/types";
import ProgressIndicator from "./ui/progress-indicator";
import TrendsOverTimeSection from "./sections/trends-over-time-section";
import VehicleMakesSection from "./sections/vehicle-makes-section";
import VehicleAgeSection from "./sections/vehicle-age-section";

export default function ScrollytellingExperience() {
  const [crashData, setCrashData] = useState<CrashData[]>([]);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Load data directly from the imported module
    const data = getCrashData();
    setCrashData(data);
    const processed = processCrashData(data);
    setProcessedData(processed);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <p className="text-slate-600 text-lg">Loading crash data...</p>
        </div>
      </motion.div>
    );
  }

  if (!processedData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="flex flex-col items-center text-center">
            <p className="text-slate-600 text-lg">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "features", label: "Features" },
    { id: "trends", label: "Crash Trends" },
    { id: "makes", label: "Vehicle Makes" },
    { id: "age", label: "Vehicle Age" },
    { id: "models", label: "Model Comparison" },
    { id: "modelYear", label: "Model Year Analysis" },
    { id: "explorer", label: "Data Explorer" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress indicator */}
        <ProgressIndicator
          sections={sections}
          scrollProgress={scrollYProgress}
        />

        {/* Main content sections */}
        <section id="intro">
          <IntroSection data={crashData} />
        </section>

        <section id="features">
          <FeaturesSection />
        </section>

        <section id="trends">
          <TrendsOverTimeSection data={processedData.yearlyTrends} />
        </section>

        <section id="makes">
          <VehicleMakesSection data={processedData.topMakes} />
        </section>

        <section id="age">
          <VehicleAgeSection data={processedData.agePatterns} />
        </section>

        <section id="models">
          <ModelComparisonSection data={processedData.modelComparison} />
        </section>

        <section id="modelYear">
          <ModelYearSection data={processedData.vehicleAgeVsModelYear} />
        </section>

        <section id="explorer">
          <DataExplorerSection data={crashData} />
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
