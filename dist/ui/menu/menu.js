import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect } from 'react';
import { MenuItem as MenuItem$1, Popover, Menu as Menu$1, Section, Separator, MenuTrigger as MenuTrigger$1 } from 'react-aria-components';
import { darkTheme } from '../../tokens/themes/dark.css.js';
import { lightTheme } from '../../tokens/themes/light.css.js';
import { buildMenuItemClassName, shouldShowShortcut, getMenuWidthConstraints, buildMenuClassName, getTransformOrigin, getOffsetForSize, getAriaPlacement, buildMenuSectionClassName, buildMenuSeparatorClassName } from './helpers.js';
import { menuItemContent, menuItemIcon, menuItemText, menuItemShortcut, menuPopover, menuSectionHeader } from './menu.css.js';

const MenuTrigger = ({ children, ...props }) => jsx(MenuTrigger$1, { ...props, children: children });
const Menu = ({ children, placement = 'bottom start', size = 'medium', variant = 'default', offset: customOffset, maxWidth: customMaxWidth, minWidth: customMinWidth, closeOnSelect = true, onAction, items, isDismissable = true, className, isDisabled = false, ...props }) => {
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
        className: `${themeClass} ${menuPopover}`,
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
    return (jsx(Popover, { ...popoverProps, children: jsx(Menu$1, { ...menuProps, children: children }) }));
};
const MenuItem = forwardRef(({ children, id, textValue, variant = 'default', isDisabled = false, onAction, className, shortcut, startIcon, endIcon, ...props }, ref) => {
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
    return (jsx(MenuItem$1, { ref: ref, ...menuItemProps, children: jsxs("div", { className: menuItemContent, children: [parsedStartIcon && (jsx("div", { className: menuItemIcon, children: parsedStartIcon })), jsx("span", { className: menuItemText, children: parsedText }), showShortcut && (jsx("span", { className: menuItemShortcut, children: shortcut })), endIcon && jsx("div", { className: menuItemIcon, children: endIcon })] }) }));
});
const MenuSection = ({ title, children, className, ...props }) => {
    const sectionClassName = buildMenuSectionClassName(className);
    const sectionProps = {
        className: sectionClassName,
        ...props,
    };
    return (jsxs(Section, { ...sectionProps, children: [title && jsx("div", { className: menuSectionHeader, children: title }), children] }));
};
const MenuSeparator = ({ className, ...props }) => {
    const separatorClassName = buildMenuSeparatorClassName(className);
    const separatorProps = {
        className: separatorClassName,
        ...props,
    };
    return jsx(Separator, { ...separatorProps });
};
MenuTrigger.displayName = 'MenuTrigger';
Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';
MenuSection.displayName = 'MenuSection';
MenuSeparator.displayName = 'MenuSeparator';

export { Menu, MenuItem, MenuSection, MenuSeparator, MenuTrigger };
//# sourceMappingURL=menu.js.map
