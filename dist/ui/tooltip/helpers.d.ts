import { type TooltipSize, type TooltipVariant } from './types';
export declare const buildTooltipClassName: (size?: TooltipSize, variant?: TooltipVariant, className?: string) => string;
export declare const buildTooltipArrowClassName: (variant?: TooltipVariant) => string;
export declare const getAriaPlacement: (placement?: string) => string;
export declare const getOffsetForSize: (size?: TooltipSize, customOffset?: number) => number;
export declare const shouldWrapContent: (content: string, maxWidth?: number) => boolean;
