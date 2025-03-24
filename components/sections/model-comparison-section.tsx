"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { ModelComparison } from "@/lib/types";
import { BarChart2, List } from "lucide-react";

interface ModelComparisonSectionProps {
  data: ModelComparison[];
}

export default function ModelComparisonSection({
  data,
}: ModelComparisonSectionProps) {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  // Update the useInView hook to be more reliable
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  });
  const chartInView = useInView(chartRef, { once: true, amount: 0.6 });

  // Colors for the bars - using a purple gradient
  const colors = [
    "#8b5cf6",
    "#9061f4",
    "#9566f2",
    "#9a6bf0",
    "#9f70ee",
    "#a475ec",
    "#a97aea",
    "#ae7fe8",
    "#b384e6",
    "#b889e4",
  ];

  // Format the data for display
  const formattedData = data.map((item) => ({
    ...item,
    label: `${item.make} ${item.model}`,
  }));

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-purple-50"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Update the animations for smoother transitions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Top Vehicle Models in Crashes
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-center">
            Certain vehicle models consistently appear in Texas crash data.
            These trends reflect not only popularity, but also usage patterns
            and design characteristics that may influence crash involvement.
          </p>
        </motion.div>

        {/* Update the chart animation */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 60 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-white p-4 border-b border-purple-100">
              <h3 className="text-xl font-semibold text-slate-800">
                Top Models by Crash Frequency
              </h3>
              <p className="text-slate-500 text-sm">
                Total crashes by specific vehicle model
              </p>
            </div>
            <CardContent className="p-6">
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formattedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f0f0f0"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      tick={{ fill: "#64748b", fontWeight: 500 }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      width={110}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow:
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "1px solid #e2e8f0",
                      }}
                      formatter={(value) => [
                        `${value.toLocaleString()} crashes`,
                        "Total",
                      ]}
                      labelFormatter={(value) => `${value}`}
                    />
                    <Bar
                      dataKey="crashes"
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                      animationDuration={2000}
                      animationBegin={chartInView ? 0 : 9999}
                    >
                      {formattedData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
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
            className="bg-white p-8 rounded-xl shadow-md border border-purple-100"
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-3">
                <BarChart2 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Model Insights
              </h3>
            </div>
            <p className="text-slate-700 mb-4">
              Pickup trucks like the Ford F-150 and Chevrolet Silverado lead the
              rankings — reflecting their high volume on Texas roads and their
              usage in both urban and rural driving conditions. Popular sedans
              such as the Toyota Camry, Nissan Altima, and Honda Accord also
              feature prominently, likely due to their widespread use in daily
              commuting.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-purple-100"
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-3">
                <List className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Key Observations
              </h3>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3 mt-0.5">
                  1
                </span>
                <span>
                  Pickup trucks dominate the top of the list, with high crash
                  counts across multiple model years
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3 mt-0.5">
                  2
                </span>
                <span>
                  Mid-size sedans like the Camry and Accord consistently appear
                  in crash records
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3 mt-0.5">
                  3
                </span>
                <span>
                  Compact cars such as the Civic and Corolla remain notable
                  despite their smaller size
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3 mt-0.5">
                  4
                </span>
                <span>
                  The data shows a clear link between vehicle type and crash
                  involvement, with larger vehicles involved more often in
                  absolute terms
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
