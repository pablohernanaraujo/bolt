import { type ToastPosition, type ToastVariant } from './types';
export declare const generateToastId: () => string;
export declare const buildToastContainerClassName: (position: ToastPosition) => string;
export declare const buildToastClassName: (variant: ToastVariant, isVisible: boolean, className?: string) => string;
export declare const getDefaultDuration: (variant: ToastVariant) => number;
export declare const getAriaRole: (variant: ToastVariant) => string;
export declare const getPositionStyles: (position: ToastPosition) => Record<string, string>;
export declare const calculateZIndex: (index: number) => number;
export declare const isTopPosition: (position: ToastPosition) => boolean;
