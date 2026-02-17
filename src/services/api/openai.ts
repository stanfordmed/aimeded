import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openaiClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // Client-side usage
  });
};

export const getOpenAIClient = (): OpenAI => {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Please set your API key in settings.');
  }
  return openaiClient;
};

export const isOpenAIInitialized = (): boolean => {
  return openaiClient !== null;
};

export const clearOpenAIClient = () => {
  openaiClient = null;
};

// Test API key validity
export const testApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const testClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    // Make a minimal API call to test the key
    await testClient.models.list();
    return true;
  } catch (error) {
    console.error('API key validation failed:', error);
    return false;
  }
};

// Chat completion
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const createChatCompletion = async (
  messages: ChatMessage[],
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  } = {}
) => {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model: options.model || 'gpt-4',
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 500,
    top_p: options.topP ?? 1.0,
  });

  return response;
};

// Generate embeddings
export const createEmbedding = async (input: string | string[]) => {
  const client = getOpenAIClient();

  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input,
  });

  return response;
};

// Estimate cost (rough approximation)
export const estimateCost = (
  model: string,
  inputTokens: number,
  outputTokens: number
): number => {
  const pricing: Record<string, { input: number; output: number }> = {
    'gpt-4': { input: 0.03 / 1000, output: 0.06 / 1000 },
    'gpt-4-turbo': { input: 0.01 / 1000, output: 0.03 / 1000 },
    'gpt-3.5-turbo': { input: 0.0005 / 1000, output: 0.0015 / 1000 },
  };

  const modelPricing = pricing[model] || pricing['gpt-4'];
  return inputTokens * modelPricing.input + outputTokens * modelPricing.output;
};
