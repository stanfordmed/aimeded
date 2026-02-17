import { create } from 'zustand';
import type { Model, InferenceResponse, InferenceParameters } from '../types/models';
import { AVAILABLE_MODELS, DEFAULT_INFERENCE_PARAMETERS } from '../types/models';
import type { AnimationState } from '../types/visualization';

interface AppState {
  // Model selection
  selectedModel: Model;
  availableModels: Model[];

  // Inference
  currentPrompt: string;
  currentResponse: InferenceResponse | null;
  isGenerating: boolean;
  error: string | null;
  inferenceParameters: InferenceParameters;

  // Animation
  animationState: AnimationState;

  // Comparison mode
  isComparisonMode: boolean;
  comparisonResponses: Map<string, InferenceResponse>;

  // Actions
  setSelectedModel: (model: Model) => void;
  setCurrentPrompt: (prompt: string) => void;
  setCurrentResponse: (response: InferenceResponse | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setError: (error: string | null) => void;
  setInferenceParameters: (params: Partial<InferenceParameters>) => void;
  resetInferenceParameters: () => void;

  // Animation actions
  setAnimationState: (state: Partial<AnimationState>) => void;
  playAnimation: () => void;
  pauseAnimation: () => void;
  resetAnimation: () => void;

  // Comparison actions
  toggleComparisonMode: () => void;
  setComparisonResponse: (modelId: string, response: InferenceResponse) => void;
  clearComparisonResponses: () => void;

  // Utility actions
  reset: () => void;
}

const initialAnimationState: AnimationState = {
  isPlaying: false,
  isPaused: false,
  currentPhase: 0,
  totalPhases: 4,
  speed: 1.0,
  elapsed: 0,
};

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  selectedModel: AVAILABLE_MODELS[0], // Foundation model by default
  availableModels: AVAILABLE_MODELS,
  currentPrompt: '',
  currentResponse: null,
  isGenerating: false,
  error: null,
  inferenceParameters: DEFAULT_INFERENCE_PARAMETERS,
  animationState: initialAnimationState,
  isComparisonMode: false,
  comparisonResponses: new Map(),

  // Model selection
  setSelectedModel: (model) => set({ selectedModel: model, error: null }),

  // Inference
  setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
  setCurrentResponse: (response) => set({ currentResponse: response }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setError: (error) => set({ error }),
  setInferenceParameters: (params) =>
    set((state) => ({
      inferenceParameters: { ...state.inferenceParameters, ...params },
    })),
  resetInferenceParameters: () => set({ inferenceParameters: DEFAULT_INFERENCE_PARAMETERS }),

  // Animation
  setAnimationState: (newState) =>
    set((state) => ({
      animationState: { ...state.animationState, ...newState },
    })),
  playAnimation: () =>
    set((state) => ({
      animationState: { ...state.animationState, isPlaying: true, isPaused: false },
    })),
  pauseAnimation: () =>
    set((state) => ({
      animationState: { ...state.animationState, isPlaying: false, isPaused: true },
    })),
  resetAnimation: () =>
    set({
      animationState: { ...initialAnimationState },
    }),

  // Comparison mode
  toggleComparisonMode: () =>
    set((state) => ({
      isComparisonMode: !state.isComparisonMode,
    })),
  setComparisonResponse: (modelId, response) =>
    set((state) => {
      const newMap = new Map(state.comparisonResponses);
      newMap.set(modelId, response);
      return { comparisonResponses: newMap };
    }),
  clearComparisonResponses: () => set({ comparisonResponses: new Map() }),

  // Utility
  reset: () =>
    set({
      currentPrompt: '',
      currentResponse: null,
      isGenerating: false,
      error: null,
      animationState: initialAnimationState,
      comparisonResponses: new Map(),
    }),
}));
