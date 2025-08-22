// /src/app/content/badge/page.tsx
// Badge component showcase page
// Displays badge variants, color schemes, sizes and usage examples
// RELEVANT FILES: ../../../ui/badge

'use client';

import { type FC, type ReactElement } from 'react';

import { Badge, Body2, H1, H3 } from '@/ui';

import * as styles from '../../page.css';

/**
 * Badge page component
 * Status indicators for highlighting items with quick recognition
 */
const BadgePage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Badge</H1>
    <Body2>
      Status indicators for highlighting items with quick recognition
    </Body2>

    <div className={styles.showcase}>
      <H3>Variants</H3>
      <div className={styles.componentGroup}>
        <Badge variant="solid" colorScheme="default">
          Default
        </Badge>
        <Badge variant="subtle" colorScheme="default">
          Subtle
        </Badge>
        <Badge variant="outline" colorScheme="default">
          Outline
        </Badge>
      </div>

      <H3>Color Schemes</H3>
      <div className={styles.componentGroup}>
        <Badge variant="solid" colorScheme="default">
          Default
        </Badge>
        <Badge variant="solid" colorScheme="brand">
          Brand
        </Badge>
        <Badge variant="solid" colorScheme="success">
          Success
        </Badge>
        <Badge variant="solid" colorScheme="warning">
          Warning
        </Badge>
        <Badge variant="solid" colorScheme="error">
          Error
        </Badge>
        <Badge variant="solid" colorScheme="info">
          Info
        </Badge>
      </div>

      <H3>Subtle Variants</H3>
      <div className={styles.componentGroup}>
        <Badge variant="subtle" colorScheme="default">
          Default
        </Badge>
        <Badge variant="subtle" colorScheme="brand">
          Brand
        </Badge>
        <Badge variant="subtle" colorScheme="success">
          Success
        </Badge>
        <Badge variant="subtle" colorScheme="warning">
          Warning
        </Badge>
        <Badge variant="subtle" colorScheme="error">
          Error
        </Badge>
        <Badge variant="subtle" colorScheme="info">
          Info
        </Badge>
      </div>

      <H3>Outline Variants</H3>
      <div className={styles.componentGroup}>
        <Badge variant="outline" colorScheme="default">
          Default
        </Badge>
        <Badge variant="outline" colorScheme="brand">
          Brand
        </Badge>
        <Badge variant="outline" colorScheme="success">
          Success
        </Badge>
        <Badge variant="outline" colorScheme="warning">
          Warning
        </Badge>
        <Badge variant="outline" colorScheme="error">
          Error
        </Badge>
        <Badge variant="outline" colorScheme="info">
          Info
        </Badge>
      </div>

      <H3>Sizes</H3>
      <div className={styles.componentGroup}>
        <Badge size="small" colorScheme="brand">
          Small
        </Badge>
        <Badge size="medium" colorScheme="brand">
          Medium
        </Badge>
        <Badge size="large" colorScheme="brand">
          Large
        </Badge>
      </div>

      <H3>Usage Examples</H3>
      <div className={styles.componentGroup}>
        <Badge variant="solid" colorScheme="success">
          Active
        </Badge>
        <Badge variant="subtle" colorScheme="warning">
          Pending
        </Badge>
        <Badge variant="outline" colorScheme="error">
          Expired
        </Badge>
        <Badge variant="solid" colorScheme="info">
          New
        </Badge>
        <Badge variant="subtle" colorScheme="brand">
          Pro
        </Badge>
      </div>
    </div>
  </div>
);

export default BadgePage;
