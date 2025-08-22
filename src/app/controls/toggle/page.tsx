// /src/app/components/toggle/page.tsx
// Toggle component showcase page
// Displays toggle variants, sizes, states and label positioning
// RELEVANT FILES: ../../../ui/toggle, ../../page.css

'use client';

import { type FC, type ReactElement } from 'react';

import { Body2, H1, H2, Toggle } from '@/ui';

import * as styles from '../../page.css';

/**
 * Toggle page component
 * Showcases the accessible toggle/switch component with all its features
 */
const TogglePage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Toggle</H1>
    <Body2>
      Componente de toggle/switch accesible con múltiples variantes, tamaños y
      posicionamiento de etiquetas.
    </Body2>

    <div className={styles.showcase}>
      <H2>Variants</H2>
      <div className={styles.componentGroup}>
        <Toggle variant="primary">Primary</Toggle>
        <Toggle variant="secondary">Secondary</Toggle>
        <Toggle variant="success">Success</Toggle>
        <Toggle variant="danger">Danger</Toggle>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <div className={styles.componentGroup}>
        <Toggle variant="primary" size="small">
          Small
        </Toggle>
        <Toggle variant="primary" size="medium">
          Medium
        </Toggle>
        <Toggle variant="primary" size="large">
          Large
        </Toggle>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Label Position</H2>
      <div className={styles.componentGroup}>
        <Toggle variant="primary" labelPosition="right">
          Label on Right
        </Toggle>
        <Toggle variant="primary" labelPosition="left">
          Label on Left
        </Toggle>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Without Label</H2>
      <div className={styles.componentGroup}>
        <Toggle variant="primary" aria-label="Enable feature" />
        <Toggle variant="secondary" aria-label="Toggle setting" />
        <Toggle variant="success" aria-label="Activate option" />
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>States</H2>
      <div className={styles.componentGroup}>
        <Toggle variant="primary">Normal</Toggle>
        <Toggle variant="primary" defaultSelected>
          Checked
        </Toggle>
        <Toggle variant="primary" isDisabled>
          Disabled
        </Toggle>
        <Toggle variant="primary" isDisabled defaultSelected>
          Disabled Checked
        </Toggle>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Form Example</H2>
      <div className={styles.componentGroup}>
        <Toggle variant="primary" defaultSelected>
          Email Notifications
        </Toggle>
        <Toggle variant="primary">Push Notifications</Toggle>
        <Toggle variant="success" defaultSelected>
          Security Alerts
        </Toggle>
        <Toggle variant="danger">Marketing Emails</Toggle>
      </div>
    </div>
  </div>
);

export default TogglePage;
