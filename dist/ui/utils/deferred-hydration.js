import { jsx } from 'react/jsx-runtime';
import dynamic from '../../_virtual/dynamic.js';
import { useState, useRef, useEffect } from 'react';
import { ENHANCEMENT_CONFIGS, shouldEnhanceComponent, createVisibilityObserver } from './progressive-enhancement.js';

const DeferredHydration = ({ fallback = null, enhancementOptions = ENHANCEMENT_CONFIGS.HEAVY_COMPONENT, observerConfig = {}, useIntersectionObserver = true, delay = 0, immediate = false, LoadingComponent, className, children, }) => {
    const [isHydrated, setIsHydrated] = useState(immediate);
    const [isVisible, setIsVisible] = useState(!useIntersectionObserver);
    const elementRef = useRef(null);
    const observerRef = useRef(null);
    const shouldEnhance = shouldEnhanceComponent(enhancementOptions);
    useEffect(() => {
        if (!shouldEnhance) {
            return;
        }
        if (immediate) {
            const timer = setTimeout(() => setIsHydrated(true), delay);
            return () => clearTimeout(timer);
        }
        if (useIntersectionObserver && elementRef.current) {
            const config = {
                rootMargin: '50px',
                threshold: 0.1,
                once: true,
                ...observerConfig,
            };
            observerRef.current = createVisibilityObserver((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (config.minVisibleTime && config.minVisibleTime > 0) {
                        setTimeout(() => {
                            const rect = entry.target.getBoundingClientRect();
                            const isStillVisible = rect.top < window.innerHeight && rect.bottom > 0;
                            if (isStillVisible) {
                                setIsHydrated(true);
                            }
                        }, config.minVisibleTime);
                    }
                    else {
                        const timer = setTimeout(() => setIsHydrated(true), delay);
                        return () => clearTimeout(timer);
                    }
                    if (config.once && observerRef.current) {
                        observerRef.current.disconnect();
                    }
                }
            }, config);
            if (observerRef.current && elementRef.current) {
                observerRef.current.observe(elementRef.current);
            }
        }
        else {
            const timer = setTimeout(() => setIsHydrated(true), delay);
            return () => clearTimeout(timer);
        }
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
    if (LoadingComponent && !isHydrated && shouldEnhance) {
        return (jsx("div", { ref: elementRef, className: className, children: jsx(LoadingComponent, {}) }));
    }
    if (!shouldEnhance ||
        (!isHydrated && (useIntersectionObserver ? isVisible : true))) {
        return (jsx("div", { ref: elementRef, className: className, children: fallback }));
    }
    return (jsx("div", { ref: elementRef, className: className, children: children }));
};
const withDeferredHydration = (Component, defaultProps = {}) => {
    const DeferredComponent = (props) => {
        const { fallback, enhancementOptions, observerConfig, ...componentProps } = props;
        return (jsx(DeferredHydration, { fallback: fallback, enhancementOptions: enhancementOptions, observerConfig: observerConfig, ...defaultProps, children: jsx(Component, { ...componentProps }) }));
    };
    DeferredComponent.displayName = `withDeferredHydration(${Component.displayName || Component.name})`;
    return DeferredComponent;
};
const createDeferredComponent = (importFn, options = {}) => {
    const { loading: LoadingComponent, ssr = false, hydrationOptions = {}, } = options;
    const DynamicComponent = dynamic(importFn, {
        loading: LoadingComponent
            ? () => jsx(LoadingComponent, {})
            : undefined,
        ssr,
    });
    const DeferredDynamicComponent = (props) => {
        const mergedOptions = {
            ...ENHANCEMENT_CONFIGS.HEAVY_COMPONENT,
            ...hydrationOptions,
            ...props,
        };
        return (jsx(DeferredHydration, { ...mergedOptions, children: jsx(DynamicComponent, { ...props }) }));
    };
    DeferredDynamicComponent.displayName = 'DeferredDynamicComponent';
    return DeferredDynamicComponent;
};
const useDeferredHydration = (options = {}) => {
    const [isHydrated, setIsHydrated] = useState(options.immediate || false);
    const [isVisible, setIsVisible] = useState(!options.useIntersectionObserver);
    const shouldEnhance = shouldEnhanceComponent(options.enhancementOptions);
    const hydrate = () => {
        if (shouldEnhance) {
            setIsHydrated(true);
        }
    };
    const reset = () => {
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

export { DeferredHydration, createDeferredComponent, useDeferredHydration, withDeferredHydration };
//# sourceMappingURL=deferred-hydration.js.map
