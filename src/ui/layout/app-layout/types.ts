// /src/ui/layout/app-layout/types.ts
// Type definitions for AppLayout component
// Defines props interface for main application layout
// RELEVANT FILES: app-layout.tsx, index.ts

import { type ReactNode } from 'react';

export interface AppLayoutProps {
  /** Sidebar content */
  sidebar: ReactNode;
  /** Main content area */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}
