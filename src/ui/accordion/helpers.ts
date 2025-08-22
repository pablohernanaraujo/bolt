// /src/ui/accordion/helpers.ts
// Helper functions for Accordion component
// Provides className composition and utility functions
// RELEVANT FILES: accordion.tsx, accordion.css.ts, types.ts

import { clsx } from 'clsx';

import * as styles from './accordion.css';
import type {
  AccordionRenderProps,
  AccordionSize,
  AccordionVariant,
} from './types';

/**
 * Build className for accordion container
 */
export const buildAccordionClassName = (
  variant: AccordionVariant = 'default',
  size: AccordionSize = 'medium',
  fullWidth: boolean = false,
  className?: string,
): string =>
  clsx(
    styles.accordion,
    styles.sizeVariants[size],
    fullWidth && styles.fullWidth,
    className,
  );

/**
 * Build className for accordion item
 */
export const buildAccordionItemClassName = (
  variant: AccordionVariant = 'default',
  isDisabled: boolean = false,
  className?: string,
): string =>
  clsx(
    styles.accordionItem,
    styles.variants[variant],
    isDisabled && styles.disabled,
    className,
  );

/**
 * Build className for accordion trigger
 */
export const buildAccordionTriggerClassName = (
  size: AccordionSize = 'medium',
  renderProps?: AccordionRenderProps,
  className?: string,
): string =>
  clsx(styles.accordionTrigger, styles.triggerSizeVariants[size], className);

/**
 * Build className for accordion content
 */
export const buildAccordionContentClassName = (
  size: AccordionSize = 'medium',
  isExpanded: boolean = false,
  disableAnimation: boolean = false,
  className?: string,
): string =>
  clsx(
    styles.accordionContent,
    styles.contentSizeVariants[size],
    disableAnimation && styles.noAnimation,
    className,
  );

/**
 * Build className for trigger content wrapper
 */
export const buildTriggerContentClassName = (className?: string): string =>
  clsx(styles.accordionTriggerContent, className);

/**
 * Build className for chevron icon
 */
export const buildChevronClassName = (
  disableAnimation: boolean = false,
  className?: string,
): string =>
  clsx(
    styles.accordionChevron,
    disableAnimation && styles.noAnimation,
    className,
  );

/**
 * Build className for custom icon
 */
export const buildIconClassName = (
  disableAnimation: boolean = false,
  className?: string,
): string =>
  clsx(styles.accordionIcon, disableAnimation && styles.noAnimation, className);

/**
 * Build className for content inner wrapper
 */
export const buildContentInnerClassName = (className?: string): string =>
  clsx(styles.accordionContentInner, className);

/**
 * Convert array or Set to Set
 */
export const normalizeKeys = (keys?: Set<string> | string[]): Set<string> => {
  if (!keys) return new Set();
  return keys instanceof Set ? keys : new Set(keys);
};

/**
 * Toggle key in set for selection management
 */
export const toggleKey = (
  keys: Set<string>,
  key: string,
  selectionMode: 'single' | 'multiple',
  allowAllClosed: boolean = true,
): Set<string> => {
  const newKeys = new Set(keys);

  if (selectionMode === 'single') {
    // In single mode, clear others and toggle current
    if (newKeys.has(key)) {
      if (allowAllClosed) {
        newKeys.delete(key);
      }
    } else {
      newKeys.clear();
      newKeys.add(key);
    }
  } else {
    // In multiple mode, just toggle the key
    if (newKeys.has(key)) {
      newKeys.delete(key);
    } else {
      newKeys.add(key);
    }
  }

  return newKeys;
};
