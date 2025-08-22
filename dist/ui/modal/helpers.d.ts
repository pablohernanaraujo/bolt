import { type ModalSize } from './types';
export declare const buildModalDialogClassName: (size?: ModalSize, className?: string) => string;
export declare const buildModalBodyClassName: (hasHeader?: boolean, hasFooter?: boolean, className?: string) => string;
export declare const buildModalFooterClassName: (className?: string) => string;
export declare const scrollLockManager: {
    lock: () => void;
    unlock: () => void;
    isLocked: () => boolean;
};
export declare const getAriaLabelledBy: (titleId?: string) => string | undefined;
export declare const generateModalId: (prefix?: string) => string;
export declare const modalKeyboardHandler: {
    handleEscape: (event: KeyboardEvent, onClose: () => void, isKeyboardDismissDisabled?: boolean) => void;
    getFocusableElements: (container: HTMLElement) => HTMLElement[];
};
//# sourceMappingURL=helpers.d.ts.map