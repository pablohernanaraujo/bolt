/* eslint-disable complexity */
/* eslint-disable max-statements */
// /src/ui/pin-input/pin-input.tsx
// Main PIN input component providing context and coordination for individual fields
// Handles state management, validation, and accessibility for multi-field PIN entry
// RELEVANT FILES: pin-input-field.tsx, types.ts, helpers.ts, pin-input-context.tsx

'use client';

import {
  type FC,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  buildPinInputClassName,
  createFieldRefs,
  getPinValue,
  isComplete,
  splitValue,
} from './helpers';
import { PinInputContext } from './pin-input-context';
import { hiddenInput, pinInputContainerRecipe } from './pin-input.css';
import { type PinInputContextValue, type PinInputProps } from './types';

/**
 * Main PIN Input component providing context and state management
 *
 * Features:
 * - Configurable number of input fields
 * - Numeric or alphanumeric input validation
 * - Auto-focus progression and backspace navigation
 * - Paste handling across multiple fields
 * - Masking support for security
 * - Keyboard navigation (arrows, home, end)
 * - Controlled and uncontrolled modes
 * - Full accessibility support
 * - Integration with form libraries
 *
 * Example:
 * ```tsx
 * <PinInput length={6} onComplete={handleComplete}>
 *   <PinInputGroup>
 *     <PinInputField index={0} />
 *     <PinInputField index={1} />
 *     <PinInputField index={2} />
 *     <PinInputSeparator />
 *     <PinInputField index={3} />
 *     <PinInputField index={4} />
 *     <PinInputField index={5} />
 *   </PinInputGroup>
 * </PinInput>
 * ```
 */
export const PinInput: FC<PinInputProps> = ({
  length = 4,
  type = 'numeric',
  variant = 'outline',
  size = 'medium',
  hasError = false,
  disabled = false,
  autoFocus = false,
  masked = false,
  maskChar = '•',
  value,
  defaultValue = '',
  onChange,
  onComplete,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className,
  children,
}): ReactElement => {
  // Internal state for field values
  const [internalValues, setInternalValues] = useState<string[]>(() =>
    splitValue(defaultValue, length),
  );

  // Determine if component is controlled
  const isControlled = value !== undefined;
  const currentValues = isControlled
    ? splitValue(value, length)
    : internalValues;

  // Create refs for all input fields
  const fieldRefs = useRef<(HTMLInputElement | null)[]>(
    createFieldRefs(length),
  );

  // Hidden input for form integration and screen readers
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  /**
   * Updates value at specific field index
   */
  const setValue = useCallback(
    (index: number, newValue: string): void => {
      const newValues = [...currentValues];
      newValues[index] = newValue;

      if (!isControlled) {
        setInternalValues(newValues);
      }

      const completeValue = getPinValue(newValues);

      // Update hidden input for form integration
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = completeValue;
      }

      // Call onChange callback
      onChange?.(completeValue);

      // Call onComplete if all fields are filled
      if (isComplete(newValues)) {
        onComplete?.(completeValue);
      }
    },
    [currentValues, isControlled, onChange, onComplete],
  );

  /**
   * Focuses field at specific index
   */
  const focusField = useCallback(
    (index: number): void => {
      const field = fieldRefs.current[index];
      if (field && !disabled) {
        field.focus();
      }
    },
    [disabled],
  );

  /**
   * Handles focus events from individual fields
   */
  const handleFocus = useCallback(
    (index: number): void => {
      onFocus?.(index);
    },
    [onFocus],
  );

  /**
   * Handles blur events from individual fields
   */
  const handleBlur = useCallback(
    (index: number): void => {
      onBlur?.(index);
    },
    [onBlur],
  );

  // Auto-focus first field on mount if requested
  useEffect(() => {
    if (autoFocus && !disabled) {
      setTimeout(() => {
        focusField(0);
      }, 0);
    }
  }, [autoFocus, disabled, focusField]);

  // Update internal values when controlled value changes
  useEffect(() => {
    if (isControlled) {
      const newValues = splitValue(value, length);
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = getPinValue(newValues);
      }
    }
  }, [isControlled, value, length]);

  // Create context value
  const contextValue: PinInputContextValue = {
    values: currentValues,
    type,
    variant,
    size,
    hasError,
    disabled,
    masked,
    maskChar,
    length,
    fieldRefs,
    setValue,
    focusField,
    handleFocus,
    handleBlur,
  };

  // Build container className
  const containerClassName = pinInputContainerRecipe({ size });
  const componentClassName = buildPinInputClassName(
    variant,
    size,
    hasError,
    disabled,
    className,
  );

  return (
    <PinInputContext.Provider value={contextValue}>
      <div
        className={`${containerClassName} ${componentClassName}`}
        role="group"
        aria-label={ariaLabel || `PIN input with ${length} digits`}
        aria-describedby={ariaDescribedBy}
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
      >
        {/* Hidden input for form integration and screen readers */}
        <input
          ref={hiddenInputRef}
          type="text"
          name="pin"
          defaultValue={getPinValue(currentValues)}
          className={hiddenInput}
          tabIndex={-1}
          aria-hidden="true"
          readOnly
        />

        {children}
      </div>
    </PinInputContext.Provider>
  );
};

PinInput.displayName = 'PinInput';
