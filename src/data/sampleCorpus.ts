import type { Document } from '../types/models';

export const SAMPLE_MEDICAL_DOCUMENTS: Document[] = [
  {
    id: 'doc-diabetes-1',
    title: 'Type 2 Diabetes Management',
    content: `Type 2 diabetes mellitus is a chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency. Management involves lifestyle modifications including diet and exercise, along with pharmacological interventions. First-line therapy typically includes metformin, which reduces hepatic glucose production and improves insulin sensitivity. HbA1c targets are generally set at <7% for most patients. Regular monitoring includes fasting glucose, HbA1c every 3 months, and screening for complications including retinopathy, nephropathy, and neuropathy. Patient education on glucose monitoring, foot care, and recognition of hypoglycemia is essential.`,
    category: 'medical',
    metadata: {
      source: 'Medical Education Database',
      dateAdded: new Date('2024-01-15'),
      wordCount: 95,
      medicalTerms: ['insulin resistance', 'metformin', 'HbA1c', 'retinopathy', 'nephropathy', 'neuropathy', 'hypoglycemia'],
    },
  },
  {
    id: 'doc-hypertension-1',
    title: 'Hypertension Treatment Guidelines',
    content: `Hypertension is defined as sustained blood pressure ≥140/90 mmHg. Initial management includes lifestyle modifications: sodium restriction (<2.3g/day), DASH diet, regular aerobic exercise, weight loss if overweight, and limiting alcohol. Pharmacological treatment is indicated for BP ≥140/90 mmHg despite lifestyle changes. First-line agents include ACE inhibitors (lisinopril, enalapril), ARBs (losartan, valsartan), calcium channel blockers (amlodipine), or thiazide diuretics (hydrochlorothiazide). Target BP is generally <130/80 mmHg. Monitor for orthostatic hypotension, electrolyte imbalances, and kidney function. Screen for end-organ damage including left ventricular hypertrophy and chronic kidney disease.`,
    category: 'medical',
    metadata: {
      source: 'Cardiology Guidelines',
      dateAdded: new Date('2024-01-16'),
      wordCount: 102,
      medicalTerms: ['ACE inhibitors', 'ARBs', 'calcium channel blockers', 'diuretics', 'orthostatic hypotension', 'left ventricular hypertrophy'],
    },
  },
  {
    id: 'doc-metformin-1',
    title: 'Metformin Pharmacology',
    content: `Metformin is a biguanide antihyperglycemic agent that is first-line therapy for type 2 diabetes. Its primary mechanism of action involves decreasing hepatic gluconeogenesis and increasing peripheral insulin sensitivity. Metformin does not stimulate insulin secretion and therefore carries minimal risk of hypoglycemia when used as monotherapy. Common adverse effects include gastrointestinal symptoms such as nausea, diarrhea, and abdominal discomfort, which often improve with extended-release formulations or gradual dose titration. Contraindications include severe renal impairment (eGFR <30 mL/min), metabolic acidosis, and acute heart failure. Rare but serious side effect is lactic acidosis. Typical starting dose is 500mg once or twice daily with meals, titrated up to maximum 2000-2550mg daily.`,
    category: 'medical',
    metadata: {
      source: 'Pharmacology Reference',
      dateAdded: new Date('2024-01-17'),
      wordCount: 118,
      medicalTerms: ['biguanide', 'gluconeogenesis', 'insulin sensitivity', 'eGFR', 'lactic acidosis'],
    },
  },
  {
    id: 'doc-cvd-1',
    title: 'Cardiovascular Disease Prevention',
    content: `Cardiovascular disease remains the leading cause of mortality worldwide. Primary prevention focuses on modifying risk factors: smoking cessation, blood pressure control, lipid management with statins (targeting LDL <100 mg/dL for high-risk patients), diabetes management, healthy diet, regular physical activity (150 minutes moderate-intensity weekly), and maintaining healthy weight (BMI 18.5-24.9). The ASCVD risk calculator estimates 10-year cardiovascular risk. High-risk patients (≥10% 10-year risk) benefit from aggressive statin therapy. Aspirin for primary prevention is now more selective, recommended only for certain high-risk individuals after careful bleeding risk assessment. Secondary prevention after MI includes dual antiplatelet therapy, beta-blockers, ACE inhibitors, and high-intensity statins.`,
    category: 'medical',
    metadata: {
      source: 'Preventive Medicine',
      dateAdded: new Date('2024-01-18'),
      wordCount: 117,
      medicalTerms: ['LDL', 'statins', 'ASCVD', 'dual antiplatelet therapy', 'beta-blockers'],
    },
  },
  {
    id: 'doc-asthma-1',
    title: 'Asthma Management',
    content: `Asthma is a chronic inflammatory airway disease characterized by variable airflow obstruction, bronchial hyperresponsiveness, and airway inflammation. Symptoms include wheezing, shortness of breath, chest tightness, and cough, often worse at night or early morning. Diagnosis is confirmed by spirometry showing reversible airflow obstruction (FEV1 improvement ≥12% and ≥200mL after bronchodilator). Management follows a stepwise approach. Step 1: as-needed short-acting beta-agonist (SABA) like albuterol. Step 2: low-dose inhaled corticosteroid (ICS). Step 3: low-dose ICS plus long-acting beta-agonist (LABA). Avoid LABA monotherapy. Trigger avoidance, asthma action plans, and proper inhaler technique are crucial. Monitor control with symptoms, SABA use frequency, and peak flow monitoring.`,
    category: 'medical',
    metadata: {
      source: 'Pulmonology Guidelines',
      dateAdded: new Date('2024-01-19'),
      wordCount: 122,
      medicalTerms: ['bronchial hyperresponsiveness', 'FEV1', 'bronchodilator', 'inhaled corticosteroid', 'SABA', 'LABA'],
    },
  },
  {
    id: 'doc-copd-1',
    title: 'COPD Diagnosis and Treatment',
    content: `Chronic Obstructive Pulmonary Disease (COPD) is characterized by persistent, usually progressive airflow limitation associated with chronic inflammatory response in airways, primarily caused by cigarette smoking. Diagnosis requires spirometry showing post-bronchodilator FEV1/FVC <0.70. Classification by GOLD criteria based on FEV1: mild (≥80% predicted), moderate (50-79%), severe (30-49%), very severe (<30%). Smoking cessation is the most important intervention. Pharmacotherapy includes bronchodilators (LABA, LAMA) as maintenance therapy. Inhaled corticosteroids added for frequent exacerbations. Acute exacerbations treated with increased bronchodilators, systemic corticosteroids, and antibiotics if signs of bacterial infection. Long-term oxygen therapy for severe hypoxemia improves survival. Pulmonary rehabilitation and vaccination (influenza, pneumococcal) are important adjuncts.`,
    category: 'medical',
    metadata: {
      source: 'Pulmonology Guidelines',
      dateAdded: new Date('2024-01-20'),
      wordCount: 125,
      medicalTerms: ['FEV1/FVC', 'GOLD criteria', 'LABA', 'LAMA', 'hypoxemia', 'pulmonary rehabilitation'],
    },
  },
  {
    id: 'doc-depression-1',
    title: 'Depression Screening and Treatment',
    content: `Major depressive disorder is characterized by persistent depressed mood and/or anhedonia for at least 2 weeks, with additional symptoms including changes in sleep, appetite, energy, concentration, or suicidal ideation. Screening tools include PHQ-9 (≥10 suggests moderate-severe depression). Initial management involves psychotherapy (cognitive behavioral therapy, interpersonal therapy) and/or pharmacotherapy. First-line medications are SSRIs (sertraline, escitalopram) or SNRIs (duloxetine, venlafaxine). Therapeutic response typically takes 4-6 weeks. Monitor for worsening depression or emergence of suicidal thoughts, especially in young adults. Treatment resistance may require augmentation strategies, switching medication classes, or ECT for severe cases. Assess for bipolar disorder before initiating antidepressants to avoid precipitating mania.`,
    category: 'medical',
    metadata: {
      source: 'Psychiatry Guidelines',
      dateAdded: new Date('2024-01-21'),
      wordCount: 116,
      medicalTerms: ['anhedonia', 'PHQ-9', 'SSRIs', 'SNRIs', 'ECT'],
    },
  },
  {
    id: 'doc-antibiotics-1',
    title: 'Antibiotic Stewardship',
    content: `Antibiotic stewardship involves optimizing antibiotic use to achieve best patient outcomes while minimizing adverse effects and resistance. Key principles include using antibiotics only when indicated (bacterial infections, not viral), selecting appropriate agent based on likely pathogen and local resistance patterns, using narrowest spectrum effective antibiotic, proper dosing, and shortest effective duration. Common misuse includes treating viral upper respiratory infections, asymptomatic bacteriuria (except pregnancy), and prolonged courses without reassessment. Antibiotic resistance is accelerated by inappropriate use. For community-acquired pneumonia, typical empiric therapy is amoxicillin or macrolide for outpatients, ceftriaxone plus azithromycin for inpatients. Always culture before antibiotics when possible. Consider de-escalation based on culture results and clinical improvement.`,
    category: 'medical',
    metadata: {
      source: 'Infectious Disease',
      dateAdded: new Date('2024-01-22'),
      wordCount: 118,
      medicalTerms: ['antibiotic resistance', 'empiric therapy', 'community-acquired pneumonia', 'bacteriuria'],
    },
  },
  {
    id: 'doc-cbc-1',
    title: 'Complete Blood Count Interpretation',
    content: `Complete blood count (CBC) is a fundamental laboratory test assessing blood cell populations. Normal values vary by age and sex. Hemoglobin: men 13.5-17.5 g/dL, women 12-16 g/dL. Anemia classification by MCV: microcytic (<80 fL) suggests iron deficiency or thalassemia, normocytic (80-100 fL) suggests acute blood loss or chronic disease, macrocytic (>100 fL) suggests B12/folate deficiency or alcohol use. White blood cell count normal 4,000-11,000/μL. Leukocytosis suggests infection or inflammation. Neutropenia (<1,500/μL) increases infection risk. Thrombocytopenia (<150,000/μL) may cause bleeding. Platelet count >450,000/μL is thrombocytosis. Always correlate lab findings with clinical presentation. Peripheral smear provides additional morphologic information.`,
    category: 'medical',
    metadata: {
      source: 'Laboratory Medicine',
      dateAdded: new Date('2024-01-23'),
      wordCount: 108,
      medicalTerms: ['hemoglobin', 'MCV', 'microcytic', 'macrocytic', 'leukocytosis', 'neutropenia', 'thrombocytopenia'],
    },
  },
  {
    id: 'doc-preventive-1',
    title: 'Preventive Care Recommendations',
    content: `Preventive care guidelines vary by age and risk factors. Immunizations: annual influenza vaccine for all patients ≥6 months, Td/Tdap booster every 10 years, pneumococcal vaccine for adults ≥65 and high-risk patients, zoster vaccine for adults ≥50. Cancer screening: mammography every 1-2 years ages 50-74, colonoscopy every 10 years starting age 45, cervical cancer screening with Pap smear every 3 years ages 21-65 or co-testing every 5 years, lung cancer screening with low-dose CT for high-risk smokers ages 50-80. Cardiovascular screening: blood pressure at every visit, lipid panel starting age 35 for men and 45 for women or earlier if risk factors present. Diabetes screening for BMI ≥25 with risk factors. Counsel all patients on diet, exercise, smoking cessation, alcohol moderation, and seatbelt use.`,
    category: 'medical',
    metadata: {
      source: 'Preventive Medicine',
      dateAdded: new Date('2024-01-24'),
      wordCount: 133,
      medicalTerms: ['Td/Tdap', 'pneumococcal vaccine', 'zoster vaccine', 'mammography', 'colonoscopy', 'Pap smear'],
    },
  },
  // Add a few general documents for comparison
  {
    id: 'doc-general-1',
    title: 'Introduction to Machine Learning',
    content: `Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. There are three main types of machine learning: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error). Common algorithms include linear regression, decision trees, neural networks, and support vector machines. Applications span many fields including natural language processing, computer vision, recommendation systems, and medical diagnosis. The key is having sufficient quality training data and choosing appropriate algorithms for the problem at hand.`,
    category: 'general',
    metadata: {
      source: 'General Knowledge',
      dateAdded: new Date('2024-01-25'),
      wordCount: 95,
    },
  },
  {
    id: 'doc-general-2',
    title: 'How Search Engines Work',
    content: `Search engines like Google use sophisticated algorithms to index and rank billions of web pages. The process involves three main steps: crawling (discovering pages), indexing (analyzing and storing content), and ranking (determining relevance to queries). Crawlers follow links between pages to discover new content. Indexed pages are analyzed for keywords, structure, and quality signals. Ranking algorithms consider hundreds of factors including keyword relevance, page quality, user engagement, backlinks, and page speed. Modern search engines also use machine learning and natural language processing to understand query intent and provide more relevant results. The goal is to surface the most useful information for each specific query.`,
    category: 'general',
    metadata: {
      source: 'General Knowledge',
      dateAdded: new Date('2024-01-26'),
      wordCount: 105,
    },
  },
];

export const EXAMPLE_PROMPTS = [
  'What are the symptoms of Type 2 diabetes?',
  'How do you treat hypertension?',
  'What are the side effects of metformin?',
  'Explain the pathophysiology of asthma',
  'What is the difference between COPD and asthma?',
  'How do you interpret a CBC?',
  'What vaccines should adults receive?',
  'When should you prescribe antibiotics?',
  'What are the diagnostic criteria for depression?',
  'How do statins work?',
];
