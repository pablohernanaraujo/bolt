// /src/storybook/foundations/typography.stories.tsx
// Storybook stories for typography components showcase
// Demonstrates all heading and body text components with examples
// RELEVANT FILES: ../../ui/typography/index.ts, ../../tokens/typography.css.ts

import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '../../ui/layout/vstack';
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
} from '../../ui/typography';

/**
 * Typography components provide a consistent text hierarchy
 * Built using design system tokens for consistency across themes
 */
const meta: Meta = {
  title: 'Typography/Overview',
  parameters: {
    docs: {
      description: {
        component:
          'A complete typography system with semantic heading and body text components.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Complete typography scale showing all available components
 * From H1 (largest) to Body3 (smallest)
 */
export const TypographyScale: Story = {
  render: () => (
    <VStack space="4">
      <Giant>Giant - Hero Display (64px)</Giant>
      <H1>H1 - Main Page Title</H1>
      <H2>H2 - Section Title</H2>
      <H3>H3 - Subsection Title</H3>
      <H4>H4 - Minor Section Title</H4>
      <H5>H5 - Smallest Heading</H5>
      <Body1>
        Body1 - Large body text with relaxed line height for prominent content
        and introductions.
      </Body1>
      <Body2>
        Body2 - Standard body text with normal line height for most content and
        paragraphs.
      </Body2>
      <Body3>
        Body3 - Small body text for captions, labels, and secondary information.
      </Body3>
      <Subtitle>
        Subtitle - Secondary text (13px) for descriptions and supporting
        content.
      </Subtitle>
      <Caption>Caption - Photo captions and footnotes (11px)</Caption>
      <Overline>Overline - Labels and metadata (10px)</Overline>
    </VStack>
  ),
};

/**
 * Heading components demonstrate the hierarchical text structure
 * Used for page and section organization
 */
export const Headings: Story = {
  render: () => (
    <VStack space="3">
      <Giant>Giant Heading - Hero Display</Giant>
      <H1>H1 Heading - Page Title</H1>
      <H2>H2 Heading - Section Title</H2>
      <H3>H3 Heading - Subsection Title</H3>
      <H4>H4 Heading - Minor Section</H4>
      <H5>H5 Heading - Small Section</H5>
    </VStack>
  ),
};

/**
 * Body text components for different content hierarchies
 * Each has specific use cases and optimal readability
 */
export const BodyText: Story = {
  render: () => (
    <VStack space="4">
      <div>
        <H3>Body1 - Prominent Text</H3>
        <Body1>
          This is Body1 text with larger font size and relaxed line height.
          Perfect for introductory paragraphs, prominent content, and text that
          needs to stand out.
        </Body1>
      </div>
      <div>
        <H3>Body2 - Standard Text</H3>
        <Body2>
          This is Body2 text with standard font size and normal line height.
          Ideal for most body content, regular paragraphs, and general text
          throughout the application.
        </Body2>
      </div>
      <div>
        <H3>Body3 - Small Text</H3>
        <Body3>
          This is Body3 text with smaller font size. Perfect for captions,
          labels, metadata, footnotes, and secondary information.
        </Body3>
      </div>
      <div>
        <H3>Subtitle - Secondary Text</H3>
        <Subtitle>
          This is Subtitle text with 13px font size. Perfect for supporting
          text, descriptions, and secondary information that needs more
          prominence than body text.
        </Subtitle>
      </div>
      <div>
        <H3>Overline - Labels and Metadata</H3>
        <Overline>Category Label</Overline>
      </div>
      <div>
        <H3>Caption - Photo Captions and Footnotes</H3>
        <Caption>
          This is Caption text with 11px font size. Perfect for photo
          descriptions, footnotes, disclaimers, and very small supporting text.
        </Caption>
      </div>
    </VStack>
  ),
};

/**
 * Polymorphic examples showing flexible element rendering
 * Components can render as different HTML elements while maintaining styles
 */
export const PolymorphicUsage: Story = {
  render: () => (
    <VStack space="3">
      <H2>Polymorphic Component Examples</H2>
      <div>
        <H3>Default semantic elements:</H3>
        <Giant>Giant as &lt;h1&gt; element</Giant>
        <H1>H1 as &lt;h1&gt; element</H1>
        <Body2>Body2 as &lt;p&gt; element</Body2>
        <Subtitle>Subtitle as &lt;p&gt; element</Subtitle>
        <Caption>Caption as &lt;span&gt; element</Caption>
        <Overline>Overline as &lt;span&gt; element</Overline>
      </div>
      <div>
        <H3>Custom elements with maintained styling:</H3>
        <Giant as="div">Giant styled as &lt;div&gt; element</Giant>
        <H1 as="div">H1 styled as &lt;div&gt; element</H1>
        <Body2 as="span">Body2 styled as &lt;span&gt; element</Body2>
        <Subtitle as="div">Subtitle styled as &lt;div&gt; element</Subtitle>
        <Caption as="p">Caption styled as &lt;p&gt; element</Caption>
        <Overline as="p">Overline styled as &lt;p&gt; element</Overline>
      </div>
    </VStack>
  ),
};

/**
 * Real-world usage example showing typography in context
 * Demonstrates how components work together in actual content
 */
export const InContext: Story = {
  render: () => (
    <VStack space="4">
      <H1>Getting Started with Design Systems</H1>
      <Body1>
        Design systems provide a comprehensive set of guidelines, components,
        and tools that help teams build consistent user experiences across
        products.
      </Body1>

      <H2>Why Use a Design System?</H2>
      <Body2>
        A well-implemented design system offers numerous benefits including
        consistency, efficiency, and scalability. It serves as a single source
        of truth for design decisions.
      </Body2>

      <H3>Key Components</H3>
      <Body2>
        Every design system should include foundational elements like
        typography, color palettes, spacing systems, and reusable components.
      </Body2>

      <H4>Typography</H4>
      <Body2>
        Typography establishes visual hierarchy and ensures readability across
        different contexts.
      </Body2>

      <H5>Best Practices</H5>
      <Body3>
        Always maintain consistent line heights, appropriate contrast ratios,
        and semantic HTML structure.
      </Body3>
    </VStack>
  ),
};
