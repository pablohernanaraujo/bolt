'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/icons';
import { Button } from '@/ui/button';
import { buildThemeToggleClassName } from './helpers';
export const ThemeToggleProgressive = ({ initialTheme, showLabel = true, size = 'small', variant = 'secondary', className, ...props }) => {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    const [isEnhanced, setIsEnhanced] = useState(false);
    const formRef = useRef(null);
    useEffect(() => {
        const form = formRef.current;
        if (!form)
            return;
        const handleSubmit = (event) => {
            event.preventDefault();
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
            const hiddenInput = form.querySelector('input[name="theme"]');
            if (hiddenInput) {
                const nextTheme = newTheme === 'light' ? 'dark' : 'light';
                hiddenInput.value = nextTheme;
            }
            window.dispatchEvent(new CustomEvent('themechange', {
                detail: { theme: newTheme },
            }));
        };
        form.addEventListener('submit', handleSubmit);
        setIsEnhanced(true);
        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, [currentTheme]);
    useEffect(() => {
        const documentTheme = document.documentElement.getAttribute('data-theme');
        if (documentTheme && documentTheme !== initialTheme) {
            setCurrentTheme(documentTheme);
        }
    }, [initialTheme]);
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    const buttonText = showLabel
        ? currentTheme === 'light'
            ? 'Tema Oscuro'
            : 'Tema Claro'
        : '';
    const themeToggleClassName = buildThemeToggleClassName(className);
    return (_jsxs("form", { ref: formRef, method: "POST", action: "/api/theme", style: { display: 'inline' }, children: [_jsx("input", { type: "hidden", name: "theme", value: nextTheme }), _jsxs(Button, { type: "submit", variant: variant, size: size, className: themeToggleClassName, "aria-label": `Switch to ${nextTheme} theme`, "data-enhanced": isEnhanced, ...props, children: [_jsx(Icon, { icon: Settings, size: "sm" }), buttonText] })] }));
};
