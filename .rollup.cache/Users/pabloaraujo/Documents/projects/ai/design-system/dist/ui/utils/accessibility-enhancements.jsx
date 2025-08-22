'use client';
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
    const content = (<div ref={containerRef} data-accessibility-enhancement="focus" data-enhanced={isEnhanced}>
      {children}
    </div>);
    if (defer) {
        return (<DeferredHydration fallback={fallback} enhancementOptions={ENHANCEMENT_CONFIGS.FOCUS_ENHANCEMENT} observerConfig={{
                rootMargin: '0px',
                threshold: 0.1,
            }}>
        {content}
      </DeferredHydration>);
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
    const content = (<div data-accessibility-enhancement="screenreader" data-enhanced={isEnhanced} data-screenreader-user={isScreenReaderUser} aria-live={config.liveRegion || 'off'} aria-atomic={config.atomic || 'false'}>
      {children}
    </div>);
    if (defer && !isScreenReaderUser) {
        return (<DeferredHydration fallback={fallback} enhancementOptions={ENHANCEMENT_CONFIGS.SCREEN_READER_ENHANCEMENT} observerConfig={{
                rootMargin: '0px',
                threshold: 0.5,
            }}>
        {content}
      </DeferredHydration>);
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
    const content = (<div ref={containerRef} data-accessibility-enhancement="keyboard" data-enhanced={isEnhanced} data-keyboard-user={isKeyboardUser} tabIndex={config.containerTabIndex || -1}>
      {children}
    </div>);
    if (defer && !isKeyboardUser) {
        return (<DeferredHydration fallback={fallback} enhancementOptions={ENHANCEMENT_CONFIGS.KEYBOARD_ENHANCEMENT} observerConfig={{
                rootMargin: '0px',
                threshold: 0.3,
            }}>
        {content}
      </DeferredHydration>);
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
    const content = (<div data-accessibility-enhancement="announcements" data-announcements-count={announcements.length}>
      {typeof children === 'function' ? children({ announce }) : children}

      
      <div aria-live={config.liveRegion || 'polite'} aria-atomic="true" style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
        }}>
        {announcements[announcements.length - 1]}
      </div>
    </div>);
    if (defer) {
        return (<DeferredHydration fallback={fallback} enhancementOptions={ENHANCEMENT_CONFIGS.ACCESSIBILITY_ENHANCEMENT} observerConfig={{
                rootMargin: '0px',
                threshold: 0.1,
            }}>
        {content}
      </DeferredHydration>);
    }
    return content;
}
export function AccessibilityEnhancement({ children, type, config = {}, fallback, defer = true, }) {
    switch (type) {
        case 'focus':
            return (<FocusEnhancement config={config} fallback={fallback} defer={defer}>
          {children}
        </FocusEnhancement>);
        case 'screenreader':
            return (<ScreenReaderEnhancement config={config} fallback={fallback} defer={defer}>
          {children}
        </ScreenReaderEnhancement>);
        case 'keyboard':
            return (<KeyboardEnhancement config={config} fallback={fallback} defer={defer}>
          {children}
        </KeyboardEnhancement>);
        case 'announcements':
            return (<AnnouncementEnhancement config={config} fallback={fallback} defer={defer}>
          {children}
        </AnnouncementEnhancement>);
        default:
            return <>{children}</>;
    }
}
export function withAccessibilityEnhancement(Component, enhancementType, enhancementConfig = {}) {
    return function EnhancedComponent(props) {
        return (<AccessibilityEnhancement type={enhancementType} config={enhancementConfig}>
        <Component {...props}/>
      </AccessibilityEnhancement>);
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
