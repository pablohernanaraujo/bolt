// /src/ui/pin-input/pin-input-group.tsx
// Group component for organizing PIN input fields with consistent spacing
// Provides semantic grouping and layout for related PIN input fields
// RELEVANT FILES: pin-input.tsx, pin-input-field.tsx, types.ts

import { type FC, type ReactElement, useContext } from 'react';

import { pinInputGroupRecipe, pinInputSeparator } from './pin-input.css';
import { PinInputContext } from './pin-input-context';
import { type PinInputGroupProps, type PinInputSeparatorProps } from './types';

/**
 * Group component for PIN input fields
 *
 * Provides consistent spacing and layout for a group of related PIN input fields.
 * Multiple groups can be used with separators for visual organization.
 *
 * Example:
 * ```tsx
 * <PinInput length={6}>
 *   <PinInputGroup>
 *     <PinInputField index={0} />
 *     <PinInputField index={1} />
 *     <PinInputField index={2} />
 *   </PinInputGroup>
 *   <PinInputSeparator />
 *   <PinInputGroup>
 *     <PinInputField index={3} />
 *     <PinInputField index={4} />
 *     <PinInputField index={5} />
 *   </PinInputGroup>
 * </PinInput>
 * ```
 */
export const PinInputGroup: FC<PinInputGroupProps> = ({
  children,
  className,
}): ReactElement => {
  const context = useContext(PinInputContext);

  if (!context) {
    throw new Error('PinInputGroup must be used within a PinInput component');
  }

  const { size } = context;

  // Build group className with size-based spacing
  const groupClassName = pinInputGroupRecipe({ size });
  const combinedClassName = className
    ? `${groupClassName} ${className}`
    : groupClassName;

  return (
    <div className={combinedClassName} role="group">
      {children}
    </div>
  );
};

PinInputGroup.displayName = 'PinInputGroup';

/**
 * Separator component for visual division between PIN input groups
 *
 * Provides a visual separator (typically a dash or dot) between groups of PIN fields.
 * Useful for organizing longer PINs into logical segments.
 *
 * Example:
 * ```tsx
 * <PinInputSeparator>-</PinInputSeparator>
 * <PinInputSeparator>•</PinInputSeparator>
 * ```
 */
export const PinInputSeparator: FC<PinInputSeparatorProps> = ({
  children = '-',
  className,
}): ReactElement => {
  const combinedClassName = className
    ? `${pinInputSeparator} ${className}`
    : pinInputSeparator;

  return (
    <div className={combinedClassName} aria-hidden="true">
      {children}
    </div>
  );
};

PinInputSeparator.displayName = 'PinInputSeparator';
