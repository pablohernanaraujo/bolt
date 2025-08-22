/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /src/ui/utils/accessibility.ts
// Enhanced accessibility props system for SSR-compatible ARIA support
// Provides deterministic ARIA relationships and server-friendly accessibility utilities
// RELEVANT FILES: deterministic-ids.ts, form-field.tsx, rtl-detection.ts, deferred-hydration.tsx

import {
  type AriaAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
} from 'react';

import {
  ComponentIdGenerator,
  generateAriaIds,
  generateDeterministicId,
  generateFormFieldIds,
} from './deterministic-ids';

/**
 * Common accessibility props interface
 * Extends standard ARIA attributes with design system enhancements
 */
export interface AccessibilityProps extends AriaAttributes {
  /** Custom ID for the element (falls back to generated deterministic ID) */
  id?: string;
  /** Whether the element should be hidden from screen readers */
  'aria-hidden'?: boolean;
  /** Custom test ID for testing purposes */
  'data-testid'?: string;
  /** Role override (use carefully) */
  role?: string;
}

/**
 * Form field accessibility configuration
 */
export interface FormFieldAccessibilityConfig {
  /** Component name for ID generation */
  componentName: string;
  /** Field name/identifier */
  fieldName?: string;
  /** Whether the field is required */
  isRequired?: boolean;
  /** Whether the field has an error */
  hasError?: boolean;
  /** Whether the field is disabled */
  isDisabled?: boolean;
  /** Whether the field is readonly */
  isReadOnly?: boolean;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom ARIA description */
  ariaDescription?: string;
  /** Additional ARIA attributes */
  additionalAria?: Partial<AriaAttributes>;
}

/**
 * Generated accessibility attributes for form fields
 */
export interface FormFieldAccessibilityAttributes {
  /** Attributes for the field wrapper */
  field: HTMLAttributes<HTMLElement> & {
    'data-field'?: string;
    'data-testid'?: string;
  };
  /** Attributes for the input element */
  input: InputHTMLAttributes<HTMLInputElement> & { 'data-testid'?: string };
  /** Attributes for the label element */
  label: LabelHTMLAttributes<HTMLLabelElement> & { 'data-testid'?: string };
  /** Attributes for the error message element */
  error: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  /** Attributes for the help text element */
  helpText: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
}

/**
 * Generate comprehensive accessibility attributes for form fields
 * Creates all necessary ARIA relationships with deterministic IDs
 */
export function generateFormFieldAccessibility(
  config: FormFieldAccessibilityConfig,
): FormFieldAccessibilityAttributes {
  const {
    componentName,
    fieldName,
    isRequired = false,
    hasError = false,
    isDisabled = false,
    isReadOnly = false,
    ariaLabel,
    ariaDescription,
    additionalAria = {},
  } = config;

  // Generate deterministic IDs
  const ids = generateFormFieldIds(componentName, fieldName);

  // Build describedBy array
  const describedBy: string[] = [];
  if (hasError) {
    describedBy.push(ids.error);
  }
  describedBy.push(ids.helpText);

  return {
    field: {
      'data-field': componentName,
      'data-testid': `${componentName}-field${fieldName ? `-${fieldName}` : ''}`,
    },

    input: {
      id: ids.input,
      'aria-labelledby': ids.label,
      'aria-describedby':
        describedBy.length > 0 ? describedBy.join(' ') : undefined,
      'aria-required': isRequired ? 'true' : undefined,
      'aria-invalid': hasError ? 'true' : 'false',
      'aria-disabled': isDisabled ? 'true' : undefined,
      'aria-readonly': isReadOnly ? 'true' : undefined,
      'aria-label': ariaLabel,
      'data-testid': `${componentName}-input${fieldName ? `-${fieldName}` : ''}`,
      ...additionalAria,
    },

    label: {
      id: ids.label,
      htmlFor: ids.input,
      'data-testid': `${componentName}-label${fieldName ? `-${fieldName}` : ''}`,
    },

    error: {
      id: ids.error,
      role: 'alert',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      'data-testid': `${componentName}-error${fieldName ? `-${fieldName}` : ''}`,
    },

    helpText: {
      id: ids.helpText,
      'data-testid': `${componentName}-help${fieldName ? `-${fieldName}` : ''}`,
    },
  };
}

/**
 * Interactive element accessibility configuration
 */
export interface InteractiveAccessibilityConfig {
  /** Component name for ID generation */
  componentName: string;
  /** Element identifier */
  elementName: string;
  /** Whether the element is pressed/selected */
  isPressed?: boolean;
  /** Whether the element is expanded (for collapsible elements) */
  isExpanded?: boolean;
  /** Whether the element has a popup */
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Whether the element controls other elements */
  controls?: string;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Live region politeness */
  liveRegion?: 'off' | 'polite' | 'assertive';
  /** Additional ARIA attributes */
  additionalAria?: Partial<AriaAttributes>;
}

/**
 * Generate accessibility attributes for interactive elements
 * Creates ARIA attributes for buttons, toggles, and other interactive components
 */
export function generateInteractiveAccessibility(
  config: InteractiveAccessibilityConfig,
): HTMLAttributes<HTMLElement> & { 'data-testid'?: string } {
  const {
    componentName,
    elementName,
    isPressed,
    isExpanded,
    hasPopup,
    controls,
    ariaLabel,
    liveRegion,
    additionalAria = {},
  } = config;

  // Generate ARIA IDs
  const ariaIds = generateAriaIds(componentName, elementName);

  return {
    id: ariaIds.element,
    'aria-label': ariaLabel,
    'aria-pressed':
      isPressed !== undefined ? (isPressed ? 'true' : 'false') : undefined,
    'aria-expanded':
      isExpanded !== undefined ? (isExpanded ? 'true' : 'false') : undefined,
    'aria-haspopup':
      hasPopup !== undefined && hasPopup !== false
        ? typeof hasPopup === 'boolean'
          ? 'true'
          : hasPopup
        : undefined,
    'aria-controls': controls || ariaIds.controls,
    'aria-live': liveRegion,
    'data-testid': `${componentName}-${elementName}`,
    ...additionalAria,
  };
}

/**
 * Collection/list accessibility configuration
 */
export interface CollectionAccessibilityConfig {
  /** Component name for ID generation */
  componentName: string;
  /** Total number of items */
  totalItems: number;
  /** Currently selected items (indices) */
  selectedItems?: number[];
  /** Whether multiple selection is allowed */
  isMultiSelect?: boolean;
  /** Orientation of the collection */
  orientation?: 'horizontal' | 'vertical';
  /** Custom ARIA label for the collection */
  ariaLabel?: string;
  /** Whether the collection is searchable */
  isSearchable?: boolean;
}

/**
 * Generate accessibility attributes for collections and lists
 * Creates ARIA attributes for lists, grids, and other collections
 */
export function generateCollectionAccessibility(
  config: CollectionAccessibilityConfig,
): {
  container: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  item: (
    index: number,
    isSelected?: boolean,
  ) => HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
} {
  const {
    componentName,
    totalItems,
    selectedItems = [],
    isMultiSelect = false,
    orientation = 'vertical',
    ariaLabel,
    isSearchable = false,
  } = config;

  // Generate container ID
  const containerId = generateDeterministicId(componentName, 'container');

  return {
    container: {
      id: containerId,
      role: isMultiSelect ? 'listbox' : 'list',
      'aria-label': ariaLabel,
      'aria-multiselectable': isMultiSelect ? 'true' : undefined,
      'aria-orientation': orientation,
      'aria-activedescendant':
        selectedItems.length > 0
          ? generateDeterministicId(
              componentName,
              'item',
              selectedItems[0].toString(),
            )
          : undefined,
      'data-testid': `${componentName}-container`,
    },

    item: (index: number, isSelected = false) => ({
      id: generateDeterministicId(componentName, 'item', index.toString()),
      role: isMultiSelect ? 'option' : 'listitem',
      'aria-selected':
        isMultiSelect || isSelected
          ? isSelected
            ? 'true'
            : 'false'
          : undefined,
      'aria-setsize': totalItems,
      'aria-posinset': index + 1,
      'data-testid': `${componentName}-item-${index}`,
    }),
  };
}

/**
 * Dialog/modal accessibility configuration
 */
export interface DialogAccessibilityConfig {
  /** Component name for ID generation */
  componentName: string;
  /** Whether the dialog is modal */
  isModal?: boolean;
  /** Title text or element ID */
  title?: string;
  /** Description text or element ID */
  description?: string;
  /** Initial focus target */
  initialFocus?: string;
  /** Return focus target */
  returnFocus?: string;
}

/**
 * Generate accessibility attributes for dialogs and modals
 * Creates comprehensive ARIA attributes for dialog components
 */
export function generateDialogAccessibility(
  config: DialogAccessibilityConfig,
): {
  dialog: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  title: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  description: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
} {
  const { componentName, isModal = true, title, description } = config;

  // Generate IDs
  const dialogId = generateDeterministicId(componentName, 'dialog');
  const titleId = generateDeterministicId(componentName, 'title');
  const descriptionId = generateDeterministicId(componentName, 'description');

  // Build labelledby and describedby
  const labelledBy = title ? titleId : undefined;
  const describedBy = description ? descriptionId : undefined;

  return {
    dialog: {
      id: dialogId,
      role: 'dialog',
      'aria-modal': isModal ? 'true' : undefined,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      'data-testid': `${componentName}-dialog`,
    },

    title: {
      id: titleId,
      'data-testid': `${componentName}-title`,
    },

    description: {
      id: descriptionId,
      'data-testid': `${componentName}-description`,
    },
  };
}

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Create screen reader only styles
   */
  onlyStyles: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: 0,
  },

  /**
   * Create focusable screen reader only styles
   */
  focusableStyles: {
    position: 'absolute' as const,
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
  },

  /**
   * Announce content to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = Object.entries(screenReader.onlyStyles)
      .map(([prop, value]) => `${prop}: ${value}`)
      .join('; ');

    document.body.appendChild(announcement);
    announcement.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
};

/**
 * Keyboard navigation utilities
 */
export const keyboard = {
  /**
   * Standard keyboard event keys
   */
  keys: {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    ENTER: 'Enter',
    SPACE: ' ',
    TAB: 'Tab',
    ESCAPE: 'Escape',
    DELETE: 'Delete',
    BACKSPACE: 'Backspace',
  } as const,

  /**
   * Check if an element is focusable
   */
  isFocusable: (element: HTMLElement): boolean => {
    if (
      element.hasAttribute('disabled') ||
      element.getAttribute('aria-hidden') === 'true'
    ) {
      return false;
    }

    const focusableSelectors = [
      'input:not([disabled])',
      'button:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    return focusableSelectors.some((selector) => element.matches(selector));
  },

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'input:not([disabled]):not([aria-hidden="true"])',
      'button:not([disabled]):not([aria-hidden="true"])',
      'select:not([disabled]):not([aria-hidden="true"])',
      'textarea:not([disabled]):not([aria-hidden="true"])',
      'a[href]:not([aria-hidden="true"])',
      '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
      '[contenteditable="true"]:not([aria-hidden="true"])',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)).filter(
      (element) => keyboard.isFocusable(element as HTMLElement),
    ) as HTMLElement[];
  },

  /**
   * Trap focus within a container
   */
  trapFocus: (container: HTMLElement, event: KeyboardEvent) => {
    if (event.key !== keyboard.keys.TAB) return;

    const focusableElements = keyboard.getFocusableElements(container);
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
  },
};

/**
 * Focus management utilities
 */
export const focus = {
  /**
   * Set focus to an element by ID (SSR-safe)
   */
  setById: (id: string, delay = 0): void => {
    if (typeof window === 'undefined') return;

    const focusElement = (): void => {
      const element = document.getElementById(id);
      if (element && keyboard.isFocusable(element)) {
        element.focus();
      }
    };

    if (delay > 0) {
      setTimeout(focusElement, delay);
    } else {
      focusElement();
    }
  },

  /**
   * Create a focus trap for modals and dialogs
   */
  createTrap: (container: HTMLElement | null) => {
    if (!container || typeof window === 'undefined') {
      return {
        activate: () => {},
        deactivate: () => {},
      };
    }

    let isActive = false;
    let previousActiveElement: HTMLElement | null = null;

    let cleanup: (() => void) | null = null;

    const activate = (): void => {
      if (isActive) return;

      previousActiveElement = document.activeElement as HTMLElement;
      isActive = true;

      const focusableElements = keyboard.getFocusableElements(container);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      const handleKeyDown = (event: KeyboardEvent): void => {
        keyboard.trapFocus(container, event);
      };

      container.addEventListener('keydown', handleKeyDown);

      cleanup = () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    };

    const deactivate = (): void => {
      if (!isActive) return;

      isActive = false;

      if (cleanup) {
        cleanup();
        cleanup = null;
      }

      if (
        previousActiveElement &&
        keyboard.isFocusable(previousActiveElement)
      ) {
        previousActiveElement.focus();
      }
    };

    return {
      activate,
      deactivate,
    };
  },
};

/**
 * Create a component accessibility helper
 * Provides a convenient API for managing component accessibility
 */
export function createAccessibilityHelper(componentName: string): {
  idGenerator: ComponentIdGenerator;
  generateFormField: (fieldName?: string) => FormFieldAccessibilityAttributes;
  generateInteractive: (
    elementName: string,
    config?: Partial<InteractiveAccessibilityConfig>,
  ) => HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  generateCollection: (
    config: Omit<CollectionAccessibilityConfig, 'componentName'>,
  ) => {
    container: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
    item: (
      index: number,
      isSelected?: boolean,
    ) => HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  };
  generateDialog: (config?: Partial<DialogAccessibilityConfig>) => {
    dialog: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
    title: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
    description: HTMLAttributes<HTMLElement> & { 'data-testid'?: string };
  };
} {
  const idGenerator = new ComponentIdGenerator(componentName);

  return {
    idGenerator,

    generateFormField: (fieldName?: string) =>
      generateFormFieldAccessibility({
        componentName,
        fieldName,
      }),

    generateInteractive: (
      elementName: string,
      config?: Partial<InteractiveAccessibilityConfig>,
    ) =>
      generateInteractiveAccessibility({
        componentName,
        elementName,
        ...config,
      }),

    generateCollection: (
      config: Omit<CollectionAccessibilityConfig, 'componentName'>,
    ) =>
      generateCollectionAccessibility({
        componentName,
        ...config,
      }),

    generateDialog: (config?: Partial<DialogAccessibilityConfig>) =>
      generateDialogAccessibility({
        componentName,
        ...config,
      }),
  };
}
