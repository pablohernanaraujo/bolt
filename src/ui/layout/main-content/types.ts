// /src/ui/layout/main-content/types.ts
// Type definitions for MainContent component
// Defines props interface for main content area
// RELEVANT FILES: main-content.tsx, index.ts

import { type ReactNode } from 'react';

export interface MainContentProps {
  /** Content to display */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}
