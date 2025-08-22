// /src/app/layout/center/page.tsx
// Center component showcase page
// Demonstrates center layout component for horizontal and vertical centering
// RELEVANT FILES: ../../../ui/layout/center, ../../../ui/button

'use client';

import { type FC, type ReactElement } from 'react';

import { Icon, Square } from '@/icons';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { Body2, Button, Center, H1, H2, H3, Overline, VStack } from '@/ui';

import * as styles from '../../page.css';

/**
 * Center page component
 * Center layout component that centers content both horizontally and vertically using flexbox
 */
const CenterPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Center</H1>
    <Body2>
      Componente de layout que centra contenido horizontal y verticalmente
      usando flexbox. Proporciona una solución simple y confiable para el
      centrado de elementos.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <div className={styles.componentGroup}>
        <Center
          style={{
            height: '120px',
            backgroundColor: colors.background.secondary,
            border: `1px solid ${colors.border.primary}`,
            borderRadius: tokens.radius.lg,
          }}
        >
          <Button variant="primary">Centered Content</Button>
        </Center>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Different Content Types</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>Single Button</Overline>
          <Center
            style={{
              height: '100px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Button variant="secondary">Click Me</Button>
          </Center>
        </div>

        <div className={styles.componentItem}>
          <Overline>Icon Element</Overline>
          <Center
            style={{
              height: '100px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Icon icon={Square} size="xl" />
          </Center>
        </div>

        <div className={styles.componentItem}>
          <Overline>Text Content</Overline>
          <Center
            style={{
              height: '100px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
              Centered Text
            </Body2>
          </Center>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Different Heights</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>Small Container (80px)</Overline>
          <Center
            style={{
              height: '80px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Button size="small">Small Height</Button>
          </Center>
        </div>

        <div className={styles.componentItem}>
          <Overline>Medium Container (150px)</Overline>
          <Center
            style={{
              height: '150px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Button variant="primary">Medium Height</Button>
          </Center>
        </div>

        <div className={styles.componentItem}>
          <Overline>Large Container (200px)</Overline>
          <Center
            style={{
              height: '200px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Button variant="secondary" size="large">
              Large Height
            </Button>
          </Center>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Polymorphic Component</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>as="section"</Overline>
          <Center
            as="section"
            style={{
              height: '120px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Body2>Rendered as section element</Body2>
          </Center>
        </div>

        <div className={styles.componentItem}>
          <Overline>as="article"</Overline>
          <Center
            as="article"
            style={{
              height: '120px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Body2>Rendered as article element</Body2>
          </Center>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Real-world Examples</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>
            Loading State Container
          </H3>
          <Center
            style={{
              height: '160px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <VStack space="3" style={{ textAlign: 'center' }}>
              <Icon icon={Square} size="lg" />
              <Body2>Loading...</Body2>
            </VStack>
          </Center>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>
            Empty State Container
          </H3>
          <Center
            style={{
              height: '200px',
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
            }}
          >
            <VStack space="4" style={{ textAlign: 'center' }}>
              <Icon icon={Square} size="xl" />
              <VStack space="2">
                <H3 style={{ margin: 0 }}>No Data Found</H3>
                <Body2>Try adjusting your search criteria</Body2>
              </VStack>
              <Button variant="primary" size="small">
                Refresh
              </Button>
            </VStack>
          </Center>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>
            Modal/Dialog Overlay
          </H3>
          <Center
            style={{
              height: '240px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: tokens.radius.lg,
              color: 'white',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                color: 'black',
                padding: tokens.space[6],
                borderRadius: tokens.radius.lg,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '320px',
                textAlign: 'center',
              }}
            >
              <VStack space="4">
                <H3 style={{ margin: 0 }}>Confirm Action</H3>
                <Body2>Are you sure you want to delete this item?</Body2>
                <VStack space="2">
                  <Button
                    variant="primary"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    Cancel
                  </Button>
                </VStack>
              </VStack>
            </div>
          </Center>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Responsive Behavior</H2>
      <Body2 style={{ marginBottom: tokens.space[4] }}>
        Center works perfectly across different screen sizes and maintains
        centering behavior regardless of container dimensions.
      </Body2>

      <Center
        style={{
          height: '180px',
          backgroundColor: colors.background.secondary,
          border: `1px solid ${colors.border.primary}`,
          borderRadius: tokens.radius.lg,
          resize: 'both',
          overflow: 'auto',
          minHeight: '120px',
          minWidth: '200px',
        }}
      >
        <VStack space="2" style={{ textAlign: 'center' }}>
          <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
            Resize Me!
          </Body2>
          <Body2 style={{ fontSize: tokens.fontSize.sm }}>
            Drag the corner to resize
          </Body2>
        </VStack>
      </Center>
    </div>
  </div>
);

export default CenterPage;
