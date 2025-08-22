import { type FC } from 'react';
export interface HeavyChartProps {
    data: Array<{
        label: string;
        value: number;
        color?: string;
    }>;
    title?: string;
    type?: 'bar' | 'line' | 'pie';
    height?: number;
    showLegend?: boolean;
    animated?: boolean;
    className?: string;
}
export declare const DeferredChart: FC<HeavyChartProps>;
export declare const DynamicChart: import("react").ComponentType<HeavyChartProps & Partial<import("@/ui/utils/deferred-hydration").DeferredHydrationProps>>;
export declare const SAMPLE_CHART_DATA: {
    label: string;
    value: number;
    color: string;
}[];
//# sourceMappingURL=chart-deferred.d.ts.map