// /src/ui/input/types.ts
// Type definitions and interfaces for the Input component
// Exports InputProps interface extending React Aria TextFieldProps
// RELEVANT FILES: input.tsx, index.ts, helpers.ts

import { type InputProps as AriaInputProps } from 'react-aria-components';

/**
 * Props interface for the Input component
 * Extends React Aria InputProps with additional design system properties
 * Note: When using Input without FormField, you must provide aria-label or aria-labelledby
 */
export interface InputProps extends Omit<AriaInputProps, 'size'> {
  /**
   * Visual style variant of the input
   * Controls the border style and appearance
   * @default 'outline'
   */
  variant?: 'outline' | 'filled';

  /**
   * Size of the input
   * Controls padding, font size, and height
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the input has an error state
   * Controls visual error styling
   * @default false
   */
  hasError?: boolean;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Type of the input field
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}
