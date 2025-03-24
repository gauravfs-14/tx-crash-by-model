"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { DriverDemographics } from "@/lib/types"
import { Users } from "lucide-react"

interface DriverDemographicsSectionProps {
  data: DriverDemographics[]
}

export default function DriverDemographicsSection({ data }: DriverDemographicsSectionProps) {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const chartInView = useInView(chartRef, { once: false, amount: 0.5 })

  // Process data for the chart
  const chartData = data.reduce((acc, item) => {
    const existingGroup = acc.find((group) => group.ageGroup === item.ageGroup)

    if (existingGroup) {
      if (item.gender === "male") {
        existingGroup.male = item.crashes
      } else if (item.gender === "female") {
        existingGroup.female = item.crashes
      }
    } else {
      const newGroup = {
        ageGroup: item.ageGroup,
        male: item.gender === "male" ? item.crashes : 0,
        female: item.gender === "female" ? item.crashes : 0,
      }
      acc.push(newGroup)
    }

    return acc
  }, [] as any[])

  // Sort by age group
  const ageOrder = ["Under 25", "25-34", "35-44", "45+", "Unknown"]
  chartData.sort((a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup))

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">Driver Demographics</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Who is behind the wheel in Texas crashes? Explore how age and gender correlate with crash involvement across
            the state.
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
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="ageGroup" tick={{ fill: "#64748b" }} tickLine={{ stroke: "#cbd5e1" }} />
                    <YAxis tick={{ fill: "#64748b" }} tickLine={{ stroke: "#cbd5e1" }} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "none",
                      }}
                      formatter={(value) => [`${value} crashes`, ""]}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(value) => <span className="capitalize">{value}</span>}
                    />
                    <Bar
                      dataKey="male"
                      name="Male"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                      animationDuration={1500}
                      animationBegin={chartInView ? 0 : 9999}
                    />
                    <Bar
                      dataKey="female"
                      name="Female"
                      fill="#ec4899"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                      animationDuration={1500}
                      animationBegin={chartInView ? 200 : 9999}
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
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-blue-100"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Age Factors</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800">Young Drivers (Under 25)</h4>
                <p className="mt-1 text-slate-700 text-sm">
                  Young drivers show disproportionately high crash rates due to inexperience, risk-taking behavior, and
                  susceptibility to distractions. They're also more likely to drive at night and with multiple
                  passengers, both risk factors for crashes.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-slate-800">Middle-Aged Drivers (25-44)</h4>
                <p className="mt-1 text-slate-700 text-sm">
                  This group represents the largest driving population and shows moderate crash rates. Work-related
                  stress, family distractions, and commuting during peak hours contribute to their crash involvement.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-slate-800">Older Drivers (45+)</h4>
                <p className="mt-1 text-slate-700 text-sm">
                  While older drivers typically have more experience, factors like slower reaction times and medical
                  conditions can increase risk. However, they often compensate by driving more cautiously and avoiding
                  high-risk situations.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-pink-100"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-full mr-3">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Gender Patterns</h3>
            </div>

            <p className="text-slate-700 mb-4">
              The data shows consistent gender differences in crash patterns across all age groups. These differences
              reflect a complex mix of behavioral, cultural, and exposure factors rather than inherent driving ability.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800">Male Drivers</h4>
                <ul className="mt-2 space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>More likely to engage in risky behaviors (speeding, aggressive driving)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>Higher rates of driving under the influence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>More likely to drive at night and in adverse conditions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-slate-800">Female Drivers</h4>
                <ul className="mt-2 space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mt-1.5 mr-2"></span>
                    <span>More likely to be involved in crashes at intersections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mt-1.5 mr-2"></span>
                    <span>Lower rates of DUI-related crashes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mt-1.5 mr-2"></span>
                    <span>More likely to be driving with child passengers</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

