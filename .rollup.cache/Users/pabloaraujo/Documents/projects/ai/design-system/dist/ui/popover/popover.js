'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { Button as AriaButton, Popover as AriaPopover, Dialog, DialogTrigger, Heading, OverlayArrow, } from 'react-aria-components';
import { Icon } from '@/icons';
import { darkTheme, lightTheme } from '@/tokens/themes';
import { getAriaPlacement, getOffsetForSize } from '../tooltip/helpers';
import { buildPopoverArrowClassName, buildPopoverBodyClassName, buildPopoverClassName, buildPopoverFooterClassName, buildPopoverHeaderClassName, } from './helpers';
import * as styles from './popover.css';
export const PopoverTrigger = ({ delay, closeDelay, children, ...props }) => _jsx(DialogTrigger, { ...props, children: children });
export const Popover = ({ placement = 'top', size = 'medium', variant = 'default', offset: customOffset, showArrow = false, maxWidth = 320, isDismissable = true, isKeyboardDismissDisabled = false, className, children, ...props }) => {
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
    const popoverClassName = `${themeClass} ${buildPopoverClassName(size, variant, className)} ${styles.responsivePopover}`;
    return (_jsx(AriaPopover, { placement: ariaPlacement, offset: offset, className: popoverClassName, style: { maxWidth: `${maxWidth}px` }, ...props, children: _jsxs(Dialog, { children: [showArrow && (_jsx(OverlayArrow, { children: _jsx("div", { className: `${themeClass} ${buildPopoverArrowClassName(variant)}` }) })), _jsx("div", { children: children })] }) }));
};
export const PopoverContent = ({ title, showCloseButton = true, showHeaderDivider = true, children, className, ...props }) => {
    const hasHeader = !!title || showCloseButton;
    return (_jsxs("div", { className: className, ...props, children: [hasHeader && (_jsx(PopoverHeader, { title: title, showCloseButton: showCloseButton, showDivider: showHeaderDivider })), _jsx(PopoverBody, { hasHeader: hasHeader, children: children })] }));
};
export const PopoverHeader = ({ title, showCloseButton = true, showDivider = true, children, className, }) => {
    const titleId = useId();
    return (_jsxs("header", { className: buildPopoverHeaderClassName(showDivider, className), children: [_jsxs("div", { children: [title && (_jsx(Heading, { id: titleId, className: styles.popoverTitle, slot: "title", children: title })), children] }), showCloseButton && (_jsx(AriaButton, { className: styles.popoverCloseButton, "aria-label": "Close popover", slot: "close", children: _jsx(Icon, { icon: X, size: "sm" }) }))] }));
};
export const PopoverBody = ({ children, hasHeader, hasFooter, className }) => (_jsx("div", { className: buildPopoverBodyClassName(hasHeader, hasFooter, className), children: children }));
export const PopoverFooter = ({ children, showDivider = true, className, }) => (_jsx("footer", { className: buildPopoverFooterClassName(showDivider, className), children: children }));
export const PopoverArrow = ({ variant = 'default', className, }) => (_jsx("div", { className: buildPopoverArrowClassName(variant, className) }));
Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';
PopoverHeader.displayName = 'PopoverHeader';
PopoverBody.displayName = 'PopoverBody';
PopoverFooter.displayName = 'PopoverFooter';
PopoverArrow.displayName = 'PopoverArrow';
