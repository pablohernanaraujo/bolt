import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Tooltip as Tooltip$1, OverlayArrow, TooltipTrigger as TooltipTrigger$1 } from 'react-aria-components';
import { darkTheme } from '../../tokens/themes/dark.css.js';
import { lightTheme } from '../../tokens/themes/light.css.js';
import { buildTooltipClassName, getOffsetForSize, getAriaPlacement, buildTooltipArrowClassName } from './helpers.js';

const TooltipTrigger = ({ delay = 700, closeDelay = 0, children, ...props }) => (jsx(TooltipTrigger$1, { delay: delay, closeDelay: closeDelay, ...props, children: children }));
const Tooltip = ({ children, placement = 'top', size = 'medium', variant = 'default', offset: customOffset, showArrow = false, maxWidth = 300, className, ...props }) => {
    const [currentTheme, setCurrentTheme] = useState('light');
    useEffect(() => {
        const detectTheme = () => {
            if (typeof document !== 'undefined') {
                const theme = document.documentElement.getAttribute('data-theme') || 'light';
                setCurrentTheme(theme);
            }
        };
        detectTheme();
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme') {
                    detectTheme();
                }
            }
        });
        if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme'],
            });
        }
        return () => observer.disconnect();
    }, []);
    const offset = getOffsetForSize(size, customOffset);
    const ariaPlacement = getAriaPlacement(placement);
    const themeClass = currentTheme === 'light' ? lightTheme : darkTheme;
    const tooltipClassName = `${themeClass} ${buildTooltipClassName(size, variant, className)}`;
    return (jsxs(Tooltip$1, { placement: ariaPlacement, offset: offset, className: tooltipClassName, style: { maxWidth: `${maxWidth}px` }, ...props, children: [showArrow && (jsx(OverlayArrow, { children: jsx("div", { className: `${themeClass} ${buildTooltipArrowClassName(variant)}` }) })), jsx("div", { children: children })] }));
};

export { Tooltip, TooltipTrigger };
//# sourceMappingURL=tooltip.js.map
