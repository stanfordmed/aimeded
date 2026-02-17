import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useModelInference } from '../../hooks/useModelInference';
import { useCorpusStore } from '../../stores/corpusStore';
import { initializeOpenAI, isOpenAIInitialized } from '../../services/api/openai';
import { vectorStore } from '../../services/rag/vectorStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { EXAMPLE_PROMPTS } from '../../data/sampleCorpus';

interface PromptInputProps {
  onApiKeySettingsOpen: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onApiKeySettingsOpen }) => {
  const { selectedModel, currentPrompt, setCurrentPrompt, setCurrentResponse, inferenceParameters } = useAppStore();
  const { apiKey } = useSettingsStore();
  const { corpus } = useCorpusStore();
  const [localPrompt, setLocalPrompt] = useState(currentPrompt);

  const inference = useModelInference();

  const handleGenerate = async () => {
    if (!localPrompt.trim()) return;

    // Check if API key is set
    if (!apiKey) {
      alert('Please set your OpenAI API key first');
      onApiKeySettingsOpen();
      return;
    }

    // Initialize OpenAI if not already initialized
    if (!isOpenAIInitialized()) {
      initializeOpenAI(apiKey);
    }

    // Initialize vector store if using RAG model
    if (selectedModel.type === 'rag' && !vectorStore.isReady()) {
      try {
        await vectorStore.updateCorpus(corpus.documents);
      } catch (error) {
        console.error('Error initializing vector store:', error);
        alert('Error initializing RAG model. Please check your API key.');
        return;
      }
    }

    setCurrentPrompt(localPrompt);

    // Perform inference
    inference.mutate(
      {
        prompt: localPrompt,
        model: selectedModel,
        parameters: inferenceParameters,
      },
      {
        onSuccess: (response) => {
          setCurrentResponse(response);
        },
        onError: (error: Error) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  };

  const handleExampleClick = (example: string) => {
    setLocalPrompt(example);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ask a Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your medical question..."
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleGenerate} disabled={inference.isPending || !localPrompt.trim()}>
            {inference.isPending ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Example prompts:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.slice(0, 5).map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
