import { useState } from 'react'
import type { ReactNode } from 'react'
import { hipaaCards, trainingHighlight, omnibusRule, qaItems } from '../../data/hipaaData'
import { Icon } from '../Icons'
import type { IconName } from '../Icons'

function InfoCard({ title, icon, content, accentBg }: { title: string; icon: IconName; content: ReactNode; accentBg: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow" style={{ backgroundColor: accentBg }}>
      <div className="text-hai-blue text-3xl mb-3"><Icon name={icon} /></div>
      <h3 className="font-serif font-bold text-lg text-hai-dark mb-2">{title}</h3>
      <p className="text-hai-slate text-[15px] leading-relaxed">{content}</p>
    </div>
  )
}

const cardAccents = [
  '#4298B512', // Sky (light tint) — Encryption
  '#175E5412', // Palo Alto (light tint) — Access Controls
  '#E9830012', // Poppy (light tint) — Audit Logs
  '#E04F3912', // Spirited (light tint) — Breach Reporting
]

function CalloutCard({
  title,
  icon,
  content,
  callout,
  accentColor = 'hai-blue',
}: {
  title: string
  icon: IconName
  content: ReactNode
  callout: string
  accentColor?: string
}) {
  const borderClass = accentColor === 'hai-red' ? 'border-l-hai-red' : 'border-l-hai-blue'
  const bgClass = accentColor === 'hai-red' ? 'bg-hai-red-light' : 'bg-hai-blue-light'
  const iconColor = 'text-hai-blue'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <div className="flex items-start gap-4 mb-4">
        <span className={`text-3xl ${iconColor} shrink-0`}><Icon name={icon} /></span>
        <div>
          <h3 className="font-serif font-bold text-xl text-hai-dark">{title}</h3>
          <p className="text-hai-slate mt-2 leading-relaxed">{content}</p>
        </div>
      </div>
      <div className={`${bgClass} ${borderClass} border-l-4 rounded-r-lg p-4 mt-4`}>
        <p className="text-hai-dark font-semibold text-[15px] leading-relaxed">{callout}</p>
      </div>
    </div>
  )
}

function QACard({ question, answer, icon }: { question: string; answer: ReactNode; icon?: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start gap-4 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        {icon && (
          <span className="hidden md:flex shrink-0 w-20 justify-center mt-0.5">{icon}</span>
        )}
        <span className="font-serif font-bold text-lg text-hai-dark leading-snug flex-1">
          {question}
        </span>
        <span
          className={`text-hai-blue text-xl transition-all duration-200 shrink-0 rounded-full w-8 h-8 flex items-center justify-center border-2 border-hai-blue bg-blue-50 hover:bg-hai-blue hover:text-white ${
            open ? 'rotate-180' : ''
          }`}
        >
          &#9662;
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-6 pb-6 md:pl-[6.5rem]">
            <div className="bg-hai-warm-gray rounded-lg p-5">
              <p className="text-hai-slate leading-relaxed">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function YesNoQACard({
  question,
  answer,
  correctAnswer,
  icon,
}: {
  question: string
  answer: ReactNode
  correctAnswer: 'yes' | 'no'
  icon?: ReactNode
}) {
  const [selected, setSelected] = useState<'yes' | 'no' | null>(null)
  const isCorrect = selected === correctAnswer

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 flex items-start gap-4">
        {icon && (
          <span className="hidden md:flex shrink-0 w-20 justify-center mt-0.5">{icon}</span>
        )}
        <div className="flex-1">
          <p className="font-serif font-bold text-lg text-hai-dark leading-snug mb-4">
            {question}
          </p>
          {!selected ? (
            <div className="flex gap-2">
              <button
                onClick={() => setSelected('yes')}
                className="px-4 py-1 rounded-full border border-hai-blue bg-blue-50 text-hai-blue text-xs font-semibold hover:bg-hai-blue hover:text-white transition-colors cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setSelected('no')}
                className="px-4 py-1 rounded-full border border-hai-blue bg-blue-50 text-hai-blue text-xs font-semibold hover:bg-hai-blue hover:text-white transition-colors cursor-pointer"
              >
                No
              </button>
            </div>
          ) : (
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                isCorrect
                  ? 'bg-green-50 text-green-700 border border-green-300'
                  : 'bg-red-50 text-red-700 border border-red-300'
              }`}>
                {isCorrect ? '✓ Correct!' : '✗ Not quite.'} You answered "{selected === 'yes' ? 'Yes' : 'No'}"
              </div>
              <div className="bg-hai-warm-gray rounded-lg p-5">
                <p className="text-hai-slate leading-relaxed">{answer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StampIcon() {
  return (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* Outer stamp border with notched edges */}
      <rect x="2" y="2" width="76" height="48" rx="4" stroke="#005FA3" strokeWidth="2.5" strokeDasharray="4 2" />
      <rect x="6" y="6" width="68" height="40" rx="2" stroke="#005FA3" strokeWidth="1.5" />
      {/* HIPAA text */}
      <text x="40" y="23" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#005FA3">HIPAA</text>
      {/* Compliant? text */}
      <text x="40" y="37" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#005FA3">Compliant?</text>
      {/* Question mark accent */}
      <circle cx="68" cy="12" r="7" fill="#005FA3" />
      <text x="68" y="16" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">?</text>
    </svg>
  )
}

function StickFigureIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* Head */}
      <circle cx="28" cy="12" r="6" stroke="#005FA3" strokeWidth="2.5" fill="none" />
      {/* Body */}
      <line x1="28" y1="18" x2="28" y2="34" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms on waist — angled down to hips */}
      <line x1="28" y1="24" x2="18" y2="30" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="30" x2="21" y2="34" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="24" x2="38" y2="30" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="30" x2="35" y2="34" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="28" y1="34" x2="20" y2="48" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="34" x2="36" y2="48" stroke="#005FA3" strokeWidth="2.5" strokeLinecap="round" />
      {/* Question bubble */}
      <circle cx="44" cy="10" r="7" fill="#005FA3" />
      <text x="44" y="13.5" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">?</text>
      <polygon points="40,16 43,14 39,18" fill="#005FA3" />
    </svg>
  )
}

export default function HipaaOverview() {
  return (
    <section className="py-10 md:py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-hai-blue uppercase tracking-widest text-sm font-semibold mb-3">
          Section 1
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-hai-dark mb-4">
          Why is HIPAA and Security so Important with AI?
        </h2>
        <p className="text-hai-slate text-lg max-w-3xl mb-12 leading-relaxed">
          The Health Insurance Portability and Accountability Act (HIPAA) establishes national
          standards to protect patients' medical records and other personal health information.
          Here are the key requirements you need to know.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {hipaaCards.map((card, i) => (
            <InfoCard key={card.title} {...card} accentBg={cardAccents[i]} />
          ))}
        </div>

        <div className="space-y-6 mb-10">
          <CalloutCard {...trainingHighlight} />
          <CalloutCard {...omnibusRule} accentColor="hai-red" />
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-2xl font-bold text-hai-dark mb-6">
            You might've wondered...
          </h3>
          <div className="space-y-4">
            <YesNoQACard
              question={qaItems[0].question}
              answer={qaItems[0].answer}
              correctAnswer="no"
              icon={<StampIcon />}
            />
            <QACard
              question={qaItems[1].question}
              answer={qaItems[1].answer}
              icon={<StickFigureIcon />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
