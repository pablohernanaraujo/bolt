'use client';
import { useEffect } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { X } from 'lucide-react';
import { Icon } from '@/icons';
import { scrollLockManager } from './helpers';
import * as styles from './modal.css';
export const ModalCloseButton = () => (<AriaButton className={styles.modalCloseButton} aria-label="Close modal" slot="close">
    <Icon icon={X} size="sm"/>
  </AriaButton>);
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
    return <>{children}</>;
};
ModalCloseButton.displayName = 'ModalCloseButton';
ModalScrollLockWrapper.displayName = 'ModalScrollLockWrapper';
