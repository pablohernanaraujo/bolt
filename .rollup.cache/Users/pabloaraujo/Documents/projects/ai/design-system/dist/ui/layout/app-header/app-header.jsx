import { Divider } from '@/ui/divider';
import { H1 } from '@/ui/typography';
import { ContentWrapper } from '../content-wrapper';
import { HStack } from '../hstack';
export const AppHeader = ({ title, actions, showDivider = true, }) => (<>
    <header>
      <ContentWrapper variant="header">
        <HStack justify="between" align="center">
          <H1>{title}</H1>
          {actions && <div>{actions}</div>}
        </HStack>
      </ContentWrapper>
    </header>
    {showDivider && <Divider spacing="none"/>}
  </>);
