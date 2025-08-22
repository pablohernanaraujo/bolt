'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X } from 'lucide-react';
import React, { useEffect, useId, useState, } from 'react';
import { Button as AriaButton, Modal as AriaModal, Dialog, DialogTrigger, Heading, ModalOverlay, } from 'react-aria-components';
import { Icon } from '@/icons';
import { darkTheme, lightTheme } from '@/tokens/themes.css';
import * as styles from './drawer.css';
import { buildDrawerBodyClassName, buildDrawerDialogClassName, buildDrawerFooterClassName, getAnimationSpeed, scrollLockManager, } from './helpers';
export const Drawer = ({ size = 'medium', placement = 'right', isDismissable = true, isKeyboardDismissDisabled = false, animationSpeed = 'normal', disableAnimation = false, children, className, ...props }) => {
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
    const themeClassName = currentTheme === 'dark' ? darkTheme : lightTheme;
    useEffect(() => {
        return () => {
            if (scrollLockManager.isLocked()) {
                scrollLockManager.unlock();
            }
        };
    }, []);
    const animationStyles = React.useMemo(() => {
        if (disableAnimation) {
            return {
                animationDuration: '0ms',
                animationName: 'none',
            };
        }
        const speed = getAnimationSpeed(animationSpeed);
        return {
            '--drawer-animation-duration-enter': `${speed.enter}ms`,
            '--drawer-animation-duration-exit': `${speed.exit}ms`,
        };
    }, [animationSpeed, disableAnimation]);
    return (_jsx(ModalOverlay, { className: `${styles.drawerOverlay} ${themeClassName}`, isDismissable: isDismissable, isKeyboardDismissDisabled: isKeyboardDismissDisabled, style: animationStyles, ...props, children: _jsx(AriaModal, { children: _jsx(Dialog, { className: buildDrawerDialogClassName(placement, size, undefined), style: animationStyles, children: typeof children === 'function'
                    ? children(() => {
                    })
                    : children }) }) }));
};
export const DrawerTrigger = ({ children, ...props }) => _jsx(DialogTrigger, { ...props, children: children });
export const DrawerHeader = ({ title, showCloseButton = true, children, }) => {
    const titleId = useId();
    return (_jsxs("header", { className: styles.drawerHeader, children: [_jsxs("div", { children: [title && (_jsx(Heading, { id: titleId, className: styles.drawerTitle, slot: "title", children: title })), children] }), showCloseButton && (_jsx(AriaButton, { className: styles.drawerCloseButton, "aria-label": "Close drawer", slot: "close", children: _jsx(Icon, { icon: X, size: "sm" }) }))] }));
};
export const DrawerBody = ({ children, className, }) => (_jsx("div", { className: buildDrawerBodyClassName(true, true, className), children: children }));
export const DrawerFooter = ({ children, className, }) => (_jsx("footer", { className: buildDrawerFooterClassName(className), children: children }));
export const DrawerContent = ({ title, showCloseButton = true, children, ...props }) => {
    return (_jsxs(_Fragment, { children: [title && (_jsx(DrawerHeader, { title: title, showCloseButton: showCloseButton })), _jsx(DrawerBody, { className: buildDrawerBodyClassName(!!title), children: children })] }));
};
Drawer.displayName = 'Drawer';
DrawerTrigger.displayName = 'DrawerTrigger';
DrawerContent.displayName = 'DrawerContent';
DrawerHeader.displayName = 'DrawerHeader';
DrawerBody.displayName = 'DrawerBody';
DrawerFooter.displayName = 'DrawerFooter';
