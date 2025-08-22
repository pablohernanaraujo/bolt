// /src/ui/modal/modal-server.tsx
// Modal component using React Aria Components (requires client-side execution)
// Provides modal structure without client-side theme detection
// RELEVANT FILES: modal-client.tsx, modal.css.ts, types.ts, helpers.ts

'use client';

import { type FC, type ReactElement, useId } from 'react';
import {
  Modal as AriaModal,
  Dialog,
  DialogTrigger,
  Heading,
  ModalOverlay,
} from 'react-aria-components';

import {
  buildModalBodyClassName,
  buildModalDialogClassName,
  buildModalFooterClassName,
} from './helpers';
import { ModalCloseButton } from './modal-client';
import * as styles from './modal.css';
import {
  type ModalBodyProps,
  type ModalContentProps,
  type ModalFooterProps,
  type ModalHeaderProps,
  type ModalProps,
  type ModalTriggerProps,
} from './types';

/**
 * Server-compatible Modal component
 * Renders modal structure without client-side theme detection
 * Theme is inherited from parent layout via CSS variables
 */
export const ModalServer: FC<ModalProps> = ({
  size = 'medium',
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  children,
  className,
  ...props
}): ReactElement => (
  <ModalOverlay
    className={styles.modalOverlay}
    isDismissable={isDismissable}
    isKeyboardDismissDisabled={isKeyboardDismissDisabled}
    {...props}
  >
    <AriaModal>
      <Dialog
        className={buildModalDialogClassName(
          size,
          typeof className === 'string' ? className : undefined,
        )}
      >
        {typeof children === 'function'
          ? children(() => {
              // Close function for render prop - React Aria handles this automatically
              // This is just for compatibility with render prop pattern
            })
          : children}
      </Dialog>
    </AriaModal>
  </ModalOverlay>
);

/**
 * ModalTrigger component
 * Server-compatible trigger wrapper
 */
export const ModalTriggerServer: FC<ModalTriggerProps> = ({
  children,
  ...props
}): ReactElement => <DialogTrigger {...props}>{children}</DialogTrigger>;

/**
 * ModalContent component
 * Server-compatible structured content container
 */
export const ModalContentServer: FC<ModalContentProps> = ({
  title,
  showCloseButton = true,
  children,
  ...props
}): ReactElement => (
  <>
    {title && (
      <ModalHeaderServer title={title} showCloseButton={showCloseButton} />
    )}
    <ModalBodyServer className={buildModalBodyClassName(!!title)}>
      {children}
    </ModalBodyServer>
  </>
);

/**
 * ModalHeader component
 * Server-compatible header section with title and optional close button
 */
export const ModalHeaderServer: FC<ModalHeaderProps> = ({
  title,
  showCloseButton = true,
  children,
}): ReactElement => {
  const titleId = useId();

  return (
    <header className={styles.modalHeader}>
      <div>
        {title && (
          <Heading id={titleId} className={styles.modalTitle} slot="title">
            {title}
          </Heading>
        )}
        {children}
      </div>

      {showCloseButton && <ModalCloseButton />}
    </header>
  );
};

/**
 * ModalBody component
 * Server-compatible main content area
 */
export const ModalBodyServer: FC<ModalBodyProps> = ({
  children,
  className,
}): ReactElement => (
  <div className={buildModalBodyClassName(true, true, className)}>
    {children}
  </div>
);

/**
 * ModalFooter component
 * Server-compatible footer section
 */
export const ModalFooterServer: FC<ModalFooterProps> = ({
  children,
  className,
}): ReactElement => (
  <footer className={buildModalFooterClassName(className)}>{children}</footer>
);

// Display names for debugging
ModalServer.displayName = 'ModalServer';
ModalTriggerServer.displayName = 'ModalTriggerServer';
ModalContentServer.displayName = 'ModalContentServer';
ModalHeaderServer.displayName = 'ModalHeaderServer';
ModalBodyServer.displayName = 'ModalBodyServer';
ModalFooterServer.displayName = 'ModalFooterServer';
