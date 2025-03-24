"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, BarChart2, Car, TrendingUp, Calendar, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Overview", href: "#intro", icon: <BarChart2 className="w-4 h-4 mr-2" /> },
    { name: "Trends", href: "#trends", icon: <TrendingUp className="w-4 h-4 mr-2" /> },
    { name: "Vehicles", href: "#makes", icon: <Car className="w-4 h-4 mr-2" /> },
    { name: "Timeline", href: "#modelYear", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Explorer", href: "#explorer", icon: <Database className="w-4 h-4 mr-2" /> },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center">
              <Car className={`w-6 h-6 ${isScrolled ? "text-blue-600" : "text-blue-600"}`} />
              <span
                className={`ml-2 text-xl font-bold ${
                  isScrolled ? "text-slate-800" : "text-slate-800"
                } transition-colors duration-300`}
              >
                Texas Crash Data
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    isScrolled
                      ? "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                      : "text-slate-600 hover:text-blue-600 hover:bg-white/80"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isScrolled ? "text-slate-800" : "text-slate-800"}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white md:hidden"
        >
          <div className="p-4 flex justify-between items-center border-b">
            <a href="#" className="flex items-center">
              <Car className="w-6 h-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-800">Texas Crash Data</span>
            </a>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="text-base font-medium">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  )
}

