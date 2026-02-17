export enum ModelType {
  FOUNDATION = 'foundation',
  FINETUNED = 'finetuned',
  RAG = 'rag',
}

export interface Model {
  id: string;
  name: string;
  type: ModelType;
  provider: 'openai' | 'simulated';
  apiModel?: string; // OpenAI model name (e.g., 'gpt-4')
  description: string;
  color: string; // For UI differentiation
  icon?: string;
}

export interface InferenceParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface InferenceRequest {
  prompt: string;
  model: Model;
  parameters: InferenceParameters;
  corpusContext?: Document[]; // For RAG
}

export interface ProcessingStep {
  stage: 'tokenization' | 'embedding' | 'retrieval' | 'generation';
  timestamp: number;
  data: any;
  duration: number;
  description: string;
}

export interface Token {
  text: string;
  id: number;
  logprob?: number;
}

export interface InferenceResponse {
  text: string;
  tokens?: Token[];
  embeddings?: number[];
  retrievedDocs?: Document[]; // For RAG
  processingSteps: ProcessingStep[]; // For animation
  metadata: {
    latency: number;
    tokenCount: number;
    estimatedCost: number;
    modelUsed: string;
  };
}

export interface Document {
  id: string;
  title: string;
  content: string;
  category: 'medical' | 'general' | 'user-added';
  metadata: {
    source: string;
    dateAdded: Date;
    wordCount: number;
    medicalTerms?: string[];
  };
  embedding?: number[];
  similarity?: number; // Used when retrieved
}

// Default models
export const AVAILABLE_MODELS: Model[] = [
  {
    id: 'gpt-4-foundation',
    name: 'Foundation Model',
    type: ModelType.FOUNDATION,
    provider: 'openai',
    apiModel: 'gpt-4',
    description: 'Standard GPT-4 model with general knowledge across all domains',
    color: '#3B82F6', // Blue
    icon: '🤖',
  },
  {
    id: 'medpalm-finetuned',
    name: 'Med-PaLM (Simulated)',
    type: ModelType.FINETUNED,
    provider: 'simulated',
    apiModel: 'gpt-4',
    description: 'Simulated medical fine-tuned model with enhanced medical knowledge',
    color: '#10B981', // Green
    icon: '🏥',
  },
  {
    id: 'rag-medical',
    name: 'RAG Model',
    type: ModelType.RAG,
    provider: 'openai',
    apiModel: 'gpt-4',
    description: 'Retrieval-Augmented Generation with medical corpus',
    color: '#8B5CF6', // Purple
    icon: '📚',
  },
];

export const DEFAULT_INFERENCE_PARAMETERS: InferenceParameters = {
  temperature: 0.7,
  maxTokens: 500,
  topP: 1.0,
};
