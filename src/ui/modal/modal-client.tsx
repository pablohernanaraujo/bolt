// /src/ui/modal/modal-client.tsx
// Client-side modal interactive components with surgical client boundaries
// Provides only interactive functionality that requires client-side JavaScript
// RELEVANT FILES: modal-server.tsx, modal.css.ts, types.ts, helpers.ts

'use client';

import { type FC, type ReactElement, useEffect } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { X } from 'lucide-react';

import { Icon } from '@/icons';

import { scrollLockManager } from './helpers';
import * as styles from './modal.css';

/**
 * Client-side modal close button
 * Requires client-side JavaScript for click handling
 */
export const ModalCloseButton: FC = (): ReactElement => (
  <AriaButton
    className={styles.modalCloseButton}
    aria-label="Close modal"
    slot="close"
  >
    <Icon icon={X} size="sm" />
  </AriaButton>
);

/**
 * Client-side scroll lock manager hook
 * Handles body scroll locking when modal is open
 * Call this hook in components that need scroll lock behavior
 */
export const useModalScrollLock = (): void => {
  useEffect(() => {
    // Lock scroll when component mounts (modal opens)
    scrollLockManager.lock();

    // Unlock scroll when component unmounts (modal closes)
    return () => {
      if (scrollLockManager.isLocked()) {
        scrollLockManager.unlock();
      }
    };
  }, []);
};

/**
 * Client-side modal wrapper for scroll lock behavior
 * Use this to wrap modal content that needs scroll locking
 */
export const ModalScrollLockWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}): ReactElement => {
  useModalScrollLock();
  return <>{children}</>;
};

ModalCloseButton.displayName = 'ModalCloseButton';
ModalScrollLockWrapper.displayName = 'ModalScrollLockWrapper';
