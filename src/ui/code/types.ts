// /src/ui/code/types.ts
// Type definitions for Code component
// Defines props interface for inline code display
// RELEVANT FILES: code.tsx, index.ts

import { type ReactNode } from 'react';

export interface CodeProps {
  /** Code content to display */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}
