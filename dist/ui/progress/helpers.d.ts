import { type ProgressSize, type ProgressVariant } from './types';
export declare const buildProgressClassName: (variant: ProgressVariant, size: ProgressSize, isStriped: boolean, isAnimated: boolean, isIndeterminate: boolean, className?: string) => string;
export declare const formatProgressValue: (value: number, maxValue: number) => string;
export declare const formatFileProgressValue: (value: number, maxValue: number) => string;
export declare const formatTimeProgressValue: (value: number, maxValue: number) => string;
export declare const formatDataProgressValue: (value: number, maxValue: number) => string;
export declare const getProgressVariantByValue: (value: number, maxValue: number) => ProgressVariant;
export declare const calculateProgressPercentage: (value: number, maxValue: number) => number;
export declare const isIndeterminateProgress: (value: number | undefined) => value is undefined;
//# sourceMappingURL=helpers.d.ts.map