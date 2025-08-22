// /src/ui/form-field/form-field.tsx
// Complete form field component with label, input, hint, and error
// Built with React Aria Components for full accessibility support
// RELEVANT FILES: form-field.css.ts, types.ts, helpers.ts

'use client';
import { type ReactElement, useId } from 'react';
import { FieldError, Label, Text, TextField } from 'react-aria-components';

import { Input } from '../input';
import * as styles from './form-field.css';
import {
  buildAriaDescribedBy,
  buildFormFieldClassName,
  generateFormFieldIds,
  hasFormFieldError,
} from './helpers';
import { type FormFieldProps } from './types';

/**
 * FormField component that combines label, input, hint, and error
 * Built on React Aria Components for complete accessibility
 *
 * Features:
 * - Automatic ARIA relationships between label, input, hint, and error
 * - Required field indicators with proper accessibility
 * - Error state management with visual and screen reader feedback
 * - Flexible input customization through inputProps
 * - Support for custom input components via children
 * - Complete keyboard navigation and focus management
 */
export const FormField = ({
  label,
  inputProps = {},
  hint,
  error,
  required = false,
  children,
  className,
  id,
  isDisabled,
  isInvalid,
  ...props
}: FormFieldProps): ReactElement => {
  // Use React's useId for SSR-safe ID generation
  const generatedId = useId();

  // Generate consistent IDs for all form field elements
  const ids = generateFormFieldIds(id || generatedId);

  // Determine error state
  const fieldHasError = hasFormFieldError(error, isInvalid);

  // Build aria-describedby for proper accessibility
  const ariaDescribedBy = buildAriaDescribedBy(
    ids,
    Boolean(hint),
    Boolean(error),
  );

  return (
    <TextField
      id={ids.input}
      isRequired={required}
      isDisabled={isDisabled}
      isInvalid={fieldHasError}
      className={buildFormFieldClassName(className)}
      {...props}
    >
      {/* Label with required indicator */}
      <Label id={ids.label} className={styles.label}>
        {label}
        {required && (
          <span className={styles.requiredIndicator} aria-label="required">
            *
          </span>
        )}
      </Label>

      {/* Input directly inside TextField - React Aria handles label association */}
      {children ? (
        children
      ) : (
        <Input
          {...(() => {
            const {
              className: inputClassName,
              style: inputStyle,
              ...restProps
            } = inputProps;
            return restProps;
          })()}
          className={
            typeof inputProps.className === 'string'
              ? inputProps.className
              : undefined
          }
          style={
            typeof inputProps.style === 'object' &&
            inputProps.style !== null &&
            !('defaultStyle' in inputProps.style)
              ? inputProps.style
              : undefined
          }
          hasError={fieldHasError}
          isDisabled={isDisabled}
          isInvalid={fieldHasError}
        />
      )}

      {/* Hint text (shown when no error) */}
      {hint && !error && (
        <Text id={ids.hint} slot="description" className={styles.hint}>
          {hint}
        </Text>
      )}

      {/* Error text (takes precedence over hint) */}
      {error && (
        <FieldError id={ids.error} className={styles.error}>
          {error}
        </FieldError>
      )}
    </TextField>
  );
};

FormField.displayName = 'FormField';
