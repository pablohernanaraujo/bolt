import { type PopoverPlacement, type PopoverSize, type PopoverVariant } from './types';
export declare const buildPopoverClassName: (size: PopoverSize, variant: PopoverVariant, className?: string) => string;
export declare const buildPopoverArrowClassName: (variant: PopoverVariant, className?: string) => string;
export declare const buildPopoverHeaderClassName: (showDivider: boolean, className?: string) => string;
export declare const buildPopoverBodyClassName: (hasHeader?: boolean, hasFooter?: boolean, className?: string) => string;
export declare const buildPopoverFooterClassName: (showDivider: boolean, className?: string) => string;
export declare const isVerticalPlacement: (placement: PopoverPlacement) => boolean;
export declare const isHorizontalPlacement: (placement: PopoverPlacement) => boolean;
export declare const getOppositeArrowDirection: (placement: PopoverPlacement) => string;
export declare const validatePopoverContent: (hasTitle: boolean, hasInteractiveContent: boolean) => {
    role: string;
    "aria-modal"?: boolean;
};
