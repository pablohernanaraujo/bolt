import { type ComponentProps } from 'react';
import { type ProgressBar } from 'react-aria-components';
export type ProgressSize = 'small' | 'medium' | 'large';
export type ProgressVariant = 'primary' | 'success' | 'warning' | 'error';
export type ProgressState = 'determinate' | 'indeterminate';
export interface ProgressProps extends ComponentProps<typeof ProgressBar> {
    variant?: ProgressVariant;
    size?: ProgressSize;
    label?: string;
    showValue?: boolean;
    formatValue?: (value: number, maxValue: number) => string;
    isStriped?: boolean;
    isAnimated?: boolean;
    className?: string;
}
export interface ProgressSegmentProps {
    variant: ProgressVariant;
    size: ProgressSize;
    isStriped?: boolean;
    isAnimated?: boolean;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map