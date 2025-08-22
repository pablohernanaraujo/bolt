// /src/ui/layout/app-header/types.ts
// Type definitions for AppHeader component
// Defines props interface for application header
// RELEVANT FILES: app-header.tsx, index.ts

import { type ReactNode } from 'react';

export interface AppHeaderProps {
  /** Header title text */
  title: string;
  /** Action elements (buttons, etc.) */
  actions?: ReactNode;
  /** Whether to show divider below header */
  showDivider?: boolean;
}
