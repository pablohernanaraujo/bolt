/* eslint-disable complexity */
// /src/app/layout-header-client.tsx
// Client-side header component for dynamic title updates
// Minimal client boundary for pathname-based title changes
// RELEVANT FILES: layout-server.tsx, app-header/index.tsx, layout.tsx

'use client';

import { usePathname } from 'next/navigation';
import {
  type FC,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import { AppHeader } from '@/ui';

interface LayoutHeaderClientProps {
  title: string;
  actions?: ReactNode;
}

/**
 * Get page title based on current pathname
 * Client-side equivalent for dynamic updates
 */
const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Overview';
    case '/foundations/design-tokens':
      return 'Design Tokens';
    case '/foundations/colors':
      return 'Colors';
    case '/foundations/typography':
      return 'Typography';
    case '/foundations/spacing':
      return 'Spacing';
    case '/layout/container':
      return 'Container';
    case '/layout/content-wrapper':
      return 'ContentWrapper';
    case '/layout/hstack':
      return 'HStack';
    case '/layout/vstack':
      return 'VStack';
    case '/layout/flex':
      return 'Flex';
    case '/layout/divider':
      return 'Divider';
    case '/layout/grid':
      return 'Grid';
    case '/components/badge':
      return 'Badge Component';
    case '/components/button':
      return 'Button Component';
    case '/controls':
      return 'Controls';
    case '/controls/checkbox':
      return 'Checkbox Component';
    case '/controls/toggle':
      return 'Toggle Component';
    case '/forms/file-upload':
      return 'FileUpload Component';
    case '/navigation':
      return 'Navigation Components';
    case '/navigation/accordion':
      return 'Accordion Component';
    case '/feedback/spinner':
      return 'Spinner Component';
    case '/icons':
      return 'Icons';
    default:
      return 'Design System';
  }
};

/**
 * Client-side header component
 * Updates title dynamically based on route changes
 * Minimal client boundary for responsive navigation
 */
export const LayoutHeaderClient: FC<LayoutHeaderClientProps> = ({
  title: initialTitle,
  actions,
}): ReactElement => {
  const pathname = usePathname();
  const [currentTitle, setCurrentTitle] = useState(initialTitle);

  // Update title when pathname changes
  useEffect(() => {
    const newTitle = getPageTitle(pathname);
    setCurrentTitle(newTitle);
  }, [pathname]);

  return <AppHeader title={currentTitle} actions={actions} />;
};
