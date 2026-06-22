/**
 * Global Type Definitions for the Portfolio Application
 * Ensures type safety across the entire application
 */

import type { CSSProperties } from "react";
import type * as THREE from "three";

export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Viewport extends Size {
  aspectRatio: number;
}

export interface AnimationState {
  isPlaying: boolean;
  progress: number;
}

export interface LoadingState {
  isLoading: boolean;
  progress: number;
  error?: string | null;
}

export interface ScrollState {
  direction: "up" | "down";
  velocity: number;
  position: number;
}

export interface ThemeColors {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success?: string;
  warning?: string;
  error?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  link?: string;
  github?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "expert";
  category?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: {
    start: string;
    end: string | "present";
  };
  description: string;
  highlights?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
  category?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Generic API Response Type
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

/**
 * Generic Paginated Response Type
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Three.js specific types
 */
export interface ThreeScene {
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  scene: THREE.Scene | null;
}

/**
 * Component Props Base Types
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
  "data-testid"?: string;
}

export interface WithLoadingProps {
  isLoading?: boolean;
  loadingMessage?: string;
}

export interface WithErrorProps {
  error?: Error | null;
  onError?: (error: Error) => void;
}
