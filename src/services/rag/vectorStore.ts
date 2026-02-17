import type { Document } from '../../types/models';
import { embeddingService } from '../embeddings/embeddingService';
import { findTopKSimilar } from '../embeddings/similaritySearch';
import type { SimilarityResult } from '../embeddings/similaritySearch';

class VectorStore {
  private documents: Document[] = [];
  private isInitialized = false;

  /**
   * Add documents to the vector store
   */
  async addDocuments(docs: Document[]): Promise<void> {
    // Generate embeddings for documents that don't have them
    const docsNeedingEmbeddings = docs.filter((doc) => !doc.embedding);

    if (docsNeedingEmbeddings.length > 0) {
      const embeddedDocs = await embeddingService.embedCorpus(docsNeedingEmbeddings);

      // Merge embedded docs with those that already had embeddings
      const embeddedDocsMap = new Map(embeddedDocs.map((doc) => [doc.id, doc]));
      const allDocs = docs.map((doc) => embeddedDocsMap.get(doc.id) || doc);

      this.documents = allDocs;
    } else {
      this.documents = docs;
    }

    this.isInitialized = true;
  }

  /**
   * Update the entire corpus
   */
  async updateCorpus(docs: Document[]): Promise<void> {
    this.documents = [];
    await this.addDocuments(docs);
  }

  /**
   * Search for similar documents using semantic search
   */
  async search(query: string, topK: number = 5): Promise<Document[]> {
    if (!this.isInitialized || this.documents.length === 0) {
      throw new Error('Vector store not initialized or empty');
    }

    // Generate embedding for the query
    const queryEmbedding = await embeddingService.generateEmbedding(query);

    // Find similar documents
    const itemsWithEmbeddings = this.documents
      .filter((doc) => doc.embedding)
      .map((doc) => ({
        embedding: doc.embedding!,
        item: doc,
      }));

    const results = findTopKSimilar(queryEmbedding, itemsWithEmbeddings, topK, 'cosine');

    // Return documents with similarity scores attached
    return results.map((result) => ({
      ...result.item,
      similarity: result.similarity,
    }));
  }

  /**
   * Get all documents in the store
   */
  getAllDocuments(): Document[] {
    return this.documents;
  }

  /**
   * Get a specific document by ID
   */
  getDocument(id: string): Document | undefined {
    return this.documents.find((doc) => doc.id === id);
  }

  /**
   * Remove a document from the store
   */
  removeDocument(id: string): void {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }

  /**
   * Clear all documents from the store
   */
  clear(): void {
    this.documents = [];
    this.isInitialized = false;
  }

  /**
   * Check if the store is initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.documents.length > 0;
  }

  /**
   * Get the number of documents in the store
   */
  size(): number {
    return this.documents.length;
  }
}

// Export singleton instance
export const vectorStore = new VectorStore();
