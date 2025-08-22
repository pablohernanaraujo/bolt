// /src/ui/layout/app-layout/app-layout.tsx
// Main application layout component with sidebar and content areas
// Provides consistent structure without theme logic or inline styles
// RELEVANT FILES: sidebar.tsx, app-header.tsx, flex.tsx, layout-client.tsx

import { type FC, type ReactElement, type ReactNode } from 'react';

import { Flex } from '../flex';
import * as styles from './app-layout.css';

interface AppLayoutProps {
  /** Sidebar content */
  sidebar: ReactNode;
  /** Main content area */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main application layout component
 * Creates a horizontal flex layout with sidebar and main content
 */
export const AppLayout: FC<AppLayoutProps> = ({
  sidebar,
  children,
  className,
}): ReactElement => (
  <Flex
    direction="row"
    className={`${styles.appLayout} ${className || ''}`}
    style={{ minHeight: '100vh' }}
  >
    {sidebar}
    <Flex
      direction="column"
      className={styles.appContent}
      style={{
        flex: 1,
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {children}
    </Flex>
  </Flex>
);
