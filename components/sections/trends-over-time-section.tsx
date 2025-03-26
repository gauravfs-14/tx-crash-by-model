"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { YearlyTrend } from "@/lib/types";
import { TrendingUp, AlertCircle, ArrowRight } from "lucide-react";

interface TrendsOverTimeSectionProps {
  data: YearlyTrend[];
}

export default function TrendsOverTimeSection({
  data,
}: TrendsOverTimeSectionProps) {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  });
  const chartInView = useInView(chartRef, { once: true, amount: 0.6 });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Crash Trends Over Time
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-center">
            Vehicle crashes in Texas have followed clear and meaningful patterns
            over the last several years. This data helps uncover how driving
            conditions, behaviors, and external events shape roadway safety.
          </p>
        </motion.div>

        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 60 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 border-b border-blue-100">
              <h3 className="text-xl font-semibold text-slate-800">
                Annual Crash Incidents
              </h3>
              <p className="text-slate-500 text-sm">
                Total reported vehicles involved in crashes per year
              </p>
            </div>
            <CardContent className="p-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                    />
                    <YAxis
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow:
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "1px solid #e2e8f0",
                      }}
                      itemStyle={{ color: "#334155" }}
                      labelStyle={{ fontWeight: "bold", color: "#1e293b" }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalCrashes"
                      name="Total Vechiles Involved"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                      animationDuration={1500}
                      animationBegin={chartInView ? 0 : 9999}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-blue-100"
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Key Insights
              </h3>
            </div>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3 mt-0.5">
                  1
                </span>
                <span>
                  Crash incidents peaked in 2019, reaching over 1.1 million
                  reported vehicles involved — the highest in the 8-year span.
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3 mt-0.5">
                  2
                </span>
                <span>
                  A significant drop occurred in 2020, with vehicle involvement
                  totals falling to around 907,000, likely due to reduced
                  traffic during the pandemic lockdown period.
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3 mt-0.5">
                  3
                </span>
                <span>
                  From 2017 to 2019, vehicles involved increased by 5.48%,
                  reflecting rising traffic volume, vehicle ownership, and urban
                  congestion.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-amber-100"
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full mr-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                What This Means
              </h3>
            </div>
            <p className="text-slate-700 mb-4">
              Despite safety advancements in modern vehicles, Texas continues to
              experience high crash volumes. This suggests additional influences
              beyond vehicle design, such as:
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <span>Increased population and urban traffic density</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <span>
                  Rising distracted driving, especially from mobile devices
                </span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <span>
                  Evolving driver demographics and road usage patterns
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
