import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  apiKey: string | null;
  showWelcome: boolean;
  animationSpeed: number; // 0.5 - 2.0
  showEmbeddingSpace: boolean;
  darkMode: boolean;

  // Actions
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  setShowWelcome: (show: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setShowEmbeddingSpace: (show: boolean) => void;
  toggleDarkMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKey: null,
      showWelcome: true,
      animationSpeed: 1.0,
      showEmbeddingSpace: false,
      darkMode: false,

      setApiKey: (key) => set({ apiKey: key }),
      clearApiKey: () => set({ apiKey: null }),
      setShowWelcome: (show) => set({ showWelcome: show }),
      setAnimationSpeed: (speed) => set({ animationSpeed: Math.max(0.5, Math.min(2.0, speed)) }),
      setShowEmbeddingSpace: (show) => set({ showEmbeddingSpace: show }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'llm-viz-settings',
    }
  )
);
