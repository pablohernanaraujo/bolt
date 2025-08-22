import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { initTheme, watchSystemTheme, getCurrentTheme, setTheme } from '../../theme/index.js';

const ThemeContext = createContext(undefined);
function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
const ThemeProvider = ({ children, defaultTheme, followSystemTheme: initialFollowSystemTheme = false, storageKey = 'theme-preference', disableTransitions = false, }) => {
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
    return (jsx(ThemeContext.Provider, { value: contextValue, children: children }));
};
function useThemeOptional() {
    return useContext(ThemeContext);
}
function useCurrentTheme() {
    const context = useTheme();
    return context.theme;
}
function useThemeHydrated() {
    const context = useThemeOptional();
    return context?.isHydrated ?? false;
}

export { ThemeProvider, useCurrentTheme, useTheme, useThemeHydrated, useThemeOptional };
//# sourceMappingURL=theme-provider.js.map
