/* eslint-disable complexity */
// /src/app/layout-server.tsx
// Server-side layout component with minimal client boundaries
// Provides consistent layout structure while maintaining server-first architecture
// RELEVANT FILES: layout.tsx, components/sidebar.tsx, layout-client.tsx

import { headers } from 'next/headers';
import { type FC, type ReactElement, type ReactNode } from 'react';

import { type LocaleInfo } from '@/i18n/server-locale';
import { type ThemeVariant } from '@/tokens/themes';
import { AppLayout, LayoutSidebar, MainContent } from '@/ui';
import { ThemeProviderServer } from '@/ui/theme-provider';
import { ThemeToggleServer } from '@/ui/theme-toggle/theme-toggle-server';

import { Sidebar } from './components/sidebar';
import { LayoutHeaderClient } from './layout-header-client';

interface LayoutServerProps {
  children: ReactNode;
  serverTheme: ThemeVariant;
  localeInfo: LocaleInfo;
}

/**
 * Get page title based on current pathname from headers
 * Server-side equivalent of usePathname for SEO and accessibility
 */
async function getPageTitle(): Promise<string> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

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
}

/**
 * Server-side layout component
 * Renders layout structure on server with surgical client boundaries
 * Only theme toggle requires client-side JavaScript
 */
export const LayoutServer: FC<LayoutServerProps> = async ({
  children,
  serverTheme,
  localeInfo,
}): Promise<ReactElement> => {
  // Get page title from server-side headers
  const pageTitle = await getPageTitle();

  // Server-renderable header actions with server-compatible theme toggle
  const headerActions = (
    <ThemeToggleServer
      currentTheme={serverTheme}
      showLabel={true}
      size="small"
      variant="secondary"
    />
  );

  // Server-renderable sidebar content with locale-aware layout
  const sidebarContent = (
    <LayoutSidebar
      isCollapsed={false}
      data-direction={localeInfo.direction}
      data-locale={localeInfo.locale}
    >
      <Sidebar isCollapsed={false} />
    </LayoutSidebar>
  );

  return (
    <ThemeProviderServer
      defaultTheme={serverTheme}
      followSystemTheme={false}
      storageKey="theme-preference"
      disableTransitions={true}
    >
      <AppLayout
        sidebar={sidebarContent}
        data-direction={localeInfo.direction}
        data-locale={localeInfo.locale}
      >
        <LayoutHeaderClient title={pageTitle} actions={headerActions} />
        <MainContent data-direction={localeInfo.direction}>
          {children}
        </MainContent>
      </AppLayout>
    </ThemeProviderServer>
  );
};
