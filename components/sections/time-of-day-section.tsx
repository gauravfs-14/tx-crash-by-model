"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { TimeOfDayData } from "@/lib/types"
import { Clock, Sunrise, Sun, Sunset, Moon } from "lucide-react"

interface TimeOfDaySectionProps {
  data: TimeOfDayData[]
}

export default function TimeOfDaySection({ data }: TimeOfDaySectionProps) {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const chartInView = useInView(chartRef, { once: false, amount: 0.5 })

  const COLORS = ["#f59e0b", "#3b82f6", "#8b5cf6", "#1e293b"]

  const timeIcons = {
    morning: Sunrise,
    afternoon: Sun,
    evening: Sunset,
    night: Moon,
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Crash Patterns by Time of Day
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            When are drivers most at risk on Texas roads? The data shows clear patterns in crash frequency throughout
            different times of the day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={chartInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="crashes"
                        nameKey="timeOfDay"
                        animationBegin={chartInView ? 0 : 9999}
                        animationDuration={1500}
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} crashes`, "Total"]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          border: "none",
                        }}
                      />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        formatter={(value) => <span className="capitalize">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">The Rhythm of Risk</h3>
              </div>
              <p className="text-slate-700">
                Our analysis reveals distinct patterns in crash frequency throughout the day. Understanding these
                patterns can help drivers be more vigilant during high-risk periods.
              </p>
            </div>

            <div className="space-y-4">
              {data.map((item, index) => {
                const TimeIcon = timeIcons[item.timeOfDay] || Clock
                return (
                  <motion.div
                    key={item.timeOfDay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100"
                  >
                    <div
                      className={`p-3 rounded-full mr-4 ${COLORS[index % COLORS.length] === "#f59e0b" ? "bg-amber-100 text-amber-500" : COLORS[index % COLORS.length] === "#3b82f6" ? "bg-blue-100 text-blue-500" : COLORS[index % COLORS.length] === "#8b5cf6" ? "bg-purple-100 text-purple-500" : "bg-slate-100 text-slate-500"}`}
                    >
                      <TimeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 capitalize">{item.timeOfDay}</h4>
                      <p className="text-slate-600 text-sm">
                        {item.timeOfDay === "morning" && "Rush hour traffic and school zones create hazards"}
                        {item.timeOfDay === "afternoon" && "Fatigue and post-lunch drowsiness affect drivers"}
                        {item.timeOfDay === "evening" && "Rush hour combined with reduced visibility"}
                        {item.timeOfDay === "night" && "Reduced visibility and higher rates of impaired driving"}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow border border-slate-100"
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Safety Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-3 text-slate-800">For Morning Drivers</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                  <span>Allow extra time for your commute to avoid rushing</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                  <span>Be extra vigilant in school zones during the academic year</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3 text-slate-800">For Evening Drivers</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></span>
                  <span>Maintain extra distance during rush hour congestion</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></span>
                  <span>Be aware of sun glare during sunset hours</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3 text-slate-800">For Night Drivers</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-800 mt-2 mr-2"></span>
                  <span>Ensure headlights are properly aimed and functioning</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-800 mt-2 mr-2"></span>
                  <span>Be especially alert for impaired drivers after midnight</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3 text-slate-800">For All Drivers</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                  <span>Avoid distracted driving at all times of day</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                  <span>Adjust driving habits based on time of day risks</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

