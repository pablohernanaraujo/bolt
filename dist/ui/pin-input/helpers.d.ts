import { type PinInputType } from './types';
export declare const INPUT_PATTERNS: Record<PinInputType, RegExp>;
export declare const INPUT_MODES: Record<PinInputType, string>;
export declare const isValidChar: (char: string, type: PinInputType) => boolean;
export declare const filterValidChars: (text: string, type: PinInputType) => string;
export declare const handlePasteContent: (pastedText: string, startIndex: number, type: PinInputType, length: number, setValue: (index: number, value: string) => void, focusField: (index: number) => void) => {
    processedChars: string[];
    nextFocusIndex: number;
};
export declare const handleKeyNavigation: (key: string, currentIndex: number, currentValue: string, length: number, setValue: (index: number, value: string) => void, focusField: (index: number) => void) => boolean;
export declare const handleCharInput: (char: string, currentIndex: number, type: PinInputType, length: number, setValue: (index: number, value: string) => void, focusField: (index: number) => void) => boolean;
export declare const findFirstEmptyIndex: (values: string[]) => number;
export declare const findLastFilledIndex: (values: string[]) => number;
export declare const getPinValue: (values: string[]) => string;
export declare const isComplete: (values: string[]) => boolean;
export declare const splitValue: (value: string, length: number) => string[];
export declare const createFieldRefs: (length: number) => (HTMLInputElement | null)[];
export declare const getDisplayValue: (value: string, masked: boolean, maskChar: string) => string;
export declare const buildPinInputClassName: (variant: string, size: string, hasError: boolean, disabled: boolean, className?: string) => string;
