import { Skeleton, SkeletonText } from '@/ui/skeleton';
export const ChartSkeleton = ({ height = 300, showLegend = false, showTitle = false, legendItems = 3, className = '', }) => {
    const chartHeight = typeof height === 'number' ? `${height}px` : height;
    return (<div className={`space-y-4 ${className}`} role="img" aria-label="Loading chart">
      
      {showTitle && (<div className="flex justify-center">
          <SkeletonText noOfLines={1} style={{ width: '60%' }}/>
        </div>)}

      
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" style={{ height: chartHeight }}>
        
        <div className="absolute bottom-4 left-12 right-4 flex justify-between">
          {Array.from({ length: 5 }, (_, i) => (<Skeleton key={`x-axis-${i}`} className="h-3 w-12"/>))}
        </div>

        
        <div className="absolute bottom-12 left-2 top-4 flex flex-col justify-between">
          {Array.from({ length: 5 }, (_, i) => (<Skeleton key={`y-axis-${i}`} className="h-3 w-8"/>))}
        </div>

        
        <div className="absolute bottom-12 left-12 right-4 top-4 flex items-end justify-between gap-2">
          {Array.from({ length: 8 }, (_, i) => {
            const height = 20 + (i % 4) * 20 + Math.sin(i) * 10;
            return (<Skeleton key={`bar-${i}`} className="w-full" style={{ height: `${height}%` }}/>);
        })}
        </div>

        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-md bg-white/80 px-3 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-sm dark:bg-gray-900/80 dark:text-gray-300">
            Loading chart...
          </div>
        </div>
      </div>

      
      {showLegend && (<div className="flex flex-wrap items-center justify-center gap-4">
          {Array.from({ length: legendItems }, (_, i) => (<div key={`legend-${i}`} className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full"/>
              <SkeletonText noOfLines={1} style={{ width: '80px' }}/>
            </div>))}
        </div>)}
    </div>);
};
export const ChartSkeletonSimple = ({ height = 200, className = '' }) => {
    const chartHeight = typeof height === 'number' ? `${height}px` : height;
    return (<div className={`rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 ${className}`} role="img" aria-label="Loading chart" style={{ height: chartHeight }}>
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Skeleton className="mx-auto mb-2 h-8 w-8 rounded-full"/>
          <SkeletonText noOfLines={1} style={{ width: '120px' }}/>
        </div>
      </div>
    </div>);
};
