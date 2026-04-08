import { useState } from 'react'

const phiIdentifiers = [
  { label: 'Names', icon: '👤' },
  { label: 'Geography (sub-state)', icon: '📍' },
  { label: 'Dates (except year)', icon: '📅' },
  { label: 'Phone numbers', icon: '📞' },
  { label: 'Fax numbers', icon: '📠' },
  { label: 'Email addresses', icon: '✉' },
  { label: 'SSNs', icon: '#' },
  { label: 'Medical record numbers', icon: '🏥' },
  { label: 'Health plan IDs', icon: '💳' },
  { label: 'Account numbers', icon: '🔢' },
  { label: 'Certificate/license numbers', icon: '📄' },
  { label: 'Vehicle identifiers', icon: '🚗' },
  { label: 'Device identifiers', icon: '📱' },
  { label: 'URLs', icon: '🔗' },
  { label: 'IP addresses', icon: '🌐' },
  { label: 'Biometric IDs', icon: '🖐' },
  { label: 'Photos (full face)', icon: '📷' },
  { label: 'Any unique ID/code', icon: '🆔' },
]

interface PhiSpan {
  text: string
  isPhi: boolean
  phiType?: string
}

interface Excerpt {
  id: string
  context: string
  spans: PhiSpan[]
}

const excerpts: Excerpt[] = [
  {
    id: 'e1',
    context: 'Emergency department note',
    spans: [
      { text: 'Patient ', isPhi: false },
      { text: 'Maria Gonzalez', isPhi: true, phiType: 'Name' },
      { text: ', DOB ', isPhi: false },
      { text: '03/14/1962', isPhi: true, phiType: 'Date' },
      { text: ', presented to the ED at ', isPhi: false },
      { text: 'Springfield Memorial Hospital', isPhi: false },
      { text: ' with chest pain. MRN ', isPhi: false },
      { text: '00482917', isPhi: true, phiType: 'Medical record number' },
      { text: '. EKG showed ST elevation in leads II, III, and aVF. Cardiology consulted.', isPhi: false },
    ],
  },
  {
    id: 'e2',
    context: 'Referral letter',
    spans: [
      { text: 'I am referring ', isPhi: false },
      { text: 'James Chen', isPhi: true, phiType: 'Name' },
      { text: ', a 45-year-old male residing at ', isPhi: false },
      { text: '742 Evergreen Terrace, Apt 3B, Portland, OR 97201', isPhi: true, phiType: 'Address' },
      { text: ', for evaluation of persistent lower back pain. He can be reached at ', isPhi: false },
      { text: '(503) 555-0187', isPhi: true, phiType: 'Phone number' },
      { text: '. Insurance ID: ', isPhi: false },
      { text: 'BC-8847231', isPhi: true, phiType: 'Health plan ID' },
      { text: '.', isPhi: false },
    ],
  },
  {
    id: 'e3',
    context: 'Discharge summary',
    spans: [
      { text: 'Discharged ', isPhi: false },
      { text: 'Aisha Patel', isPhi: true, phiType: 'Name' },
      { text: ', a ', isPhi: false },
      { text: '93', isPhi: true, phiType: 'Age (90+)' },
      { text: '-year-old female, on ', isPhi: false },
      { text: '11/02/2025', isPhi: true, phiType: 'Date' },
      { text: ' following a 3-day admission for pneumonia. SSN on file: ', isPhi: false },
      { text: '***-**-4829', isPhi: true, phiType: 'SSN' },
      { text: '. Follow-up with pulmonology in 2 weeks. Patient email: ', isPhi: false },
      { text: 'aisha.patel@email.com', isPhi: true, phiType: 'Email' },
      { text: '.', isPhi: false },
    ],
  },
  {
    id: 'e4',
    context: 'Radiology report',
    spans: [
      { text: 'CT scan of the abdomen for ', isPhi: false },
      { text: 'Robert Williams', isPhi: true, phiType: 'Name' },
      { text: ', account number ', isPhi: false },
      { text: 'ACCT-991204', isPhi: true, phiType: 'Account number' },
      { text: ', performed on ', isPhi: false },
      { text: 'January 15', isPhi: true, phiType: 'Date' },
      { text: '. Findings: 2.3 cm mass in the right hepatic lobe, recommend MRI for further characterization. Device serial: ', isPhi: false },
      { text: 'CT-SN-8834X', isPhi: true, phiType: 'Device identifier' },
      { text: '.', isPhi: false },
    ],
  },
  {
    id: 'e5',
    context: 'Telemedicine visit note',
    spans: [
      { text: 'Conducted video visit with ', isPhi: false },
      { text: 'Linda Okafor', isPhi: true, phiType: 'Name' },
      { text: ' from IP address ', isPhi: false },
      { text: '192.168.42.107', isPhi: true, phiType: 'IP address' },
      { text: '. Patient reports improved mood on current SSRI regimen. License number: ', isPhi: false },
      { text: 'RN-2847561', isPhi: true, phiType: 'License number' },
      { text: '. Next appointment scheduled for ', isPhi: false },
      { text: 'March 3rd', isPhi: true, phiType: 'Date' },
      { text: '.', isPhi: false },
    ],
  },
  {
    id: 'e6',
    context: 'Lab results notification',
    spans: [
      { text: 'Lab results for ', isPhi: false },
      { text: 'David Nakamura', isPhi: true, phiType: 'Name' },
      { text: ', DOB ', isPhi: false },
      { text: '07/22/1988', isPhi: true, phiType: 'Date' },
      { text: ': HbA1c 8.1%, fasting glucose 187 mg/dL. Results faxed to ', isPhi: false },
      { text: '(212) 555-0943', isPhi: true, phiType: 'Fax number' },
      { text: '. Patient portal: ', isPhi: false },
      { text: 'https://mychart.hospital.org/patient/dnakamura', isPhi: true, phiType: 'URL' },
      { text: '.', isPhi: false },
    ],
  },
]

function PhiTag({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-hai-warm-gray text-hai-slate text-xs font-medium">
      <span className="text-xs grayscale opacity-70">{icon}</span>
      {label}
    </span>
  )
}

function ExcerptCard({ excerpt }: { excerpt: Excerpt }) {
  const phiCount = excerpt.spans.filter((s) => s.isPhi).length
  const [found, setFound] = useState<Set<number>>(new Set())
  const allFound = found.size === phiCount

  const handleClick = (index: number, isPhi: boolean) => {
    if (!isPhi) return
    setFound((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  return (
    <div className={`rounded-xl border p-5 transition-all ${allFound ? 'border-green-300 bg-green-50/50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-hai-slate uppercase tracking-wide">{excerpt.context}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
          allFound
            ? 'bg-green-100 text-green-700'
            : 'bg-hai-blue-light text-hai-blue'
        }`}>
          {found.size}/{phiCount} found
        </span>
      </div>
      <p className="leading-relaxed text-[15px]">
        {excerpt.spans.map((span, i) =>
          span.isPhi ? (
            <span
              key={i}
              onClick={() => handleClick(i, true)}
              className={`cursor-pointer rounded px-0.5 transition-all ${
                found.has(i)
                  ? 'bg-orange-200 text-orange-900'
                  : ''
              }`}
              title={found.has(i) ? `✓ ${span.phiType}` : 'Click if this is PHI'}
            >
              {found.has(i) && <span className="text-orange-600 text-xs mr-0.5">✓</span>}
              {span.text}
            </span>
          ) : (
            <span key={i}>{span.text}</span>
          )
        )}
      </p>
      {allFound && (
        <div className="mt-3 flex items-center gap-2 text-green-700 text-sm font-semibold">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.78 5.22a.75.75 0 0 0-1.06 0L7 8.94 5.28 7.22a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0 0-1.06z" />
          </svg>
          All PHI identified!
        </div>
      )}
    </div>
  )
}

export default function MatchingActivity() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-hai-blue uppercase tracking-widest text-sm font-semibold mb-3">
          Section 3
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-hai-dark mb-4">
          Test Your Knowledge
        </h2>
        <p className="text-hai-slate text-lg max-w-3xl mb-8 leading-relaxed">
          HIPAA defines 18 types of information that count as Protected Health Information (PHI).
          Check them out below.
        </p>

        {/* PHI identifiers grid */}
        <div className="flex flex-wrap gap-2 mb-12">
          {phiIdentifiers.map((id) => (
            <PhiTag key={id.label} {...id} />
          ))}
        </div>

        {/* Exercise */}
        <h3 className="font-serif text-2xl font-bold text-hai-dark mb-2">
          Spot the PHI
        </h3>
        <p className="text-hai-slate mb-6 leading-relaxed">
          If you're including any PHI in your prompts to an AI chatbot for patient care,
          make sure you use one that your institution has approved for use with PHI.
          If not, you need to scrub PHI from your prompts. Can you spot the instances
          of PHI below? Click on each one to highlight it.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {excerpts.map((excerpt) => (
            <ExcerptCard key={excerpt.id} excerpt={excerpt} />
          ))}
        </div>
      </div>
    </section>
  )
}
