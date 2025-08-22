// /src/app/foundations/typography/page.tsx
// Typography showcase page
// Displays complete typography system with semantic components and design tokens
// RELEVANT FILES: ../../../ui/typography, ../../../tokens/tokens.css

'use client';

import { type FC, type ReactElement } from 'react';

import { tokens } from '@/tokens/tokens.css';
import {
  Body1,
  Body2,
  Body3,
  Caption,
  Giant,
  H1,
  H2,
  H3,
  H4,
  H5,
  Overline,
  Subtitle,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Typography page component
 * Complete typography system with semantic components for consistent content hierarchies
 */
const TypographyPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Typography</H1>
    <Body1>
      Sistema tipográfico completo con componentes semánticos para crear
      jerarquías consistentes de contenido.
    </Body1>

    <div className={styles.showcase}>
      <H2>Display Components</H2>
      <Body2>Componentes para títulos prominentes y texto de display.</Body2>
      <VStack space="4" style={{ marginTop: tokens.space[4] }}>
        <div>
          <Body3>Giant - Hero Display (64px)</Body3>
          <Giant>Hero Title</Giant>
        </div>
        <div>
          <Body3>H1 - Main Page Title</Body3>
          <H1>The quick brown fox jumps over the lazy dog</H1>
        </div>
        <div>
          <Body3>H2 - Section Title</Body3>
          <H2>The quick brown fox jumps over the lazy dog</H2>
        </div>
        <div>
          <Body3>H3 - Subsection Title</Body3>
          <H3>The quick brown fox jumps over the lazy dog</H3>
        </div>
        <div>
          <Body3>H4 - Minor Section Title</Body3>
          <H4>The quick brown fox jumps over the lazy dog</H4>
        </div>
        <div>
          <Body3>H5 - Smallest Heading</Body3>
          <H5>The quick brown fox jumps over the lazy dog</H5>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Body Text Components</H2>
      <Body2>
        Componentes de texto para diferentes tipos de contenido y jerarquías.
      </Body2>
      <VStack space="4" style={{ marginTop: tokens.space[4] }}>
        <div>
          <Body3>Body1 - Large Body Text</Body3>
          <Body1>
            This is Body1 text with larger font size and relaxed line height.
            Perfect for introductory paragraphs, prominent content, and text
            that needs to stand out.
          </Body1>
        </div>
        <div>
          <Body3>Body2 - Standard Body Text</Body3>
          <Body2>
            This is Body2 text with standard font size and normal line height.
            Ideal for most body content, regular paragraphs, and general text
            throughout the application.
          </Body2>
        </div>
        <div>
          <Body3>Body3 - Small Body Text</Body3>
          <Body3>
            This is Body3 text with smaller font size. Perfect for captions,
            labels, metadata, footnotes, and secondary information.
          </Body3>
        </div>
        <div>
          <Body3>Subtitle - Secondary Text (13px)</Body3>
          <Subtitle>
            This is Subtitle text with 13px font size. Perfect for supporting
            text, descriptions, and secondary information that needs more
            prominence than body text.
          </Subtitle>
        </div>
        <div>
          <Body3>Overline - Labels and Metadata (10px)</Body3>
          <Overline>This is overline text for labels</Overline>
        </div>
        <div>
          <Body3>Caption - Photo Captions and Footnotes (11px)</Body3>
          <Caption>
            This is caption text for photo descriptions and footnotes
          </Caption>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Design Tokens</H2>
      <Body2>Los tokens de diseño utilizados por el sistema tipográfico.</Body2>

      <div style={{ marginTop: tokens.space[4] }}>
        <H3>Font Families</H3>
        <div className={styles.tokenGrid}>
          {Object.entries(tokens.fonts).map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <div className={styles.typographyDemo}>
                <div
                  className={styles.typographyText}
                  style={{ fontFamily: value }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
              <Caption>fonts.{key}</Caption>
              <Overline>{value}</Overline>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: tokens.space[6] }}>
        <H3>Font Sizes</H3>
        <div className={styles.tokenGrid}>
          {Object.entries(tokens.fontSize).map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <div className={styles.typographyDemo}>
                <div
                  className={styles.typographyText}
                  style={{ fontSize: value }}
                >
                  Sample Text
                </div>
              </div>
              <Caption>fontSize.{key}</Caption>
              <Overline>{value}</Overline>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: tokens.space[6] }}>
        <H3>Font Weights</H3>
        <div className={styles.tokenGrid}>
          {Object.entries(tokens.fontWeight).map(([key, value]) => (
            <div key={key} className={styles.tokenItem}>
              <div className={styles.typographyDemo}>
                <div
                  className={styles.typographyText}
                  style={{ fontWeight: value }}
                >
                  Sample Text
                </div>
              </div>
              <Caption>fontWeight.{key}</Caption>
              <Overline>{value}</Overline>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Polymorphic Usage</H2>
      <Body2>
        Los componentes pueden renderizar como diferentes elementos HTML
        manteniendo su estilo.
      </Body2>
      <VStack space="3" style={{ marginTop: tokens.space[4] }}>
        <div>
          <Body3>Elementos semánticos por defecto:</Body3>
          <H2>H2 como elemento &lt;h2&gt;</H2>
          <Body2>Body2 como elemento &lt;p&gt;</Body2>
        </div>
        <div>
          <Body3>Elementos personalizados con estilos mantenidos:</Body3>
          <H2 as="div">H2 estilizado como elemento &lt;div&gt;</H2>
          <Body2 as="span">Body2 estilizado como elemento &lt;span&gt;</Body2>
          <Subtitle as="div">
            Subtitle estilizado como elemento &lt;div&gt;
          </Subtitle>
          <Overline as="p">
            Overline estilizado como elemento &lt;p&gt;
          </Overline>
          <Caption as="p">Caption estilizado como elemento &lt;p&gt;</Caption>
          <Giant as="div">Giant estilizado como elemento &lt;div&gt;</Giant>
        </div>
      </VStack>
    </div>
  </div>
);

export default TypographyPage;
