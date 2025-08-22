'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from 'react';
import { getCurrentTheme, initTheme, setTheme, watchSystemTheme, } from '@/theme';
const ThemeContext = createContext(undefined);
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
export const ThemeProvider = ({ children, defaultTheme, followSystemTheme: initialFollowSystemTheme = false, storageKey = 'theme-preference', disableTransitions = false, }) => {
    const [theme, setThemeState] = useState(defaultTheme || 'light');
    const [isHydrated, setIsHydrated] = useState(false);
    const [followSystemTheme, setFollowSystemTheme] = useState(initialFollowSystemTheme);
    const handleSetTheme = (newTheme) => {
        setThemeState(newTheme);
        setTheme(newTheme);
        if (disableTransitions && typeof document !== 'undefined') {
            const css = document.createElement('style');
            css.type = 'text/css';
            css.appendChild(document.createTextNode(`* { transition: none !important; animation: none !important; }`));
            document.head.appendChild(css);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.head.removeChild(css);
                });
            });
        }
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                window.localStorage.setItem(storageKey, newTheme);
            }
            catch (error) {
                console.warn('Failed to save theme preference:', error);
            }
        }
    };
    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        handleSetTheme(newTheme);
    };
    const handleSetFollowSystemTheme = (follow) => {
        setFollowSystemTheme(follow);
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                window.localStorage.setItem(`${storageKey}-follow-system`, follow.toString());
            }
            catch (error) {
                console.warn('Failed to save system theme preference:', error);
            }
        }
        if (follow) {
            const systemTheme = getCurrentTheme();
            handleSetTheme(systemTheme);
        }
    };
    useEffect(() => {
        const initializedTheme = initTheme();
        setThemeState(initializedTheme);
        try {
            const followSystemPreference = window.localStorage.getItem(`${storageKey}-follow-system`);
            if (followSystemPreference === 'true') {
                setFollowSystemTheme(true);
            }
        }
        catch {
        }
        setIsHydrated(true);
    }, [storageKey]);
    useEffect(() => {
        if (!followSystemTheme)
            return;
        const cleanup = watchSystemTheme((systemTheme) => {
            handleSetTheme(systemTheme);
        });
        return cleanup;
    }, [followSystemTheme]);
    const contextValue = {
        theme,
        setTheme: handleSetTheme,
        toggleTheme: handleToggleTheme,
        isHydrated,
        followSystemTheme,
        setFollowSystemTheme: handleSetFollowSystemTheme,
    };
    return (_jsx(ThemeContext.Provider, { value: contextValue, children: children }));
};
export function useThemeOptional() {
    return useContext(ThemeContext);
}
export function useCurrentTheme() {
    const context = useTheme();
    return context.theme;
}
export function useThemeHydrated() {
    const context = useThemeOptional();
    return context?.isHydrated ?? false;
}
