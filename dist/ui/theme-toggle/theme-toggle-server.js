import { jsxs, jsx } from 'react/jsx-runtime';
import { Settings } from 'lucide-react';
import { Icon } from '../../icons/index.js';
import { ButtonServer } from '../button/button-server.js';
import './../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../assets/src/ui/button/button.css.ts.vanilla-CdKkMGyE.css';
import { buildThemeToggleClassName } from './helpers.js';

const ThemeToggleServer = ({ currentTheme, showLabel = true, size = 'small', variant = 'secondary', className, ...props }) => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    const buttonText = showLabel
        ? currentTheme === 'light'
            ? 'Tema Oscuro'
            : 'Tema Claro'
        : '';
    const themeToggleClassName = buildThemeToggleClassName(className);
    return (jsxs("form", { method: "POST", action: "/api/theme", style: { display: 'inline' }, children: [jsx("input", { type: "hidden", name: "theme", value: nextTheme }), jsxs(ButtonServer, { type: "submit", variant: variant, size: size, className: themeToggleClassName, "aria-label": `Switch to ${nextTheme} theme`, ...props, children: [jsx(Icon, { icon: Settings, size: "sm" }), buttonText] })] }));
};

export { ThemeToggleServer };
//# sourceMappingURL=theme-toggle-server.js.map
