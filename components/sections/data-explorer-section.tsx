"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  SortAsc,
  SortDesc,
  X,
  Search,
  FileDown,
  Database,
} from "lucide-react"
import type { CrashData } from "@/lib/types"

interface DataExplorerSectionProps {
  data: CrashData[]
}

export default function DataExplorerSection({ data }: DataExplorerSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  // State for filtering
  const [selectedMake, setSelectedMake] = useState<string>("all")
  const [selectedModel, setSelectedModel] = useState<string>("all")
  const [selectedModelYear, setSelectedModelYear] = useState<string>("all")
  const [selectedCrashYear, setSelectedCrashYear] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // State for sorting
  const [sortField, setSortField] = useState<string>("crash_count")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Get unique values for filters
  const makes = ["all", ...Array.from(new Set(data.map((item) => item.Veh_Make_ID)))]

  const models =
    selectedMake !== "all"
      ? [
          "all",
          ...Array.from(
            new Set(data.filter((item) => item.Veh_Make_ID === selectedMake).map((item) => item.Veh_Mod_ID)),
          ),
        ]
      : ["all"]

  const modelYears = ["all", ...Array.from(new Set(data.map((item) => item.Veh_Mod_Year.toString()))).sort()]
  const crashYears = ["all", ...Array.from(new Set(data.map((item) => item.CrashYear.toString()))).sort()]

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedMake, selectedModel, selectedModelYear, selectedCrashYear, searchQuery, itemsPerPage])

  // Reset model when make changes
  useEffect(() => {
    setSelectedModel("all")
  }, [selectedMake])

  // Filter data based on selections
  const filteredData = data.filter((item) => {
    const matchesMake = selectedMake === "all" ? true : item.Veh_Make_ID === selectedMake
    const matchesModel = selectedModel === "all" ? true : item.Veh_Mod_ID === selectedModel
    const matchesModelYear = selectedModelYear === "all" ? true : item.Veh_Mod_Year.toString() === selectedModelYear
    const matchesCrashYear = selectedCrashYear === "all" ? true : item.CrashYear.toString() === selectedCrashYear
    const matchesSearch =
      searchQuery === ""
        ? true
        : Object.values(item).some(
            (value) => value !== undefined && value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
          )

    return matchesMake && matchesModel && matchesModelYear && matchesCrashYear && matchesSearch
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  // Handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Export data as CSV
  const exportCSV = () => {
    const headers = Object.keys(data[0]).join(",")
    const rows = filteredData.map((item) => Object.values(item).join(","))
    const csv = [headers, ...rows].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "texas_crash_data.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedMake("all")
    setSelectedModel("all")
    setSelectedModelYear("all")
    setSelectedCrashYear("all")
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-slate-200 p-3 rounded-full">
              <Database className="h-6 w-6 text-slate-700" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Explore the Data
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-center">
            Dive deeper into the Texas vehicle crash dataset. Filter, sort, and analyze the data to discover specific
            patterns and insights that matter to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-lg mb-8 border-slate-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Make</label>
                  <Select value={selectedMake} onValueChange={setSelectedMake}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={make} value={make}>
                          {make === "all" ? "All Makes" : make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel} disabled={selectedMake === "all"}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder={selectedMake !== "all" ? "Select model" : "Select make first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model === "all" ? "All Models" : model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Model Year</label>
                  <Select value={selectedModelYear} onValueChange={setSelectedModelYear}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select model year" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year === "all" ? "All Model Years" : year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Crash Year</label>
                  <Select value={selectedCrashYear} onValueChange={setSelectedCrashYear}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select crash year" />
                    </SelectTrigger>
                    <SelectContent>
                      {crashYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year === "all" ? "All Crash Years" : year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search in all fields..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearFilters}
                    title="Clear filters"
                    className="bg-white hover:bg-slate-100"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={exportCSV}
                    title="Export as CSV"
                    className="bg-white hover:bg-slate-100"
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="shadow-lg border-slate-200">
            <CardContent className="p-6">
              <div className="rounded-md border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead
                        className="font-semibold cursor-pointer hover:bg-slate-100"
                        onClick={() => handleSort("Veh_Make_ID")}
                      >
                        <div className="flex items-center">
                          Make
                          {sortField === "Veh_Make_ID" &&
                            (sortDirection === "asc" ? (
                              <SortAsc className="ml-1 h-4 w-4 text-blue-500" />
                            ) : (
                              <SortDesc className="ml-1 h-4 w-4 text-blue-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-semibold cursor-pointer hover:bg-slate-100"
                        onClick={() => handleSort("Veh_Mod_ID")}
                      >
                        <div className="flex items-center">
                          Model
                          {sortField === "Veh_Mod_ID" &&
                            (sortDirection === "asc" ? (
                              <SortAsc className="ml-1 h-4 w-4 text-blue-500" />
                            ) : (
                              <SortDesc className="ml-1 h-4 w-4 text-blue-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-semibold cursor-pointer hover:bg-slate-100"
                        onClick={() => handleSort("Veh_Mod_Year")}
                      >
                        <div className="flex items-center">
                          Model Year
                          {sortField === "Veh_Mod_Year" &&
                            (sortDirection === "asc" ? (
                              <SortAsc className="ml-1 h-4 w-4 text-blue-500" />
                            ) : (
                              <SortDesc className="ml-1 h-4 w-4 text-blue-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-semibold cursor-pointer hover:bg-slate-100"
                        onClick={() => handleSort("CrashYear")}
                      >
                        <div className="flex items-center">
                          Crash Year
                          {sortField === "CrashYear" &&
                            (sortDirection === "asc" ? (
                              <SortAsc className="ml-1 h-4 w-4 text-blue-500" />
                            ) : (
                              <SortDesc className="ml-1 h-4 w-4 text-blue-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-semibold text-right cursor-pointer hover:bg-slate-100"
                        onClick={() => handleSort("crash_count")}
                      >
                        <div className="flex items-center justify-end">
                          Crash Count
                          {sortField === "crash_count" &&
                            (sortDirection === "asc" ? (
                              <SortAsc className="ml-1 h-4 w-4 text-blue-500" />
                            ) : (
                              <SortDesc className="ml-1 h-4 w-4 text-blue-500" />
                            ))}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-slate-50">
                          <TableCell className="font-medium">{item.Veh_Make_ID}</TableCell>
                          <TableCell>{item.Veh_Mod_ID}</TableCell>
                          <TableCell>{item.Veh_Mod_Year}</TableCell>
                          <TableCell>{item.CrashYear}</TableCell>
                          <TableCell className="text-right font-medium">{item.crash_count.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                          No results found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-500">
                  Showing {paginatedData.length > 0 ? startIndex + 1 : 0} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} records
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[120px] bg-white">
                      <SelectValue placeholder="Rows per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per page</SelectItem>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="20">20 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 bg-white"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 ml-1 bg-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="mx-2 text-sm">
                      Page {currentPage} of {totalPages || 1}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="h-8 w-8 mr-1 bg-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="h-8 w-8 bg-white"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

