// /src/ui/layout/main-content/main-content.tsx
// Main content area component with theme-aware styling
// Provides consistent content container with proper spacing and background
// RELEVANT FILES: main-content.css.ts, flex.tsx, container.tsx

import { type FC, type ReactElement, type ReactNode } from 'react';

import { Flex } from '../flex';
import * as styles from './main-content.css';

interface MainContentProps {
  /** Content to display */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main content area component
 * Provides proper spacing, scrolling, and theme-aware background
 */
export const MainContent: FC<MainContentProps> = ({
  children,
  className,
}): ReactElement => (
  <Flex
    direction="column"
    className={`${styles.mainContent} ${className || ''}`}
  >
    {children}
  </Flex>
);
