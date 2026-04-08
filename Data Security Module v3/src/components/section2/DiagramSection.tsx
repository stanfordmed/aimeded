import { useState } from 'react'
import { scenarios } from '../../data/scenarioData'
import type { ScenarioId } from '../../data/scenarioData'
import SecurityDiagram from './SecurityDiagram'

const tabStyles: Record<ScenarioId, string> = {
  consumer: 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100',
  local: 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100',
  baa: 'bg-green-50 border-green-300 text-green-800 hover:bg-green-100',
}

const activeTabStyles: Record<ScenarioId, string> = {
  consumer: 'bg-red-600 border-red-600 text-white',
  local: 'bg-hai-blue border-hai-blue text-white',
  baa: 'bg-green-600 border-green-600 text-white',
}

export default function DiagramSection() {
  const [activeId, setActiveId] = useState<ScenarioId>('consumer')
  const [showLeak, setShowLeak] = useState(false)
  const activeScenario = scenarios.find((s) => s.id === activeId)!

  const handleTabChange = (id: ScenarioId) => {
    setActiveId(id)
    setShowLeak(false)
  }

  return (
    <section className="py-16 md:py-24 px-6 bg-hai-warm-gray">
      <div className="max-w-6xl mx-auto">
        <p className="text-hai-blue uppercase tracking-widest text-sm font-semibold mb-3">
          Section 2
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-hai-dark mb-4">
          Why Does Data Privacy Matter with AI Tools?
        </h2>
        <p className="text-hai-slate text-lg max-w-3xl mb-10 leading-relaxed">
          The diagram below shows how data flows through an AI chatbot system. Select each
          scenario to see how patient data is handled differently depending on the setup.
        </p>

        {/* Scenario tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleTabChange(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all cursor-pointer ${
                activeId === s.id ? activeTabStyles[s.id] : tabStyles[s.id]
              }`}
            >
              {s.title.replace(/Scenario \d+[a-z]?: /, '')}
            </button>
          ))}
        </div>

        {/* Scenario description card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="font-serif font-bold text-xl text-hai-dark mb-1">
            {activeScenario.title}
          </h3>
          <p className="text-hai-blue font-semibold text-sm mb-3">{activeScenario.subtitle}</p>
          <p className="text-hai-slate leading-relaxed">
            {showLeak && activeScenario.leakDescription
              ? activeScenario.leakDescription
              : activeScenario.description}
          </p>
        </div>

        {/* Interactive diagram */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 overflow-x-auto">
          <SecurityDiagram scenario={activeScenario} showLeak={showLeak} onToggleLeak={() => setShowLeak(!showLeak)} />
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-hai-slate">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-arrow-blue rounded" />
            <span>Data flow</span>
          </div>
          {activeScenario.securityOverlay && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-green-500 rounded" />
              <span>Encrypted &amp; audited data flow</span>
            </div>
          )}
          {(activeScenario.phiHighlights.length > 0 || showLeak) && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded text-white text-[8px] flex items-center justify-center font-bold">
                PHI
              </div>
              <span>Patient data accumulation point</span>
            </div>
          )}
          {activeScenario.grayedElements.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span>Inactive / Not applicable</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
