import { useState, useEffect } from 'react'
import Header from './components/Header'
import HipaaOverview from './components/section1/HipaaOverview'
import DiagramSection from './components/section2/DiagramSection'
import MatchingActivity from './components/section3/MatchingActivity'

const sections = ['overview', 'diagram', 'activity'] as const

const stanfordLinks = [
  { href: 'https://uit.stanford.edu/guide/riskclassifications', label: 'Data Risk Classifications' },
  { href: 'https://uit.stanford.edu/ai/services', label: 'Approved AI Services' },
]

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

      <section className="bg-hai-blue text-white py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Data Security, Privacy &amp; AI
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            How patient privacy is becoming more relevant in the age of AI
          </p>
          <p className="text-base text-white/70 mt-6">
            Aydin Zahedivash, MD, MBA &middot; Vishnu Ravi, MD &middot; Jonathan Chen, MD, PhD
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-2">
            <span className="text-white/60 text-sm">Stanford affiliates:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {stanfordLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 text-white text-sm font-semibold transition-colors"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
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
