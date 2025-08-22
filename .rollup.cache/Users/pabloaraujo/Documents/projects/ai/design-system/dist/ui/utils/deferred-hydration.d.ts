import { type ComponentType, type ReactElement, type ReactNode } from 'react';
import { type ProgressiveEnhancementOptions, type VisibilityObserverConfig } from './progressive-enhancement';
export interface DeferredHydrationProps {
    fallback?: ReactNode;
    enhancementOptions?: ProgressiveEnhancementOptions;
    observerConfig?: VisibilityObserverConfig;
    useIntersectionObserver?: boolean;
    delay?: number;
    immediate?: boolean;
    LoadingComponent?: ComponentType;
    className?: string;
    children?: ReactNode;
}
export declare const DeferredHydration: ({ fallback, enhancementOptions, observerConfig, useIntersectionObserver, delay, immediate, LoadingComponent, className, children, }: DeferredHydrationProps) => ReactElement;
export declare const withDeferredHydration: <P extends object>(Component: ComponentType<P>, defaultProps?: Partial<DeferredHydrationProps>) => ComponentType<P & Partial<DeferredHydrationProps>>;
export declare const createDeferredComponent: <P extends object>(importFn: () => Promise<{
    default: ComponentType<P>;
}>, options?: {
    loading?: ComponentType;
    ssr?: boolean;
    hydrationOptions?: Partial<DeferredHydrationProps>;
}) => ComponentType<P & Partial<DeferredHydrationProps>>;
export declare const useDeferredHydration: (options?: Partial<DeferredHydrationProps>) => {
    isHydrated: boolean;
    isVisible: boolean;
    shouldEnhance: boolean;
    hydrate: () => void;
    reset: () => void;
    canHydrate: boolean;
};
