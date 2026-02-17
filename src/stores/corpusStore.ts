import { create } from 'zustand';
import type { Document } from '../types/models';
import type { Corpus, CorpusStatistics } from '../types/corpus';
import { SAMPLE_MEDICAL_DOCUMENTS } from '../data/sampleCorpus';

interface CorpusState {
  corpus: Corpus;
  availableDocuments: Document[];
  isEmbeddingCorpus: boolean;

  // Actions
  addDocument: (document: Document) => void;
  removeDocument: (documentId: string) => void;
  updateDocument: (documentId: string, updates: Partial<Document>) => void;
  resetCorpus: () => void;
  calculateStatistics: () => CorpusStatistics;
  setEmbeddingStatus: (status: boolean) => void;
}

const calculateCorpusStatistics = (documents: Document[]): CorpusStatistics => {
  const totalDocuments = documents.length;
  const totalWordCount = documents.reduce((sum, doc) => sum + doc.metadata.wordCount, 0);
  const totalTokens = Math.ceil(totalWordCount * 1.3); // Rough estimate: 1 token ≈ 0.75 words

  const medicalDocs = documents.filter((d) => d.category === 'medical');
  const medicalTermsCount = medicalDocs.reduce(
    (sum, doc) => sum + (doc.metadata.medicalTerms?.length || 0),
    0
  );
  const medicalDensity = totalDocuments > 0 ? (medicalTermsCount / totalWordCount) * 100 : 0;

  const avgDocumentLength = totalDocuments > 0 ? totalWordCount / totalDocuments : 0;

  const categories = {
    medical: documents.filter((d) => d.category === 'medical').length,
    general: documents.filter((d) => d.category === 'general').length,
    userAdded: documents.filter((d) => d.category === 'user-added').length,
  };

  return {
    totalDocuments,
    totalTokens,
    totalWordCount,
    medicalDensity,
    avgDocumentLength,
    categories,
  };
};

// Initial corpus with medical documents
const initialDocuments = SAMPLE_MEDICAL_DOCUMENTS.filter((_, index) => index < 8); // Start with first 8

const initialCorpus: Corpus = {
  id: 'default-corpus',
  name: 'Medical Training Corpus',
  documents: initialDocuments,
  statistics: calculateCorpusStatistics(initialDocuments),
};

export const useCorpusStore = create<CorpusState>((set, get) => ({
  corpus: initialCorpus,
  availableDocuments: SAMPLE_MEDICAL_DOCUMENTS,
  isEmbeddingCorpus: false,

  addDocument: (document) =>
    set((state) => {
      const newDocuments = [...state.corpus.documents, document];
      return {
        corpus: {
          ...state.corpus,
          documents: newDocuments,
          statistics: calculateCorpusStatistics(newDocuments),
        },
      };
    }),

  removeDocument: (documentId) =>
    set((state) => {
      const newDocuments = state.corpus.documents.filter((doc) => doc.id !== documentId);
      return {
        corpus: {
          ...state.corpus,
          documents: newDocuments,
          statistics: calculateCorpusStatistics(newDocuments),
        },
      };
    }),

  updateDocument: (documentId, updates) =>
    set((state) => {
      const newDocuments = state.corpus.documents.map((doc) =>
        doc.id === documentId ? { ...doc, ...updates } : doc
      );
      return {
        corpus: {
          ...state.corpus,
          documents: newDocuments,
          statistics: calculateCorpusStatistics(newDocuments),
        },
      };
    }),

  resetCorpus: () =>
    set({
      corpus: initialCorpus,
    }),

  calculateStatistics: () => {
    const { corpus } = get();
    return calculateCorpusStatistics(corpus.documents);
  },

  setEmbeddingStatus: (status) => set({ isEmbeddingCorpus: status }),
}));
