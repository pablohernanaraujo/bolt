import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { createDeferredComponent, DeferredHydration } from '../utils/deferred-hydration.js';
import { ENHANCEMENT_CONFIGS } from '../utils/progressive-enhancement.js';
import { ChartSkeleton } from './chart-skeleton.js';

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
        return (jsx(ChartSkeleton, { height: height, showTitle: !!title, showLegend: showLegend, legendItems: data.length, className: className }));
    }
    return (jsxs("div", { className: `chart-container ${className}`, children: [title && (jsx("h3", { className: "mb-4 text-center text-lg font-semibold", children: title })), jsxs("div", { className: "relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900", style: { height }, children: [jsx("div", { className: "flex h-full items-end justify-around gap-2 pb-8", children: processedData.map((item, index) => {
                            const barHeight = (item.value / Math.max(...data.map((d) => d.value))) * 80;
                            return (jsxs("div", { className: "flex flex-col items-center gap-2", style: {
                                    animation: animated
                                        ? `slideUp 0.5s ease-out ${index * 0.1}s both`
                                        : undefined,
                                }, children: [jsx("div", { className: "w-8 rounded-t transition-all duration-300 hover:opacity-80", style: {
                                            height: `${barHeight}%`,
                                            backgroundColor: item.color,
                                        }, title: `${item.label}: ${item.value}` }), jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: item.label })] }, item.label));
                        }) }), jsxs("div", { className: "absolute bottom-2 right-2 text-xs text-gray-500", children: ["Interactive Chart Loaded \u2022 ", processedData.length, " items"] })] }), showLegend && (jsx("div", { className: "mt-4 flex flex-wrap justify-center gap-3", children: processedData.map((item) => (jsxs("div", { className: "flex items-center gap-2", children: [jsx("div", { className: "h-3 w-3 rounded-full", style: { backgroundColor: item.color } }), jsxs("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: [item.label, ": ", item.value] })] }, item.label))) })), jsx("style", { jsx: true, children: `
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
      ` })] }));
};
const DeferredChart = (props) => (jsx(DeferredHydration, { fallback: jsx(ChartSkeleton, { height: props.height, showTitle: !!props.title, showLegend: props.showLegend, legendItems: props.data.length, className: props.className }), enhancementOptions: ENHANCEMENT_CONFIGS.HEAVY_COMPONENT, observerConfig: {
        rootMargin: '100px',
        threshold: 0.1,
    }, delay: 100, children: jsx(HeavyChartInternal, { ...props }) }));
const DynamicChart = createDeferredComponent(() => Promise.resolve({ default: HeavyChartInternal }), {
    loading: () => (jsx(ChartSkeleton, { height: 400, showTitle: true, showLegend: true, legendItems: 3 })),
    ssr: false,
    hydrationOptions: {
        enhancementOptions: ENHANCEMENT_CONFIGS.HEAVY_COMPONENT,
        observerConfig: { rootMargin: '200px' },
    },
});
const SAMPLE_CHART_DATA = [
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

export { DeferredChart, DynamicChart, SAMPLE_CHART_DATA };
//# sourceMappingURL=chart-deferred.js.map
