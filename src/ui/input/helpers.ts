/* eslint-disable max-statements */
/* eslint-disable max-params */
// /src/ui/input/helpers.ts
// Utility functions and helpers for the Input component
// Handles className composition and component logic
// RELEVANT FILES: input.tsx, input.css.ts, types.ts

import { type InputRenderProps } from 'react-aria-components';

import * as groupStyles from '../input-group/input-group.css';
import { type InputGroupContextValue } from '../input-group/types';
import { inputRecipe } from './input.css';
import { type InputProps } from './types';

/**
 * Builds the complete className for the input element (server version)
 * Combines variant, size, and custom className
 *
 * @param variant - The visual variant of the input
 * @param size - The size of the input
 * @param className - Additional custom className (string only)
 * @returns Combined className string
 */
export function buildInputClassName(
  variant: InputProps['variant'],
  size: InputProps['size'],
  className?: string,
): string;

/**
 * Builds the complete className for the input element (client version)
 * Combines variant, size, and custom className
 *
 * @param variant - The visual variant of the input
 * @param size - The size of the input
 * @param className - Additional custom className (can be string or function)
 * @param renderProps - React Aria render props for conditional styling
 * @returns Combined className string
 */
export function buildInputClassName(
  variant: InputProps['variant'],
  size: InputProps['size'],
  className: InputProps['className'],
  renderProps: InputRenderProps & { defaultClassName: string },
): string;

export function buildInputClassName(
  variant: InputProps['variant'],
  size: InputProps['size'],
  className?: InputProps['className'] | string,
  renderProps?: InputRenderProps & { defaultClassName: string },
): string {
  // Handle function className from React Aria (client version)
  const baseClassName =
    renderProps && typeof className === 'function'
      ? className(renderProps)
      : (className as string);

  const inputClassName = inputRecipe({
    variant,
    size,
  });

  return baseClassName ? `${inputClassName} ${baseClassName}` : inputClassName;
}

/**
 * Determines if the input should show error state
 * Combines hasError prop with React Aria validation state
 *
 * @param hasError - Manual error state override
 * @param isInvalid - React Aria validation state
 * @returns Whether the input is in error state
 */
export const isInputInvalid = (
  hasError?: boolean,
  isInvalid?: boolean,
): boolean => hasError || isInvalid || false;

/**
 * Builds the className for input when used within InputGroup (server version)
 * Applies special styles for grouped inputs
 *
 * @param variant - The visual variant of the input
 * @param size - The size of the input
 * @param groupContext - The InputGroup context
 * @param className - Additional custom className (string only)
 * @returns Combined className string
 */
export function buildInputWithGroupClassName(
  variant: InputProps['variant'],
  size: InputProps['size'],
  groupContext: InputGroupContextValue,
  className?: string,
): string;

/**
 * Builds the className for input when used within InputGroup (client version)
 * Applies special styles for grouped inputs
 *
 * @param variant - The visual variant of the input
 * @param size - The size of the input
 * @param groupContext - The InputGroup context
 * @param className - Additional custom className (can be string or function)
 * @param renderProps - React Aria render props for conditional styling
 * @returns Combined className string
 */
export function buildInputWithGroupClassName(
  variant: InputProps['variant'],
  size: InputProps['size'],
  groupContext: InputGroupContextValue,
  className: InputProps['className'],
  renderProps: InputRenderProps & { defaultClassName: string },
): string;

export function buildInputWithGroupClassName(
  variant: InputProps['variant'],
  size: InputProps['size'],
  groupContext: InputGroupContextValue,
  className?: InputProps['className'] | string,
  renderProps?: InputRenderProps & { defaultClassName: string },
): string {
  // Handle function className from React Aria (client version)
  const baseClassName =
    renderProps && typeof className === 'function'
      ? className(renderProps)
      : (className as string);

  const inputClassName = inputRecipe({
    variant,
    size,
  });

  const classes = [inputClassName, groupStyles.groupedInput];

  // Add border radius adjustments based on addons
  if (groupContext.hasLeftAddon) {
    classes.push(groupStyles.inputWithLeftAddon);
  }

  if (groupContext.hasRightAddon) {
    classes.push(groupStyles.inputWithRightAddon);
  }

  // Add padding adjustments based on elements
  if (groupContext.hasLeftElement) {
    classes.push(groupStyles.inputWithLeftElement);
  }

  if (groupContext.hasRightElement) {
    classes.push(groupStyles.inputWithRightElement);
  }

  if (baseClassName) {
    classes.push(baseClassName);
  }

  return classes.join(' ');
}
