// /src/ui/input/input-server.tsx
// Server-compatible input component with zero JavaScript requirements
// Provides all input functionality using native HTML input element
// RELEVANT FILES: input.tsx, input-client.tsx, helpers.ts, types.ts

import { forwardRef, type ReactElement, type InputHTMLAttributes } from 'react';

import { generateFormFieldAccessibility } from '@/ui/utils/accessibility';
import { useInputGroup } from '../input-group';
import {
  buildInputClassName,
  buildInputWithGroupClassName,
  isInputInvalid,
} from './helpers';

/**
 * Server-compatible Input component interface
 * Extends native input attributes instead of React Aria InputProps
 */
export interface InputServerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
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
   * Custom className to apply to the input
   */
  className?: string;

  /**
   * Whether the input is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the input is invalid
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Field name for generating deterministic accessibility IDs
   * Used to create consistent aria-labelledby and aria-describedby relationships
   */
  fieldName?: string;
}

/**
 * Server-compatible Input component with comprehensive functionality
 * Renders on the server without requiring client-side JavaScript
 *
 * Features:
 * - Zero JavaScript - works with JS disabled
 * - Full form integration with native input behavior
 * - Complete accessibility with proper semantic HTML
 * - All visual variants and sizes from design system
 * - Works in forms with standard HTML validation
 * - InputGroup integration for complex layouts
 * - Progressive enhancement ready
 *
 * Server-Side Benefits:
 * - No hydration cost
 * - Immediate form functionality without JS
 * - SEO-friendly with proper input semantics
 * - Works in environments where JS is disabled
 * - Faster initial page loads
 * - Native browser validation support
 *
 * Usage:
 * <InputServer name="email" type="email" required />
 * <InputServer variant="filled" size="large" placeholder="Enter text" />
 * <InputServer hasError aria-label="Invalid input" />
 *
 * Note: For proper accessibility, always provide aria-label or use within FormField
 */
export const InputServer = forwardRef<HTMLInputElement, InputServerProps>(
  (
    {
      variant = 'outline',
      size = 'medium',
      hasError = false,
      type = 'text',
      className,
      placeholder,
      isDisabled,
      isInvalid,
      disabled: htmlDisabled,
      fieldName,
      name,
      required,
      ...props
    },
    ref,
  ): ReactElement => {
    // Get InputGroup context if this input is inside a group
    const inputGroup = useInputGroup();

    // Determine final disabled state (prioritize HTML disabled prop)
    const finalDisabled = htmlDisabled ?? isDisabled;

    // Determine if input is invalid using the helper function
    const invalid = isInputInvalid(hasError, isInvalid);

    // Generate deterministic accessibility attributes
    const accessibilityAttributes = generateFormFieldAccessibility({
      componentName: 'input',
      fieldName: fieldName || name,
      isRequired: required,
      hasError: invalid,
      isDisabled: finalDisabled,
      isReadOnly: props.readOnly,
    });

    // Build the appropriate className based on whether input is in a group
    const inputClassName = inputGroup
      ? buildInputWithGroupClassName(variant, size, inputGroup, className)
      : buildInputClassName(variant, size, className);

    return (
      <input
        ref={ref}
        type={type}
        name={name}
        className={inputClassName}
        placeholder={placeholder}
        disabled={finalDisabled}
        required={required}
        aria-invalid={invalid}
        {...accessibilityAttributes.input}
        {...props}
      />
    );
  },
);

InputServer.displayName = 'InputServer';
