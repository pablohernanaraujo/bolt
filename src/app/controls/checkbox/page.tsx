// /src/app/controls/checkbox/page.tsx
// Checkbox component showcase page
// Displays checkbox variants, sizes, states and label positioning
// RELEVANT FILES: ../../../ui/checkbox, ../../page.css

'use client';

import { type FC, type ReactElement } from 'react';

import { Body2, Checkbox, H1, H2 } from '@/ui';

import * as styles from '../../page.css';

/**
 * Checkbox page component
 * Showcases the accessible checkbox component with all its features
 */
const CheckboxPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Checkbox</H1>
    <Body2>
      Componente de checkbox accesible con múltiples variantes, tamaños y
      posicionamiento de etiquetas.
    </Body2>

    <div className={styles.showcase}>
      <H2>Variants</H2>
      <div className={styles.componentGroup}>
        <Checkbox variant="primary">Primary</Checkbox>
        <Checkbox variant="secondary">Secondary</Checkbox>
        <Checkbox variant="success">Success</Checkbox>
        <Checkbox variant="danger">Danger</Checkbox>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <div className={styles.componentGroup}>
        <Checkbox variant="primary" size="small">
          Small
        </Checkbox>
        <Checkbox variant="primary" size="medium">
          Medium
        </Checkbox>
        <Checkbox variant="primary" size="large">
          Large
        </Checkbox>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Label Position</H2>
      <div className={styles.componentGroup}>
        <Checkbox variant="primary" labelPosition="right">
          Label on Right
        </Checkbox>
        <Checkbox variant="primary" labelPosition="left">
          Label on Left
        </Checkbox>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Without Label</H2>
      <div className={styles.componentGroup}>
        <Checkbox variant="primary" aria-label="Accept terms" />
        <Checkbox variant="secondary" aria-label="Enable feature" />
        <Checkbox variant="success" aria-label="Subscribe to newsletter" />
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>States</H2>
      <div className={styles.componentGroup}>
        <Checkbox variant="primary">Normal</Checkbox>
        <Checkbox variant="primary" defaultChecked>
          Checked
        </Checkbox>
        <Checkbox variant="primary" disabled>
          Disabled
        </Checkbox>
        <Checkbox variant="primary" disabled defaultChecked>
          Disabled Checked
        </Checkbox>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Form Example</H2>
      <div className={styles.componentGroup}>
        <Checkbox variant="primary" defaultChecked>
          Accept Terms & Conditions
        </Checkbox>
        <Checkbox variant="primary">Subscribe to Newsletter</Checkbox>
        <Checkbox variant="success" defaultChecked>
          Enable Two-Factor Authentication
        </Checkbox>
        <Checkbox variant="danger">Delete Account Data</Checkbox>
      </div>
    </div>
  </div>
);

export default CheckboxPage;
