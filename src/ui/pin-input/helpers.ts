/* eslint-disable max-params */
// /src/ui/pin-input/helpers.ts
// Utility functions and helpers for PIN input behavior
// Handles focus management, validation, paste handling, and keyboard navigation
// RELEVANT FILES: pin-input.tsx, pin-input-field.tsx, types.ts

import { type PinInputType } from './types';

/**
 * Regular expressions for input validation
 */
export const INPUT_PATTERNS: Record<PinInputType, RegExp> = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
};

/**
 * Input mode attributes for different input types
 */
export const INPUT_MODES: Record<PinInputType, string> = {
  numeric: 'numeric',
  alphanumeric: 'text',
};

/**
 * Validates a character against the specified input type
 *
 * @param char - The character to validate
 * @param type - The input type (numeric or alphanumeric)
 * @returns Whether the character is valid for the input type
 */
export const isValidChar = (char: string, type: PinInputType): boolean =>
  INPUT_PATTERNS[type].test(char);

/**
 * Filters a string to only include valid characters for the input type
 *
 * @param text - The text to filter
 * @param type - The input type
 * @returns Filtered string containing only valid characters
 */
export const filterValidChars = (text: string, type: PinInputType): string =>
  text
    .split('')
    .filter((char) => isValidChar(char, type))
    .join('');

/**
 * Handles paste event and distributes pasted content across fields
 *
 * @param pastedText - The pasted text content
 * @param startIndex - The index where paste started
 * @param type - The input type for validation
 * @param length - Total number of fields
 * @param setValue - Function to set value at specific index
 * @param focusField - Function to focus specific field
 * @returns Object with processed values and next focus index
 */
export const handlePasteContent = (
  pastedText: string,
  startIndex: number,
  type: PinInputType,
  length: number,
  setValue: (index: number, value: string) => void,
  focusField: (index: number) => void,
): {
  processedChars: string[];
  nextFocusIndex: number;
} => {
  // Filter only valid characters
  const validChars = filterValidChars(pastedText, type);
  const processedChars: string[] = [];

  // Distribute characters starting from the paste position
  for (let i = 0; i < validChars.length && startIndex + i < length; i++) {
    const char = validChars[i];
    const fieldIndex = startIndex + i;

    setValue(fieldIndex, char);
    processedChars.push(char);
  }

  // Calculate next focus position
  const nextFocusIndex = Math.min(
    startIndex + processedChars.length,
    length - 1,
  );

  // Focus the next empty field or the last field
  setTimeout(() => {
    focusField(nextFocusIndex);
  }, 0);

  return {
    processedChars,
    nextFocusIndex,
  };
};

/**
 * Handles keyboard navigation between fields
 *
 * @param key - The pressed key
 * @param currentIndex - Current field index
 * @param currentValue - Current field value
 * @param length - Total number of fields
 * @param setValue - Function to set value at specific index
 * @param focusField - Function to focus specific field
 * @returns Whether the key was handled
 */
export const handleKeyNavigation = (
  key: string,
  currentIndex: number,
  currentValue: string,
  length: number,
  setValue: (index: number, value: string) => void,
  focusField: (index: number) => void,
): boolean => {
  switch (key) {
    case 'ArrowLeft':
      // Move to previous field
      if (currentIndex > 0) {
        focusField(currentIndex - 1);
      }
      return true;

    case 'ArrowRight':
      // Move to next field
      if (currentIndex < length - 1) {
        focusField(currentIndex + 1);
      }
      return true;

    case 'Home':
      // Move to first field
      focusField(0);
      return true;

    case 'End':
      // Move to last field
      focusField(length - 1);
      return true;

    case 'Backspace':
      // Clear current field, then move to previous if empty
      if (currentValue === '' && currentIndex > 0) {
        focusField(currentIndex - 1);
      } else {
        setValue(currentIndex, '');
      }
      return true;

    case 'Delete':
      // Clear current field
      setValue(currentIndex, '');
      return true;

    default:
      return false;
  }
};

/**
 * Handles character input and auto-advance behavior
 *
 * @param char - The input character
 * @param currentIndex - Current field index
 * @param type - Input type for validation
 * @param length - Total number of fields
 * @param setValue - Function to set value at specific index
 * @param focusField - Function to focus specific field
 * @returns Whether the character was handled
 */
export const handleCharInput = (
  char: string,
  currentIndex: number,
  type: PinInputType,
  length: number,
  setValue: (index: number, value: string) => void,
  focusField: (index: number) => void,
): boolean => {
  if (!isValidChar(char, type)) {
    return false;
  }

  // Set the character in current field
  setValue(currentIndex, char);

  // Auto-advance to next field if not at the end
  if (currentIndex < length - 1) {
    setTimeout(() => {
      focusField(currentIndex + 1);
    }, 0);
  }

  return true;
};

/**
 * Finds the first empty field index
 *
 * @param values - Array of current field values
 * @returns Index of first empty field, or -1 if all filled
 */
export const findFirstEmptyIndex = (values: string[]): number =>
  values.indexOf('');

/**
 * Finds the last filled field index
 *
 * @param values - Array of current field values
 * @returns Index of last filled field, or -1 if all empty
 */
export const findLastFilledIndex = (values: string[]): number => {
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== '') {
      return i;
    }
  }
  return -1;
};

/**
 * Gets the complete PIN value from all fields
 *
 * @param values - Array of field values
 * @returns Combined PIN string
 */
export const getPinValue = (values: string[]): string => values.join('');

/**
 * Checks if all fields are filled
 *
 * @param values - Array of field values
 * @returns Whether all fields have values
 */
export const isComplete = (values: string[]): boolean =>
  values.every((value) => value !== '');

/**
 * Splits a value string into individual field values
 *
 * @param value - The complete value string
 * @param length - Number of fields
 * @returns Array of individual field values
 */
export const splitValue = (value: string, length: number): string[] => {
  const values = value.split('').slice(0, length);

  // Pad with empty strings if needed
  while (values.length < length) {
    values.push('');
  }

  return values;
};

/**
 * Creates an array of field refs
 *
 * @param length - Number of fields
 * @returns Array of null refs
 */
export const createFieldRefs = (length: number): (HTMLInputElement | null)[] =>
  new Array(length).fill(null);

/**
 * Gets the display value for a field (original or masked)
 *
 * @param value - The original value
 * @param masked - Whether to mask the value
 * @param maskChar - Character to use for masking
 * @returns Display value (original or masked)
 */
export const getDisplayValue = (
  value: string,
  masked: boolean,
  maskChar: string,
): string => {
  if (!masked || !value) {
    return value;
  }
  return maskChar;
};

/**
 * Builds className for PIN input container based on variant and size
 *
 * @param variant - Visual variant
 * @param size - Size variant
 * @param hasError - Error state
 * @param disabled - Disabled state
 * @param className - Additional className
 * @returns Combined className string
 */
export const buildPinInputClassName = (
  variant: string,
  size: string,
  hasError: boolean,
  disabled: boolean,
  className?: string,
): string => {
  const classes = ['pin-input', `pin-input--${variant}`, `pin-input--${size}`];

  if (hasError) {
    classes.push('pin-input--error');
  }

  if (disabled) {
    classes.push('pin-input--disabled');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};
