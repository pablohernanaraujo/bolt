/* eslint-disable max-params */
// /src/ui/textarea/helpers.ts
// Utility functions and helpers for the TextArea component
// Handles className composition and component logic
// RELEVANT FILES: textarea.tsx, textarea.css.ts, types.ts

import { type InputRenderProps } from 'react-aria-components';

import { textareaRecipe } from './textarea.css';
import { type TextAreaProps } from './types';

/**
 * Builds the complete className for the textarea element
 * Combines variant, size, resize, and custom className
 */
export function buildTextAreaClassName(
  variant: TextAreaProps['variant'],
  size: TextAreaProps['size'],
  resize: TextAreaProps['resize'],
  className?: string,
): string;
export function buildTextAreaClassName(
  variant: TextAreaProps['variant'],
  size: TextAreaProps['size'],
  resize: TextAreaProps['resize'],
  className: (
    values: InputRenderProps & { defaultClassName: string | undefined },
  ) => string,
  renderProps: InputRenderProps & { defaultClassName: string | undefined },
): string;
export function buildTextAreaClassName(
  variant: TextAreaProps['variant'],
  size: TextAreaProps['size'],
  resize: TextAreaProps['resize'],
  className?:
    | string
    | ((
        values: InputRenderProps & { defaultClassName: string | undefined },
      ) => string),
  renderProps?: InputRenderProps & { defaultClassName: string | undefined },
): string {
  const baseClassName = textareaRecipe({
    variant,
    size,
    resize,
  });

  const resolvedClassName =
    renderProps && typeof className === 'function'
      ? className(renderProps)
      : (className as string);

  return resolvedClassName
    ? `${baseClassName} ${resolvedClassName}`
    : baseClassName;
}

/**
 * Determines if the textarea should show error state
 * Combines hasError prop with React Aria validation state
 *
 * @param hasError - Manual error state override
 * @param isInvalid - React Aria validation state
 * @returns Whether the textarea is in error state
 */
export const isTextAreaInvalid = (
  hasError?: boolean,
  isInvalid?: boolean,
): boolean => hasError || isInvalid || false;

/**
 * Calculates the appropriate rows based on size and provided rows
 *
 * @param size - The size variant of the textarea
 * @param rows - User provided rows
 * @returns Number of rows to use
 */
export const getTextAreaRows = (
  size: TextAreaProps['size'],
  rows?: number,
): number => {
  if (rows !== undefined) {
    return rows;
  }

  // Default rows based on size
  switch (size) {
    case 'small':
      return 2;
    case 'medium':
      return 3;
    case 'large':
      return 4;
    default:
      return 3;
  }
};
