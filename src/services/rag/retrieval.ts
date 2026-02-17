import type { Document, InferenceResponse, ProcessingStep } from '../../types/models';
import { vectorStore } from './vectorStore';
import { createChatCompletion, estimateCost } from '../api/openai';
import type { ChatMessage } from '../api/openai';

export interface RAGOptions {
  topK?: number;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Perform RAG-based inference
 */
export const performRAG = async (
  query: string,
  options: RAGOptions = {}
): Promise<InferenceResponse> => {
  const { topK = 3, model = 'gpt-4', temperature = 0.7, maxTokens = 500 } = options;

  const startTime = Date.now();
  const processingSteps: ProcessingStep[] = [];

  // Step 1: Retrieve relevant documents
  const retrievalStart = Date.now();
  const retrievedDocs = await vectorStore.search(query, topK);
  const retrievalEnd = Date.now();

  processingSteps.push({
    stage: 'retrieval',
    timestamp: retrievalStart,
    duration: retrievalEnd - retrievalStart,
    data: {
      query,
      topK,
      retrievedCount: retrievedDocs.length,
      avgSimilarity:
        retrievedDocs.reduce((sum, doc) => sum + (doc.similarity || 0), 0) / retrievedDocs.length,
    },
    description: `Retrieved ${retrievedDocs.length} relevant documents`,
  });

  // Step 2: Build context from retrieved documents
  const context = retrievedDocs
    .map(
      (doc, index) =>
        `[Document ${index + 1}] ${doc.title}\n${doc.content}\n(Relevance: ${((doc.similarity || 0) * 100).toFixed(1)}%)`
    )
    .join('\n\n');

  // Step 3: Construct augmented prompt
  const systemMessage: ChatMessage = {
    role: 'system',
    content: `You are a medical AI assistant. Answer questions based on the provided context from medical documents.
If the context doesn't contain enough information to answer fully, acknowledge this and provide what information is available.
Always cite which documents you're referencing when possible.`,
  };

  const userMessage: ChatMessage = {
    role: 'user',
    content: `Context from medical knowledge base:\n\n${context}\n\n---\n\nQuestion: ${query}\n\nPlease provide a comprehensive answer based on the context above.`,
  };

  // Step 4: Generate response
  const generationStart = Date.now();
  const completion = await createChatCompletion([systemMessage, userMessage], {
    model,
    temperature,
    maxTokens,
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
      model,
      inputTokens,
      outputTokens,
      finishReason: completion.choices[0].finish_reason,
    },
    description: `Generated response using ${model}`,
  });

  const endTime = Date.now();
  const totalLatency = endTime - startTime;

  return {
    text: responseText,
    retrievedDocs,
    processingSteps,
    metadata: {
      latency: totalLatency,
      tokenCount: inputTokens + outputTokens,
      estimatedCost: estimateCost(model, inputTokens, outputTokens),
      modelUsed: model,
    },
  };
};

/**
 * Format retrieved documents for display
 */
export const formatRetrievedDocs = (docs: Document[]): string => {
  return docs
    .map((doc, index) => {
      const similarity = doc.similarity ? `(${(doc.similarity * 100).toFixed(1)}% relevant)` : '';
      return `${index + 1}. ${doc.title} ${similarity}\n   ${doc.content.substring(0, 200)}...`;
    })
    .join('\n\n');
};
