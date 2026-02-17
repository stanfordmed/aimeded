import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ModelType } from '../../types/models';

export const ResponseDisplay: React.FC = () => {
  const { currentResponse, selectedModel } = useAppStore();

  if (!currentResponse) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <p className="text-lg mb-2">No response yet</p>
            <p className="text-sm">Enter a prompt and click Generate to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { text, retrievedDocs, metadata } = currentResponse;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Response from {selectedModel.name}</CardTitle>
          <CardDescription>
            {metadata.latency}ms • {metadata.tokenCount} tokens • $
            {metadata.estimatedCost.toFixed(4)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        </CardContent>
      </Card>

      {selectedModel.type === ModelType.RAG && retrievedDocs && retrievedDocs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Retrieved Documents</CardTitle>
            <CardDescription>
              Documents used to answer your question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {retrievedDocs.map((doc, index) => (
                <div
                  key={doc.id}
                  className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {index + 1}. {doc.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {doc.content.substring(0, 200)}...
                      </p>
                    </div>
                    {doc.similarity && (
                      <div className="text-xs font-medium text-primary">
                        {(doc.similarity * 100).toFixed(0)}% match
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
