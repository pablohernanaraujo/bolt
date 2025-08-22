import clsx from 'clsx';
import * as styles from './drawer.css';
export const buildDrawerDialogClassName = (placement = 'right', size = 'medium', className) => {
    const isHorizontal = placement === 'left' || placement === 'right';
    const sizeStyles = isHorizontal
        ? styles.drawerSizesHorizontal[size]
        : styles.drawerSizesVertical[size];
    return clsx(styles.drawerDialog, styles.drawerPlacements[placement], sizeStyles, className);
};
export const buildDrawerBodyClassName = (hasHeader = true, hasFooter = true, className) => clsx(styles.drawerBody, !hasHeader && styles.drawerBodyNoHeader, !hasFooter && styles.drawerBodyNoFooter, className);
export const buildDrawerFooterClassName = (className) => clsx(styles.drawerFooter, className);
export const scrollLockManager = {
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
export const getAriaLabelledBy = (titleId) => titleId ? titleId : undefined;
export const generateDrawerId = (prefix = 'drawer') => `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
export const getOptimalPlacement = (triggerElement, preferredPlacement = 'right') => {
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
export const getAnimationSpeed = (speed = 'normal') => {
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
export const drawerKeyboardHandler = {
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
