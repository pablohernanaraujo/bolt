export const isJavaScriptAvailable = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    try {
        return (typeof document !== 'undefined' &&
            typeof window.addEventListener === 'function');
    }
    catch {
        return false;
    }
};
export const shouldEnhanceComponent = (options = {}) => {
    if (!isJavaScriptAvailable()) {
        return false;
    }
    const { respectReducedMotion = true, respectDataSaver = true, requireIntersectionObserver = false, } = options;
    if (respectReducedMotion &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
    }
    if (respectDataSaver && 'connection' in navigator) {
        const connection = navigator.connection;
        if (connection?.saveData) {
            return false;
        }
    }
    if (requireIntersectionObserver && !('IntersectionObserver' in window)) {
        return false;
    }
    return true;
};
export const createVisibilityObserver = (callback, options = {}) => {
    if (!('IntersectionObserver' in window)) {
        setTimeout(() => {
            callback({
                isIntersecting: true,
                intersectionRatio: 1,
                target: document.body,
                boundingClientRect: document.body.getBoundingClientRect(),
                intersectionRect: document.body.getBoundingClientRect(),
                rootBounds: null,
                time: Date.now(),
            });
        }, 0);
        return null;
    }
    const defaultOptions = {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
    };
    return new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                callback(entry);
            }
        }
    }, defaultOptions);
};
export const enhanceForm = (formElement, onSubmit) => {
    const handleSubmit = async (event) => {
        if (shouldEnhanceComponent()) {
            event.preventDefault();
            try {
                const formData = new FormData(formElement);
                await onSubmit(formData, event);
            }
            catch (error) {
                console.warn('Enhanced form submission failed, falling back to default:', error);
                formElement.submit();
            }
        }
    };
    formElement.addEventListener('submit', handleSubmit);
    return () => {
        formElement.removeEventListener('submit', handleSubmit);
    };
};
export const enhanceButton = (buttonElement, onClick) => {
    const handleClick = async (event) => {
        if (shouldEnhanceComponent()) {
            try {
                await onClick(event);
            }
            catch (error) {
                console.warn('Enhanced button click failed:', error);
            }
        }
    };
    buttonElement.addEventListener('click', handleClick);
    return () => {
        buttonElement.removeEventListener('click', handleClick);
    };
};
export const isScreenReaderDetected = () => {
    if (typeof window === 'undefined')
        return false;
    try {
        const hasScreenReaderAPI = 'speechSynthesis' in window;
        const hasAccessibilityAPI = 'getComputedStyle' in window;
        const hasAriaSupport = document.body?.setAttribute !== undefined;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        return (hasScreenReaderAPI &&
            hasAccessibilityAPI &&
            hasAriaSupport &&
            (prefersReducedMotion || prefersHighContrast));
    }
    catch {
        return false;
    }
};
export const isKeyboardNavigationPreferred = () => {
    if (typeof window === 'undefined')
        return false;
    try {
        const forcedColors = window.matchMedia('(forced-colors: active)').matches;
        const isPrimaryTouch = window.matchMedia('(pointer: coarse)').matches;
        return forcedColors || !isPrimaryTouch;
    }
    catch {
        return true;
    }
};
export const enhanceFocusManagement = (containerElement, options = {}) => {
    const { trapFocus = false, restoreFocus = true, initialFocus } = options;
    let previousActiveElement = null;
    let focusTrapActive = false;
    const getFocusableElements = () => {
        const selectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]',
        ].join(', ');
        return Array.from(containerElement.querySelectorAll(selectors)).filter((el) => !el.hasAttribute('aria-hidden'));
    };
    const handleKeyDown = (event) => {
        if (!trapFocus || !focusTrapActive)
            return;
        if (event.key === 'Tab') {
            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0)
                return;
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            }
            else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
        if (event.key === 'Escape' && trapFocus) {
            event.preventDefault();
            deactivateFocusTrap();
        }
    };
    const activateFocusTrap = () => {
        if (restoreFocus) {
            previousActiveElement = document.activeElement;
        }
        focusTrapActive = true;
        if (initialFocus) {
            const target = typeof initialFocus === 'string'
                ? containerElement.querySelector(initialFocus)
                : initialFocus;
            if (target) {
                target.focus();
            }
        }
        else {
            const focusableElements = getFocusableElements();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
    };
    const deactivateFocusTrap = () => {
        focusTrapActive = false;
        document.removeEventListener('keydown', handleKeyDown);
        if (restoreFocus && previousActiveElement) {
            previousActiveElement.focus();
            previousActiveElement = null;
        }
    };
    if (trapFocus) {
        activateFocusTrap();
    }
    return deactivateFocusTrap;
};
export const enhanceScreenReaderAnnouncement = (message, priority = 'polite') => {
    if (typeof document === 'undefined') {
        return () => { };
    }
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `;
    document.body.appendChild(announcement);
    announcement.textContent = message;
    const cleanup = () => {
        if (announcement.parentNode) {
            announcement.parentNode.removeChild(announcement);
        }
    };
    setTimeout(cleanup, 1000);
    return cleanup;
};
export const useProgressiveEnhancement = (dependencies = []) => ({
    isEnhanced: isJavaScriptAvailable(),
    shouldEnhance: shouldEnhanceComponent(),
    createObserver: createVisibilityObserver,
    enhanceForm,
    enhanceButton,
    enhanceFocusManagement,
    enhanceScreenReaderAnnouncement,
    isScreenReaderDetected: isScreenReaderDetected(),
    isKeyboardNavigationPreferred: isKeyboardNavigationPreferred(),
});
export const ENHANCEMENT_CONFIGS = {
    HEAVY_COMPONENT: {
        respectReducedMotion: true,
        respectDataSaver: true,
        requireIntersectionObserver: true,
        enhancementDelay: 100,
    },
    INTERACTIVE_OVERLAY: {
        respectReducedMotion: false,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
    FORM_ENHANCEMENT: {
        respectReducedMotion: true,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
    THEME_ENHANCEMENT: {
        respectReducedMotion: true,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
    ACCESSIBILITY_ENHANCEMENT: {
        respectReducedMotion: true,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
    SCREEN_READER_ENHANCEMENT: {
        respectReducedMotion: true,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
    KEYBOARD_ENHANCEMENT: {
        respectReducedMotion: true,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
    FOCUS_ENHANCEMENT: {
        respectReducedMotion: true,
        respectDataSaver: false,
        requireIntersectionObserver: false,
        enhancementDelay: 0,
    },
};
