// /src/ui/layout/app-header/app-header.tsx
// Application header component with title and actions
// Provides consistent header structure across pages
// RELEVANT FILES: content-wrapper.tsx, hstack.tsx, h1.tsx, divider.tsx

import { type FC, type ReactElement, type ReactNode } from 'react';

import { Divider } from '@/ui/divider';
import { H1 } from '@/ui/typography';

import { ContentWrapper } from '../content-wrapper';
import { HStack } from '../hstack';

interface AppHeaderProps {
  /** Header title text */
  title: string;
  /** Action elements (buttons, etc.) */
  actions?: ReactNode;
  /** Whether to show divider below header */
  showDivider?: boolean;
}

/**
 * Application header component
 * Renders title and optional actions in a consistent layout
 */
export const AppHeader: FC<AppHeaderProps> = ({
  title,
  actions,
  showDivider = true,
}): ReactElement => (
  <>
    <header>
      <ContentWrapper variant="header">
        <HStack justify="between" align="center">
          <H1>{title}</H1>
          {actions && <div>{actions}</div>}
        </HStack>
      </ContentWrapper>
    </header>
    {showDivider && <Divider spacing="none" />}
  </>
);
