import { jsxs, jsx } from 'react/jsx-runtime';
import { Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Icon } from '../../icons/index.js';
import { ButtonServer } from '../button/button-server.js';
import './../../assets/src/tokens/tokens.css.ts.vanilla-BxQdvkAx.css';
import './../../assets/src/ui/button/button.css.ts.vanilla-DKj1N9w3.css';
import { buildThemeToggleClassName } from './helpers.js';

const ThemeToggle = ({ initialTheme = 'light', showLabel = true, size = 'small', variant = 'secondary', className, ...props }) => {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        const documentTheme = document.documentElement.getAttribute('data-theme');
        if (documentTheme && documentTheme !== initialTheme) {
            setCurrentTheme(documentTheme);
        }
    }, [initialTheme]);
    const toggleTheme = () => {
        const currentDocTheme = document.documentElement.getAttribute('data-theme') ||
            currentTheme;
        const newTheme = currentDocTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        const { lightTheme, darkTheme } = require('@/tokens/themes');
        const oldThemeClass = currentDocTheme === 'light' ? lightTheme : darkTheme;
        const newThemeClass = newTheme === 'light' ? lightTheme : darkTheme;
        if (document.body.classList.contains(oldThemeClass)) {
            document.body.classList.remove(oldThemeClass);
        }
        document.body.classList.add(newThemeClass);
        document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: newTheme },
        }));
    };
    const buttonText = showLabel
        ? currentTheme === 'light'
            ? 'Tema Oscuro'
            : 'Tema Claro'
        : '';
    const themeToggleClassName = buildThemeToggleClassName(className);
    return (jsxs(ButtonServer, { variant: variant, size: size, onClick: toggleTheme, className: themeToggleClassName, "aria-label": `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`, suppressHydrationWarning: true, ...props, children: [jsx(Icon, { icon: Settings, size: "sm" }), isClient && buttonText] }));
};

export { ThemeToggle };
//# sourceMappingURL=theme-toggle.js.map
