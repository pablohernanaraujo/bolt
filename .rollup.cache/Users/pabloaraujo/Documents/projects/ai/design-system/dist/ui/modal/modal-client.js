'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { X } from 'lucide-react';
import { Icon } from '@/icons';
import { scrollLockManager } from './helpers';
import * as styles from './modal.css';
export const ModalCloseButton = () => (_jsx(AriaButton, { className: styles.modalCloseButton, "aria-label": "Close modal", slot: "close", children: _jsx(Icon, { icon: X, size: "sm" }) }));
export const useModalScrollLock = () => {
    useEffect(() => {
        scrollLockManager.lock();
        return () => {
            if (scrollLockManager.isLocked()) {
                scrollLockManager.unlock();
            }
        };
    }, []);
};
export const ModalScrollLockWrapper = ({ children, }) => {
    useModalScrollLock();
    return _jsx(_Fragment, { children: children });
};
ModalCloseButton.displayName = 'ModalCloseButton';
ModalScrollLockWrapper.displayName = 'ModalScrollLockWrapper';
