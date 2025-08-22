// /src/ui/theme-toggle/helpers.ts
// Helper functions for theme toggle component styling and behavior
// Provides className composition and utility functions
// RELEVANT FILES: theme-toggle.tsx, theme-toggle.css.ts, types.ts

import * as styles from './theme-toggle.css';

/**
 * Build className for theme toggle button
 * Combines base styles with optional custom className
 */
export const buildThemeToggleClassName = (className?: string): string => {
  const classNames = [styles.themeToggle];

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};
