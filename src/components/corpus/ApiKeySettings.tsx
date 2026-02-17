import React, { useState } from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { testApiKey, initializeOpenAI } from '../../services/api/openai';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ApiKeySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ open, onOpenChange }) => {
  const { apiKey, setApiKey } = useSettingsStore();
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = async () => {
    if (!inputKey.trim()) {
      setTestResult('error');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const isValid = await testApiKey(inputKey.trim());
    setTestResult(isValid ? 'success' : 'error');
    setIsTesting(false);
  };

  const handleSave = () => {
    const trimmedKey = inputKey.trim();
    if (!trimmedKey) return;

    setApiKey(trimmedKey);
    initializeOpenAI(trimmedKey);
    onOpenChange(false);
  };

  const handleClear = () => {
    setInputKey('');
    setApiKey('');
    setTestResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to use LLM models. Your key is stored locally in your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="sk-..."
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setTestResult(null);
              }}
            />
          </div>

          {testResult === 'success' && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
              ✓ API key is valid
            </div>
          )}

          {testResult === 'error' && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              ✗ Invalid API key. Please check and try again.
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleTest} disabled={isTesting || !inputKey.trim()} variant="outline">
              {isTesting ? 'Testing...' : 'Test Key'}
            </Button>
            <Button onClick={handleSave} disabled={!inputKey.trim()}>
              Save
            </Button>
            {apiKey && (
              <Button onClick={handleClear} variant="destructive">
                Clear
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            <p>💡 Don't have an API key?</p>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get one from OpenAI →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
