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
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { AgePattern } from "@/lib/types";
import { Clock, CheckCircle } from "lucide-react";

interface VehicleAgeSectionProps {
  data: AgePattern[];
}

export default function VehicleAgeSection({ data }: VehicleAgeSectionProps) {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const chartInView = useInView(chartRef, { once: false, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Vehicle Age & Crash Risk
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-center">
            Does a vehicle’s age affect its crash likelihood? The data suggests
            it does — and not always in the ways we might expect. Age-related
            trends in crash frequency reveal a nuanced relationship between
            vehicle lifecycle and crash risk.
          </p>
        </motion.div>

        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 60 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-white p-4 border-b border-emerald-100">
              <h3 className="text-xl font-semibold text-slate-800">
                Crash Frequency by Vehicle Age
              </h3>
              <p className="text-slate-500 text-sm">
                Number of crashes by vehicle age in years
              </p>
            </div>
            <CardContent className="p-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="age"
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      label={{
                        value: "Vehicle Age (Years)",
                        position: "insideBottom",
                        offset: -10,
                        fill: "#64748b",
                      }}
                    />
                    <YAxis
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
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
                      formatter={(value) => [
                        `${value.toLocaleString()} crashes`,
                        "Total",
                      ]}
                      labelFormatter={(value) => `${value} year old vehicles`}
                    />
                    <Bar
                      dataKey="crashes"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                      animationDuration={1500}
                      animationBegin={chartInView ? 0 : 9999}
                    />
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
          className="bg-white p-8 rounded-xl shadow-md border border-emerald-100"
          whileHover={{
            y: -5,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              The Age Factor
            </h3>
          </div>
          <p className="text-slate-700 mb-6">
            Our analysis shows that crash frequency peaks at vehicle age 4, with
            over 588,000 crashes reported at this age alone. Vehicles aged 0–3
            years accounted for nearly 1.94 million crashes, largely due to
            their high presence and mileage on the road. Vehicles aged 4–8 years
            had the highest crash volume, totaling over 2.68 million crashes.
            Vehicles aged 9–20 years collectively contributed to over 3.39
            million crashes, reflecting longer service lifespans and increased
            risk from aging components.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h4 className="text-lg font-medium mb-3 text-slate-800">
                Why Newer Vehicles Crash
              </h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                  <span>Higher average miles driven annually</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                  <span>Complex new technologies may distract drivers</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                  <span>
                    Overconfidence in safety systems leading to riskier driving
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h4 className="text-lg font-medium mb-3 text-slate-800">
                Why Older Vehicles Crash
              </h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                  <span>
                    Mechanical failures due to wear and maintenance issues
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                  <span>
                    Lack of modern safety features (ABS, stability control,
                    etc.)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                  <span>
                    Older vehicles often driven by younger or lower-income
                    drivers
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
