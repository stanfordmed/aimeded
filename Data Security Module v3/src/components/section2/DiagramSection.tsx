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

const PHI_TARGETS = ['queryLog', 'knowledge', 'output'] as const

export default function DiagramSection() {
  const [activeId, setActiveId] = useState<ScenarioId>('consumer')
  const [showLeak, setShowLeak] = useState(false)
  const activeScenario = scenarios.find((s) => s.id === activeId)!

  // Consumer exercise state
  const [clickedPhiTargets, setClickedPhiTargets] = useState<Set<string>>(new Set())
  const [showRisks, setShowRisks] = useState(false)

  const allPhiFound = PHI_TARGETS.every((t) => clickedPhiTargets.has(t))

  const handlePhiClick = (elementId: string) => {
    if (activeId !== 'consumer') return
    if (PHI_TARGETS.includes(elementId as typeof PHI_TARGETS[number])) {
      setClickedPhiTargets((prev) => new Set(prev).add(elementId))
    }
  }

  const handleTabChange = (id: ScenarioId) => {
    setActiveId(id)
    setShowLeak(false)
    setClickedPhiTargets(new Set())
    setShowRisks(false)
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
        <div className={`rounded-xl border p-6 mb-8 ${activeId === 'consumer' && showRisks ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
          <h3 className="font-serif font-bold text-xl text-hai-dark mb-1">
            {activeScenario.title}
          </h3>
          <p className="text-hai-blue font-semibold text-sm mb-3">{activeScenario.subtitle}</p>
          <p className="text-hai-slate leading-relaxed">
            {showLeak && activeScenario.leakDescription
              ? activeScenario.leakDescription
              : activeScenario.description}
          </p>

          {/* Consumer exercise prompt inside scenario card */}
          {activeId === 'consumer' && !allPhiFound && (
            <div className="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
              <svg className="w-6 h-6 shrink-0 text-red-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p className="text-red-800 font-semibold text-sm leading-snug">
                What happens if you use a consumer AI chatbot with PHI? <strong>Click on all the spots in the diagram where PHI would accumulate.</strong>
                <span className="text-red-500 font-normal ml-1">
                  ({clickedPhiTargets.size}/{PHI_TARGETS.length} found)
                </span>
              </p>
            </div>
          )}
          {activeId === 'consumer' && allPhiFound && !showRisks && (
            <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
              <svg className="w-5 h-5 shrink-0 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
              <p className="text-green-800 text-sm">
                Great job! Now,{' '}
                <button
                  onClick={() => setShowRisks(true)}
                  className="underline underline-offset-2 font-semibold hover:text-green-900 cursor-pointer transition-colors"
                >
                  see how this would compromise patient privacy →
                </button>
              </p>
            </div>
          )}

          {/* Expanded risk content inside the card */}
          {activeId === 'consumer' && showRisks && (
            <div className="mt-5 space-y-4 border-t border-red-200 pt-5">
              <h4 className="font-serif font-bold text-lg text-red-700">How can this go wrong?</h4>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 shrink-0 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span className="font-semibold text-hai-dark">PHI leaking into other users' responses</span>
                </div>
                <p className="text-hai-slate leading-relaxed text-sm">
                  PHI entered into the chatbot can be absorbed into its knowledge base and later surface in other responses. <strong>This means that someone else using the chatbot might get a response that has leaked details about your patient like age ranges, lab values, or diagnoses without either party knowing.</strong>
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 shrink-0 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <span className="font-semibold text-hai-dark">Data breach exposing stored prompts</span>
                </div>
                <p className="text-hai-slate leading-relaxed text-sm">
                  AI companies store all prompts in query logs on their servers. If the company experiences a
                  data breach — i.e., they get hacked into — <strong>all previous prompts that included PHI could be
                  leaked to the attacker.</strong> This means patient names, MRNs, diagnoses, lab values, and other
                  sensitive information you entered could be exposed to malicious actors.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive diagram */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 overflow-x-auto">
          <SecurityDiagram
            scenario={activeScenario}
            showLeak={showLeak}
            onToggleLeak={() => setShowLeak(!showLeak)}
            interactiveMode={activeId === 'consumer'}
            clickedPhiTargets={clickedPhiTargets}
            onPhiClick={handlePhiClick}
          />
        </div>


      </div>
    </section>
  )
}
