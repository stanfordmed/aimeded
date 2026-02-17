import React from 'react';
import { useAppStore } from '../../stores/appStore';
import type { Model } from '../../types/models';
import { Card } from '../ui/card';

export const ModelSelector: React.FC = () => {
  const { selectedModel, availableModels, setSelectedModel } = useAppStore();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Select Model Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {availableModels.map((model) => (
          <Card
            key={model.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedModel.id === model.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-accent'
            }`}
            onClick={() => setSelectedModel(model)}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{model.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{model.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {model.description}
                </p>
                <div
                  className="mt-2 h-1 w-full rounded-full"
                  style={{ backgroundColor: model.color, opacity: 0.3 }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
