import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollytellingExperience from "@/components/scrollytelling-experience";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ScrollytellingExperience />
      <Footer />
    </main>
  );
}
