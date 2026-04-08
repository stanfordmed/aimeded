export type ScenarioId = 'consumer' | 'local' | 'baa'

export interface Scenario {
  id: ScenarioId
  title: string
  subtitle: string
  description: string
  leakDescription?: string
  boxLabel: string
  showQueryLog: boolean
  showExtraction: boolean
  showPublicInternet: boolean
  grayedElements: string[]
  highlightedElements: string[]
  securityOverlay: boolean
  promptOverlay: {
    show: boolean
    text: string
    phiSegments?: string[]
  } | null
  leakPromptOverlay?: {
    text: string
  }
  responseOverlay: {
    show: boolean
    text: string
    phiSegments?: string[]
    warning?: string
  } | null
  phiHighlights: string[]
  leakPhiHighlights?: string[]
}

export const scenarios: Scenario[] = [
  {
    id: 'consumer',
    title: 'Scenario 1: Consumer Chatbot',
    subtitle: 'Using ChatGPT, Gemini, Claude, etc. with your own subscription',
    description:
      'When you use a consumer AI chatbot, your prompts are sent to the AI company\'s servers. They are stored in query logs and may be used to train and improve the model. Any PHI you include becomes part of the company\'s data infrastructure.',
    leakDescription:
      'A different clinician at another institution asks a similar question. Because the AI extracted insights from Dr. Smith\'s prompt, John D.\'s PHI now appears in the response to an unrelated user.',
    boxLabel: "AI Company's Property",
    showQueryLog: true,
    showExtraction: true,
    showPublicInternet: true,
    grayedElements: [],
    highlightedElements: [],
    securityOverlay: false,
    promptOverlay: {
      show: true,
      text: '"My patient John D., MRN 4821, is a 67-year-old male with an HbA1c of 9.2%. What adjustments to his insulin regimen would you suggest?"',
      phiSegments: ['John D.', 'MRN 4821', '67-year-old', 'HbA1c of 9.2%'],
    },
    leakPromptOverlay: {
      text: '"I have a 62-year-old male patient with poorly controlled diabetes. What insulin regimen do I start with?"',
    },
    responseOverlay: {
      show: true,
      text: '"Patients in their mid 60s with a HbA1c have been reported to be on the following insulin regimen..."',
      phiSegments: ['mid 60s', 'HbA1c'],
      warning:
        'The AI\'s response now contains details from Dr. Smith\'s original prompt\u2014John D.\'s PHI has leaked to an unrelated clinician.',
    },
    phiHighlights: ['queryLog', 'knowledge'],
    leakPhiHighlights: ['queryLog', 'knowledge', 'response'],
  },
  {
    id: 'local',
    title: 'Scenario 2: Locally Hosted LLM',
    subtitle: 'e.g. Apple Intelligence, offline models on your device',
    description:
      'With a locally hosted AI model, all processing happens on your device. There are no query logs sent to a company, no data extraction process, and no external servers involved. Your prompts never leave your hardware.',
    boxLabel: 'All on your device',
    showQueryLog: false,
    showExtraction: false,
    showPublicInternet: false,
    grayedElements: ['queryLog', 'extraction', 'publicInternet', 'arrowToQueryLog', 'arrowFromExtraction', 'arrowToPublicInternet'],
    highlightedElements: [],
    securityOverlay: false,
    promptOverlay: null,
    responseOverlay: null,
    phiHighlights: [],
  },
  {
    id: 'baa',
    title: 'Scenario 3: BAA-Protected AI',
    subtitle: 'Commercial AI with a Business Associate Agreement in place',
    description:
      'When your health system has a BAA with an AI vendor, the vendor is legally bound to protect PHI. Prompts containing PHI are either de-identified before being used to improve the model, or not used at all\u2014depending on the agreement. All data pathways are encrypted and audited.',
    boxLabel: "AI Company's Property (BAA Protected)",
    showQueryLog: true,
    showExtraction: true,
    showPublicInternet: true,
    grayedElements: [],
    highlightedElements: ['allArrows'],
    securityOverlay: true,
    promptOverlay: null,
    responseOverlay: null,
    phiHighlights: [],
  },
]
