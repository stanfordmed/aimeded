export interface PromptItem {
  id: string
  text: string
  correctTarget: 'consumer' | 'baa'
  explanation: string
}

export const promptItems: PromptItem[] = [
  {
    id: 'p1',
    text: '"What are the common side effects of metformin?"',
    correctTarget: 'consumer',
    explanation:
      'This is a general medical knowledge question with no patient-specific information. Safe to use with any AI tool.',
  },
  {
    id: 'p2',
    text: '"My patient John D., MRN 4821, is a 67-year-old male with HbA1c of 9.2. What medication adjustments would you recommend?"',
    correctTarget: 'baa',
    explanation:
      'This prompt contains PHI: patient name, MRN, age, and lab values. It must only be used with a BAA-protected tool.',
  },
  {
    id: 'p3',
    text: '"Explain the pathophysiology of diabetic ketoacidosis for a teaching presentation."',
    correctTarget: 'consumer',
    explanation:
      'This is a general educational question with no patient information. Safe for any AI tool.',
  },
  {
    id: 'p4',
    text: '"Summarize the last 3 progress notes for the patient in room 412B who was admitted on 3/15 for CHF exacerbation."',
    correctTarget: 'baa',
    explanation:
      'This references a specific patient by room number, admission date, and diagnosis\u2014all identifiable information. Requires a BAA-protected tool.',
  },
  {
    id: 'p5',
    text: '"What is the recommended first-line treatment for community-acquired pneumonia in adults?"',
    correctTarget: 'consumer',
    explanation:
      'General clinical guidelines question. No patient data involved. Safe for any tool.',
  },
  {
    id: 'p6',
    text: '"Review this discharge summary and help me draft follow-up instructions: Patient: Maria G., DOB 05/12/1958, diagnosed with Stage IIIA NSCLC..."',
    correctTarget: 'baa',
    explanation:
      'Contains patient name, date of birth, and specific diagnosis. This is PHI and requires a BAA-protected platform.',
  },
]
