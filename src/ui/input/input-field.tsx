// /src/ui/input/input-field.tsx
// Standalone input field component with built-in TextField wrapper
// Use this when you need an input without a visible label
// RELEVANT FILES: input.tsx, types.ts

'use client';
import { forwardRef, type ReactElement } from 'react';
import { TextField } from 'react-aria-components';

import { InputClient } from './input-client';
import { type InputProps } from './types';

/**
 * InputField component - Input with TextField wrapper for standalone use
 * Use this when you need an input without FormField
 * Requires aria-label for accessibility
 */
export interface InputFieldProps extends InputProps {
  /**
   * Accessibility label (required for standalone use)
   */
  'aria-label': string;

  /**
   * Whether the input field is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether the input field is invalid
   */
  isInvalid?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { 'aria-label': ariaLabel, isDisabled, isInvalid, ...props },
    ref,
  ): ReactElement => (
    <TextField
      aria-label={ariaLabel}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
    >
      <InputClient ref={ref} {...props} />
    </TextField>
  ),
);

InputField.displayName = 'InputField';
