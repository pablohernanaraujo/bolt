/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/utils/accessibility-enhancements.tsx
// Accessibility enhancement patterns for progressive loading and improved UX
// Provides components and utilities for enhanced accessibility features
// RELEVANT FILES: progressive-enhancement.ts, deferred-hydration.tsx, accessibility.ts

'use client';

import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { DeferredHydration } from './deferred-hydration';
import {
  ENHANCEMENT_CONFIGS,
  enhanceFocusManagement,
  enhanceScreenReaderAnnouncement,
  isKeyboardNavigationPreferred,
  isScreenReaderDetected,
  shouldEnhanceComponent,
} from './progressive-enhancement';

/**
 * Props for accessibility enhancement components
 */
interface AccessibilityEnhancementProps {
  /** Children to enhance */
  children: ReactNode;
  /** Enhancement type */
  type: 'focus' | 'screenreader' | 'keyboard' | 'announcements';
  /** Custom configuration */
  config?: Record<string, any>;
  /** Fallback content */
  fallback?: ReactNode;
  /** Whether to use deferred loading */
  defer?: boolean;
}

/**
 * Props for announcement enhancement component
 */
interface AnnouncementEnhancementProps {
  /** Children - can be ReactNode or function that receives announce function */
  children:
    | ReactNode
    | ((props: {
        announce: (message: string, priority?: 'polite' | 'assertive') => void;
      }) => ReactNode);
  /** Custom configuration */
  config?: Record<string, any>;
  /** Fallback content */
  fallback?: ReactNode;
  /** Whether to use deferred loading */
  defer?: boolean;
}

/**
 * Focus Enhancement Wrapper
 * Provides progressive focus management with keyboard navigation
 */
export function FocusEnhancement({
  children,
  config = {},
  fallback,
  defer = true,
}: Omit<AccessibilityEnhancementProps, 'type'>): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const shouldEnhance = shouldEnhanceComponent(
      ENHANCEMENT_CONFIGS.FOCUS_ENHANCEMENT,
    );
    if (!shouldEnhance) return;

    const cleanup = enhanceFocusManagement(containerRef.current, {
      trapFocus: config.trapFocus || false,
      restoreFocus: config.restoreFocus || true,
      initialFocus: config.initialFocus,
    });

    setIsEnhanced(true);

    return cleanup;
  }, [config]);

  const content = (
    <div
      ref={containerRef}
      data-accessibility-enhancement="focus"
      data-enhanced={isEnhanced}
    >
      {children}
    </div>
  );

  if (defer) {
    return (
      <DeferredHydration
        fallback={fallback}
        enhancementOptions={ENHANCEMENT_CONFIGS.FOCUS_ENHANCEMENT}
        observerConfig={{
          rootMargin: '0px',
          threshold: 0.1,
        }}
      >
        {content}
      </DeferredHydration>
    );
  }

  return content;
}

/**
 * Screen Reader Enhancement Wrapper
 * Provides enhanced screen reader announcements and ARIA support
 */
export function ScreenReaderEnhancement({
  children,
  config = {},
  fallback,
  defer = true,
}: Omit<AccessibilityEnhancementProps, 'type'>): ReactElement {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isScreenReaderUser, setIsScreenReaderUser] = useState(false);

  useEffect(() => {
    const shouldEnhance = shouldEnhanceComponent(
      ENHANCEMENT_CONFIGS.SCREEN_READER_ENHANCEMENT,
    );
    const screenReaderDetected = isScreenReaderDetected();

    setIsScreenReaderUser(screenReaderDetected);

    if (!shouldEnhance) return;

    // Enhanced ARIA live region management
    if (config.announcements) {
      config.announcements.forEach(
        (announcement: { message: string; priority?: string }) => {
          enhanceScreenReaderAnnouncement(
            announcement.message,
            (announcement.priority as 'polite' | 'assertive') || 'polite',
          );
        },
      );
    }

    setIsEnhanced(true);
  }, [config]);

  const content = (
    <div
      data-accessibility-enhancement="screenreader"
      data-enhanced={isEnhanced}
      data-screenreader-user={isScreenReaderUser}
      aria-live={config.liveRegion || 'off'}
      aria-atomic={config.atomic || 'false'}
    >
      {children}
    </div>
  );

  if (defer && !isScreenReaderUser) {
    return (
      <DeferredHydration
        fallback={fallback}
        enhancementOptions={ENHANCEMENT_CONFIGS.SCREEN_READER_ENHANCEMENT}
        observerConfig={{
          rootMargin: '0px',
          threshold: 0.5,
        }}
      >
        {content}
      </DeferredHydration>
    );
  }

  return content;
}

/**
 * Keyboard Navigation Enhancement Wrapper
 * Provides enhanced keyboard navigation patterns
 */
export function KeyboardEnhancement({
  children,
  config = {},
  fallback,
  defer = true,
}: Omit<AccessibilityEnhancementProps, 'type'>): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const shouldEnhance = shouldEnhanceComponent(
      ENHANCEMENT_CONFIGS.KEYBOARD_ENHANCEMENT,
    );
    const keyboardPreferred = isKeyboardNavigationPreferred();

    setIsKeyboardUser(keyboardPreferred);

    if (!shouldEnhance || !containerRef.current) return;

    const container = containerRef.current;

    // Enhanced keyboard navigation
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (config.customKeyHandlers && config.customKeyHandlers[event.key]) {
        config.customKeyHandlers[event.key](event);
      }

      // Arrow key navigation for lists/grids
      if (config.enableArrowNavigation) {
        handleArrowNavigation(event, container);
      }

      // Home/End navigation
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

  const content = (
    <div
      ref={containerRef}
      data-accessibility-enhancement="keyboard"
      data-enhanced={isEnhanced}
      data-keyboard-user={isKeyboardUser}
      tabIndex={config.containerTabIndex || -1}
    >
      {children}
    </div>
  );

  if (defer && !isKeyboardUser) {
    return (
      <DeferredHydration
        fallback={fallback}
        enhancementOptions={ENHANCEMENT_CONFIGS.KEYBOARD_ENHANCEMENT}
        observerConfig={{
          rootMargin: '0px',
          threshold: 0.3,
        }}
      >
        {content}
      </DeferredHydration>
    );
  }

  return content;
}

/**
 * Announcement Enhancement Wrapper
 * Provides dynamic screen reader announcements
 */
export function AnnouncementEnhancement({
  children,
  config = {},
  fallback,
  defer = true,
}: AnnouncementEnhancementProps): ReactElement {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const announce = (
    message: string,
    priority: 'polite' | 'assertive' = 'polite',
  ): void => {
    enhanceScreenReaderAnnouncement(message, priority);
    setAnnouncements((prev) => [...prev, message]);
  };

  useEffect(() => {
    // Auto-announce initial content if configured
    if (config.autoAnnounce && config.initialMessage) {
      announce(config.initialMessage, config.priority || 'polite');
    }
  }, [config]);

  const content = (
    <div
      data-accessibility-enhancement="announcements"
      data-announcements-count={announcements.length}
    >
      {typeof children === 'function' ? children({ announce }) : children}

      {/* Live region for announcements */}
      <div
        aria-live={config.liveRegion || 'polite'}
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {announcements[announcements.length - 1]}
      </div>
    </div>
  );

  if (defer) {
    return (
      <DeferredHydration
        fallback={fallback}
        enhancementOptions={ENHANCEMENT_CONFIGS.ACCESSIBILITY_ENHANCEMENT}
        observerConfig={{
          rootMargin: '0px',
          threshold: 0.1,
        }}
      >
        {content}
      </DeferredHydration>
    );
  }

  return content;
}

/**
 * Main Accessibility Enhancement Component
 * Provides unified accessibility enhancements based on type
 */
export function AccessibilityEnhancement({
  children,
  type,
  config = {},
  fallback,
  defer = true,
}: AccessibilityEnhancementProps): ReactElement {
  switch (type) {
    case 'focus':
      return (
        <FocusEnhancement config={config} fallback={fallback} defer={defer}>
          {children}
        </FocusEnhancement>
      );

    case 'screenreader':
      return (
        <ScreenReaderEnhancement
          config={config}
          fallback={fallback}
          defer={defer}
        >
          {children}
        </ScreenReaderEnhancement>
      );

    case 'keyboard':
      return (
        <KeyboardEnhancement config={config} fallback={fallback} defer={defer}>
          {children}
        </KeyboardEnhancement>
      );

    case 'announcements':
      return (
        <AnnouncementEnhancement
          config={config}
          fallback={fallback}
          defer={defer}
        >
          {children}
        </AnnouncementEnhancement>
      );

    default:
      return <>{children}</>;
  }
}

/**
 * Higher-order component for adding accessibility enhancements
 */
export function withAccessibilityEnhancement<P extends object>(
  Component: ComponentType<P>,
  enhancementType: AccessibilityEnhancementProps['type'],
  enhancementConfig: Record<string, any> = {},
): ComponentType<P> {
  return function EnhancedComponent(props: P): ReactElement {
    return (
      <AccessibilityEnhancement
        type={enhancementType}
        config={enhancementConfig}
      >
        <Component {...props} />
      </AccessibilityEnhancement>
    );
  };
}

/**
 * Utility functions for keyboard navigation
 */

function handleArrowNavigation(
  event: KeyboardEvent,
  container: HTMLElement,
): void {
  const focusableElements = container.querySelectorAll(
    'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
  ) as NodeListOf<HTMLElement>;

  if (focusableElements.length === 0) return;

  const currentIndex = Array.from(focusableElements).indexOf(
    document.activeElement as HTMLElement,
  );

  if (currentIndex === -1) return;

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

function handleHomeEndNavigation(
  event: KeyboardEvent,
  container: HTMLElement,
): void {
  const focusableElements = container.querySelectorAll(
    'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
  ) as NodeListOf<HTMLElement>;

  if (focusableElements.length === 0) return;

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
