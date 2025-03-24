import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollytellingExperience from "@/components/scrollytelling-experience"

export const metadata: Metadata = {
  title: "Texas Vehicle Crash Data | Interactive Story",
  description: "An interactive data story exploring vehicle crash trends in Texas",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ScrollytellingExperience />
      <Footer />
    </main>
  )
}

