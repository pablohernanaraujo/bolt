import { jsx, jsxs } from 'react/jsx-runtime';
import { X } from 'lucide-react';
import { useState, useEffect, useId } from 'react';
import { Popover as Popover$1, Dialog, OverlayArrow, Heading, Button, DialogTrigger } from 'react-aria-components';
import { Icon } from '../../icons/index.js';
import { darkTheme } from '../../tokens/themes/dark.css.js';
import { lightTheme } from '../../tokens/themes/light.css.js';
import { getOffsetForSize, getAriaPlacement } from '../tooltip/helpers.js';
import { buildPopoverClassName, buildPopoverArrowClassName, buildPopoverBodyClassName, buildPopoverFooterClassName, buildPopoverHeaderClassName } from './helpers.js';
import { responsivePopover, popoverTitle, popoverCloseButton } from './popover.css.js';

const PopoverTrigger = ({ delay, closeDelay, children, ...props }) => jsx(DialogTrigger, { ...props, children: children });
const Popover = ({ placement = 'top', size = 'medium', variant = 'default', offset: customOffset, showArrow = false, maxWidth = 320, isDismissable = true, isKeyboardDismissDisabled = false, className, children, ...props }) => {
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
    const popoverClassName = `${themeClass} ${buildPopoverClassName(size, variant, className)} ${responsivePopover}`;
    return (jsx(Popover$1, { placement: ariaPlacement, offset: offset, className: popoverClassName, style: { maxWidth: `${maxWidth}px` }, ...props, children: jsxs(Dialog, { children: [showArrow && (jsx(OverlayArrow, { children: jsx("div", { className: `${themeClass} ${buildPopoverArrowClassName(variant)}` }) })), jsx("div", { children: children })] }) }));
};
const PopoverContent = ({ title, showCloseButton = true, showHeaderDivider = true, children, className, ...props }) => {
    const hasHeader = !!title || showCloseButton;
    return (jsxs("div", { className: className, ...props, children: [hasHeader && (jsx(PopoverHeader, { title: title, showCloseButton: showCloseButton, showDivider: showHeaderDivider })), jsx(PopoverBody, { hasHeader: hasHeader, children: children })] }));
};
const PopoverHeader = ({ title, showCloseButton = true, showDivider = true, children, className, }) => {
    const titleId = useId();
    return (jsxs("header", { className: buildPopoverHeaderClassName(showDivider, className), children: [jsxs("div", { children: [title && (jsx(Heading, { id: titleId, className: popoverTitle, slot: "title", children: title })), children] }), showCloseButton && (jsx(Button, { className: popoverCloseButton, "aria-label": "Close popover", slot: "close", children: jsx(Icon, { icon: X, size: "sm" }) }))] }));
};
const PopoverBody = ({ children, hasHeader, hasFooter, className }) => (jsx("div", { className: buildPopoverBodyClassName(hasHeader, hasFooter, className), children: children }));
const PopoverFooter = ({ children, showDivider = true, className, }) => (jsx("footer", { className: buildPopoverFooterClassName(showDivider, className), children: children }));
const PopoverArrow = ({ variant = 'default', className, }) => (jsx("div", { className: buildPopoverArrowClassName(variant, className) }));
Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';
PopoverHeader.displayName = 'PopoverHeader';
PopoverBody.displayName = 'PopoverBody';
PopoverFooter.displayName = 'PopoverFooter';
PopoverArrow.displayName = 'PopoverArrow';

export { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger };
//# sourceMappingURL=popover.js.map
