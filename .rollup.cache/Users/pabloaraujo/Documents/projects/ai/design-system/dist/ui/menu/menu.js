'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useState, } from 'react';
import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuTrigger as AriaMenuTrigger, Popover, Section, Header, Separator, } from 'react-aria-components';
import { darkTheme, lightTheme } from '@/tokens/themes';
import { buildMenuClassName, buildMenuItemClassName, buildMenuSectionClassName, buildMenuSeparatorClassName, getAriaPlacement, getMenuWidthConstraints, getOffsetForSize, getTransformOrigin, shouldShowShortcut, } from './helpers';
import * as styles from './menu.css';
export const MenuTrigger = ({ children, ...props }) => _jsx(AriaMenuTrigger, { ...props, children: children });
export const Menu = ({ children, placement = 'bottom start', size = 'medium', variant = 'default', offset: customOffset, maxWidth: customMaxWidth, minWidth: customMinWidth, closeOnSelect = true, onAction, items, isDismissable = true, className, isDisabled = false, ...props }) => {
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
    const ariaPlacement = getAriaPlacement(placement);
    const offset = getOffsetForSize(size, customOffset);
    const { minWidth, maxWidth } = getMenuWidthConstraints(size, customMinWidth, customMaxWidth);
    const transformOrigin = getTransformOrigin(placement);
    const themeClass = currentTheme === 'light' ? lightTheme : darkTheme;
    const menuClassName = `${themeClass} ${buildMenuClassName(size, variant, className)}`;
    const popoverProps = {
        placement: ariaPlacement,
        offset,
        isDismissable,
        className: `${themeClass} ${styles.menuPopover}`,
        style: {
            '--transform-origin': transformOrigin,
        },
    };
    const menuProps = {
        className: menuClassName,
        style: {
            minWidth: `${minWidth}px`,
            maxWidth: `${maxWidth}px`,
        },
        onAction,
        items,
        ...props,
    };
    return (_jsx(Popover, { ...popoverProps, children: _jsx(AriaMenu, { ...menuProps, children: children }) }));
};
export const MenuItem = forwardRef(({ children, id, textValue, variant = 'default', isDisabled = false, onAction, className, shortcut, startIcon, endIcon, ...props }, ref) => {
    let parsedStartIcon = startIcon;
    let parsedText = children;
    if (Array.isArray(children) && children.length >= 2) {
        const firstChild = children[0];
        if (firstChild?.props?.icon) {
            parsedStartIcon = firstChild;
            parsedText = children.slice(1).join('');
        }
    }
    const hasEndIcon = Boolean(endIcon);
    const showShortcut = shouldShowShortcut(shortcut, hasEndIcon);
    const menuItemClassName = buildMenuItemClassName('medium', variant, className);
    const menuItemProps = {
        id: id,
        textValue: textValue || (typeof children === 'string' ? children : undefined),
        isDisabled,
        onAction,
        className: menuItemClassName,
        ...props,
    };
    return (_jsx(AriaMenuItem, { ref: ref, ...menuItemProps, children: _jsxs("div", { className: styles.menuItemContent, children: [parsedStartIcon && (_jsx("div", { className: styles.menuItemIcon, children: parsedStartIcon })), _jsx("span", { className: styles.menuItemText, children: parsedText }), showShortcut && (_jsx("span", { className: styles.menuItemShortcut, children: shortcut })), endIcon && _jsx("div", { className: styles.menuItemIcon, children: endIcon })] }) }));
});
export const MenuSection = ({ title, children, className, ...props }) => {
    const sectionClassName = buildMenuSectionClassName(className);
    const sectionProps = {
        className: sectionClassName,
        ...props,
    };
    return (_jsxs(Section, { ...sectionProps, children: [title && _jsx(Header, { className: styles.menuSectionHeader, children: title }), children] }));
};
export const MenuSeparator = ({ className, ...props }) => {
    const separatorClassName = buildMenuSeparatorClassName(className);
    const separatorProps = {
        className: separatorClassName,
        ...props,
    };
    return _jsx(Separator, { ...separatorProps });
};
MenuTrigger.displayName = 'MenuTrigger';
Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';
MenuSection.displayName = 'MenuSection';
MenuSeparator.displayName = 'MenuSeparator';
