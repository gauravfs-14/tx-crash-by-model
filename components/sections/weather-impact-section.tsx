"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { WeatherData } from "@/lib/types"
import { Cloud, CloudRain, CloudSnow, CloudFog, Sun } from "lucide-react"

interface WeatherImpactSectionProps {
  data: WeatherData[]
}

export default function WeatherImpactSection({ data }: WeatherImpactSectionProps) {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const chartInView = useInView(chartRef, { once: false, amount: 0.5 })

  // Colors for the bars
  const getWeatherColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "#3b82f6"
      case "rain":
        return "#0ea5e9"
      case "snow":
        return "#94a3b8"
      case "fog":
        return "#64748b"
      default:
        return "#6366f1"
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-6 h-6 text-amber-500" />
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />
      case "snow":
        return <CloudSnow className="w-6 h-6 text-slate-500" />
      case "fog":
        return <CloudFog className="w-6 h-6 text-slate-600" />
      default:
        return <Cloud className="w-6 h-6 text-indigo-500" />
    }
  }

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
            Weather's Impact on Crash Rates
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            How do different weather conditions affect crash likelihood? The data reveals surprising patterns about when
            drivers are most at risk.
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
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="weatherCondition"
                      tick={{ fill: "#64748b" }}
                      tickLine={{ stroke: "#cbd5e1" }}
                      tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                    />
                    <YAxis tick={{ fill: "#64748b" }} tickLine={{ stroke: "#cbd5e1" }} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "none",
                      }}
                      formatter={(value) => [`${value} crashes`, "Total"]}
                      labelFormatter={(value) => `${value.charAt(0).toUpperCase() + value.slice(1)} Conditions`}
                    />
                    <Bar
                      dataKey="crashes"
                      radius={[4, 4, 0, 0]}
                      barSize={60}
                      animationDuration={1500}
                      animationBegin={chartInView ? 0 : 9999}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getWeatherColor(entry.weatherCondition)} />
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
                <Cloud className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Weather Risk Factors</h3>
            </div>

            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.weatherCondition} className="flex items-start">
                  <div className="mt-1 mr-3">{getWeatherIcon(item.weatherCondition)}</div>
                  <div>
                    <h4 className="font-medium text-slate-800 capitalize">{item.weatherCondition}</h4>
                    <p className="text-slate-600 text-sm">
                      {item.weatherCondition === "clear" &&
                        "While clear conditions show the highest absolute number of crashes, this reflects the frequency of clear weather in Texas."}
                      {item.weatherCondition === "rain" &&
                        "Rain reduces visibility and creates slippery road conditions, significantly increasing crash risk per mile driven."}
                      {item.weatherCondition === "snow" &&
                        "Snow is rare in Texas, but when it occurs, many drivers lack experience handling these conditions."}
                      {item.weatherCondition === "fog" &&
                        "Fog dramatically reduces visibility and depth perception, creating dangerous driving conditions."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
                <CloudRain className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Weather Safety Tips</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2 text-slate-800">Driving in Rain</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Reduce speed by at least 5-10 mph below the speed limit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Increase following distance to at least 5-6 seconds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Turn on headlights to improve visibility to other drivers</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2 text-slate-800">Driving in Fog</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-500 mt-2 mr-2"></span>
                    <span>Use low beam headlights, never high beams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-500 mt-2 mr-2"></span>
                    <span>Reduce speed significantly and avoid sudden stops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-500 mt-2 mr-2"></span>
                    <span>Use the right edge of the road as a guide rather than center lines</span>
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

