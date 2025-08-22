// /src/ui/theme-provider/index.ts
// Export all theme provider related components and utilities
// Provides barrel exports for easy consumption
// RELEVANT FILES: theme-provider.tsx, theme-script.tsx, types.ts

export {
  ThemeProvider,
  useCurrentTheme,
  useTheme,
  useThemeHydrated,
  useThemeOptional,
} from './theme-provider';
export { ThemeProviderServer } from './theme-provider-server';
export {
  generateThemeScript,
  getThemeScriptForAppRouter,
  ThemeScript,
} from './theme-script';
export type {
  ThemeContextValue,
  ThemeProviderProps,
  ThemeScriptProps,
} from './types';