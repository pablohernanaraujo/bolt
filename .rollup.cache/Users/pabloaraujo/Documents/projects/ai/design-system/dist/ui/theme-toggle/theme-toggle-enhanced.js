'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun, Monitor } from '@/icons';
import { useThemeHydrated, useThemeOptional, } from '@/ui/theme-provider';
import { Button } from '@/ui/button';
import { IconButton } from '@/ui/icon-button';
import { buildThemeToggleClassName } from './helpers';
export const ThemeToggleEnhanced = ({ variant = 'secondary', size = 'medium', showLabel = false, showSystemOption = false, showLoadingState = true, loadingText = 'Loading theme...', className, ...props }) => {
    const themeContext = useThemeOptional();
    const isHydrated = useThemeHydrated();
    if (!themeContext) {
        return (_jsx(IconButton, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), "aria-label": "Theme toggle (not connected)", title: "Theme toggle requires ThemeProvider", disabled: true, ...props, children: _jsx(Sun, {}) }));
    }
    const { theme, toggleTheme, followSystemTheme, setFollowSystemTheme } = themeContext;
    if (!isHydrated && showLoadingState) {
        return showLabel ? (_jsxs(Button, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), disabled: true, ...props, children: [_jsx(Sun, {}), loadingText] })) : (_jsx(IconButton, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), "aria-label": loadingText, disabled: true, ...props, children: _jsx(Sun, {}) }));
    }
    const getIcon = () => {
        if (followSystemTheme) {
            return _jsx(Monitor, {});
        }
        return theme === 'dark' ? _jsx(Moon, {}) : _jsx(Sun, {});
    };
    const getLabel = () => {
        if (followSystemTheme) {
            return 'Using system theme';
        }
        return theme === 'dark' ? 'Switch to light' : 'Switch to dark';
    };
    const handleClick = () => {
        if (showSystemOption && followSystemTheme) {
            setFollowSystemTheme(false);
            toggleTheme();
        }
        else if (showSystemOption && theme === 'light') {
            setFollowSystemTheme(true);
        }
        else {
            toggleTheme();
        }
    };
    const getAriaDescription = () => {
        if (showSystemOption) {
            if (followSystemTheme) {
                return 'Currently following system theme. Click to use light theme.';
            }
            if (theme === 'light') {
                return 'Currently using light theme. Click to follow system theme.';
            }
            return 'Currently using dark theme. Click to use light theme.';
        }
        return `Currently using ${theme} theme. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} theme.`;
    };
    return showLabel ? (_jsxs(Button, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), onClick: handleClick, "aria-label": getLabel(), "aria-describedby": "theme-toggle-description", title: getAriaDescription(), ...props, children: [getIcon(), followSystemTheme ? 'System' : theme === 'dark' ? 'Dark' : 'Light', _jsx("span", { id: "theme-toggle-description", className: "sr-only", children: getAriaDescription() })] })) : (_jsxs(IconButton, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), onClick: handleClick, "aria-label": getLabel(), "aria-describedby": "theme-toggle-description", title: getAriaDescription(), ...props, children: [getIcon(), _jsx("span", { id: "theme-toggle-description", className: "sr-only", children: getAriaDescription() })] }));
};
export function useThemeToggleState() {
    const themeContext = useThemeOptional();
    const isHydrated = useThemeHydrated();
    return {
        theme: themeContext?.theme ?? 'light',
        toggleTheme: themeContext?.toggleTheme ?? (() => { }),
        followSystemTheme: themeContext?.followSystemTheme ?? false,
        setFollowSystemTheme: themeContext?.setFollowSystemTheme ?? (() => { }),
        isHydrated,
        isConnected: !!themeContext,
    };
}
