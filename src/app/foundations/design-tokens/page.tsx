// /src/app/foundations/design-tokens/page.tsx
// Design tokens showcase page
// Displays font sizes, weights, and other design tokens with examples
// RELEVANT FILES: ../../../tokens/tokens.css, ../../../tokens/contracts.css

'use client';

import { type FC, type ReactElement } from 'react';

import { tokens } from '@/tokens/tokens.css';
import {
  Body2,
  Caption,
  Container,
  ContentWrapper,
  H1,
  H2,
  Overline,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Design Tokens page component
 * Shows the fundamental design decisions represented as code
 */
const DesignTokensPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="body">
      <H1>Design Tokens</H1>
      <Body2>
        Los design tokens son las decisiones de diseño fundamentales
        representadas como código.
      </Body2>

      <div className={styles.showcase}>
        <H2>Font Sizes</H2>
        <div className={styles.tokenGrid}>
          {Object.entries(tokens.fontSize).map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <div className={styles.typographyDemo}>
                <div
                  className={styles.typographyText}
                  style={{ fontSize: value }}
                >
                  Sample Text
                </div>
              </div>
              <Caption>fontSize.{key}</Caption>
              <Overline>{value}</Overline>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.showcase}>
        <H2>Font Weights</H2>
        <div className={styles.tokenGrid}>
          {Object.entries(tokens.fontWeight).map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <div className={styles.typographyDemo}>
                <div
                  className={styles.typographyText}
                  style={{ fontWeight: value }}
                >
                  Sample Text
                </div>
              </div>
              <Caption>fontWeight.{key}</Caption>
              <Overline>{value}</Overline>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default DesignTokensPage;
