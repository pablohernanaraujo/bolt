// /src/ui/form-field/helpers.ts
// Utility functions and helpers for the FormField component
// Handles className composition and ARIA attribute management
// RELEVANT FILES: form-field.tsx, form-field.css.ts, types.ts

import * as styles from './form-field.css';

/**
 * Builds the complete className for the form field container
 * Combines base styles with custom className
 *
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildFormFieldClassName = (className?: string): string =>
  className ? `${styles.formField} ${className}` : styles.formField;

/**
 * Determines if the form field has an error state
 * Checks for both error prop and React Aria validation state
 *
 * @param error - Error message string
 * @param isInvalid - React Aria validation state
 * @returns Whether the form field is in error state
 */
export const hasFormFieldError = (
  error?: string,
  isInvalid?: boolean,
): boolean => Boolean(error) || Boolean(isInvalid);

/**
 * Generates unique IDs for form field elements
 * Ensures proper ARIA relationships between elements
 * NOTE: This should be called with React's useId() value for SSR compatibility
 *
 * @param baseId - Base ID for the form field (should come from useId() or be provided)
 * @returns Object with IDs for different form field elements
 */
export const generateFormFieldIds = (
  baseId: string,
): {
  input: string;
  label: string;
  hint: string;
  error: string;
} => ({
  input: baseId,
  label: `${baseId}-label`,
  hint: `${baseId}-hint`,
  error: `${baseId}-error`,
});

/**
 * Builds the aria-describedby attribute value
 * Includes hint and error IDs when applicable
 *
 * @param ids - Form field element IDs
 * @param hasHint - Whether hint text is present
 * @param hasError - Whether error text is present
 * @returns aria-describedby value or undefined
 */
export const buildAriaDescribedBy = (
  ids: ReturnType<typeof generateFormFieldIds>,
  hasHint: boolean,
  hasError: boolean,
): string | undefined => {
  const describedBy: string[] = [];

  if (hasHint) {
    describedBy.push(ids.hint);
  }

  if (hasError) {
    describedBy.push(ids.error);
  }

  return describedBy.length > 0 ? describedBy.join(' ') : undefined;
};
