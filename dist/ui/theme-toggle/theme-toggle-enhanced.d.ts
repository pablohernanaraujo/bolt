import { type FC } from 'react';
import { type ThemeToggleProps } from './types';
interface EnhancedThemeToggleProps extends Omit<ThemeToggleProps, 'initialTheme'> {
    showSystemOption?: boolean;
    showLoadingState?: boolean;
    loadingText?: string;
}
export declare const ThemeToggleEnhanced: FC<EnhancedThemeToggleProps>;
export declare function useThemeToggleState(): {
    theme: import("../../tokens").ThemeVariant;
    toggleTheme: () => void;
    followSystemTheme: boolean;
    setFollowSystemTheme: (follow: boolean) => void;
    isHydrated: boolean;
    isConnected: boolean;
};
export {};
//# sourceMappingURL=theme-toggle-enhanced.d.ts.map