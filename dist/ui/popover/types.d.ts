import { type ReactNode } from 'react';
import { type DialogTriggerProps } from 'react-aria-components';
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end' | 'top start' | 'top end' | 'bottom start' | 'bottom end' | 'left top' | 'left bottom' | 'right top' | 'right bottom';
export type PopoverSize = 'small' | 'medium' | 'large';
export type PopoverVariant = 'default' | 'inverse' | 'accent';
export interface PopoverTriggerProps extends DialogTriggerProps {
    delay?: number;
    closeDelay?: number;
    children: ReactNode;
}
export interface PopoverProps {
    placement?: PopoverPlacement;
    size?: PopoverSize;
    variant?: PopoverVariant;
    offset?: number;
    showArrow?: boolean;
    maxWidth?: number;
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
    className?: string;
    children: ReactNode;
}
export interface PopoverContentProps {
    title?: string;
    showCloseButton?: boolean;
    showHeaderDivider?: boolean;
    children: ReactNode;
    className?: string;
}
export interface PopoverHeaderProps {
    title?: string;
    showCloseButton?: boolean;
    showDivider?: boolean;
    children?: ReactNode;
    className?: string;
}
export interface PopoverBodyProps {
    children: ReactNode;
    className?: string;
}
export interface PopoverFooterProps {
    children: ReactNode;
    showDivider?: boolean;
    className?: string;
}
export interface PopoverArrowProps {
    variant?: PopoverVariant;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map