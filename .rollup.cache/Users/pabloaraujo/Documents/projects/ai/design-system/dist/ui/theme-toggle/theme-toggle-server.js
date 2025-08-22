import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Settings } from 'lucide-react';
import { Icon } from '@/icons';
import { Button } from '@/ui/button';
import { buildThemeToggleClassName } from './helpers';
export const ThemeToggleServer = ({ currentTheme, showLabel = true, size = 'small', variant = 'secondary', className, ...props }) => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    const buttonText = showLabel
        ? currentTheme === 'light'
            ? 'Tema Oscuro'
            : 'Tema Claro'
        : '';
    const themeToggleClassName = buildThemeToggleClassName(className);
    return (_jsxs("form", { method: "POST", action: "/api/theme", style: { display: 'inline' }, children: [_jsx("input", { type: "hidden", name: "theme", value: nextTheme }), _jsxs(Button, { type: "submit", variant: variant, size: size, className: themeToggleClassName, "aria-label": `Switch to ${nextTheme} theme`, ...props, children: [_jsx(Icon, { icon: Settings, size: "sm" }), buttonText] })] }));
};
