// /src/ui/input-group/input-group.tsx
// Container component for grouping inputs with addons and elements
// Provides layout and context for child components
// RELEVANT FILES: types.ts, input-group.css.ts, input-group-context.tsx

import { type FC, type ReactElement, useMemo } from 'react';

import { analyzeChildren, buildInputGroupClassName } from './helpers';
import { InputGroupContext } from './input-group-context';
import { type InputGroupProps } from './types';

/**
 * InputGroup component for creating complex input layouts
 * Groups inputs with addons and overlay elements
 *
 * Features:
 * - Supports left/right addons for static content
 * - Supports left/right elements for overlay content
 * - Size and variant inheritance to children
 * - Proper visual connection between components
 * - Accessibility-friendly structure
 *
 * Example:
 * ```tsx
 * <InputGroup>
 *   <InputLeftAddon>https://</InputLeftAddon>
 *   <Input placeholder="Enter URL" />
 *   <InputRightAddon>.com</InputRightAddon>
 * </InputGroup>
 * ```
 */
export const InputGroup: FC<InputGroupProps> = ({
  children,
  size = 'medium',
  variant = 'outline',
  isDisabled = false,
  hasError = false,
  className,
  ...props
}): ReactElement => {
  // Analyze children to determine layout requirements
  const childAnalysis = useMemo(() => analyzeChildren(children), [children]);

  // Build context value for child components
  const contextValue = useMemo(
    () => ({
      size,
      variant,
      isDisabled,
      hasError,
      ...childAnalysis,
    }),
    [size, variant, isDisabled, hasError, childAnalysis],
  );

  // Build className for the group container
  const groupClassName = buildInputGroupClassName(
    variant,
    size,
    hasError,
    isDisabled,
    className,
  );

  return (
    <InputGroupContext.Provider value={contextValue}>
      <div
        className={groupClassName}
        data-disabled={isDisabled || undefined}
        data-error={hasError || undefined}
        {...props}
      >
        {children}
      </div>
    </InputGroupContext.Provider>
  );
};

InputGroup.displayName = 'InputGroup';
