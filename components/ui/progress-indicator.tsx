"use client"

import { useEffect, useState } from "react"
import { motion, type MotionValue, useTransform } from "framer-motion"

interface ProgressIndicatorProps {
  sections: { id: string; label: string }[]
  scrollProgress: MotionValue<number>
}

export default function ProgressIndicator({ sections, scrollProgress }: ProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)

  // Calculate section boundaries based on the number of sections
  const sectionBoundaries = sections.map((_, index) => index / sections.length)

  // Transform scroll progress to active section index
  const activeSectionIndex = useTransform(scrollProgress, sectionBoundaries, [...Array(sections.length).keys()])

  useEffect(() => {
    const unsubscribe = activeSectionIndex.onChange((value) => {
      setActiveSection(Math.round(value))
    })

    return () => unsubscribe()
  }, [activeSectionIndex])

  return (
    <motion.div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: activeSection === 0 ? 0 : 1, x: 0 }}
      transition={{
        opacity: { duration: 0.5, ease: "easeOut" },
        x: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div className="flex flex-col items-center space-y-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
        {sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`} className="relative group">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeSection ? "bg-blue-500 scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <span className="px-2 py-1 bg-white rounded-md text-xs font-medium shadow-sm text-slate-700">
                {section.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  )
}

