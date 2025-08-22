import { type FC, type ReactNode } from 'react';
import { type ThemeVariant } from '@/tokens/themes';
interface ThemeContextValue {
    theme: ThemeVariant;
    setTheme: (theme: ThemeVariant) => void;
    toggleTheme: () => void;
    isHydrated: boolean;
    followSystemTheme: boolean;
    setFollowSystemTheme: (follow: boolean) => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeVariant;
    followSystemTheme?: boolean;
    storageKey?: string;
    disableTransitions?: boolean;
}
export declare function useTheme(): ThemeContextValue;
export declare const ThemeProvider: FC<ThemeProviderProps>;
export declare function useThemeOptional(): ThemeContextValue | undefined;
export declare function useCurrentTheme(): ThemeVariant;
export declare function useThemeHydrated(): boolean;
export {};
//# sourceMappingURL=theme-provider.d.ts.map