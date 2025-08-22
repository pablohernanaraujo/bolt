// /src/app/layout/flex/page.tsx
// Flex component showcase page
// Demonstrates flexible layout component with direction, wrap, alignment and gap options
// RELEVANT FILES: ../../../ui/layout/flex, ../../../ui/button

'use client';

import { type FC, type ReactElement } from 'react';

import { Download, Heart, Icon, Package, Settings } from '@/icons';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { Body2, Button, Flex, H1, H2, H3, Overline, VStack } from '@/ui';

import * as styles from '../../page.css';

/**
 * Flex page component
 * Flexible layout component that provides complete flexbox control for arranging elements
 */
const FlexPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Flex</H1>
    <Body2>
      Componente de layout flexible que proporciona control completo de flexbox
      para organizar elementos con dirección, alineación, espaciado y envoltura
      configurables. Combina las capacidades de HStack y VStack en un solo
      componente versátil.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <div className={styles.componentGroup}>
        <Flex gap="4" align="center">
          <Button variant="primary">First</Button>
          <Button variant="secondary">Second</Button>
          <Button variant="ghost">Third</Button>
        </Flex>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Direction Variants</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>direction="row" (default)</Overline>
          <Flex direction="row" gap="3">
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
            <Button size="small">Item 3</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>direction="column"</Overline>
          <Flex direction="column" gap="3" style={{ alignItems: 'flex-start' }}>
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
            <Button size="small">Item 3</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>direction="row-reverse"</Overline>
          <Flex direction="row-reverse" gap="3">
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
            <Button size="small">Item 3</Button>
          </Flex>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Gap Scale</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>gap="0"</Overline>
          <Flex gap="0">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>gap="2"</Overline>
          <Flex gap="2">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>gap="4"</Overline>
          <Flex gap="4">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>gap="8"</Overline>
          <Flex gap="8">
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
          </Flex>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Alignment Options</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>justify="start" align="center"</Overline>
          <Flex
            justify="start"
            align="center"
            gap="4"
            style={{
              height: '80px',
              backgroundColor: colors.background.secondary,
              padding: tokens.space[4],
            }}
          >
            <Button size="small">Start</Button>
            <Button>Normal</Button>
            <Button size="large">Large</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>justify="center" align="center"</Overline>
          <Flex
            justify="center"
            align="center"
            gap="4"
            style={{
              height: '80px',
              backgroundColor: colors.background.secondary,
              padding: tokens.space[4],
            }}
          >
            <Button size="small">Center</Button>
            <Button>Normal</Button>
            <Button size="large">Large</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>justify="between" align="center"</Overline>
          <Flex
            justify="between"
            align="center"
            gap="4"
            style={{
              height: '80px',
              backgroundColor: colors.background.secondary,
              padding: tokens.space[4],
            }}
          >
            <Button size="small">Between</Button>
            <Button>Normal</Button>
            <Button size="large">Large</Button>
          </Flex>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Wrap Functionality</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>wrap="nowrap" (default)</Overline>
          <Flex
            wrap="nowrap"
            gap="3"
            style={{
              maxWidth: '300px',
              backgroundColor: colors.background.secondary,
              padding: tokens.space[4],
            }}
          >
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
            <Button size="small">Item 3</Button>
            <Button size="small">Item 4</Button>
            <Button size="small">Item 5</Button>
          </Flex>
        </div>
        <div className={styles.componentItem}>
          <Overline>wrap="wrap"</Overline>
          <Flex
            wrap="wrap"
            gap="3"
            style={{
              maxWidth: '300px',
              backgroundColor: colors.background.secondary,
              padding: tokens.space[4],
            }}
          >
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
            <Button size="small">Item 3</Button>
            <Button size="small">Item 4</Button>
            <Button size="small">Item 5</Button>
          </Flex>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Real-world Examples</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Card Layout</H3>
          <Flex
            direction="column"
            gap="4"
            style={{
              maxWidth: '400px',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
              padding: tokens.space[6],
              backgroundColor: colors.background.primary,
            }}
          >
            <H3 style={{ margin: 0 }}>Card Title</H3>
            <Body2>
              This is some card content that demonstrates how Flex can be used
              for vertical layouts with consistent spacing.
            </Body2>
            <Flex justify="end" gap="3">
              <Button variant="ghost" size="small">
                Cancel
              </Button>
              <Button variant="primary" size="small">
                Save Changes
              </Button>
            </Flex>
          </Flex>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Dashboard Header</H3>
          <Flex
            justify="between"
            align="center"
            gap="6"
            style={{
              padding: tokens.space[4],
              backgroundColor: colors.background.secondary,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Flex align="center" gap="3">
              <Icon icon={Package} size="md" />
              <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
                Dashboard
              </Body2>
            </Flex>

            <Flex gap="2">
              <Button variant="ghost" size="small">
                <Icon icon={Download} size="sm" />
                Export
              </Button>
              <Button variant="ghost" size="small">
                <Icon icon={Heart} size="sm" />
                Favorite
              </Button>
              <Button variant="ghost" size="small">
                <Icon icon={Settings} size="sm" />
                Settings
              </Button>
            </Flex>
          </Flex>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Form Layout</H3>
          <Flex
            direction="column"
            gap="4"
            style={{
              maxWidth: '400px',
              padding: tokens.space[6],
              backgroundColor: colors.background.secondary,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
              Contact Form
            </Body2>

            <Flex direction="column" gap="3">
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: colors.background.primary,
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${colors.border.primary}`,
                }}
              >
                <Body2
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.7,
                  }}
                >
                  Name
                </Body2>
              </div>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: colors.background.primary,
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${colors.border.primary}`,
                }}
              >
                <Body2
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.7,
                  }}
                >
                  Email
                </Body2>
              </div>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: colors.background.primary,
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${colors.border.primary}`,
                  minHeight: '80px',
                }}
              >
                <Body2
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.7,
                  }}
                >
                  Message
                </Body2>
              </div>
            </Flex>

            <Flex justify="end" gap="3">
              <Button variant="secondary" size="small">
                Cancel
              </Button>
              <Button variant="primary" size="small">
                Send Message
              </Button>
            </Flex>
          </Flex>
        </div>
      </VStack>
    </div>
  </div>
);

export default FlexPage;
