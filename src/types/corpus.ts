import type { Document } from './models';

export interface Corpus {
  id: string;
  name: string;
  documents: Document[];
  statistics: CorpusStatistics;
}

export interface CorpusStatistics {
  totalDocuments: number;
  totalTokens: number;
  totalWordCount: number;
  medicalDensity: number; // Percentage of medical terms
  avgDocumentLength: number;
  categories: {
    medical: number;
    general: number;
    userAdded: number;
  };
}

export interface DocumentUpload {
  file: File;
  category: 'medical' | 'general' | 'user-added';
}

// Re-export Document for convenience
export type { Document };
