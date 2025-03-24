"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CrashData } from "@/lib/types";

interface IntroSectionProps {
  data: CrashData[];
}

export default function IntroSection({ data }: IntroSectionProps) {
  // Update the animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const scrollToTrends = () => {
    document.getElementById("trends")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExplorer = () => {
    document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate key statistics from the actual data
  const totalRecords = data.reduce((sum, item) => sum + item.crash_count, 0);
  const uniqueMakes = new Set(data.map((item) => item.Veh_Make_ID)).size;
  const uniqueModels = new Set(data.map((item) => item.Veh_Mod_ID)).size;
  const uniqueYears = new Set(data.map((item) => item.CrashYear)).size;

  // Format number in a compact way (k for thousands, M for millions, B for billions)
  interface FormatCompactNumberFunction {
    (num: number): string;
  }

  const formatCompactNumber: FormatCompactNumberFunction = (num) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B+`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M+`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k+`;
    }
    return `${num}+`;
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 pt-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50 z-0"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMDgyZjYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx' +
          'Ljc5IDQgNCA0IDQtMS43OSA0LTR6bTI0IDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30"
        ></div>
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, rgba(255, 255, 255, 0) 50%)",
            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.2) 0%, rgba(255, 255, 255, 0) 50%)",
            "radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.2) 0%, rgba(255, 255, 255, 0) 50%)",
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, rgba(255, 255, 255, 0) 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        {/* Highlight badge */}
        <motion.div
          variants={itemVariants}
          className="inline-block mb-6 bg-blue-100 border border-blue-200 rounded-full px-4 py-1"
        >
          <span className="text-blue-700 font-medium text-sm">
            Interactive Data Exploration
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-6 tracking-tight leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            Texas
          </span>{" "}
          Road Safety
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl font-medium text-slate-600">
            Crash Data Analysis
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto"
        >
          Explore comprehensive crash data visualization revealing patterns,
          trends, and insights to improve road safety across Texas.
        </motion.p>

        {/* Key statistics - now using actual data */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 max-w-4xl mx-auto"
        >
          {[
            {
              value: totalRecords,
              label: "Total Records",
              color: "from-blue-600 to-blue-400",
            },
            {
              value: uniqueMakes,
              label: "Vehicle Makes",
              color: "from-red-500 to-red-400",
            },
            {
              value: uniqueModels,
              label: "Vehicle Models",
              color: "from-amber-500 to-amber-400",
            },
            {
              value: uniqueYears,
              label: "Years of Data",
              color: "from-emerald-500 to-emerald-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center px-2"
            >
              <p
                className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text truncate`}
              >
                {formatCompactNumber(stat.value)}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={scrollToTrends}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-none px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
          >
            View Crash Trends
          </Button>
          <Button
            onClick={scrollToExplorer}
            variant="outline"
            size="lg"
            className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-full"
          >
            Explore Data Table
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 inset-x-0 mx-auto w-full text-center text-slate-500 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: {
            delay: 1.5,
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
