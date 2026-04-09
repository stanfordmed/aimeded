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
              <span className="text-2xl">🔍</span>
              <p className="text-red-800 font-semibold text-sm leading-snug">
                Click on where in the figure PHI will accumulate if you use a consumer AI tool with sensitive information.
                <span className="text-red-500 font-normal ml-1">
                  ({clickedPhiTargets.size}/{PHI_TARGETS.length} found)
                </span>
              </p>
            </div>
          )}
          {activeId === 'consumer' && allPhiFound && !showRisks && (
            <div className="mt-4 flex items-center gap-3 justify-between bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-green-800 font-semibold text-sm">
                  You found all 3 places where PHI accumulates!
                </p>
              </div>
              <button
                onClick={() => setShowRisks(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                How can this go wrong? →
              </button>
            </div>
          )}

          {/* Expanded risk content inside the card */}
          {activeId === 'consumer' && showRisks && (
            <div className="mt-5 space-y-4 border-t border-red-200 pt-5">
              <h4 className="font-serif font-bold text-lg text-red-700">How can this go wrong?</h4>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-600">⚠️</span>
                  <span className="font-semibold text-hai-dark">PHI leaking into other users' responses</span>
                </div>
                <p className="text-hai-slate leading-relaxed text-sm">
                  When you include PHI in a prompt to a consumer AI tool, that information can be incorporated
                  into the AI's knowledge base. Later, when a completely different person asks a similar clinical
                  question, the AI's response may contain elements of the PHI from your original prompt — such as
                  age ranges, lab values, or other identifying details. The other user has no idea they are
                  receiving information derived from a real patient's data, and you have no way to retract it.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-600">🔓</span>
                  <span className="font-semibold text-hai-dark">Data breach exposing stored prompts</span>
                </div>
                <p className="text-hai-slate leading-relaxed text-sm">
                  AI companies store all prompts in query logs on their servers. If the company experiences a
                  data breach — i.e., they get hacked into — all previous prompts that included PHI could be
                  leaked to the attacker. This means patient names, MRNs, diagnoses, lab values, and other
                  sensitive information you entered could be exposed to malicious actors, resulting in a
                  HIPAA violation and potential harm to patients whose data was compromised.
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
