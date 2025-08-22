// /src/ui/layout/sidebar/types.ts
// Type definitions for Sidebar layout component
// Defines props interface for sidebar wrapper
// RELEVANT FILES: sidebar.tsx, index.ts

import { type ReactNode } from 'react';

export interface SidebarProps {
  /** Sidebar content */
  children: ReactNode;
  /** Whether sidebar is collapsed on mobile */
  isCollapsed?: boolean;
  /** Additional CSS classes */
  className?: string;
}
