// /src/ui/layout/sidebar/sidebar.tsx
// Layout wrapper for sidebar component with responsive behavior
// Provides consistent sidebar positioning and responsive handling
// RELEVANT FILES: app-layout.tsx, sidebar.css.ts, flex.tsx

import { type FC, type ReactElement, type ReactNode } from 'react';

import { Flex } from '../flex';
import * as styles from './sidebar.css';

interface SidebarProps {
  /** Sidebar content */
  children: ReactNode;
  /** Whether sidebar is collapsed on mobile */
  isCollapsed?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Sidebar layout wrapper component
 * Handles responsive behavior and positioning
 */
export const Sidebar: FC<SidebarProps> = ({
  children,
  isCollapsed = false,
  className,
}): ReactElement => (
  <Flex
    direction="column"
    className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''} ${className || ''}`}
  >
    {children}
  </Flex>
);
