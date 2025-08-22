// /src/ui/textarea/types.ts
// Type definitions and interfaces for the TextArea component
// Exports TextAreaProps interface extending React Aria TextAreaProps
// RELEVANT FILES: textarea.tsx, index.ts, helpers.ts

import { type TextAreaProps as AriaTextAreaProps } from 'react-aria-components';

/**
 * Props interface for the TextArea component
 * Extends React Aria TextAreaProps with additional design system properties
 * Note: When using TextArea without FormField, you must provide aria-label or aria-labelledby
 */
export interface TextAreaProps extends AriaTextAreaProps {
  /**
   * Visual style variant of the textarea
   * Controls the border style and appearance
   * @default 'outline'
   */
  variant?: 'outline' | 'filled';

  /**
   * Size of the textarea
   * Controls padding, font size, and minimum height
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the textarea has an error state
   * Controls visual error styling
   * @default false
   */
  hasError?: boolean;

  /**
   * Placeholder text for the textarea
   */
  placeholder?: string;

  /**
   * Resize behavior of the textarea
   * Controls how users can resize the textarea
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';

  /**
   * Minimum number of rows for the textarea
   * Controls the initial height
   * @default 3
   */
  rows?: number;

  /**
   * Maximum number of rows for auto-resize
   * Only applicable when resize is 'none' or 'vertical'
   */
  maxRows?: number;

  /**
   * Whether the textarea is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the textarea is in an invalid state
   * @default false
   */
  isInvalid?: boolean;
}
