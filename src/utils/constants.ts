/**
 * Application Constants and Configuration
 * Centralized configuration for the entire application
 */

/**
 * Animation Timing Constants (in milliseconds)
 */
export const ANIMATION_TIMING = {
  FAST: 150,
  BASE: 250,
  SLOW: 350,
  SCROLL_SMOOTH: 1700,
} as const;

/**
 * Breakpoints for Responsive Design (in pixels)
 */
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1200,
  ULTRA_WIDE: 1920,
} as const;

/**
 * Color Palette
 */
export const COLORS = {
  PRIMARY: "#5eead4",
  PRIMARY_DARK: "#0d9488",
  SECONDARY: "#8b5cf6",
  ACCENT: "#ec4899",
  BACKGROUND: "#0a0e17",
  BACKGROUND_DARK: "#050810",
  SURFACE: "#1a1f2e",
  SURFACE_LIGHT: "#2d3244",
  TEXT_PRIMARY: "#eae5ec",
  TEXT_SECONDARY: "#b4b0bc",
  TEXT_TERTIARY: "#7f7b89",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#3b82f6",
} as const;

/**
 * Z-Index Stack
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL: 1040,
  POPOVER: 1050,
  TOOLTIP: 1070,
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env["VITE_API_URL"] || "https://api.example.com",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  THEME: "app:theme",
  USER_PREFERENCES: "app:preferences",
  SCROLL_POSITION: "app:scroll",
  ANIMATION_SETTINGS: "app:animations",
} as const;

/**
 * Environment Variables
 */
export const ENV = {
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
} as const;

/**
 * Features Configuration
 */
export const FEATURES = {
  ENABLE_ANIMATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_ERROR_REPORTING: true,
  DEBUG_MODE: ENV.IS_DEV,
} as const;

/**
 * Social Media Links
 */
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/yourusername",
  LINKEDIN: "https://linkedin.com/in/yourusername",
  TWITTER: "https://twitter.com/yourusername",
  EMAIL: "your.email@example.com",
} as const;

/**
 * Portfolio Content
 */
export const PORTFOLIO_CONTENT = {
  NAME: "Dilip Kumar Yadav",
  TITLE: "Full-Stack Developer & AI Builder",
  BIO: "Innovative full-stack developer specializing in Angular, Node.js, Cloud Technologies, and AI solutions. Building the future with modern web technologies.",
  LOCATION: "India",
} as const;

/**
 * Section IDs
 */
export const SECTION_IDS = {
  HOME: "home",
  ABOUT: "about",
  CAREER: "career",
  WORK: "work",
  SKILLS: "skills",
  ACHIEVEMENTS: "achievements",
  IMPACT: "impact",
  CONTACT: "contact",
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please try again.",
  LOADING_ERROR: "Failed to load content. Please refresh the page.",
  VALIDATION_ERROR: "Please check the form and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: "Your message has been sent successfully!",
  COPIED_TO_CLIPBOARD: "Copied to clipboard!",
} as const;

export default {
  ANIMATION_TIMING,
  BREAKPOINTS,
  COLORS,
  Z_INDEX,
  API_CONFIG,
  STORAGE_KEYS,
  ENV,
  FEATURES,
  SOCIAL_LINKS,
  PORTFOLIO_CONTENT,
  SECTION_IDS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
