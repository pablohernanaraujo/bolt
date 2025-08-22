import { type ReactNode } from 'react';
import { type DialogProps, type DialogTriggerProps, type ModalOverlayProps } from 'react-aria-components';
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';
export type DrawerAnimationSpeed = 'fast' | 'normal' | 'slow';
export interface DrawerProps extends Omit<ModalOverlayProps, 'children'> {
    size?: DrawerSize;
    placement?: DrawerPlacement;
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
    animationSpeed?: DrawerAnimationSpeed;
    disableAnimation?: boolean;
    children: ReactNode | ((close: () => void) => ReactNode);
}
export interface DrawerTriggerProps extends DialogTriggerProps {
    children: [ReactNode, ReactNode];
}
export interface DrawerContentProps extends DialogProps {
    title?: string;
    showCloseButton?: boolean;
    children: ReactNode;
}
export interface DrawerHeaderProps {
    title?: string;
    showCloseButton?: boolean;
    children?: ReactNode;
}
export interface DrawerBodyProps {
    children: ReactNode;
    className?: string;
}
export interface DrawerFooterProps {
    children: ReactNode;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map