import { useMutation } from '@tanstack/react-query';
import { ModelType } from '../types/models';
import type { Model, InferenceRequest, InferenceResponse, ProcessingStep } from '../types/models';
import { createChatCompletion, estimateCost } from '../services/api/openai';
import type { ChatMessage } from '../services/api/openai';
import { performRAG } from '../services/rag/retrieval';
import { simulateMedicalModel } from '../services/simulation/medicalModelSimulator';

/**
 * Foundation model inference (standard GPT-4)
 */
const performFoundationInference = async (
  request: InferenceRequest
): Promise<InferenceResponse> => {
  const { prompt, model, parameters } = request;
  const startTime = Date.now();
  const processingSteps: ProcessingStep[] = [];

  // Simple, direct API call
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful AI assistant. Provide clear, accurate, and informative responses.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  processingSteps.push({
    stage: 'tokenization',
    timestamp: startTime,
    duration: 50,
    data: { prompt },
    description: 'Tokenized input prompt',
  });

  const generationStart = Date.now();
  const completion = await createChatCompletion(messages, {
    model: model.apiModel,
    temperature: parameters.temperature,
    maxTokens: parameters.maxTokens,
    topP: parameters.topP,
  });
  const generationEnd = Date.now();

  const responseText = completion.choices[0].message.content || '';
  const inputTokens = completion.usage?.prompt_tokens || 0;
  const outputTokens = completion.usage?.completion_tokens || 0;

  processingSteps.push({
    stage: 'generation',
    timestamp: generationStart,
    duration: generationEnd - generationStart,
    data: {
      model: model.apiModel,
      inputTokens,
      outputTokens,
    },
    description: 'Generated response from foundation model',
  });

  const endTime = Date.now();

  return {
    text: responseText,
    processingSteps,
    metadata: {
      latency: endTime - startTime,
      tokenCount: inputTokens + outputTokens,
      estimatedCost: estimateCost(model.apiModel || 'gpt-4', inputTokens, outputTokens),
      modelUsed: model.apiModel || 'gpt-4',
    },
  };
};

/**
 * Main inference function that routes to appropriate model type
 */
const performInference = async (request: InferenceRequest): Promise<InferenceResponse> => {
  const { model, prompt, parameters } = request;

  switch (model.type) {
    case ModelType.FOUNDATION:
      return performFoundationInference(request);

    case ModelType.FINETUNED:
      return simulateMedicalModel(prompt, {
        model: model.apiModel,
        temperature: parameters.temperature,
        maxTokens: parameters.maxTokens,
      });

    case ModelType.RAG:
      return performRAG(prompt, {
        topK: 3,
        model: model.apiModel,
        temperature: parameters.temperature,
        maxTokens: parameters.maxTokens,
      });

    default:
      throw new Error(`Unknown model type: ${model.type}`);
  }
};

/**
 * Hook for model inference with React Query
 */
export const useModelInference = () => {
  return useMutation({
    mutationFn: performInference,
    onError: (error) => {
      console.error('Inference error:', error);
    },
  });
};

/**
 * Hook for batch inference (comparison mode)
 */
export const useBatchInference = () => {
  return useMutation({
    mutationFn: async (requests: InferenceRequest[]) => {
      const responses = await Promise.all(requests.map(performInference));
      return responses;
    },
    onError: (error) => {
      console.error('Batch inference error:', error);
    },
  });
};
