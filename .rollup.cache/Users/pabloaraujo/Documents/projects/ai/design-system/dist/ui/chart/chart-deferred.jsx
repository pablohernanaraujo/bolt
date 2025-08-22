'use client';
import { useEffect, useState } from 'react';
import { createDeferredComponent, DeferredHydration, } from '@/ui/utils/deferred-hydration';
import { ENHANCEMENT_CONFIGS } from '@/ui/utils/progressive-enhancement';
import { ChartSkeleton } from './chart-skeleton';
const HeavyChartInternal = ({ data, title, type = 'bar', height = 400, showLegend = true, animated = true, className = '', }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [processedData, setProcessedData] = useState([]);
    useEffect(() => {
        const loadHeavyChart = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const processed = data.map((item, index) => ({
                ...item,
                color: item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                processedValue: item.value * 1.1,
            }));
            setProcessedData(processed);
            setIsLoaded(true);
        };
        loadHeavyChart();
    }, [data]);
    if (!isLoaded) {
        return (<ChartSkeleton height={height} showTitle={!!title} showLegend={showLegend} legendItems={data.length} className={className}/>);
    }
    return (<div className={`chart-container ${className}`}>
      {title && (<h3 className="mb-4 text-center text-lg font-semibold">{title}</h3>)}

      <div className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900" style={{ height }}>
        
        <div className="flex h-full items-end justify-around gap-2 pb-8">
          {processedData.map((item, index) => {
            const barHeight = (item.value / Math.max(...data.map((d) => d.value))) * 80;
            return (<div key={item.label} className="flex flex-col items-center gap-2" style={{
                    animation: animated
                        ? `slideUp 0.5s ease-out ${index * 0.1}s both`
                        : undefined,
                }}>
                <div className="w-8 rounded-t transition-all duration-300 hover:opacity-80" style={{
                    height: `${barHeight}%`,
                    backgroundColor: item.color,
                }} title={`${item.label}: ${item.value}`}/>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.label}
                </span>
              </div>);
        })}
        </div>

        
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          Interactive Chart Loaded • {processedData.length} items
        </div>
      </div>

      
      {showLegend && (<div className="mt-4 flex flex-wrap justify-center gap-3">
          {processedData.map((item) => (<div key={item.label} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}/>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.label}: {item.value}
              </span>
            </div>))}
        </div>)}

      
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
    </div>);
};
export const DeferredChart = (props) => (<DeferredHydration fallback={<ChartSkeleton height={props.height} showTitle={!!props.title} showLegend={props.showLegend} legendItems={props.data.length} className={props.className}/>} enhancementOptions={ENHANCEMENT_CONFIGS.HEAVY_COMPONENT} observerConfig={{
        rootMargin: '100px',
        threshold: 0.1,
    }} delay={100}>
    <HeavyChartInternal {...props}/>
  </DeferredHydration>);
export const DynamicChart = createDeferredComponent(() => Promise.resolve({ default: HeavyChartInternal }), {
    loading: () => (<ChartSkeleton height={400} showTitle={true} showLegend={true} legendItems={3}/>),
    ssr: false,
    hydrationOptions: {
        enhancementOptions: ENHANCEMENT_CONFIGS.HEAVY_COMPONENT,
        observerConfig: { rootMargin: '200px' },
    },
});
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
DeferredChart.displayName = 'DeferredChart';
DynamicChart.displayName = 'DynamicChart';
