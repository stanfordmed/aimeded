import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ApiKeySettings } from '../corpus/ApiKeySettings';
import { useSettingsStore } from '../../stores/settingsStore';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [showApiSettings, setShowApiSettings] = useState(false);
  const { apiKey } = useSettingsStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LLM Training Visualization
              </h1>
              <p className="text-sm text-muted-foreground">
                Interactive demonstration for medical students
              </p>
            </div>
            <Button
              onClick={() => setShowApiSettings(true)}
              variant={apiKey ? 'outline' : 'default'}
            >
              {apiKey ? '🔑 API Key Set' : '⚙️ Set API Key'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Educational tool for understanding LLM architectures • Built with React + TypeScript
          </p>
        </div>
      </footer>

      {/* API Settings Dialog */}
      <ApiKeySettings open={showApiSettings} onOpenChange={setShowApiSettings} />
    </div>
  );
};
