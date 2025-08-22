import { type DividerOrientation, type DividerSize, type DividerSpacing, type DividerVariant } from './types';
export declare const buildDividerClassName: (orientation: DividerOrientation, variant: DividerVariant, size: DividerSize, spacing: DividerSpacing, className?: string) => string;
export declare const getDividerRole: (orientation: DividerOrientation) => string;
export declare const getDividerAriaOrientation: (orientation: DividerOrientation) => DividerOrientation;
