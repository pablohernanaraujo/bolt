import { type ReactNode } from 'react';
import { type ThemeVariant } from '@/tokens/themes';
export interface ThemeContextValue {
    theme: ThemeVariant;
    setTheme: (theme: ThemeVariant) => void;
    toggleTheme: () => void;
    isHydrated: boolean;
    followSystemTheme: boolean;
    setFollowSystemTheme: (follow: boolean) => void;
}
export interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeVariant;
    followSystemTheme?: boolean;
    storageKey?: string;
    disableTransitions?: boolean;
}
export interface ThemeScriptProps {
    storageKey?: string;
    defaultTheme?: ThemeVariant;
    respectSystemTheme?: boolean;
}
//# sourceMappingURL=types.d.ts.map