import { type ReactNode } from 'react';
import { type TooltipProps as AriaTooltipProps } from 'react-aria-components';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end' | 'top start' | 'top end' | 'bottom start' | 'bottom end' | 'left top' | 'left bottom' | 'right top' | 'right bottom';
export type TooltipSize = 'small' | 'medium' | 'large';
export type TooltipVariant = 'default' | 'inverse' | 'accent';
export interface TooltipTriggerProps {
    delay?: number;
    closeDelay?: number;
    children: [ReactNode, ReactNode];
}
export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
    children: ReactNode;
    placement?: TooltipPlacement;
    size?: TooltipSize;
    variant?: TooltipVariant;
    offset?: number;
    showArrow?: boolean;
    maxWidth?: number;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map