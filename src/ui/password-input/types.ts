// /src/ui/password-input/types.ts
// Type definitions and interfaces for the PasswordInput component
// Extends InputProps with password visibility toggle functionality
// RELEVANT FILES: password-input.tsx, ../input/types.ts, helpers.ts

import { type InputProps as AriaInputProps } from 'react-aria-components';

/**
 * Props interface for the PasswordInput component
 * Extends React Aria InputProps with password visibility toggle and design system props
 */
export interface PasswordInputProps extends Omit<AriaInputProps, 'size'> {
  /**
   * Visual style variant of the password input
   * Controls the border style and appearance
   * @default 'outline'
   */
  variant?: 'outline' | 'filled';

  /**
   * Size of the password input
   * Controls padding, font size, and height
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the password input has an error state
   * Controls visual error styling
   * @default false
   */
  hasError?: boolean;
  /**
   * Initial visibility state of the password
   * When true, password is shown as plain text
   * @default false
   */
  defaultVisible?: boolean;

  /**
   * Controlled visibility state of the password
   * When provided, component becomes controlled
   */
  isVisible?: boolean;

  /**
   * Callback fired when visibility state changes
   * Use with isVisible for controlled component
   */
  onVisibilityChange?: (isVisible: boolean) => void;

  /**
   * Custom aria-label for the visibility toggle button
   * @default 'Toggle password visibility'
   */
  toggleAriaLabel?: string;
}
