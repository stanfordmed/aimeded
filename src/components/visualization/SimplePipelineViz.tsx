import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../stores/appStore';
import { useCorpusStore } from '../../stores/corpusStore';
import { ModelType } from '../../types/models';
import { Card } from '../ui/card';

export const SimplePipelineViz: React.FC = () => {
  const { selectedModel, currentResponse, isGenerating } = useAppStore();
  const { corpus } = useCorpusStore();
  const [activeStage, setActiveStage] = useState<number>(-1);

  // Simulate animation stages when generating
  useEffect(() => {
    if (isGenerating) {
      setActiveStage(0); // Corpus
      setTimeout(() => setActiveStage(1), 800); // Embeddings
      if (selectedModel.type === ModelType.RAG) {
        setTimeout(() => setActiveStage(2), 1600); // Retrieval
        setTimeout(() => setActiveStage(3), 2400); // Generation
      } else {
        setTimeout(() => setActiveStage(2), 1600); // Generation (no retrieval)
      }
    } else if (currentResponse) {
      // Show final state
      setActiveStage(selectedModel.type === ModelType.RAG ? 3 : 2);
    } else {
      setActiveStage(-1);
    }
  }, [isGenerating, currentResponse, selectedModel.type]);

  const stages = selectedModel.type === ModelType.RAG
    ? [
        { id: 0, label: 'Corpus', icon: '📚', description: `${corpus.documents.length} documents` },
        { id: 1, label: 'Embeddings', icon: '🔢', description: 'Vector representation' },
        { id: 2, label: 'Retrieval', icon: '🔍', description: 'Find relevant docs' },
        { id: 3, label: 'Generate', icon: '✨', description: 'Create response' },
      ]
    : [
        { id: 0, label: 'Input', icon: '💭', description: 'Your question' },
        { id: 1, label: 'Processing', icon: '⚙️', description: 'Model inference' },
        { id: 2, label: 'Response', icon: '💬', description: 'AI answer' },
      ];

  const retrievedDocs = currentResponse?.retrievedDocs || [];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {selectedModel.icon} {selectedModel.name} Pipeline
      </h3>

      {/* Pipeline Flow */}
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              {/* Stage Node */}
              <motion.div
                className={`flex-1 relative ${
                  activeStage >= stage.id
                    ? 'ring-2 ring-primary'
                    : 'ring-1 ring-gray-300'
                }`}
                style={{ borderRadius: '12px', backgroundColor: selectedModel.color + '10' }}
                animate={
                  activeStage === stage.id
                    ? {
                        boxShadow: [
                          `0 0 0 0 ${selectedModel.color}40`,
                          `0 0 0 10px ${selectedModel.color}00`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1, repeat: activeStage === stage.id ? Infinity : 0 }}
              >
                <div className="p-4 text-center">
                  <div className="text-3xl mb-2">{stage.icon}</div>
                  <div className="font-semibold text-sm">{stage.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stage.description}
                  </div>
                </div>

                {/* Progress indicator */}
                {activeStage === stage.id && isGenerating && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.div>

              {/* Arrow between stages */}
              {index < stages.length - 1 && (
                <div className="flex items-center">
                  <motion.svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    className="overflow-visible"
                  >
                    <motion.path
                      d="M 0 10 L 30 10"
                      stroke={activeStage > stage.id ? selectedModel.color : '#d1d5db'}
                      strokeWidth="2"
                      fill="none"
                    />
                    <motion.polygon
                      points="30,5 30,15 40,10"
                      fill={activeStage > stage.id ? selectedModel.color : '#d1d5db'}
                    />

                    {/* Animated particle */}
                    {activeStage === stage.id && isGenerating && (
                      <motion.circle
                        r="4"
                        fill={selectedModel.color}
                        initial={{ cx: 0, cy: 10 }}
                        animate={{ cx: 40, cy: 10 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Retrieved Documents Visualization (RAG only) */}
      {selectedModel.type === ModelType.RAG && retrievedDocs.length > 0 && (
        <motion.div
          className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <span>🔍</span>
            Retrieved Documents
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {retrievedDocs.map((doc, index) => (
              <motion.div
                key={doc.id}
                className="p-3 bg-white rounded border border-purple-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{doc.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {doc.content.substring(0, 60)}...
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-xs font-semibold text-purple-600">
                      {((doc.similarity || 0) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Relevance bar */}
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${(doc.similarity || 0) * 100}%` }}
                    transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Status Message */}
      {isGenerating && (
        <div className="mt-4 text-center">
          <motion.div
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            Processing your request...
          </motion.div>
        </div>
      )}
    </Card>
  );
};
