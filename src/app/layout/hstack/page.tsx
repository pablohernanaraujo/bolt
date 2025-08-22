// /src/app/layout/hstack/page.tsx
// HStack component showcase page
// Demonstrates horizontal layout component with spacing and alignment options
// RELEVANT FILES: ../../../ui/layout/hstack, ../../../ui/button

'use client';

import { type FC, type ReactElement } from 'react';

import { Icon, Package } from '@/icons';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { Body2, Button, H1, H2, H3, HStack, Overline, VStack } from '@/ui';

import * as styles from '../../page.css';

/**
 * HStack page component
 * Horizontal layout component that organizes child elements in a row with configurable spacing and alignment
 */
const HStackPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>HStack</H1>
    <Body2>
      Componente de layout horizontal que organiza elementos secundarios en una
      fila con espaciado y alineación configurables.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <div className={styles.componentGroup}>
        <HStack space="4">
          <Button variant="primary">First</Button>
          <Button variant="secondary">Second</Button>
          <Button variant="ghost">Third</Button>
        </HStack>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Spacing Scale</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>space="0"</Overline>
          <HStack space="0">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </HStack>
        </div>
        <div className={styles.componentItem}>
          <Overline>space="2"</Overline>
          <HStack space="2">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </HStack>
        </div>
        <div className={styles.componentItem}>
          <Overline>space="4"</Overline>
          <HStack space="4">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </HStack>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Real-world Examples</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Navigation Bar</H3>
          <HStack
            space="6"
            justify="between"
            align="center"
            style={{
              padding: tokens.space[4],
              backgroundColor: colors.background.secondary,
            }}
          >
            <HStack space="4" align="center">
              <Icon icon={Package} size="lg" />
              <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
                Brand
              </Body2>
            </HStack>
            <HStack space="3">
              <Button variant="ghost" size="small">
                Home
              </Button>
              <Button variant="ghost" size="small">
                Products
              </Button>
              <Button variant="ghost" size="small">
                About
              </Button>
            </HStack>
          </HStack>
        </div>
      </VStack>
    </div>
  </div>
);

export default HStackPage;
