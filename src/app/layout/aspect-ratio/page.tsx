/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/app/layout/aspect-ratio/page.tsx
// AspectRatio component showcase page
// Demonstrates aspect ratio container component with preset and custom ratios
// RELEVANT FILES: ../../../ui/layout/aspect-ratio, ../../../ui/button

'use client';

import { type FC, type ReactElement } from 'react';

import { Icon, Image as ImageIcon, Package } from '@/icons';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import {
  AspectRatio,
  Body2,
  Button,
  H1,
  H2,
  H3,
  HStack,
  Overline,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * AspectRatio page component
 * Aspect ratio container component that maintains consistent proportions across different screen sizes
 */
const AspectRatioPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>AspectRatio</H1>
    <Body2>
      Componente contenedor que mantiene proporciones específicas de
      ancho-altura en diferentes tamaños de pantalla, proporcionando presets
      comunes y soporte para proporciones personalizadas.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <div className={styles.componentGroup}>
        <AspectRatio preset="video">
          <div
            style={{
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.foreground.secondary,
            }}
          >
            <VStack space="2" style={{ textAlign: 'center' }}>
              <Icon icon={ImageIcon} size="xl" />
              <Body2>16:9 Video Aspect Ratio</Body2>
            </VStack>
          </div>
        </AspectRatio>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Preset Aspect Ratios</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <Overline>preset="square" (1:1)</Overline>
          <AspectRatio preset="square" style={{ maxWidth: '200px' }}>
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>1:1</Body2>
            </div>
          </AspectRatio>
        </div>

        <div className={styles.componentItem}>
          <Overline>preset="video" (16:9)</Overline>
          <AspectRatio preset="video" style={{ maxWidth: '320px' }}>
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>16:9</Body2>
            </div>
          </AspectRatio>
        </div>

        <div className={styles.componentItem}>
          <Overline>preset="photo" (4:3)</Overline>
          <AspectRatio preset="photo" style={{ maxWidth: '280px' }}>
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>4:3</Body2>
            </div>
          </AspectRatio>
        </div>

        <div className={styles.componentItem}>
          <Overline>preset="classic" (3:2)</Overline>
          <AspectRatio preset="classic" style={{ maxWidth: '270px' }}>
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>3:2</Body2>
            </div>
          </AspectRatio>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Custom Aspect Ratios</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>
            ratio=&#123;&#123; width: 5, height: 3 &#125;&#125;
          </Overline>
          <AspectRatio
            ratio={{
              width: 5,
              height: 3,
            }}
            style={{ maxWidth: '300px' }}
          >
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>5:3 Custom</Body2>
            </div>
          </AspectRatio>
        </div>

        <div className={styles.componentItem}>
          <Overline>
            ratio=&#123;&#123; width: 2, height: 3 &#125;&#125;
          </Overline>
          <AspectRatio
            ratio={{
              width: 2,
              height: 3,
            }}
            style={{ maxWidth: '200px' }}
          >
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>2:3 Portrait</Body2>
            </div>
          </AspectRatio>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Object Fit Options</H2>
      <VStack space="4">
        <div className={styles.componentItem}>
          <Overline>objectFit="cover" (default)</Overline>
          <AspectRatio
            preset="video"
            objectFit="cover"
            style={{ maxWidth: '300px' }}
          >
            <div
              style={{
                backgroundColor:
                  'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.primary,
                fontWeight: tokens.fontWeight.semibold,
              }}
            >
              <Body2>Cover Content</Body2>
            </div>
          </AspectRatio>
        </div>

        <div className={styles.componentItem}>
          <Overline>objectFit="contain"</Overline>
          <AspectRatio
            preset="video"
            objectFit="contain"
            style={{ maxWidth: '300px' }}
          >
            <div
              style={{
                backgroundColor: colors.background.secondary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: tokens.radius.md,
                width: '80%',
                height: '60%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.foreground.secondary,
              }}
            >
              <Body2>Contain Content</Body2>
            </div>
          </AspectRatio>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Real-world Examples</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>
            Video Thumbnail Card
          </H3>
          <div
            style={{
              maxWidth: '320px',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
              overflow: 'hidden',
              backgroundColor: colors.background.primary,
            }}
          >
            <AspectRatio preset="video">
              <div
                style={{
                  backgroundColor: colors.background.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Icon icon={Package} size="xl" style={{ opacity: 0.3 }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: tokens.space[3],
                    right: tokens.space[3],
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: `${tokens.space[1]} ${tokens.space[2]}`,
                    borderRadius: tokens.radius.sm,
                    fontSize: tokens.fontSize.xs,
                  }}
                >
                  12:34
                </div>
              </div>
            </AspectRatio>
            <div style={{ padding: tokens.space[4] }}>
              <H3 style={{ marginBottom: tokens.space[2] }}>Video Title</H3>
              <Body2
                style={{
                  color: colors.foreground.secondary,
                  marginBottom: tokens.space[3],
                }}
              >
                This is a video description that shows how AspectRatio works
                with real content.
              </Body2>
              <HStack space="2">
                <Button variant="primary" size="small">
                  Play
                </Button>
                <Button variant="ghost" size="small">
                  Save
                </Button>
              </HStack>
            </div>
          </div>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>Photo Gallery Grid</H3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: tokens.space[3],
              maxWidth: '400px',
            }}
          >
            {['square', 'square', 'square'].map((preset, index) => (
              <AspectRatio key={index} preset={preset as any}>
                <div
                  style={{
                    backgroundColor: colors.background.secondary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: tokens.radius.md,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.foreground.secondary,
                  }}
                >
                  <Icon icon={ImageIcon} size="lg" />
                </div>
              </AspectRatio>
            ))}
          </div>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[3] }}>
            Profile Card with Custom Ratio
          </H3>
          <div
            style={{
              maxWidth: '280px',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: tokens.radius.lg,
              overflow: 'hidden',
              backgroundColor: colors.background.primary,
            }}
          >
            <AspectRatio
              ratio={{
                width: 4,
                height: 3,
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Icon icon={Package} size="xl" style={{ opacity: 0.8 }} />
              </div>
            </AspectRatio>
            <div style={{ padding: tokens.space[4] }}>
              <H3 style={{ marginBottom: tokens.space[2] }}>Profile Header</H3>
              <Body2 style={{ color: colors.foreground.secondary }}>
                Custom 4:3 aspect ratio for profile headers and hero sections.
              </Body2>
            </div>
          </div>
        </div>
      </VStack>
    </div>
  </div>
);

export default AspectRatioPage;
