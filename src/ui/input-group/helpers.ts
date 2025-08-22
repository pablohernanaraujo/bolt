/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-params */
// /src/ui/input-group/helpers.ts
// Helper functions for InputGroup components
// Handles className composition and layout calculations
// RELEVANT FILES: input-group.tsx, input-group.css.ts, types.ts

import { Children, isValidElement, type ReactNode } from 'react';

import * as styles from './input-group.css';
import { type InputGroupContextValue } from './types';

/**
 * Build className for InputGroup container
 */
export const buildInputGroupClassName = (
  variant: string,
  size: string,
  hasError?: boolean,
  isDisabled?: boolean,
  className?: string,
): string => {
  const classes = [
    styles.inputGroup,
    styles.groupVariants[variant as keyof typeof styles.groupVariants],
    styles.groupSizes[size as keyof typeof styles.groupSizes],
  ];

  if (hasError) {
    classes.push(styles.groupError);
  }

  if (isDisabled) {
    classes.push(styles.groupDisabled);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Build className for addon components
 */
export const buildAddonClassName = (
  position: 'left' | 'right',
  size: string,
  variant: string,
  isDisabled?: boolean,
  className?: string,
): string => {
  const classes = [
    styles.addon,
    position === 'left' ? styles.leftAddon : styles.rightAddon,
    styles.addonSizes[size as keyof typeof styles.addonSizes],
    styles.addonVariants[variant as keyof typeof styles.addonVariants],
  ];

  if (isDisabled) {
    classes.push(styles.addonDisabled);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Build className for element components
 */
export const buildElementClassName = (
  position: 'left' | 'right',
  size: string,
  isInteractive?: boolean,
  isDisabled?: boolean,
  className?: string,
): string => {
  const classes = [
    styles.element,
    position === 'left' ? styles.leftElement : styles.rightElement,
    styles.elementSizes[size as keyof typeof styles.elementSizes],
  ];

  if (isInteractive && !isDisabled) {
    classes.push(styles.interactiveElement);
  }

  if (isDisabled) {
    classes.push(styles.elementDisabled);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Analyze children to determine what addons/elements are present
 */
export const analyzeChildren = (
  children: ReactNode,
): Partial<InputGroupContextValue> => {
  const result: Partial<InputGroupContextValue> = {
    hasLeftAddon: false,
    hasRightAddon: false,
    hasLeftElement: false,
    hasRightElement: false,
  };

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const displayName = (child.type as any)?.displayName;

      switch (displayName) {
        case 'InputLeftAddon':
          result.hasLeftAddon = true;
          break;
        case 'InputRightAddon':
          result.hasRightAddon = true;
          break;
        case 'InputLeftElement':
          result.hasLeftElement = true;
          break;
        case 'InputRightElement':
          result.hasRightElement = true;
          break;
      }
    }
  });

  return result;
};

/**
 * Calculate padding adjustments for input based on elements
 */
export const getInputPaddingAdjustments = (
  size: string,
  hasLeftElement?: boolean,
  hasRightElement?: boolean,
): { paddingLeft?: string; paddingRight?: string } => {
  const adjustments: { paddingLeft?: string; paddingRight?: string } = {};

  // Padding values based on size and element presence
  const elementPadding = {
    small: '32px',
    medium: '40px',
    large: '48px',
  };

  if (hasLeftElement) {
    adjustments.paddingLeft =
      elementPadding[size as keyof typeof elementPadding];
  }

  if (hasRightElement) {
    adjustments.paddingRight =
      elementPadding[size as keyof typeof elementPadding];
  }

  return adjustments;
};
