// /src/app/foundations/spacing/page.tsx
// Spacing showcase page
// Displays spacing scale and border radius tokens with visual examples
// RELEVANT FILES: ../../../tokens/tokens.css

'use client';

import { type FC, type ReactElement } from 'react';

import { tokens } from '@/tokens/tokens.css';
import { Body2, Caption, H1, H2, Overline } from '@/ui';

import * as styles from '../../page.css';

/**
 * Spacing page component
 * Consistent spacing system based on a modular 4px scale
 */
const SpacingPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Spacing</H1>
    <Body2>
      Sistema de espaciado consistente basado en una escala modular de 4px.
    </Body2>

    <div className={styles.showcase}>
      <H2>Space Scale</H2>
      <div className={styles.tokenGrid}>
        {Object.entries(tokens.space)
          .slice(1, 10)
          .map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <Caption>space.{key}</Caption>
              <div className={styles.spacingDemo} style={{ width: value }} />
              <Overline>{value}</Overline>
            </div>
          ))}
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Border Radius</H2>
      <div className={styles.tokenGrid}>
        {Object.entries(tokens.radius)
          .slice(1, 8)
          .map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <Caption>radius.{key}</Caption>
              <div
                className={styles.radiusDemo}
                style={{ borderRadius: value }}
              />
              <Overline>{value}</Overline>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default SpacingPage;
