// /src/tokens/themes/index.ts
// Theme exports and theme-related utilities
// Central place for all theme definitions
// RELEVANT FILES: light.css.ts, dark.css.ts, ../contracts.css.ts

import { darkTheme } from './dark.css';
import { lightTheme } from './light.css';

// Re-export themes
export { darkTheme, lightTheme };

// Re-export theme type for TypeScript usage
export type ThemeVariant = 'light' | 'dark';

// Theme class mapping for easy switching
export const themeClasses = {
  light: lightTheme,
  dark: darkTheme,
} as const;
