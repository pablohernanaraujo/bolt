// /src/app/foundations/colors/page.tsx
// Colors showcase page
// Displays brand and semantic color palettes with theme adaptation
// RELEVANT FILES: ../../../tokens/contracts.css, ../../../tokens/themes

'use client';

import { type FC, type ReactElement } from 'react';

import { colors } from '@/tokens/contracts.css';
import { Body2, Caption, H1, H2 } from '@/ui';

import * as styles from '../../page.css';

/**
 * Colors page component
 * Shows the color palette that adapts automatically to light and dark themes
 */
const ColorsPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Colors</H1>
    <Body2>
      Paleta de colores que se adapta automáticamente a los temas claro y
      oscuro.
    </Body2>

    <div className={styles.showcase}>
      <H2>Brand Colors</H2>
      <div className={styles.colorGrid}>
        <div className={styles.colorSwatch}>
          <div
            className={styles.colorBox}
            style={{ backgroundColor: colors.brand.primary }}
          />
          <Caption>Primary</Caption>
        </div>
        <div className={styles.colorSwatch}>
          <div
            className={styles.colorBox}
            style={{ backgroundColor: colors.brand.primaryHover }}
          />
          <Caption>Primary Hover</Caption>
        </div>
        <div className={styles.colorSwatch}>
          <div
            className={styles.colorBox}
            style={{ backgroundColor: colors.brand.secondary }}
          />
          <Caption>Secondary</Caption>
        </div>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Semantic Colors</H2>
      <div className={styles.colorGrid}>
        {Object.entries(colors.semantic)
          .filter(([key]) => !key.includes('Background'))
          .map(([key, value]) => (
            <div key={key} className={styles.colorSwatch}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: value }}
              />
              <Caption>{key.charAt(0).toUpperCase() + key.slice(1)}</Caption>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default ColorsPage;
