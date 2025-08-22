// /src/ui/chart/index.ts
// Barrel export file for Chart components with progressive enhancement
// Exports deferred chart components and utilities for optimal performance
// RELEVANT FILES: chart-deferred.tsx, chart-skeleton.tsx, deferred-hydration.tsx

export {
  DeferredChart,
  DynamicChart,
  type HeavyChartProps,
  SAMPLE_CHART_DATA,
} from './chart-deferred';
export { ChartSkeleton, ChartSkeletonSimple } from './chart-skeleton';
