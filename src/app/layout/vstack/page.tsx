// /src/app/layout/vstack/page.tsx
// VStack component showcase page
// Demonstrates vertical layout component with spacing and alignment options
// RELEVANT FILES: ../../../ui/layout/vstack, ../../../ui/button

'use client';

import { type FC, type ReactElement } from 'react';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import {
  Body2,
  Body3,
  Button,
  Caption,
  H1,
  H2,
  H3,
  H4,
  HStack,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * VStack page component
 * Vertical layout component that organizes child elements in a column with configurable spacing and alignment
 */
const VStackPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>VStack</H1>
    <Body2>
      Componente de layout vertical que organiza elementos secundarios en una
      columna con espaciado y alineación configurables.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <div className={styles.componentGroup}>
        <VStack space="4">
          <Button variant="primary">First</Button>
          <Button variant="secondary">Second</Button>
          <Button variant="ghost">Third</Button>
        </VStack>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Real-world Examples</H2>
      <HStack space="8">
        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Form Layout</H3>
          <VStack
            space="4"
            align="stretch"
            style={{
              width: '250px',
              backgroundColor: colors.background.secondary,
              padding: tokens.space[4],
            }}
          >
            <VStack space="1">
              <Caption
                style={{
                  color: colors.foreground.secondary,
                }}
              >
                Name
              </Caption>
              <input
                style={{
                  padding: tokens.space[2],
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${colors.border.primary}`,
                }}
                placeholder="Enter your name"
              />
            </VStack>
            <VStack space="1">
              <Caption
                style={{
                  color: colors.foreground.secondary,
                }}
              >
                Email
              </Caption>
              <input
                style={{
                  padding: tokens.space[2],
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${colors.border.primary}`,
                }}
                placeholder="Enter your email"
                type="email"
              />
            </VStack>
            <Button variant="primary">Submit</Button>
          </VStack>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Card Stack</H3>
          <VStack space="4" style={{ width: '200px' }}>
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: colors.background.secondary,
                borderRadius: tokens.radius.lg,
                border: `1px solid ${colors.border.primary}`,
              }}
            >
              <H4
                style={{
                  margin: 0,
                  marginBottom: tokens.space[2],
                }}
              >
                Card 1
              </H4>
              <Body3
                style={{
                  margin: 0,
                  color: colors.foreground.secondary,
                }}
              >
                This is the first card
              </Body3>
            </div>
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: colors.background.secondary,
                borderRadius: tokens.radius.lg,
                border: `1px solid ${colors.border.primary}`,
              }}
            >
              <H4
                style={{
                  margin: 0,
                  marginBottom: tokens.space[2],
                }}
              >
                Card 2
              </H4>
              <Body3
                style={{
                  margin: 0,
                  color: colors.foreground.secondary,
                }}
              >
                This is the second card
              </Body3>
            </div>
          </VStack>
        </div>
      </HStack>
    </div>
  </div>
);

export default VStackPage;
