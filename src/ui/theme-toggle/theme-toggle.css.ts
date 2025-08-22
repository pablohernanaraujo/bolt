// /src/ui/theme-toggle/theme-toggle.css.ts
// Styles for theme toggle component
// Provides minimal styling that inherits from button component
// RELEVANT FILES: theme-toggle.tsx, button.css.ts, tokens/themes.css.ts

import { style } from '@vanilla-extract/css';

/**
 * Theme toggle button styles
 * Minimal styles that rely on button component base styles
 */
export const themeToggle = style({
  // Inherit all styles from Button component
  // Add any theme-toggle specific styling here if needed in the future

  // Ensure consistent spacing for icon and text
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
});
