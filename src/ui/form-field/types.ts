// /src/ui/form-field/types.ts
// Type definitions and interfaces for the FormField component
// Exports FormFieldProps interface for complete form field composition
// RELEVANT FILES: form-field.tsx, index.ts, helpers.ts

import { type ReactNode } from 'react';
import { type TextFieldProps } from 'react-aria-components';

import { type InputProps } from '../input';

/**
 * Props interface for the FormField component
 * Extends React Aria TextFieldProps with form field specific properties
 */
export interface FormFieldProps extends Omit<TextFieldProps, 'children'> {
  /**
   * Label text for the form field
   * Required for accessibility
   */
  label: string;

  /**
   * Input props to pass to the underlying Input component
   * Allows full customization of the input element
   */
  inputProps?: Omit<InputProps, 'isDisabled' | 'isInvalid'>;

  /**
   * Help text to display below the input
   * Provides additional guidance to users
   */
  hint?: string;

  /**
   * Error message to display when field has validation errors
   * Takes precedence over hint when present
   */
  error?: string;

  /**
   * Whether the field is required
   * Adds visual indicator and accessibility attributes
   * @default false
   */
  required?: boolean;

  /**
   * Custom content to render instead of the default Input
   * Allows for custom input components while maintaining form field structure
   */
  children?: ReactNode;

  /**
   * Additional CSS class for the form field container
   */
  className?: string;
}
