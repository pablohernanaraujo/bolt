// /src/ui/modal/index.ts
// Export all modal components and types
// Barrel export for the Modal component family
// RELEVANT FILES: modal.tsx, types.ts, helpers.ts

export {
  buildModalBodyClassName,
  buildModalDialogClassName,
  buildModalFooterClassName,
  generateModalId,
  modalKeyboardHandler,
  scrollLockManager,
} from './helpers';
export {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
} from './modal';
export type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalSize,
  ModalTriggerProps,
} from './types';
