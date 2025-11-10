import Hero from "@/components/hero"
import About from "@/components/about"
import Collections from "@/components/collections"
import Values from "@/components/values"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata = {
  title: "LUXE - Premium Fashion Essentials",
  description:
    "Discover our curated collection of premium fashion essentials. Quality craftsmanship meets elegant design.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Collections />
      <Values />
      <Contact />
      <Footer />
    </main>
  )
}
