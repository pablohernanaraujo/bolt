'use client';
import { forwardRef, useEffect, useState, } from 'react';
import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuTrigger as AriaMenuTrigger, Popover, Section, Separator, } from 'react-aria-components';
import { darkTheme, lightTheme } from '@/tokens/themes';
import { buildMenuClassName, buildMenuItemClassName, buildMenuSectionClassName, buildMenuSeparatorClassName, getAriaPlacement, getMenuWidthConstraints, getOffsetForSize, getTransformOrigin, shouldShowShortcut, } from './helpers';
import * as styles from './menu.css';
export const MenuTrigger = ({ children, ...props }) => <AriaMenuTrigger {...props}>{children}</AriaMenuTrigger>;
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
    return (<Popover {...popoverProps}>
      <AriaMenu {...menuProps}>{children}</AriaMenu>
    </Popover>);
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
    return (<AriaMenuItem ref={ref} {...menuItemProps}>
        <div className={styles.menuItemContent}>
          
          {parsedStartIcon && (<div className={styles.menuItemIcon}>{parsedStartIcon}</div>)}

          
          <span className={styles.menuItemText}>{parsedText}</span>

          
          {showShortcut && (<span className={styles.menuItemShortcut}>{shortcut}</span>)}

          
          {endIcon && <div className={styles.menuItemIcon}>{endIcon}</div>}
        </div>
      </AriaMenuItem>);
});
export const MenuSection = ({ title, children, className, ...props }) => {
    const sectionClassName = buildMenuSectionClassName(className);
    const sectionProps = {
        className: sectionClassName,
        ...props,
    };
    return (<Section {...sectionProps}>
      {title && <div className={styles.menuSectionHeader}>{title}</div>}
      {children}
    </Section>);
};
export const MenuSeparator = ({ className, ...props }) => {
    const separatorClassName = buildMenuSeparatorClassName(className);
    const separatorProps = {
        className: separatorClassName,
        ...props,
    };
    return <Separator {...separatorProps}/>;
};
MenuTrigger.displayName = 'MenuTrigger';
Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';
MenuSection.displayName = 'MenuSection';
MenuSeparator.displayName = 'MenuSeparator';
