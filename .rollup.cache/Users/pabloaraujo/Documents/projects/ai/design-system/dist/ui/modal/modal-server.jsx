'use client';
import { useId } from 'react';
import { Modal as AriaModal, Dialog, DialogTrigger, Heading, ModalOverlay, } from 'react-aria-components';
import { buildModalBodyClassName, buildModalDialogClassName, buildModalFooterClassName, } from './helpers';
import { ModalCloseButton } from './modal-client';
import * as styles from './modal.css';
export const ModalServer = ({ size = 'medium', isDismissable = true, isKeyboardDismissDisabled = false, children, className, ...props }) => (<ModalOverlay className={styles.modalOverlay} isDismissable={isDismissable} isKeyboardDismissDisabled={isKeyboardDismissDisabled} {...props}>
    <AriaModal>
      <Dialog className={buildModalDialogClassName(size, typeof className === 'string' ? className : undefined)}>
        {typeof children === 'function'
        ? children(() => {
        })
        : children}
      </Dialog>
    </AriaModal>
  </ModalOverlay>);
export const ModalTriggerServer = ({ children, ...props }) => <DialogTrigger {...props}>{children}</DialogTrigger>;
export const ModalContentServer = ({ title, showCloseButton = true, children, ...props }) => (<>
    {title && (<ModalHeaderServer title={title} showCloseButton={showCloseButton}/>)}
    <ModalBodyServer className={buildModalBodyClassName(!!title)}>
      {children}
    </ModalBodyServer>
  </>);
export const ModalHeaderServer = ({ title, showCloseButton = true, children, }) => {
    const titleId = useId();
    return (<header className={styles.modalHeader}>
      <div>
        {title && (<Heading id={titleId} className={styles.modalTitle} slot="title">
            {title}
          </Heading>)}
        {children}
      </div>

      {showCloseButton && <ModalCloseButton />}
    </header>);
};
export const ModalBodyServer = ({ children, className, }) => (<div className={buildModalBodyClassName(true, true, className)}>
    {children}
  </div>);
export const ModalFooterServer = ({ children, className, }) => (<footer className={buildModalFooterClassName(className)}>{children}</footer>);
ModalServer.displayName = 'ModalServer';
ModalTriggerServer.displayName = 'ModalTriggerServer';
ModalContentServer.displayName = 'ModalContentServer';
ModalHeaderServer.displayName = 'ModalHeaderServer';
ModalBodyServer.displayName = 'ModalBodyServer';
ModalFooterServer.displayName = 'ModalFooterServer';
