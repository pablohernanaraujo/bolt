import { type DrawerAnimationSpeed, type DrawerPlacement, type DrawerSize } from './types';
export declare const buildDrawerDialogClassName: (placement?: DrawerPlacement, size?: DrawerSize, className?: string) => string;
export declare const buildDrawerBodyClassName: (hasHeader?: boolean, hasFooter?: boolean, className?: string) => string;
export declare const buildDrawerFooterClassName: (className?: string) => string;
export declare const scrollLockManager: {
    lock: () => void;
    unlock: () => void;
    isLocked: () => boolean;
};
export declare const getAriaLabelledBy: (titleId?: string) => string | undefined;
export declare const generateDrawerId: (prefix?: string) => string;
export declare const getOptimalPlacement: (triggerElement?: HTMLElement, preferredPlacement?: DrawerPlacement) => DrawerPlacement;
export declare const getAnimationSpeed: (speed?: DrawerAnimationSpeed) => {
    enter: number;
    exit: number;
};
export declare const drawerKeyboardHandler: {
    handleEscape: (event: KeyboardEvent, onClose: () => void, isKeyboardDismissDisabled?: boolean) => void;
    getFocusableElements: (container: HTMLElement) => HTMLElement[];
};
//# sourceMappingURL=helpers.d.ts.map