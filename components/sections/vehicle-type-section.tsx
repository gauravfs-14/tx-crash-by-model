"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { VehicleTypeData } from "@/lib/types"
import { Car, Truck } from "lucide-react"

// Custom SUV icon since it's not in lucide-react
const SuvIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 17h12c1.1 0 2-.9 2-2v-4.5c0-1-.7-1.9-1.7-2L9.2 7.2c-.8-.1-1.5.5-1.5 1.3V9l-3.8.8c-.7.1-1.2.8-1.2 1.5V15c0 1.1.9 2 2 2Z" />
    <path d="M5 13h11" />
    <path d="M9 17v1c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1v-1" />
    <path d="M17 17v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1v-1" />
    <path d="M15 3v4" />
    <path d="M7 3v4" />
    <path d="M15 7H7" />
  </svg>
)

interface VehicleTypeSectionProps {
  data: VehicleTypeData[]
}

export default function VehicleTypeSection({ data }: VehicleTypeSectionProps) {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const chartInView = useInView(chartRef, { once: false, amount: 0.5 })

  // Colors for the bars
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "truck":
        return "#f97316"
      case "suv":
        return "#8b5cf6"
      case "sedan":
        return "#06b6d4"
      default:
        return "#6366f1"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "truck":
        return <Truck className="w-6 h-6 text-orange-500" />
      case "suv":
        return <SuvIcon className="w-6 h-6 text-purple-500" />
      case "sedan":
        return <Car className="w-6 h-6 text-cyan-500" />
      default:
        return <Car className="w-6 h-6 text-indigo-500" />
    }
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">Vehicle Type Comparison</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Are all vehicle types equally likely to be involved in crashes? Let's compare crash rates between trucks,
            SUVs, and sedans.
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
                    <XAxis dataKey="vehicleType" tick={{ fill: "#64748b" }} tickLine={{ stroke: "#cbd5e1" }} />
                    <YAxis tick={{ fill: "#64748b" }} tickLine={{ stroke: "#cbd5e1" }} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "none",
                      }}
                      formatter={(value) => [`${value} crashes`, "Total"]}
                      labelFormatter={(value) => `${value} Vehicles`}
                    />
                    <Bar
                      dataKey="crashes"
                      radius={[4, 4, 0, 0]}
                      barSize={80}
                      animationDuration={1500}
                      animationBegin={chartInView ? 0 : 9999}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getTypeColor(entry.vehicleType)} />
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
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {data.map((item) => (
            <motion.div
              key={item.vehicleType}
              className="bg-white p-8 rounded-xl shadow-md border border-slate-100"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-full mr-3 ${
                    item.vehicleType === "Truck"
                      ? "bg-orange-100"
                      : item.vehicleType === "SUV"
                        ? "bg-purple-100"
                        : "bg-cyan-100"
                  }`}
                >
                  {getTypeIcon(item.vehicleType)}
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{item.vehicleType}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800">Risk Factors</h4>
                  <ul className="mt-2 space-y-2 text-slate-700 text-sm">
                    {item.vehicleType === "Truck" && (
                      <>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                          <span>Higher center of gravity increases rollover risk</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                          <span>Longer stopping distances due to weight</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                          <span>Often used in work environments with higher risk</span>
                        </li>
                      </>
                    )}

                    {item.vehicleType === "SUV" && (
                      <>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                          <span>Elevated center of gravity affects stability</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                          <span>Often driven by families with children (distractions)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                          <span>Larger blind spots than sedans</span>
                        </li>
                      </>
                    )}

                    {item.vehicleType === "Sedan" && (
                      <>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-1.5 mr-2"></span>
                          <span>Lower profile offers less visibility in traffic</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-1.5 mr-2"></span>
                          <span>Less protection in collisions with larger vehicles</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-1.5 mr-2"></span>
                          <span>Often driven by younger, less experienced drivers</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-800">Safety Advantages</h4>
                  <ul className="mt-2 space-y-2 text-slate-700 text-sm">
                    {item.vehicleType === "Truck" && (
                      <>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                          <span>Height provides better visibility of the road</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                          <span>Larger mass offers protection in collisions</span>
                        </li>
                      </>
                    )}

                    {item.vehicleType === "SUV" && (
                      <>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                          <span>Modern SUVs have advanced stability control</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                          <span>Higher seating position improves visibility</span>
                        </li>
                      </>
                    )}

                    {item.vehicleType === "Sedan" && (
                      <>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                          <span>Lower center of gravity improves handling</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                          <span>Typically better fuel economy (less fatigue on long trips)</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

