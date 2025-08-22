// /src/ui/code/code.tsx
// Code component for displaying inline code snippets
// Provides monospace typography with theme-aware styling
// RELEVANT FILES: code.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCodeClassName } from './helpers';
import { type CodeProps } from './types';

/**
 * Code component for inline code display
 * Used to highlight code snippets within text content
 *
 * Features:
 * - Monospace typography using design system tokens
 * - Theme-aware background and text colors
 * - Subtle border and padding for visual separation
 * - Inline display for use within paragraphs
 * - Proper text wrapping and selection
 *
 * @example
 * ```tsx
 * // Basic usage
 * <p>Install with <Code>npm install react</Code></p>
 * ```
 *
 * @example
 * ```tsx
 * // Variable or function names
 * <p>The <Code>useState</Code> hook manages component state.</p>
 * ```
 *
 * @example
 * ```tsx
 * // File paths or commands
 * <p>Edit the <Code>package.json</Code> file in your project root.</p>
 * ```
 */
export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ children, className, ...props }, ref): ReactElement => {
    const codeClassName = buildCodeClassName(className);

    return (
      <code ref={ref} className={codeClassName} {...props}>
        {children}
      </code>
    );
  },
);

Code.displayName = 'Code';
