import { type ReactNode } from 'react';
import { type InputGroupContextValue } from './types';
export declare const buildInputGroupClassName: (variant: string, size: string, hasError?: boolean, isDisabled?: boolean, className?: string) => string;
export declare const buildAddonClassName: (position: "left" | "right", size: string, variant: string, isDisabled?: boolean, className?: string) => string;
export declare const buildElementClassName: (position: "left" | "right", size: string, isInteractive?: boolean, isDisabled?: boolean, className?: string) => string;
export declare const analyzeChildren: (children: ReactNode) => Partial<InputGroupContextValue>;
export declare const getInputPaddingAdjustments: (size: string, hasLeftElement?: boolean, hasRightElement?: boolean) => {
    paddingLeft?: string;
    paddingRight?: string;
};
