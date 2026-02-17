import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCorpusStore } from '../stores/corpusStore';
import { vectorStore } from '../services/rag/vectorStore';
import type { Document } from '../types/models';

/**
 * Hook for managing corpus and vector store synchronization
 */
export const useCorpusManagement = () => {
  const corpusState = useCorpusStore();

  // Initialize vector store with current corpus
  const initializeVectorStore = useMutation({
    mutationFn: async () => {
      corpusState.setEmbeddingStatus(true);
      await vectorStore.updateCorpus(corpusState.corpus.documents);
      corpusState.setEmbeddingStatus(false);
    },
    onError: (error) => {
      console.error('Error initializing vector store:', error);
      corpusState.setEmbeddingStatus(false);
    },
  });

  // Add document to corpus and update vector store
  const addDocument = useCallback(
    async (document: Document) => {
      corpusState.addDocument(document);

      // Update vector store
      const updatedCorpus = useCorpusStore.getState().corpus.documents;
      await vectorStore.updateCorpus(updatedCorpus);
    },
    [corpusState]
  );

  // Remove document from corpus and update vector store
  const removeDocument = useCallback(
    async (documentId: string) => {
      corpusState.removeDocument(documentId);

      // Update vector store
      const updatedCorpus = useCorpusStore.getState().corpus.documents;
      if (updatedCorpus.length > 0) {
        await vectorStore.updateCorpus(updatedCorpus);
      } else {
        vectorStore.clear();
      }
    },
    [corpusState]
  );

  // Rebuild vector store (useful after bulk changes)
  const rebuildVectorStore = useMutation({
    mutationFn: async () => {
      corpusState.setEmbeddingStatus(true);
      await vectorStore.updateCorpus(corpusState.corpus.documents);
      corpusState.setEmbeddingStatus(false);
    },
    onError: (error) => {
      console.error('Error rebuilding vector store:', error);
      corpusState.setEmbeddingStatus(false);
    },
  });

  return {
    corpus: corpusState.corpus,
    availableDocuments: corpusState.availableDocuments,
    isEmbedding: corpusState.isEmbeddingCorpus,
    addDocument,
    removeDocument,
    initializeVectorStore: initializeVectorStore.mutate,
    rebuildVectorStore: rebuildVectorStore.mutate,
    isInitializing: initializeVectorStore.isPending,
    isRebuilding: rebuildVectorStore.isPending,
  };
};
