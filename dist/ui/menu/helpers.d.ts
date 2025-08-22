type Placement = 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end' | 'top start' | 'top end' | 'bottom start' | 'bottom end' | 'left top' | 'left bottom' | 'right top' | 'right bottom';
import { type MenuItemVariant, type MenuPlacement, type MenuSize, type MenuVariant } from './types';
export declare const buildMenuClassName: (size?: MenuSize, variant?: MenuVariant, customClassName?: string) => string;
export declare const buildMenuItemClassName: (size?: MenuSize, variant?: MenuItemVariant, customClassName?: string) => string;
export declare const getAriaPlacement: (placement: MenuPlacement) => Placement;
export declare const getOffsetForSize: (size: MenuSize, customOffset?: number) => number;
export declare const buildMenuSectionClassName: (customClassName?: string) => string;
export declare const buildMenuSeparatorClassName: (customClassName?: string) => string;
export declare const getMenuWidthConstraints: (size: MenuSize, minWidth?: number, maxWidth?: number) => {
    minWidth: number;
    maxWidth: number;
};
export declare const shouldShowShortcut: (shortcut?: string, hasEndIcon?: boolean) => boolean;
export declare const isValidMenuPlacement: (placement: string) => placement is MenuPlacement;
export declare const getTransformOrigin: (placement: MenuPlacement) => string;
export declare const scrollItemIntoView: (menuElement: HTMLElement, itemElement: HTMLElement) => void;
export {};
//# sourceMappingURL=helpers.d.ts.map