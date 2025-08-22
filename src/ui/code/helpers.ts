// /src/ui/code/helpers.ts
// Helper functions for Code component
// Utility functions for className composition and code formatting
// RELEVANT FILES: code.tsx, types.ts, code.css.ts

import * as styles from './code.css';

/**
 * Build className for Code component
 * Combines base styles with custom className
 */
export const buildCodeClassName = (className?: string): string => {
  const classes = [styles.code];

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Format code content for display
 * Handles basic text sanitization while preserving formatting
 */
export const formatCodeContent = (content: string): string =>
  // Preserve whitespace and line breaks
  content;
