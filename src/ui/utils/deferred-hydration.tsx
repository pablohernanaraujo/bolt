/* eslint-disable max-statements */
// /src/ui/utils/deferred-hydration.tsx
// Deferred hydration wrapper for heavy components with progressive enhancement
// Provides intersection-based loading and fallback rendering for optimal performance
// RELEVANT FILES: progressive-enhancement.ts, server-theme.ts, layout.tsx

'use client';

import dynamic from 'next/dynamic';
import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  createVisibilityObserver,
  ENHANCEMENT_CONFIGS,
  type ProgressiveEnhancementOptions,
  shouldEnhanceComponent,
  type VisibilityObserverConfig,
} from './progressive-enhancement';

/**
 * Props for the DeferredHydration wrapper component
 */
export interface DeferredHydrationProps {
  /** Fallback content to show while component is not hydrated */
  fallback?: ReactNode;
  /** Configuration for progressive enhancement behavior */
  enhancementOptions?: ProgressiveEnhancementOptions;
  /** Configuration for visibility observer */
  observerConfig?: VisibilityObserverConfig;
  /** Whether to use intersection observer for loading */
  useIntersectionObserver?: boolean;
  /** Delay in milliseconds before hydrating (useful for non-critical components) */
  delay?: number;
  /** Whether component should hydrate immediately on mount */
  immediate?: boolean;
  /** Custom loading state component */
  LoadingComponent?: ComponentType;
  /** Class name for the wrapper element */
  className?: string;
  /** Children to render (for inline usage) */
  children?: ReactNode;
}

/**
 * Deferred Hydration Wrapper Component
 *
 * Implements progressive enhancement by:
 * 1. Showing fallback content initially (server-rendered or lightweight)
 * 2. Deferring hydration until component becomes visible
 * 3. Respecting user preferences (reduced motion, data saver)
 * 4. Gracefully handling cases where JavaScript is disabled
 *
 * Usage patterns:
 *
 * 1. Wrap heavy components:
 * ```tsx
 * <DeferredHydration fallback={<ChartSkeleton />}>
 *   <ExpensiveChart data={data} />
 * </DeferredHydration>
 * ```
 *
 * 2. For dynamic imports:
 * ```tsx
 * const HeavyComponent = createDeferredComponent(() => import('./HeavyComponent'));
 * ```
 *
 * 3. Custom configuration:
 * ```tsx
 * <DeferredHydration
 *   enhancementOptions={ENHANCEMENT_CONFIGS.HEAVY_COMPONENT}
 *   observerConfig={{ rootMargin: '100px' }}
 *   fallback={<Skeleton />}
 * >
 *   <DataTable data={largeDataset} />
 * </DeferredHydration>
 * ```
 */
export const DeferredHydration = ({
  fallback = null,
  enhancementOptions = ENHANCEMENT_CONFIGS.HEAVY_COMPONENT,
  observerConfig = {},
  useIntersectionObserver = true,
  delay = 0,
  immediate = false,
  LoadingComponent,
  className,
  children,
}: DeferredHydrationProps): ReactElement => {
  const [isHydrated, setIsHydrated] = useState(immediate);
  const [isVisible, setIsVisible] = useState(!useIntersectionObserver);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Determine if component should be enhanced
  const shouldEnhance = shouldEnhanceComponent(enhancementOptions);

  useEffect(() => {
    // If enhancement is disabled, show fallback permanently
    if (!shouldEnhance) {
      return;
    }

    // If immediate hydration is requested, hydrate now
    if (immediate) {
      const timer = setTimeout(() => setIsHydrated(true), delay);
      return () => clearTimeout(timer);
    }

    // Setup intersection observer if requested
    if (useIntersectionObserver && elementRef.current) {
      const config: VisibilityObserverConfig = {
        rootMargin: '50px',
        threshold: 0.1,
        once: true,
        ...observerConfig,
      };

      observerRef.current = createVisibilityObserver((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Handle minimum visible time if specified
          if (config.minVisibleTime && config.minVisibleTime > 0) {
            setTimeout(() => {
              // Re-check if still visible
              const rect = entry.target.getBoundingClientRect();
              const isStillVisible =
                rect.top < window.innerHeight && rect.bottom > 0;
              if (isStillVisible) {
                setIsHydrated(true);
              }
            }, config.minVisibleTime);
          } else {
            // Apply delay if specified
            const timer = setTimeout(() => setIsHydrated(true), delay);
            return () => clearTimeout(timer);
          }

          // Disconnect observer if configured to run once
          if (config.once && observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      }, config);

      if (observerRef.current && elementRef.current) {
        observerRef.current.observe(elementRef.current);
      }
    } else {
      // No intersection observer, hydrate after delay
      const timer = setTimeout(() => setIsHydrated(true), delay);
      return () => clearTimeout(timer);
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    shouldEnhance,
    immediate,
    useIntersectionObserver,
    delay,
    observerConfig,
  ]);

  // Render loading component if specified
  if (LoadingComponent && !isHydrated && shouldEnhance) {
    return (
      <div ref={elementRef} className={className}>
        <LoadingComponent />
      </div>
    );
  }

  // If not enhanced or not hydrated (and visible when using intersection observer), show fallback
  if (
    !shouldEnhance ||
    (!isHydrated && (useIntersectionObserver ? isVisible : true))
  ) {
    return (
      <div ref={elementRef} className={className}>
        {fallback}
      </div>
    );
  }

  // Component is hydrated, render children
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

/**
 * Higher-order component for creating deferred components
 * Useful for wrapping heavy components with automatic deferred hydration
 *
 * @param Component The component to defer
 * @param defaultProps Default props for DeferredHydration
 * @returns Wrapped component with deferred hydration
 */
export const withDeferredHydration = <P extends object>(
  Component: ComponentType<P>,
  defaultProps: Partial<DeferredHydrationProps> = {},
): ComponentType<P & Partial<DeferredHydrationProps>> => {
  const DeferredComponent = (
    props: P & Partial<DeferredHydrationProps>,
  ): ReactElement => {
    const { fallback, enhancementOptions, observerConfig, ...componentProps } =
      props;

    return (
      <DeferredHydration
        fallback={fallback}
        enhancementOptions={enhancementOptions}
        observerConfig={observerConfig}
        {...defaultProps}
      >
        <Component {...(componentProps as P)} />
      </DeferredHydration>
    );
  };

  DeferredComponent.displayName = `withDeferredHydration(${Component.displayName || Component.name})`;

  return DeferredComponent;
};

/**
 * Utility for creating dynamically imported components with deferred hydration
 * Combines Next.js dynamic imports with intersection-based loading
 *
 * @param importFn Function that returns a dynamic import
 * @param options Configuration for both dynamic import and deferred hydration
 * @returns Dynamically imported component with deferred hydration
 */
export const createDeferredComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    /** Loading component to show while importing */
    loading?: ComponentType;
    /** Whether to disable SSR for this component */
    ssr?: boolean;
    /** Deferred hydration options */
    hydrationOptions?: Partial<DeferredHydrationProps>;
  } = {},
): ComponentType<P & Partial<DeferredHydrationProps>> => {
  const {
    loading: LoadingComponent,
    ssr = false,
    hydrationOptions = {},
  } = options;

  // Create dynamic component with Next.js
  const DynamicComponent = dynamic(importFn, {
    loading: LoadingComponent
      ? (): ReactElement => <LoadingComponent />
      : undefined,
    ssr,
  });

  // Wrap with deferred hydration
  const DeferredDynamicComponent = (
    props: P & Partial<DeferredHydrationProps>,
  ): ReactElement => {
    const mergedOptions = {
      ...ENHANCEMENT_CONFIGS.HEAVY_COMPONENT,
      ...hydrationOptions,
      ...props,
    };

    return (
      <DeferredHydration {...mergedOptions}>
        <DynamicComponent {...(props as P)} />
      </DeferredHydration>
    );
  };

  DeferredDynamicComponent.displayName = 'DeferredDynamicComponent';

  return DeferredDynamicComponent;
};

/**
 * Hook for manual control over deferred hydration
 * Useful when you need custom logic for when to hydrate
 *
 * @param options Configuration for the hydration behavior
 * @returns Object with hydration state and controls
 */
export const useDeferredHydration = (
  options: Partial<DeferredHydrationProps> = {},
): {
  isHydrated: boolean;
  isVisible: boolean;
  shouldEnhance: boolean;
  hydrate: () => void;
  reset: () => void;
  canHydrate: boolean;
} => {
  const [isHydrated, setIsHydrated] = useState(options.immediate || false);
  const [isVisible, setIsVisible] = useState(!options.useIntersectionObserver);

  const shouldEnhance = shouldEnhanceComponent(options.enhancementOptions);

  const hydrate = (): void => {
    if (shouldEnhance) {
      setIsHydrated(true);
    }
  };

  const reset = (): void => {
    setIsHydrated(false);
    setIsVisible(!options.useIntersectionObserver);
  };

  return {
    isHydrated: isHydrated && shouldEnhance,
    isVisible,
    shouldEnhance,
    hydrate,
    reset,
    canHydrate: shouldEnhance && (options.immediate || isVisible),
  };
};
