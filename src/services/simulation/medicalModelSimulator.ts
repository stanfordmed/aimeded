import type { InferenceResponse, ProcessingStep } from '../../types/models';
import { createChatCompletion, estimateCost } from '../api/openai';
import type { ChatMessage } from '../api/openai';

export interface MedicalModelOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Simulate a fine-tuned medical model using prompt engineering
 */
export const simulateMedicalModel = async (
  query: string,
  options: MedicalModelOptions = {}
): Promise<InferenceResponse> => {
  const { model = 'gpt-4', temperature = 0.7, maxTokens = 500 } = options;

  const startTime = Date.now();
  const processingSteps: ProcessingStep[] = [];

  // Medical-specific system prompt that simulates fine-tuning
  const systemMessage: ChatMessage = {
    role: 'system',
    content: `You are Med-PaLM, a specialized medical AI model trained extensively on medical literature, clinical guidelines, and evidence-based medicine.

Your responses should:
1. Use precise medical terminology and nomenclature
2. Reference evidence-based guidelines when applicable (e.g., "According to ACC/AHA guidelines...")
3. Include relevant ICD-10 codes, drug classifications, and clinical criteria
4. Cite mechanisms of action, pathophysiology, and clinical reasoning
5. Mention key diagnostic tests and differential diagnoses when relevant
6. Acknowledge when information is outside your training or requires clinical judgment
7. Use medical abbreviations appropriately (explain on first use)
8. Structure responses with clear clinical reasoning

Always prioritize accuracy and acknowledge the limitations of AI medical advice. This is for educational purposes only.`,
  };

  const userMessage: ChatMessage = {
    role: 'user',
    content: query,
  };

  // Add pre-context with medical "activation" to simulate fine-tuning
  const medicalContext: ChatMessage = {
    role: 'system',
    content: `[Fine-tuned Medical Knowledge Activated]
Drawing from specialized training in:
- Internal Medicine & Primary Care
- Pharmacology & Therapeutics
- Clinical Guidelines (AHA/ACC, ADA, GOLD, etc.)
- Diagnostic Reasoning & Differential Diagnosis
- Evidence-Based Medicine`,
  };

  const messages = [systemMessage, medicalContext, userMessage];

  // Generate response
  const generationStart = Date.now();
  const completion = await createChatCompletion(messages, {
    model,
    temperature,
    maxTokens,
  });
  const generationEnd = Date.now();

  const responseText = completion.choices[0].message.content || '';
  const inputTokens = completion.usage?.prompt_tokens || 0;
  const outputTokens = completion.usage?.completion_tokens || 0;

  processingSteps.push({
    stage: 'tokenization',
    timestamp: startTime,
    duration: 50,
    data: { query },
    description: 'Tokenized input query',
  });

  processingSteps.push({
    stage: 'embedding',
    timestamp: startTime + 50,
    duration: 100,
    data: { medicalContext: 'activated' },
    description: 'Activated medical fine-tuning parameters',
  });

  processingSteps.push({
    stage: 'generation',
    timestamp: generationStart,
    duration: generationEnd - generationStart,
    data: {
      model,
      inputTokens,
      outputTokens,
      finishReason: completion.choices[0].finish_reason,
      medicalEnhancement: 'Medical system prompt and context injection',
    },
    description: `Generated response using simulated medical fine-tuning`,
  });

  const endTime = Date.now();
  const totalLatency = endTime - startTime;

  return {
    text: responseText,
    processingSteps,
    metadata: {
      latency: totalLatency,
      tokenCount: inputTokens + outputTokens,
      estimatedCost: estimateCost(model, inputTokens, outputTokens),
      modelUsed: `${model} (simulated fine-tuned)`,
    },
  };
};

/**
 * Analyze text for medical terminology density
 */
export const analyzeMedicalDensity = (text: string): number => {
  const medicalTermsPattern = /\b(diagnosis|treatment|therapy|pathophysiology|etiology|prognosis|syndrome|disease|disorder|medication|pharmaceutical|clinical|patient|symptom|manifestation|protocol|guideline|criteria|screening|prophylaxis|contraindication|adverse|efficacy|mechanism|receptor|metabolic|endocrine|cardiovascular|pulmonary|renal|hepatic|neurological)\b/gi;

  const matches = text.match(medicalTermsPattern);
  const words = text.split(/\s+/).length;

  return matches ? (matches.length / words) * 100 : 0;
};
