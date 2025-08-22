import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { X } from 'lucide-react';
import React, { useState, useEffect, useId } from 'react';
import { ModalOverlay, Modal, Dialog, Heading, Button, DialogTrigger } from 'react-aria-components';
import { Icon } from '../../icons/index.js';
import { darkTheme, lightTheme } from '../../tokens/themes.css.js';
import { drawerOverlay, drawerHeader, drawerTitle, drawerCloseButton } from './drawer.css.js';
import { scrollLockManager, getAnimationSpeed, buildDrawerDialogClassName, buildDrawerBodyClassName, buildDrawerFooterClassName } from './helpers.js';

const Drawer = ({ size = 'medium', placement = 'right', isDismissable = true, isKeyboardDismissDisabled = false, animationSpeed = 'normal', disableAnimation = false, children, className, ...props }) => {
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
    return (jsx(ModalOverlay, { className: `${drawerOverlay} ${themeClassName}`, isDismissable: isDismissable, isKeyboardDismissDisabled: isKeyboardDismissDisabled, style: animationStyles, ...props, children: jsx(Modal, { children: jsx(Dialog, { className: buildDrawerDialogClassName(placement, size, undefined), style: animationStyles, children: typeof children === 'function'
                    ? children(() => {
                    })
                    : children }) }) }));
};
const DrawerTrigger = ({ children, ...props }) => jsx(DialogTrigger, { ...props, children: children });
const DrawerHeader = ({ title, showCloseButton = true, children, }) => {
    const titleId = useId();
    return (jsxs("header", { className: drawerHeader, children: [jsxs("div", { children: [title && (jsx(Heading, { id: titleId, className: drawerTitle, slot: "title", children: title })), children] }), showCloseButton && (jsx(Button, { className: drawerCloseButton, "aria-label": "Close drawer", slot: "close", children: jsx(Icon, { icon: X, size: "sm" }) }))] }));
};
const DrawerBody = ({ children, className, }) => (jsx("div", { className: buildDrawerBodyClassName(true, true, className), children: children }));
const DrawerFooter = ({ children, className, }) => (jsx("footer", { className: buildDrawerFooterClassName(className), children: children }));
const DrawerContent = ({ title, showCloseButton = true, children, ...props }) => {
    return (jsxs(Fragment, { children: [title && (jsx(DrawerHeader, { title: title, showCloseButton: showCloseButton })), jsx(DrawerBody, { className: buildDrawerBodyClassName(!!title), children: children })] }));
};
Drawer.displayName = 'Drawer';
DrawerTrigger.displayName = 'DrawerTrigger';
DrawerContent.displayName = 'DrawerContent';
DrawerHeader.displayName = 'DrawerHeader';
DrawerBody.displayName = 'DrawerBody';
DrawerFooter.displayName = 'DrawerFooter';

export { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger };
//# sourceMappingURL=drawer.js.map
