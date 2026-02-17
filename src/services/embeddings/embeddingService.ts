import { createEmbedding } from '../api/openai';
import type { Document } from '../../types/models';

class EmbeddingService {
  private cache = new Map<string, number[]>();
  private batchSize = 20; // OpenAI allows up to 2048 inputs per request

  /**
   * Generate embedding for a single text input
   */
  async generateEmbedding(text: string): Promise<number[]> {
    // Check cache first
    const cacheKey = this.getCacheKey(text);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await createEmbedding(text);
      const embedding = response.data[0].embedding;

      // Cache the result
      this.cache.set(cacheKey, embedding);
      return embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw new Error('Failed to generate embedding. Please check your API key and try again.');
    }
  }

  /**
   * Generate embeddings for multiple texts in batches
   */
  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];

    for (let i = 0; i < texts.length; i += this.batchSize) {
      const batch = texts.slice(i, i + this.batchSize);

      // Check cache for each item
      const uncachedIndices: number[] = [];
      const uncachedTexts: string[] = [];

      batch.forEach((text, index) => {
        const cacheKey = this.getCacheKey(text);
        if (this.cache.has(cacheKey)) {
          embeddings[i + index] = this.cache.get(cacheKey)!;
        } else {
          uncachedIndices.push(i + index);
          uncachedTexts.push(text);
        }
      });

      // Fetch uncached embeddings
      if (uncachedTexts.length > 0) {
        try {
          const response = await createEmbedding(uncachedTexts);
          response.data.forEach((item, index) => {
            const embedding = item.embedding;
            const globalIndex = uncachedIndices[index];
            const text = texts[globalIndex];

            embeddings[globalIndex] = embedding;
            this.cache.set(this.getCacheKey(text), embedding);
          });
        } catch (error) {
          console.error('Error generating batch embeddings:', error);
          throw new Error('Failed to generate embeddings. Please check your API key and try again.');
        }
      }
    }

    return embeddings;
  }

  /**
   * Generate embeddings for corpus documents
   */
  async embedCorpus(documents: Document[]): Promise<Document[]> {
    const texts = documents.map((doc) => doc.content);
    const embeddings = await this.generateBatchEmbeddings(texts);

    return documents.map((doc, index) => ({
      ...doc,
      embedding: embeddings[index],
    }));
  }

  /**
   * Clear the embedding cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }

  /**
   * Generate cache key from text
   */
  private getCacheKey(text: string): string {
    // Use a simple hash for cache key
    return text.trim().toLowerCase();
  }
}

// Export singleton instance
export const embeddingService = new EmbeddingService();
