import { type ReactNode } from 'react';
import { type DialogProps, type DialogTriggerProps, type ModalOverlayProps } from 'react-aria-components';
export type ModalSize = 'small' | 'medium' | 'large' | 'full';
export interface ModalProps extends Omit<ModalOverlayProps, 'children'> {
    size?: ModalSize;
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
    children: ReactNode | ((close: () => void) => ReactNode);
}
export interface ModalTriggerProps extends DialogTriggerProps {
    children: [ReactNode, ReactNode];
}
export interface ModalContentProps extends DialogProps {
    title?: string;
    showCloseButton?: boolean;
    children: ReactNode;
}
export interface ModalHeaderProps {
    title?: string;
    showCloseButton?: boolean;
    children?: ReactNode;
}
export interface ModalBodyProps {
    children: ReactNode;
    className?: string;
}
export interface ModalFooterProps {
    children: ReactNode;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map