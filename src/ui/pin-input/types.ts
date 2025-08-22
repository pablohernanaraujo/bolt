// /src/ui/pin-input/types.ts
// Type definitions and interfaces for the PinInput component
// Defines PIN input behavior, validation, and styling options
// RELEVANT FILES: pin-input.tsx, pin-input-field.tsx, helpers.ts

import { type ReactElement } from 'react';

export type PinInputType = 'numeric' | 'alphanumeric';
export type PinInputVariant = 'outline' | 'filled';
export type PinInputSize = 'small' | 'medium' | 'large';

/**
 * Props interface for the main PinInput component
 */
export interface PinInputProps {
  /**
   * Number of PIN input fields
   * @default 4
   */
  length?: number;

  /**
   * Type of characters allowed in PIN
   * @default 'numeric'
   */
  type?: PinInputType;

  /**
   * Visual style variant of the PIN input
   * @default 'outline'
   */
  variant?: PinInputVariant;

  /**
   * Size of the PIN input fields
   * @default 'medium'
   */
  size?: PinInputSize;

  /**
   * Whether the PIN input has an error state
   * @default false
   */
  hasError?: boolean;

  /**
   * Whether the PIN input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to auto-focus the first field on mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Whether to mask (hide) the entered values
   * @default false
   */
  masked?: boolean;

  /**
   * Character to use for masking
   * @default '•'
   */
  maskChar?: string;

  /**
   * Controlled value of the PIN input
   */
  value?: string;

  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string;

  /**
   * Callback fired when any field value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback fired when all fields are filled
   */
  onComplete?: (value: string) => void;

  /**
   * Callback fired when a field gains focus
   */
  onFocus?: (index: number) => void;

  /**
   * Callback fired when a field loses focus
   */
  onBlur?: (index: number) => void;

  /**
   * ARIA label for the PIN input group
   */
  'aria-label'?: string;

  /**
   * ID of element that describes the PIN input
   */
  'aria-describedby'?: string;

  /**
   * Additional className for styling
   */
  className?: string;

  /**
   * Child components (PinInputField components)
   */
  children?: ReactElement | ReactElement[];
}

/**
 * Props interface for individual PIN input fields
 */
export interface PinInputFieldProps {
  /**
   * Index of this field in the PIN sequence
   */
  index: number;

  /**
   * Additional className for styling
   */
  className?: string;
}

/**
 * Context value provided by PinInput to child fields
 */
export interface PinInputContextValue {
  /**
   * Current values array
   */
  values: string[];

  /**
   * Type of input validation
   */
  type: PinInputType;

  /**
   * Visual variant
   */
  variant: PinInputVariant;

  /**
   * Size variant
   */
  size: PinInputSize;

  /**
   * Error state
   */
  hasError: boolean;

  /**
   * Disabled state
   */
  disabled: boolean;

  /**
   * Whether fields should be masked
   */
  masked: boolean;

  /**
   * Character used for masking
   */
  maskChar: string;

  /**
   * Total number of fields
   */
  length: number;

  /**
   * Refs to all input elements
   */
  fieldRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;

  /**
   * Update value at specific index
   */
  setValue: (index: number, value: string) => void;

  /**
   * Focus field at specific index
   */
  focusField: (index: number) => void;

  /**
   * Handle focus event
   */
  handleFocus: (index: number) => void;

  /**
   * Handle blur event
   */
  handleBlur: (index: number) => void;
}

/**
 * Props for PinInputGroup wrapper component
 */
export interface PinInputGroupProps {
  /**
   * Child PinInputField components
   */
  children: ReactElement | ReactElement[];

  /**
   * Additional className for styling
   */
  className?: string;
}

/**
 * Props for PinInputSeparator component
 */
export interface PinInputSeparatorProps {
  /**
   * Custom separator character or element
   * @default '-'
   */
  children?: React.ReactNode;

  /**
   * Additional className for styling
   */
  className?: string;
}
