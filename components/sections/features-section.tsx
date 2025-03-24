"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Car,
  AlertTriangle,
  Calendar,
  BarChart2,
} from "lucide-react";

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: <TrendingUp className="text-blue-500 w-8 h-8" />,
      title: "Crash Trends",
      description:
        "Track how crash incidents have changed across years and identify key shifts in driving patterns.",
      color: "blue",
    },
    {
      icon: <Car className="text-amber-500 w-8 h-8" />,
      title: "Vehicle Insights",
      description:
        "See which vehicle makes and models are most commonly involved in crash reports statewide.",
      color: "amber",
    },
    {
      icon: <AlertTriangle className="text-rose-500 w-8 h-8" />,
      title: "Risk Factors",
      description:
        "Analyze how vehicle age influences crash likelihood and exposure risk on Texas roads.",
      color: "rose",
    },
    {
      icon: <Calendar className="text-purple-500 w-8 h-8" />,
      title: "Model Year Analysis",
      description:
        "Discover patterns in crash frequency based on a vehicle’s manufacturing year.",
      color: "purple",
    },
    {
      icon: <BarChart2 className="text-emerald-500 w-8 h-8" />,
      title: "Interactive Explorer",
      description:
        "Use filters and search tools to explore the dataset, compare vehicles, and surface actionable insights.",
      color: "emerald",
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Explore Our Data Analysis Features
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Use our interactive tools to uncover insights from Texas vehicle
            crash data. Analyze trends, vehicle characteristics, and risk
            factors to better understand roadway safety challenges.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-8 mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 border border-slate-100 hover:border-blue-200 hover:shadow-lg group flex flex-col items-center text-center w-[280px]"
            >
              <div
                className={`bg-${feature.color}-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-${feature.color}-200 transition-all`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
