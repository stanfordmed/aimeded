import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { ModelSelector } from './components/interaction/ModelSelector';
import { PromptInput } from './components/interaction/PromptInput';
import { ResponseDisplay } from './components/interaction/ResponseDisplay';
import { SimplePipelineViz } from './components/visualization/SimplePipelineViz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { useCorpusStore } from './stores/corpusStore';

function App() {
  const [showApiSettings, setShowApiSettings] = useState(false);
  const { corpus } = useCorpusStore();

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle>Welcome to LLM Training Visualization</CardTitle>
            <CardDescription className="text-base">
              Explore how different LLM architectures process medical information:
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong>Foundation Model</strong>: Standard GPT-4 with general knowledge</li>
                <li><strong>Fine-tuned Model</strong>: Specialized medical AI (simulated)</li>
                <li><strong>RAG Model</strong>: Retrieval-Augmented Generation with medical corpus</li>
              </ul>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Model Selection */}
        <ModelSelector />

        {/* Pipeline Visualization */}
        <SimplePipelineViz />

        {/* Corpus Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medical Corpus</CardTitle>
            <CardDescription>
              {corpus.statistics.totalDocuments} documents • {corpus.statistics.totalWordCount.toLocaleString()} words •{' '}
              {corpus.statistics.categories.medical} medical documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Medical Docs</p>
                <p className="text-2xl font-semibold text-blue-600">{corpus.statistics.categories.medical}</p>
              </div>
              <div>
                <p className="text-muted-foreground">General Docs</p>
                <p className="text-2xl font-semibold text-gray-600">{corpus.statistics.categories.general}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Tokens</p>
                <p className="text-2xl font-semibold text-purple-600">{corpus.statistics.totalTokens.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Length</p>
                <p className="text-2xl font-semibold text-green-600">{Math.round(corpus.statistics.avgDocumentLength)} words</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Input */}
        <PromptInput onApiKeySettingsOpen={() => setShowApiSettings(true)} />

        {/* Response Display */}
        <ResponseDisplay />
      </div>
    </AppShell>
  );
}

export default App;
