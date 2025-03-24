"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { VehicleAgeVsModelYear } from "@/lib/types"
import { Calendar, Lightbulb } from "lucide-react"

interface ModelYearSectionProps {
  data: VehicleAgeVsModelYear[]
}

export default function ModelYearSection({ data }: ModelYearSectionProps) {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2, margin: "-100px 0px" })
  const chartInView = useInView(chartRef, { once: true, amount: 0.6 })

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Crash Trends by Model Year
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-center">
            How does the model year of a vehicle correlate with crash involvement? Explore the relationship between when
            a vehicle was manufactured and its crash frequency.
          </p>
        </motion.div>

        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 60 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-amber-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-white p-4 border-b border-amber-100">
              <h3 className="text-xl font-semibold text-slate-800">Crashes by Model Year</h3>
              <p className="text-slate-500 text-sm">Total crashes by vehicle model year</p>
            </div>
            <CardContent className="p-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="modelYear"
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      label={{ value: "Model Year", position: "insideBottom", offset: -10, fill: "#64748b" }}
                    />
                    <YAxis
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      width={60}
                      label={{ value: "Crash Count", angle: -90, position: "insideLeft", offset: -5, fill: "#64748b" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "1px solid #e2e8f0",
                      }}
                      formatter={(value) => [`${value.toLocaleString()} crashes`, "Total"]}
                      labelFormatter={(value) => `${value} Model Year`}
                    />
                    <Line
                      type="monotone"
                      dataKey="crashes"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                      animationDuration={2000}
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
          className="bg-white p-8 rounded-xl shadow-md border border-amber-100"
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Model Year Insights</h3>
          </div>
          <p className="text-slate-700 mb-6">
            The data shows a clear trend in crash involvement based on vehicle model year. Newer vehicles (more recent
            model years) appear more frequently in crash statistics, which may reflect several factors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h4 className="text-lg font-medium mb-3 text-slate-800">Factors Affecting Newer Models</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mr-3 mt-0.5">
                    1
                  </span>
                  <span>Higher prevalence on the road (more vehicles of recent model years)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mr-3 mt-0.5">
                    2
                  </span>
                  <span>Higher average annual mileage for newer vehicles</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mr-3 mt-0.5">
                    3
                  </span>
                  <span>Potentially more distracting technology in newer models</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h4 className="text-lg font-medium mb-3 text-slate-800">Safety Considerations</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mr-3 mt-0.5">
                    1
                  </span>
                  <span>Despite higher crash numbers, newer vehicles typically offer better occupant protection</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mr-3 mt-0.5">
                    2
                  </span>
                  <span>Advanced safety features in newer models may reduce crash severity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mr-3 mt-0.5">
                    3
                  </span>
                  <span>The data doesn't account for the relative population of each model year on the road</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

