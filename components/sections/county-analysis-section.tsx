"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { CountyData } from "@/lib/types"
import { MapPin } from "lucide-react"

interface CountyAnalysisSectionProps {
  data: CountyData[]
}

export default function CountyAnalysisSection({ data }: CountyAnalysisSectionProps) {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const chartInView = useInView(chartRef, { once: false, amount: 0.5 })

  // Colors for the bars
  const colors = ["#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#84cc16"]

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Geographic Crash Hotspots
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Crash rates vary significantly across Texas counties. Discover which areas have the highest concentration of
            vehicle crashes.
          </p>
        </motion.div>

        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 60 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
                    <XAxis type="number" tick={{ fill: "#64748b" }} tickLine={{ stroke: "#cbd5e1" }} />
                    <YAxis
                      type="category"
                      dataKey="county"
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      width={70}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "none",
                      }}
                      formatter={(value) => [`${value} crashes`, "Total"]}
                      labelFormatter={(value) => `${value} County`}
                    />
                    <Bar
                      dataKey="crashes"
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                      animationDuration={1500}
                      animationBegin={chartInView ? 0 : 9999}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
          className="mt-12 bg-white p-8 rounded-xl shadow-md border border-slate-100"
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <h3 className="text-xl font-semibold mb-6 text-slate-800 flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            County Risk Factors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-3 text-slate-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                Urban Counties
              </h4>
              <p className="text-slate-700 mb-4">
                Urban counties like Harris (Houston) and Dallas show the highest absolute crash numbers, driven by:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-2 mr-2"></span>
                  <span>Higher population density and traffic volume</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-2 mr-2"></span>
                  <span>Complex road systems with frequent merges and exits</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-2 mr-2"></span>
                  <span>Higher rates of distracted driving in congested areas</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3 text-slate-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-teal-500" />
                Rural Considerations
              </h4>
              <p className="text-slate-700 mb-4">
                While rural counties show lower absolute numbers, they often have higher crash rates per capita due to:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2"></span>
                  <span>Higher speed limits on rural highways</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2"></span>
                  <span>Longer emergency response times after crashes</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2"></span>
                  <span>Less forgiving road environments (no shoulders, trees near roadways)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="text-lg font-medium mb-3 text-slate-800">Policy Implications</h4>
            <p className="text-slate-700">
              Understanding geographic crash patterns helps transportation planners and policymakers target safety
              improvements where they're most needed. Urban areas benefit from congestion management and pedestrian
              safety measures, while rural areas need improved road design and faster emergency response capabilities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

