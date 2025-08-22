import { type FC } from 'react';
interface ChartSkeletonProps {
    height?: string | number;
    showLegend?: boolean;
    showTitle?: boolean;
    legendItems?: number;
    className?: string;
}
export declare const ChartSkeleton: FC<ChartSkeletonProps>;
export declare const ChartSkeletonSimple: FC<Pick<ChartSkeletonProps, 'height' | 'className'>>;
export {};
