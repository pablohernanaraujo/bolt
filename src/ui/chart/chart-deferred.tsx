// /src/ui/chart/chart-deferred.tsx
// Example heavy chart component with progressive enhancement and deferred hydration
// Demonstrates patterns for complex components that should load only when needed
// RELEVANT FILES: chart-skeleton.tsx, deferred-hydration.tsx, progressive-enhancement.ts

'use client';

import { type FC, type ReactElement, useEffect, useState } from 'react';

import {
  createDeferredComponent,
  DeferredHydration,
} from '@/ui/utils/deferred-hydration';
import { ENHANCEMENT_CONFIGS } from '@/ui/utils/progressive-enhancement';

import { ChartSkeleton } from './chart-skeleton';

/**
 * Props for the heavy chart component
 */
export interface HeavyChartProps {
  /** Chart data */
  data: Array<{ label: string; value: number; color?: string }>;
  /** Chart title */
  title?: string;
  /** Chart type */
  type?: 'bar' | 'line' | 'pie';
  /** Chart height */
  height?: number;
  /** Whether to show legend */
  showLegend?: boolean;
  /** Whether to animate chart on load */
  animated?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Heavy Chart Component (Simulated)
 *
 * This component simulates a heavy chart library like Chart.js, D3, or Recharts
 * In a real implementation, this would:
 * - Import heavy charting libraries
 * - Perform complex data processing
 * - Create expensive DOM manipulations
 * - Handle animations and interactions
 *
 * For demonstration, we simulate the heavy loading with setTimeout
 */
const HeavyChartInternal: FC<HeavyChartProps> = ({
  data,
  title,
  type = 'bar',
  height = 400,
  showLegend = true,
  animated = true,
  className = '',
}): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [processedData, setProcessedData] = useState<typeof data>([]);

  // Simulate heavy computation and library loading
  useEffect(() => {
    const loadHeavyChart = async (): Promise<void> => {
      // Simulate loading heavy chart library
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate data processing
      const processed = data.map((item, index) => ({
        ...item,
        color: item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
        processedValue: item.value * 1.1, // Some processing
      }));

      setProcessedData(processed);
      setIsLoaded(true);
    };

    loadHeavyChart();
  }, [data]);

  if (!isLoaded) {
    return (
      <ChartSkeleton
        height={height}
        showTitle={!!title}
        showLegend={showLegend}
        legendItems={data.length}
        className={className}
      />
    );
  }

  // Simulated chart rendering
  return (
    <div className={`chart-container ${className}`}>
      {title && (
        <h3 className="mb-4 text-center text-lg font-semibold">{title}</h3>
      )}

      <div
        className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
        style={{ height }}
      >
        {/* Simulated chart visualization */}
        <div className="flex h-full items-end justify-around gap-2 pb-8">
          {processedData.map((item, index) => {
            const barHeight =
              (item.value / Math.max(...data.map((d) => d.value))) * 80;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
                style={{
                  animation: animated
                    ? `slideUp 0.5s ease-out ${index * 0.1}s both`
                    : undefined,
                }}
              >
                <div
                  className="w-8 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${barHeight}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${item.label}: ${item.value}`}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Simulated interaction indicator */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          Interactive Chart Loaded • {processedData.length} items
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {processedData.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: var(--final-height);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Deferred Chart Component
 *
 * Wraps the heavy chart with deferred hydration for optimal performance
 * Only loads the expensive chart when it becomes visible
 */
export const DeferredChart: FC<HeavyChartProps> = (props) => (
  <DeferredHydration
    fallback={
      <ChartSkeleton
        height={props.height}
        showTitle={!!props.title}
        showLegend={props.showLegend}
        legendItems={props.data.length}
        className={props.className}
      />
    }
    enhancementOptions={ENHANCEMENT_CONFIGS.HEAVY_COMPONENT}
    observerConfig={{
      rootMargin: '100px', // Start loading 100px before visible
      threshold: 0.1,
    }}
    delay={100} // Small delay to prevent unnecessary loading
  >
    <HeavyChartInternal {...props} />
  </DeferredHydration>
);

/**
 * Dynamic Chart Component
 *
 * Example using createDeferredComponent for dynamic imports
 * In a real app, this would dynamically import a heavy chart library
 */
export const DynamicChart = createDeferredComponent(
  // Simulate dynamic import
  () => Promise.resolve({ default: HeavyChartInternal }),
  {
    loading: () => (
      <ChartSkeleton
        height={400}
        showTitle={true}
        showLegend={true}
        legendItems={3}
      />
    ),
    ssr: false, // Don't render on server
    hydrationOptions: {
      enhancementOptions: ENHANCEMENT_CONFIGS.HEAVY_COMPONENT,
      observerConfig: { rootMargin: '200px' },
    },
  },
);

/**
 * Example data for testing the chart components
 */
export const SAMPLE_CHART_DATA = [
  {
    label: 'Jan',
    value: 65,
    color: '#3B82F6',
  },
  {
    label: 'Feb',
    value: 78,
    color: '#10B981',
  },
  {
    label: 'Mar',
    value: 52,
    color: '#F59E0B',
  },
  {
    label: 'Apr',
    value: 91,
    color: '#EF4444',
  },
  {
    label: 'May',
    value: 73,
    color: '#8B5CF6',
  },
  {
    label: 'Jun',
    value: 86,
    color: '#06B6D4',
  },
];

// Display names
DeferredChart.displayName = 'DeferredChart';
DynamicChart.displayName = 'DynamicChart';
