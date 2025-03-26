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
import type { MakeCrash } from "@/lib/types";
import { Car, Info } from "lucide-react";

interface VehicleMakesSectionProps {
  data: MakeCrash[];
}

export default function VehicleMakesSection({
  data,
}: VehicleMakesSectionProps) {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  });
  const chartInView = useInView(chartRef, { once: true, amount: 0.6 });

  // Colors for the bars - using a blue gradient
  const colors = [
    "#3b82f6",
    "#4285f4",
    "#4a87f2",
    "#528af0",
    "#5a8dee",
    "#628fec",
    "#6a92ea",
    "#7295e8",
    "#7a97e6",
    "#829ae4",
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-blue-50"
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
              <Car className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Vehicle Makes and Crash Involvement
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-center">
            Not all vehicles are equally represented in Texas crash data. The
            dataset shows that some makes are involved in higher numbers of
            reported crashes — revealing potential patterns of exposure, usage,
            or design-related risk.
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
                Vehicle Makes by Crash Frequency
              </h3>
              <p className="text-slate-500 text-sm">
                Total vehicles invloved in crash by vehicle manufacturer
              </p>
            </div>
            <CardContent className="p-6">
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
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
                      dataKey="make"
                      tick={{ fill: "#64748b", fontWeight: 500 }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      width={70}
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
                        `${value.toLocaleString()} involvements`,
                        "Total",
                      ]}
                      labelFormatter={(value) => `${value} Vehicles`}
                    />
                    <Bar
                      dataKey="crashes"
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                      animationDuration={2000}
                      animationBegin={chartInView ? 0 : 9999}
                    >
                      {data.map((entry, index) => (
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
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="my-6 bg-blue-100 border border-blue-200 rounded-lg p-4 text-sm text-blue-700"
        >
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="font-medium">Disclaimer:</span>
          </div>
          <p className="mt-1">
            This analysis is based on reported crash data and may not represent
            all vehicles on Texas roads. Crash involvement numbers should be
            considered alongside factors such as vehicle population, usage
            patterns, and environmental conditions.
          </p>
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
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Popular vs. Crash-Prone
              </h3>
            </div>
            <p className="text-slate-700 mb-4">
              Ford and Chevrolet seems to be more involved in crash incidents —
              which aligns with their long-standing popularity across Texas,
              particularly for trucks and full-size vehicles. These crash
              figures don’t necessarily mean the vehicles are unsafe; rather,
              they reflect how frequently these brands appear on the road.
            </p>
            <p className="text-slate-700">
              When adjusted for vehicle population, some models may show
              disproportionately high crash rates, hinting at deeper factors
              such as driving behavior, use-case (e.g., commercial vs.
              personal), and vehicle design.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-blue-100"
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Car className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Model-Specific Insights
              </h3>
            </div>
            <p className="text-slate-700 mb-4">
              The data suggests certain design characteristics can influence
              crash involvement:
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                <span>
                  Pickup trucks may face elevated rollover risk due to higher
                  centers of gravity
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                <span>
                  Compact cars can be more vulnerable in collisions with larger
                  vehicles
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                <span>
                  Older models often lack modern safety systems like electronic
                  stability control, lane assist, and crash avoidance
                  technologies
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
