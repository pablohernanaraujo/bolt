'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from 'react';
import { DeferredHydration } from './deferred-hydration';
import { ENHANCEMENT_CONFIGS, enhanceFocusManagement, enhanceScreenReaderAnnouncement, isKeyboardNavigationPreferred, isScreenReaderDetected, shouldEnhanceComponent, } from './progressive-enhancement';
export function FocusEnhancement({ children, config = {}, fallback, defer = true, }) {
    const containerRef = useRef(null);
    const [isEnhanced, setIsEnhanced] = useState(false);
    useEffect(() => {
        if (!containerRef.current)
            return;
        const shouldEnhance = shouldEnhanceComponent(ENHANCEMENT_CONFIGS.FOCUS_ENHANCEMENT);
        if (!shouldEnhance)
            return;
        const cleanup = enhanceFocusManagement(containerRef.current, {
            trapFocus: config.trapFocus || false,
            restoreFocus: config.restoreFocus || true,
            initialFocus: config.initialFocus,
        });
        setIsEnhanced(true);
        return cleanup;
    }, [config]);
    const content = (_jsx("div", { ref: containerRef, "data-accessibility-enhancement": "focus", "data-enhanced": isEnhanced, children: children }));
    if (defer) {
        return (_jsx(DeferredHydration, { fallback: fallback, enhancementOptions: ENHANCEMENT_CONFIGS.FOCUS_ENHANCEMENT, observerConfig: {
                rootMargin: '0px',
                threshold: 0.1,
            }, children: content }));
    }
    return content;
}
export function ScreenReaderEnhancement({ children, config = {}, fallback, defer = true, }) {
    const [isEnhanced, setIsEnhanced] = useState(false);
    const [isScreenReaderUser, setIsScreenReaderUser] = useState(false);
    useEffect(() => {
        const shouldEnhance = shouldEnhanceComponent(ENHANCEMENT_CONFIGS.SCREEN_READER_ENHANCEMENT);
        const screenReaderDetected = isScreenReaderDetected();
        setIsScreenReaderUser(screenReaderDetected);
        if (!shouldEnhance)
            return;
        if (config.announcements) {
            config.announcements.forEach((announcement) => {
                enhanceScreenReaderAnnouncement(announcement.message, announcement.priority || 'polite');
            });
        }
        setIsEnhanced(true);
    }, [config]);
    const content = (_jsx("div", { "data-accessibility-enhancement": "screenreader", "data-enhanced": isEnhanced, "data-screenreader-user": isScreenReaderUser, "aria-live": config.liveRegion || 'off', "aria-atomic": config.atomic || 'false', children: children }));
    if (defer && !isScreenReaderUser) {
        return (_jsx(DeferredHydration, { fallback: fallback, enhancementOptions: ENHANCEMENT_CONFIGS.SCREEN_READER_ENHANCEMENT, observerConfig: {
                rootMargin: '0px',
                threshold: 0.5,
            }, children: content }));
    }
    return content;
}
export function KeyboardEnhancement({ children, config = {}, fallback, defer = true, }) {
    const containerRef = useRef(null);
    const [isEnhanced, setIsEnhanced] = useState(false);
    const [isKeyboardUser, setIsKeyboardUser] = useState(false);
    useEffect(() => {
        const shouldEnhance = shouldEnhanceComponent(ENHANCEMENT_CONFIGS.KEYBOARD_ENHANCEMENT);
        const keyboardPreferred = isKeyboardNavigationPreferred();
        setIsKeyboardUser(keyboardPreferred);
        if (!shouldEnhance || !containerRef.current)
            return;
        const container = containerRef.current;
        const handleKeyDown = (event) => {
            if (config.customKeyHandlers && config.customKeyHandlers[event.key]) {
                config.customKeyHandlers[event.key](event);
            }
            if (config.enableArrowNavigation) {
                handleArrowNavigation(event, container);
            }
            if (config.enableHomeEndNavigation) {
                handleHomeEndNavigation(event, container);
            }
        };
        container.addEventListener('keydown', handleKeyDown);
        setIsEnhanced(true);
        return () => {
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [config]);
    const content = (_jsx("div", { ref: containerRef, "data-accessibility-enhancement": "keyboard", "data-enhanced": isEnhanced, "data-keyboard-user": isKeyboardUser, tabIndex: config.containerTabIndex || -1, children: children }));
    if (defer && !isKeyboardUser) {
        return (_jsx(DeferredHydration, { fallback: fallback, enhancementOptions: ENHANCEMENT_CONFIGS.KEYBOARD_ENHANCEMENT, observerConfig: {
                rootMargin: '0px',
                threshold: 0.3,
            }, children: content }));
    }
    return content;
}
export function AnnouncementEnhancement({ children, config = {}, fallback, defer = true, }) {
    const [announcements, setAnnouncements] = useState([]);
    const announce = (message, priority = 'polite') => {
        enhanceScreenReaderAnnouncement(message, priority);
        setAnnouncements((prev) => [...prev, message]);
    };
    useEffect(() => {
        if (config.autoAnnounce && config.initialMessage) {
            announce(config.initialMessage, config.priority || 'polite');
        }
    }, [config]);
    const content = (_jsxs("div", { "data-accessibility-enhancement": "announcements", "data-announcements-count": announcements.length, children: [typeof children === 'function' ? children({ announce }) : children, _jsx("div", { "aria-live": config.liveRegion || 'polite', "aria-atomic": "true", style: {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                }, children: announcements[announcements.length - 1] })] }));
    if (defer) {
        return (_jsx(DeferredHydration, { fallback: fallback, enhancementOptions: ENHANCEMENT_CONFIGS.ACCESSIBILITY_ENHANCEMENT, observerConfig: {
                rootMargin: '0px',
                threshold: 0.1,
            }, children: content }));
    }
    return content;
}
export function AccessibilityEnhancement({ children, type, config = {}, fallback, defer = true, }) {
    switch (type) {
        case 'focus':
            return (_jsx(FocusEnhancement, { config: config, fallback: fallback, defer: defer, children: children }));
        case 'screenreader':
            return (_jsx(ScreenReaderEnhancement, { config: config, fallback: fallback, defer: defer, children: children }));
        case 'keyboard':
            return (_jsx(KeyboardEnhancement, { config: config, fallback: fallback, defer: defer, children: children }));
        case 'announcements':
            return (_jsx(AnnouncementEnhancement, { config: config, fallback: fallback, defer: defer, children: children }));
        default:
            return _jsx(_Fragment, { children: children });
    }
}
export function withAccessibilityEnhancement(Component, enhancementType, enhancementConfig = {}) {
    return function EnhancedComponent(props) {
        return (_jsx(AccessibilityEnhancement, { type: enhancementType, config: enhancementConfig, children: _jsx(Component, { ...props }) }));
    };
}
function handleArrowNavigation(event, container) {
    const focusableElements = container.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length === 0)
        return;
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
    if (currentIndex === -1)
        return;
    let nextIndex = currentIndex;
    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            nextIndex = (currentIndex + 1) % focusableElements.length;
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
            nextIndex =
                currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
            break;
        default:
            return;
    }
    event.preventDefault();
    focusableElements[nextIndex].focus();
}
function handleHomeEndNavigation(event, container) {
    const focusableElements = container.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length === 0)
        return;
    switch (event.key) {
        case 'Home':
            event.preventDefault();
            focusableElements[0].focus();
            break;
        case 'End':
            event.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
            break;
    }
}
