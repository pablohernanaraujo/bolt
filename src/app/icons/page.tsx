// /src/app/icons/page.tsx
// Icons showcase page
// Displays icon system based on Lucide React with predefined sizes
// RELEVANT FILES: ../../icons

'use client';

import { type FC, type ReactElement } from 'react';

import { Icon, Package, Palette, Settings, Square, Type, Zap } from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import { Body2, Caption, H1, H2 } from '@/ui';

import * as styles from '../page.css';

/**
 * Icons page component
 * Icon system based on Lucide React with predefined sizes
 */
const IconsPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Icons</H1>
    <Body2>
      Sistema de iconos basado en Lucide React con tamaños predefinidos.
    </Body2>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <div className={styles.iconGrid}>
        <div style={{ textAlign: 'center' }}>
          <Icon icon={Package} size="xs" />
          <Caption style={{ marginTop: tokens.space[1] }}>XS (14px)</Caption>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon icon={Package} size="sm" />
          <Caption style={{ marginTop: tokens.space[1] }}>SM (16px)</Caption>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon icon={Package} size="md" />
          <Caption style={{ marginTop: tokens.space[1] }}>MD (20px)</Caption>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon icon={Package} size="lg" />
          <Caption style={{ marginTop: tokens.space[1] }}>LG (24px)</Caption>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon icon={Package} size="xl" />
          <Caption style={{ marginTop: tokens.space[1] }}>XL (32px)</Caption>
        </div>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Common Icons</H2>
      <div className={styles.iconGrid}>
        <Icon icon={Package} size="lg" />
        <Icon icon={Palette} size="lg" />
        <Icon icon={Type} size="lg" />
        <Icon icon={Square} size="lg" />
        <Icon icon={Zap} size="lg" />
        <Icon icon={Settings} size="lg" />
      </div>
    </div>
  </div>
);

export default IconsPage;
