/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/utils/progressive-enhancement.ts
// Utilities for implementing progressive enhancement patterns in the design system
// Provides helpers for deferred hydration, intersection-based loading, and client enhancement detection
// RELEVANT FILES: deferred-hydration.tsx, server-theme.ts, layout.tsx

/**
 * Progressive Enhancement Utilities
 *
 * These utilities help implement the progressive enhancement pattern:
 * 1. Start with server-rendered, functional baseline
 * 2. Enhance with JavaScript when available and needed
 * 3. Gracefully degrade when JS fails or is disabled
 */

/**
 * Detects if JavaScript is available and working
 * Useful for components that need to conditionally enhance behavior
 *
 * @returns boolean indicating if JS enhancement is available
 */
export const isJavaScriptAvailable = (): boolean => {
  if (typeof window === 'undefined') {
    // Server-side: assume JS will be available
    return false;
  }

  try {
    // Client-side: verify JS is working
    return (
      typeof document !== 'undefined' &&
      typeof window.addEventListener === 'function'
    );
  } catch {
    return false;
  }
};

/**
 * Checks if a component should be enhanced with client-side JavaScript
 * Based on user preferences and environment capabilities
 *
 * @param options Configuration for enhancement detection
 * @returns boolean indicating if enhancement should be applied
 */
export const shouldEnhanceComponent = (
  options: {
    respectReducedMotion?: boolean;
    respectDataSaver?: boolean;
    requireIntersectionObserver?: boolean;
  } = {},
): boolean => {
  if (!isJavaScriptAvailable()) {
    return false;
  }

  const {
    respectReducedMotion = true,
    respectDataSaver = true,
    requireIntersectionObserver = false,
  } = options;

  // Check for reduced motion preference
  if (
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return false;
  }

  // Check for data saver mode
  if (respectDataSaver && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection?.saveData) {
      return false;
    }
  }

  // Check for required APIs
  if (requireIntersectionObserver && !('IntersectionObserver' in window)) {
    return false;
  }

  return true;
};

/**
 * Creates an intersection observer for triggering component hydration
 * Useful for deferring expensive components until they're visible
 *
 * @param callback Function to call when element becomes visible
 * @param options IntersectionObserver options
 * @returns IntersectionObserver instance or null if not supported
 */
export const createVisibilityObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {},
): IntersectionObserver | null => {
  if (!('IntersectionObserver' in window)) {
    // Fallback: immediately trigger callback
    setTimeout(() => {
      callback({
        isIntersecting: true,
        intersectionRatio: 1,
        target: document.body,
        boundingClientRect: document.body.getBoundingClientRect(),
        intersectionRect: document.body.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      } as IntersectionObserverEntry);
    }, 0);
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px', // Start loading 50px before element is visible
    threshold: 0.1, // Trigger when 10% visible
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

/**
 * Utility for progressive form enhancement
 * Converts forms from basic POST submission to AJAX with graceful fallback
 *
 * @param formElement The form element to enhance
 * @param onSubmit Custom submit handler
 * @returns Cleanup function
 */
export const enhanceForm = (
  formElement: HTMLFormElement,
  onSubmit: (formData: FormData, event: SubmitEvent) => Promise<void> | void,
): (() => void) => {
  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    // Only prevent default if we can handle the submission
    if (shouldEnhanceComponent()) {
      event.preventDefault();

      try {
        const formData = new FormData(formElement);
        await onSubmit(formData, event);
      } catch (error) {
        console.warn(
          'Enhanced form submission failed, falling back to default:',
          error,
        );
        // Allow form to submit normally
        formElement.submit();
      }
    }
    // If enhancement shouldn't be applied, let form submit normally
  };

  formElement.addEventListener('submit', handleSubmit);

  // Return cleanup function
  return () => {
    formElement.removeEventListener('submit', handleSubmit);
  };
};

/**
 * Utility for progressive button enhancement
 * Adds client-side behavior while preserving server-side functionality
 *
 * @param buttonElement The button element to enhance
 * @param onClick Enhanced click handler
 * @returns Cleanup function
 */
export const enhanceButton = (
  buttonElement: HTMLButtonElement,
  onClick: (event: MouseEvent) => Promise<void> | void,
): (() => void) => {
  const handleClick = async (event: MouseEvent): Promise<void> => {
    if (shouldEnhanceComponent()) {
      try {
        await onClick(event);
      } catch (error) {
        console.warn('Enhanced button click failed:', error);
        // Don't prevent default behavior on error
      }
    }
  };

  buttonElement.addEventListener('click', handleClick);

  // Return cleanup function
  return () => {
    buttonElement.removeEventListener('click', handleClick);
  };
};

/**
 * Enhanced accessibility detection utilities
 */

/**
 * Detects if user is likely using a screen reader
 * @returns boolean indicating probable screen reader usage
 */
export const isScreenReaderDetected = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    // Check for screen reader specific properties
    const hasScreenReaderAPI = 'speechSynthesis' in window;
    const hasAccessibilityAPI = 'getComputedStyle' in window;
    const hasAriaSupport = document.body?.setAttribute !== undefined;

    // Check for reduced motion (often used by screen reader users)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Check for high contrast mode (Windows accessibility feature)
    const prefersHighContrast = window.matchMedia(
      '(prefers-contrast: high)',
    ).matches;

    // Basic heuristic - not 100% accurate but useful for enhancement decisions
    return (
      hasScreenReaderAPI &&
      hasAccessibilityAPI &&
      hasAriaSupport &&
      (prefersReducedMotion || prefersHighContrast)
    );
  } catch {
    return false;
  }
};

/**
 * Detects user's keyboard navigation preference
 * @returns boolean indicating if user prefers keyboard navigation
 */
export const isKeyboardNavigationPreferred = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    // Check for forced colors mode (often used with keyboard navigation)
    const forcedColors = window.matchMedia('(forced-colors: active)').matches;

    // Check if touch is primary input (inverse indicator)
    const isPrimaryTouch = window.matchMedia('(pointer: coarse)').matches;

    // Prefer keyboard navigation if not primarily touch-based or in forced colors mode
    return forcedColors || !isPrimaryTouch;
  } catch {
    return true; // Default to keyboard-friendly
  }
};

/**
 * Enhanced accessibility utility functions
 */

/**
 * Enhance focus management for better keyboard navigation
 * @param containerElement Container to enhance
 * @param options Configuration options
 * @returns Cleanup function
 */
export const enhanceFocusManagement = (
  containerElement: HTMLElement,
  options: {
    trapFocus?: boolean;
    restoreFocus?: boolean;
    initialFocus?: HTMLElement | string;
  } = {},
): (() => void) => {
  const { trapFocus = false, restoreFocus = true, initialFocus } = options;

  let previousActiveElement: HTMLElement | null = null;
  let focusTrapActive = false;

  const getFocusableElements = (): HTMLElement[] => {
    const selectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(containerElement.querySelectorAll(selectors)).filter(
      (el) => !el.hasAttribute('aria-hidden'),
    ) as HTMLElement[];
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (!trapFocus || !focusTrapActive) return;

    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
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

  const activateFocusTrap = (): void => {
    if (restoreFocus) {
      previousActiveElement = document.activeElement as HTMLElement;
    }

    focusTrapActive = true;

    // Set initial focus
    if (initialFocus) {
      const target =
        typeof initialFocus === 'string'
          ? (containerElement.querySelector(initialFocus) as HTMLElement)
          : initialFocus;

      if (target) {
        target.focus();
      }
    } else {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
  };

  const deactivateFocusTrap = (): void => {
    focusTrapActive = false;
    document.removeEventListener('keydown', handleKeyDown);

    if (restoreFocus && previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  };

  // Auto-activate if trapFocus is enabled
  if (trapFocus) {
    activateFocusTrap();
  }

  return deactivateFocusTrap;
};

/**
 * Enhance screen reader announcements
 * @param message Message to announce
 * @param priority Announcement priority
 * @returns Cleanup function
 */
export const enhanceScreenReaderAnnouncement = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
): (() => void) => {
  if (typeof document === 'undefined') {
    return () => {};
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

  // Announce the message
  announcement.textContent = message;

  // Cleanup after announcement
  const cleanup = (): void => {
    if (announcement.parentNode) {
      announcement.parentNode.removeChild(announcement);
    }
  };

  setTimeout(cleanup, 1000);

  return cleanup;
};

/**
 * Creates a progressive enhancement hook for React components
 * Allows components to detect when they should apply client-side enhancements
 *
 * @param dependencies Optional dependencies that trigger re-evaluation
 * @returns Object with enhancement state and utilities
 */
export const useProgressiveEnhancement = (
  dependencies: unknown[] = [],
): {
  isEnhanced: boolean;
  shouldEnhance: boolean;
  createObserver: typeof createVisibilityObserver;
  enhanceForm: typeof enhanceForm;
  enhanceButton: typeof enhanceButton;
  enhanceFocusManagement: typeof enhanceFocusManagement;
  enhanceScreenReaderAnnouncement: typeof enhanceScreenReaderAnnouncement;
  isScreenReaderDetected: boolean;
  isKeyboardNavigationPreferred: boolean;
} =>
  // This is a utility function that could be converted to a hook
  // For now, providing the interface that components can implement

  ({
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

/**
 * Type definitions for progressive enhancement
 */
export interface ProgressiveEnhancementOptions {
  /** Whether to respect user's reduced motion preference */
  respectReducedMotion?: boolean;
  /** Whether to respect user's data saver preference */
  respectDataSaver?: boolean;
  /** Whether component requires IntersectionObserver API */
  requireIntersectionObserver?: boolean;
  /** Delay before applying enhancement (in ms) */
  enhancementDelay?: number;
}

export interface VisibilityObserverConfig extends IntersectionObserverInit {
  /** Whether to disconnect observer after first trigger */
  once?: boolean;
  /** Minimum time element must be visible before triggering (in ms) */
  minVisibleTime?: number;
}

/**
 * Configuration constants for common enhancement patterns
 */
export const ENHANCEMENT_CONFIGS = {
  /** For heavy components like charts, data tables */
  HEAVY_COMPONENT: {
    respectReducedMotion: true,
    respectDataSaver: true,
    requireIntersectionObserver: true,
    enhancementDelay: 100,
  },

  /** For interactive overlays like modals, dropdowns */
  INTERACTIVE_OVERLAY: {
    respectReducedMotion: false, // Overlays are functional, not decorative
    respectDataSaver: false,
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },

  /** For form enhancements */
  FORM_ENHANCEMENT: {
    respectReducedMotion: true,
    respectDataSaver: false, // Forms need to work regardless
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },

  /** For theme switching and preferences */
  THEME_ENHANCEMENT: {
    respectReducedMotion: true,
    respectDataSaver: false,
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },

  /** For accessibility enhancements */
  ACCESSIBILITY_ENHANCEMENT: {
    respectReducedMotion: true,
    respectDataSaver: false, // Accessibility features should load regardless
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },

  /** For screen reader enhancements */
  SCREEN_READER_ENHANCEMENT: {
    respectReducedMotion: true,
    respectDataSaver: false,
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },

  /** For keyboard navigation enhancements */
  KEYBOARD_ENHANCEMENT: {
    respectReducedMotion: true,
    respectDataSaver: false,
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },

  /** For focus management enhancements */
  FOCUS_ENHANCEMENT: {
    respectReducedMotion: true,
    respectDataSaver: false,
    requireIntersectionObserver: false,
    enhancementDelay: 0,
  },
} as const;
