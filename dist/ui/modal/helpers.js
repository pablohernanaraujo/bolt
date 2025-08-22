import clsx from 'clsx';
import { modalBody, modalBodyNoHeader, modalBodyNoFooter, modalDialog, modalSizes, modalFooter } from './modal.css.js';

const buildModalDialogClassName = (size = 'medium', className) => clsx(modalDialog, modalSizes[size], className);
const buildModalBodyClassName = (hasHeader = true, hasFooter = true, className) => clsx(modalBody, !hasHeader && modalBodyNoHeader, !hasFooter && modalBodyNoFooter, className);
const buildModalFooterClassName = (className) => clsx(modalFooter, className);
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
const generateModalId = (prefix = 'modal') => `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
const modalKeyboardHandler = {
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

export { buildModalBodyClassName, buildModalDialogClassName, buildModalFooterClassName, generateModalId, modalKeyboardHandler, scrollLockManager };
//# sourceMappingURL=helpers.js.map
