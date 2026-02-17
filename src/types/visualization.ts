import type { Node, Edge } from 'reactflow';
import type { Document } from './models';

export type PipelineNodeType = 'corpus' | 'embedding' | 'prompt' | 'retrieval' | 'response';

export interface PipelineNodeData {
  label: string;
  content: any;
  isActive: boolean;
  processingProgress: number; // 0-100 for animations
  metadata?: Record<string, any>;
  documents?: Document[]; // For corpus and retrieval nodes
  embedding?: number[]; // For embedding visualization
  response?: string; // For response node
}

export interface PipelineNode extends Node {
  type: PipelineNodeType;
  data: PipelineNodeData;
}

export interface AnimatedEdgeData {
  particles: Particle[];
  isAnimating: boolean;
  animationSpeed: number;
  label?: string;
}

export interface AnimatedEdge extends Edge {
  data?: AnimatedEdgeData;
  animated?: boolean;
}

export interface Particle {
  id: string;
  position: number; // 0-1 along the edge
  speed: number;
  size: number;
  color: string;
}

export interface AnimationPhase {
  stage: PipelineNodeType | 'tokenization' | 'generation';
  nodeId: string;
  duration: number;
  effect: 'pulse' | 'glow' | 'particles' | 'progress';
  description: string;
}

export interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhase: number;
  totalPhases: number;
  speed: number; // 0.5 - 2.0
  elapsed: number;
}

export interface EmbeddingVisualization3D {
  points: EmbeddingPoint[];
  highlightedIds: string[];
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
}

export interface EmbeddingPoint {
  id: string;
  position: [number, number, number]; // 3D coordinates after t-SNE
  color: string;
  size: number;
  label: string;
  category: 'medical' | 'general' | 'prompt' | 'retrieved';
  document?: Document;
}
