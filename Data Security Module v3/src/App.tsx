import { useState, useEffect } from 'react'
import Header from './components/Header'
import HipaaOverview from './components/section1/HipaaOverview'
import DiagramSection from './components/section2/DiagramSection'
import MatchingActivity from './components/section3/MatchingActivity'

const sections = ['overview', 'diagram', 'activity'] as const

function App() {
  const [activeSection, setActiveSection] = useState<string>('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <Header activeSection={activeSection} />

      <section className="bg-hai-blue text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Data Security, Privacy &amp; AI
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            How patient privacy is becoming more relevant in the age of AI
          </p>
          <p className="text-sm text-white/40 mt-6">
            Created with care by this awesome team:
          </p>
        </div>
      </section>

      <main>
        <div id="overview" className="scroll-mt-16">
          <HipaaOverview />
        </div>
        <div id="diagram" className="scroll-mt-16">
          <DiagramSection />
        </div>
        <div id="activity" className="scroll-mt-16">
          <MatchingActivity />
        </div>
      </main>

      <footer className="bg-hai-dark text-white/60 py-12 px-6 text-center text-sm">
        <p>Educational module for medical student training.</p>
        <p className="mt-1">This content is for instructional purposes only and does not constitute legal advice.</p>
      </footer>
    </div>
  )
}

export default App
