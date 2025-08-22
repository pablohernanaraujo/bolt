// /src/app/controls/button/page.tsx
// Button component showcase page
// Displays button variants, sizes, states and icon usage
// RELEVANT FILES: ../../../ui/button, ../../../icons

'use client';

import { type FC, type ReactElement } from 'react';

import { Icon, Package, Palette } from '@/icons';
import { Body2, Button, H1, H2 } from '@/ui';

import * as styles from '../../page.css';

/**
 * Button page component
 * Accessible button component with multiple variants, sizes and states
 */
const ButtonPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Button</H1>
    <Body2>
      Componente de botón accesible con múltiples variantes, tamaños y estados.
    </Body2>

    <div className={styles.showcase}>
      <H2>Variants</H2>
      <div className={styles.componentGroup}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <div className={styles.componentGroup}>
        <Button variant="primary" size="small">
          Small
        </Button>
        <Button variant="primary" size="medium">
          Medium
        </Button>
        <Button variant="primary" size="large">
          Large
        </Button>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>With Icons</H2>
      <div className={styles.componentGroup}>
        <Button variant="primary">
          <Icon icon={Package} size="sm" />
          Download
        </Button>
        <Button variant="secondary">
          <Icon icon={Palette} size="sm" />
          Favorite
        </Button>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>States</H2>
      <div className={styles.componentGroup}>
        <Button variant="primary">Normal</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  </div>
);

export default ButtonPage;
