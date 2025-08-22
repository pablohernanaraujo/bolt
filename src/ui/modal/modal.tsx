// /src/ui/modal/modal.tsx
// Modal component built with React Aria Components (Server-First Architecture)
// Provides accessible modal dialogs with server-compatible structure and client interactivity
// RELEVANT FILES: modal-server.tsx, modal-client.tsx, modal.css.ts, types.ts, helpers.ts

// Re-export server components as the default Modal API
export {
  ModalServer as Modal,
  ModalBodyServer as ModalBody,
  ModalContentServer as ModalContent,
  ModalFooterServer as ModalFooter,
  ModalHeaderServer as ModalHeader,
  ModalTriggerServer as ModalTrigger,
} from './modal-server';

// Re-export client components for when interactivity is specifically needed
export {
  ModalCloseButton,
  ModalScrollLockWrapper,
  useModalScrollLock,
} from './modal-client';

// Re-export types
export type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalSize,
  ModalTriggerProps,
} from './types';
