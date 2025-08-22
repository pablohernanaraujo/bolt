import { jsx, jsxs } from 'react/jsx-runtime';
import { useThemeOptional, useThemeHydrated } from '../theme-provider/theme-provider.js';
import { ButtonServer } from '../button/button-server.js';
import './../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../assets/src/ui/button/button.css.ts.vanilla-CdKkMGyE.css';
import './../../assets/src/ui/icon-button/icon-button.css.ts.vanilla-Ptz2p2WZ.css';
import { IconButton } from '../icon-button/icon-button.js';
import { buildThemeToggleClassName } from './helpers.js';
import { Sun, Monitor, Moon } from 'lucide-react';

const ThemeToggleEnhanced = ({ variant = 'secondary', size = 'medium', showLabel = false, showSystemOption = false, showLoadingState = true, loadingText = 'Loading theme...', className, ...props }) => {
    const themeContext = useThemeOptional();
    const isHydrated = useThemeHydrated();
    if (!themeContext) {
        return (jsx(IconButton, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), "aria-label": "Theme toggle (not connected)", title: "Theme toggle requires ThemeProvider", disabled: true, ...props, children: jsx(Sun, {}) }));
    }
    const { theme, toggleTheme, followSystemTheme, setFollowSystemTheme } = themeContext;
    if (!isHydrated && showLoadingState) {
        return showLabel ? (jsxs(ButtonServer, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), disabled: true, ...props, children: [jsx(Sun, {}), loadingText] })) : (jsx(IconButton, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), "aria-label": loadingText, disabled: true, ...props, children: jsx(Sun, {}) }));
    }
    const getIcon = () => {
        if (followSystemTheme) {
            return jsx(Monitor, {});
        }
        return theme === 'dark' ? jsx(Moon, {}) : jsx(Sun, {});
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
    return showLabel ? (jsxs(ButtonServer, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), onClick: handleClick, "aria-label": getLabel(), "aria-describedby": "theme-toggle-description", title: getAriaDescription(), ...props, children: [getIcon(), followSystemTheme ? 'System' : theme === 'dark' ? 'Dark' : 'Light', jsx("span", { id: "theme-toggle-description", className: "sr-only", children: getAriaDescription() })] })) : (jsxs(IconButton, { variant: variant, size: size, className: buildThemeToggleClassName({ variant, size, className }), onClick: handleClick, "aria-label": getLabel(), "aria-describedby": "theme-toggle-description", title: getAriaDescription(), ...props, children: [getIcon(), jsx("span", { id: "theme-toggle-description", className: "sr-only", children: getAriaDescription() })] }));
};
function useThemeToggleState() {
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

export { ThemeToggleEnhanced, useThemeToggleState };
//# sourceMappingURL=theme-toggle-enhanced.js.map
