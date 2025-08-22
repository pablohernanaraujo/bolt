import clsx from 'clsx';
import * as styles from './modal.css';
export const buildModalDialogClassName = (size = 'medium', className) => clsx(styles.modalDialog, styles.modalSizes[size], className);
export const buildModalBodyClassName = (hasHeader = true, hasFooter = true, className) => clsx(styles.modalBody, !hasHeader && styles.modalBodyNoHeader, !hasFooter && styles.modalBodyNoFooter, className);
export const buildModalFooterClassName = (className) => clsx(styles.modalFooter, className);
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
export const generateModalId = (prefix = 'modal') => `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
export const modalKeyboardHandler = {
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
