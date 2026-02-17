/**
 * Calculate cosine similarity between two vectors
 */
export const cosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Calculate Euclidean distance between two vectors
 */
export const euclideanDistance = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  const sumSquaredDiff = a.reduce((sum, val, i) => {
    const diff = val - b[i];
    return sum + diff * diff;
  }, 0);

  return Math.sqrt(sumSquaredDiff);
};

/**
 * Find top K most similar vectors
 */
export interface SimilarityResult<T> {
  item: T;
  similarity: number;
  distance?: number;
}

export const findTopKSimilar = <T>(
  query: number[],
  items: Array<{ embedding: number[]; item: T }>,
  k: number = 5,
  metric: 'cosine' | 'euclidean' = 'cosine'
): SimilarityResult<T>[] => {
  const results = items.map(({ embedding, item }) => {
    if (metric === 'cosine') {
      const similarity = cosineSimilarity(query, embedding);
      return { item, similarity };
    } else {
      const distance = euclideanDistance(query, embedding);
      const similarity = 1 / (1 + distance); // Convert distance to similarity score
      return { item, similarity, distance };
    }
  });

  // Sort by similarity (descending)
  results.sort((a, b) => b.similarity - a.similarity);

  // Return top K
  return results.slice(0, k);
};

/**
 * Normalize a vector to unit length
 */
export const normalizeVector = (vector: number[]): number[] => {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (magnitude === 0) return vector;
  return vector.map((val) => val / magnitude);
};
