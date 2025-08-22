/* eslint-disable max-statements */
// /src/ui/pin-input/pin-input-field.tsx
// Individual PIN input field component with keyboard and paste handling
// Integrates with PinInput context for coordinated behavior
// RELEVANT FILES: pin-input.tsx, types.ts, helpers.ts

'use client';

import {
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  forwardRef,
  type KeyboardEvent,
  type ReactElement,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';

import {
  getDisplayValue,
  handleCharInput,
  handleKeyNavigation,
  handlePasteContent,
  INPUT_MODES,
} from './helpers';
import { PinInputContext } from './pin-input-context';
import { pinInputFieldRecipe } from './pin-input.css';
import { type PinInputFieldProps } from './types';

/**
 * Individual PIN input field component
 *
 * Features:
 * - Single character input with validation
 * - Auto-focus progression to next field
 * - Backspace navigation to previous field
 * - Paste distribution across multiple fields
 * - Keyboard navigation (arrows, home, end)
 * - Masking support for security
 * - Accessible with proper ARIA attributes
 *
 * Note: This component should only be used within a PinInput context
 */
export const PinInputField = forwardRef<HTMLInputElement, PinInputFieldProps>(
  ({ index, className }, ref): ReactElement => {
    const context = useContext(PinInputContext);
    const inputRef = useRef<HTMLInputElement>(null);

    if (!context) {
      throw new Error('PinInputField must be used within a PinInput component');
    }

    const {
      values,
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
    } = context;

    // Set up ref forwarding and context ref
    useImperativeHandle(ref, () => inputRef.current!, []);

    // Update context ref
    if (fieldRefs.current) {
      fieldRefs.current[index] = inputRef.current;
    }

    const currentValue = values[index] || '';
    const displayValue = getDisplayValue(currentValue, masked, maskChar);

    /**
     * Handles keyboard input events
     */
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
      const { key } = event;

      // Handle navigation and special keys
      const wasHandled = handleKeyNavigation(
        key,
        index,
        currentValue,
        length,
        setValue,
        focusField,
      );

      if (wasHandled) {
        event.preventDefault();
        return;
      }

      // Handle character input
      if (key.length === 1) {
        event.preventDefault(); // Prevent default to control input

        handleCharInput(key, index, type, length, setValue, focusField);
      }
    };

    /**
     * Handles paste events
     */
    const handlePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
      event.preventDefault();

      const pastedData = event.clipboardData.getData('text');
      if (!pastedData) return;

      handlePasteContent(pastedData, index, type, length, setValue, focusField);
    };

    /**
     * Handles input change events (fallback)
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      // This is a fallback for any input that bypasses keyDown
      const newValue = event.target.value;

      if (newValue.length <= 1) {
        // Handle single character input
        const char = newValue.slice(-1);
        if (char) {
          handleCharInput(char, index, type, length, setValue, focusField);
        } else {
          setValue(index, '');
        }
      }
    };

    /**
     * Handles focus events
     */
    const handleInputFocus = (event: FocusEvent<HTMLInputElement>): void => {
      // Select all text on focus for easier replacement
      event.target.select();
      handleFocus(index);
    };

    /**
     * Handles blur events
     */
    const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
      handleBlur(index);
    };

    // Build field className
    const fieldClassName = pinInputFieldRecipe({
      variant,
      size,
    });

    const combinedClassName = className
      ? `${fieldClassName} ${className}`
      : fieldClassName;

    return (
      <input
        ref={inputRef}
        type="text"
        inputMode={INPUT_MODES[type] as 'numeric' | 'text'}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
        maxLength={1}
        value={displayValue}
        disabled={disabled}
        className={combinedClassName}
        data-index={index}
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        // Accessibility attributes
        aria-label={`PIN digit ${index + 1} of ${length}`}
        role="textbox"
        aria-invalid={hasError}
      />
    );
  },
);

PinInputField.displayName = 'PinInputField';
