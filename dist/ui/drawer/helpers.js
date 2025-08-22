import clsx from 'clsx';
import { drawerBody, drawerBodyNoHeader, drawerBodyNoFooter, drawerDialog, drawerPlacements, drawerSizesHorizontal, drawerSizesVertical, drawerFooter } from './drawer.css.js';

const buildDrawerDialogClassName = (placement = 'right', size = 'medium', className) => {
    const isHorizontal = placement === 'left' || placement === 'right';
    const sizeStyles = isHorizontal
        ? drawerSizesHorizontal[size]
        : drawerSizesVertical[size];
    return clsx(drawerDialog, drawerPlacements[placement], sizeStyles, className);
};
const buildDrawerBodyClassName = (hasHeader = true, hasFooter = true, className) => clsx(drawerBody, !hasHeader && drawerBodyNoHeader, !hasFooter && drawerBodyNoFooter, className);
const buildDrawerFooterClassName = (className) => clsx(drawerFooter, className);
const scrollLockManager = {
    lock: () => {
        const body = document.body;
        body.style.overflow = 'hidden';
        body.setAttribute('data-scroll-locked', 'true');
    },
    unlock: () => {
        const body = document.body;
        body.style.overflow = '';
        body.removeAttribute('data-scroll-locked');
    },
    isLocked: () => document.body.hasAttribute('data-scroll-locked'),
};
const generateDrawerId = (prefix = 'drawer') => `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
const getOptimalPlacement = (triggerElement, preferredPlacement = 'right') => {
    if (!triggerElement)
        return preferredPlacement;
    const rect = triggerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (rect.left < viewportWidth / 2 &&
        (preferredPlacement === 'left' || preferredPlacement === 'right')) {
        return 'right';
    }
    if (rect.right > viewportWidth / 2 &&
        (preferredPlacement === 'left' || preferredPlacement === 'right')) {
        return 'left';
    }
    if (rect.top < viewportHeight / 2 &&
        (preferredPlacement === 'top' || preferredPlacement === 'bottom')) {
        return 'bottom';
    }
    if (rect.bottom > viewportHeight / 2 &&
        (preferredPlacement === 'top' || preferredPlacement === 'bottom')) {
        return 'top';
    }
    return preferredPlacement;
};
const getAnimationSpeed = (speed = 'normal') => {
    switch (speed) {
        case 'fast':
            return {
                enter: 150,
                exit: 100,
            };
        case 'slow':
            return {
                enter: 400,
                exit: 300,
            };
        case 'normal':
        default:
            return {
                enter: 300,
                exit: 200,
            };
    }
};
const drawerKeyboardHandler = {
    handleEscape: (event, onClose, isKeyboardDismissDisabled = false) => {
        if (event.key === 'Escape' && !isKeyboardDismissDisabled) {
            event.preventDefault();
            onClose();
        }
    },
    getFocusableElements: (container) => {
        const focusableSelector = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');
        return Array.from(container.querySelectorAll(focusableSelector));
    },
};

export { buildDrawerBodyClassName, buildDrawerDialogClassName, buildDrawerFooterClassName, drawerKeyboardHandler, generateDrawerId, getAnimationSpeed, getOptimalPlacement, scrollLockManager };
//# sourceMappingURL=helpers.js.map
