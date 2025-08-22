// /src/storybook/foundations/colors.stories.tsx
// Color palette stories for design system foundations
// Showcases all color tokens with theme variations
// RELEVANT FILES: ../../tokens/contracts.css.ts, ../utils/story-helpers.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '../../tokens/contracts.css';
import { withThemeAndPadding } from '../utils/decorators';
import { ColorSwatch, ShowcaseGrid } from '../utils/story-helpers';

const meta: Meta = {
  title: 'Foundations/Colors',
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Design system color palette that adapts to light and dark themes. All colors are semantic and accessible.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Brand Colors Story
 * Primary colors used for branding and key UI elements
 */
export const BrandColors: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Brand Colors
      </h3>
      <ShowcaseGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
        {[
          <ColorSwatch
            key="primary"
            color={colors.brand.primary}
            label="Primary"
            description="Main brand color"
          />,
          <ColorSwatch
            key="primaryHover"
            color={colors.brand.primaryHover}
            label="Primary Hover"
            description="Hover state"
          />,
          <ColorSwatch
            key="primaryActive"
            color={colors.brand.primaryActive}
            label="Primary Active"
            description="Active state"
          />,
          <ColorSwatch
            key="secondary"
            color={colors.brand.secondary}
            label="Secondary"
            description="Secondary brand color"
          />,
          <ColorSwatch
            key="secondaryHover"
            color={colors.brand.secondaryHover}
            label="Secondary Hover"
            description="Hover state"
          />,
          <ColorSwatch
            key="secondaryActive"
            color={colors.brand.secondaryActive}
            label="Secondary Active"
            description="Active state"
          />,
        ]}
      </ShowcaseGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Primary brand colors with their interactive states (hover, active). These colors maintain contrast ratios across themes.',
      },
    },
  },
};

/**
 * Semantic Colors Story
 * Colors that convey meaning and state
 */
export const SemanticColors: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Semantic Colors
      </h3>
      <ShowcaseGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
        {[
          <ColorSwatch
            key="success"
            color={colors.semantic.success}
            label="Success"
            description="Success states"
          />,
          <ColorSwatch
            key="warning"
            color={colors.semantic.warning}
            label="Warning"
            description="Warning states"
          />,
          <ColorSwatch
            key="error"
            color={colors.semantic.error}
            label="Error"
            description="Error states"
          />,
          <ColorSwatch
            key="info"
            color={colors.semantic.info}
            label="Info"
            description="Informational states"
          />,
        ]}
      </ShowcaseGrid>

      <h4
        style={{
          margin: '32px 0 16px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        Background Variants
      </h4>
      <ShowcaseGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
        {[
          <ColorSwatch
            key="successBg"
            color={colors.semantic.successBackground}
            label="Success Background"
            description="Subtle success background"
          />,
          <ColorSwatch
            key="warningBg"
            color={colors.semantic.warningBackground}
            label="Warning Background"
            description="Subtle warning background"
          />,
          <ColorSwatch
            key="errorBg"
            color={colors.semantic.errorBackground}
            label="Error Background"
            description="Subtle error background"
          />,
          <ColorSwatch
            key="infoBg"
            color={colors.semantic.infoBackground}
            label="Info Background"
            description="Subtle info background"
          />,
        ]}
      </ShowcaseGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Semantic colors for conveying meaning and state. Includes both foreground and background variants for maximum flexibility.',
      },
    },
  },
};

/**
 * Background Colors Story
 * Surface colors and backgrounds
 */
export const BackgroundColors: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Background Colors
      </h3>
      <ShowcaseGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
        {[
          <ColorSwatch
            key="primary"
            color={colors.background.primary}
            label="Primary"
            description="Main background"
          />,
          <ColorSwatch
            key="secondary"
            color={colors.background.secondary}
            label="Secondary"
            description="Cards, panels"
          />,
          <ColorSwatch
            key="tertiary"
            color={colors.background.tertiary}
            label="Tertiary"
            description="Subtle backgrounds"
          />,
          <ColorSwatch
            key="inverse"
            color={colors.background.inverse}
            label="Inverse"
            description="High contrast"
          />,
        ]}
      </ShowcaseGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Background colors for different surface levels. Creates visual hierarchy and depth in the interface.',
      },
    },
  },
};

/**
 * Foreground Colors Story
 * Text and icon colors
 */
export const ForegroundColors: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Foreground Colors
      </h3>
      <ShowcaseGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
        {[
          <ColorSwatch
            key="primary"
            color={colors.foreground.primary}
            label="Primary"
            description="Main text"
          />,
          <ColorSwatch
            key="secondary"
            color={colors.foreground.secondary}
            label="Secondary"
            description="Secondary text"
          />,
          <ColorSwatch
            key="tertiary"
            color={colors.foreground.tertiary}
            label="Tertiary"
            description="Subtle text"
          />,
          <ColorSwatch
            key="inverse"
            color={colors.foreground.inverse}
            label="Inverse"
            description="Text on dark backgrounds"
          />,
        ]}
      </ShowcaseGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Foreground colors for text and icons. Provides text hierarchy with accessible contrast ratios.',
      },
    },
  },
};

/**
 * Border Colors Story
 * Border and outline colors
 */
export const BorderColors: Story = {
  render: () => (
    <div>
      <h3
        style={{
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Border Colors
      </h3>
      <ShowcaseGrid columns="repeat(auto-fit, minmax(150px, 1fr))">
        {[
          <ColorSwatch
            key="primary"
            color={colors.border.primary}
            label="Primary"
            description="Default borders"
          />,
          <ColorSwatch
            key="secondary"
            color={colors.border.secondary}
            label="Secondary"
            description="Subtle borders"
          />,
          <ColorSwatch
            key="focus"
            color={colors.border.focus}
            label="Focus"
            description="Focus indicators"
          />,
        ]}
      </ShowcaseGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Border colors for dividers, focus states, and component outlines.',
      },
    },
  },
};

/**
 * All Colors Overview Story
 * Complete color palette overview
 */
export const AllColors: Story = {
  render: () => (
    <div>
      <h2
        style={{
          marginBottom: '32px',
          fontSize: '24px',
          fontWeight: '700',
        }}
      >
        Complete Color Palette
      </h2>

      <div style={{ marginBottom: '48px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Brand
        </h3>
        <ShowcaseGrid columns="repeat(auto-fill, minmax(120px, 1fr))">
          {Object.entries(colors.brand).map(([key, value]) => (
            <ColorSwatch
              key={key}
              color={value}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </ShowcaseGrid>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Semantic
        </h3>
        <ShowcaseGrid columns="repeat(auto-fill, minmax(120px, 1fr))">
          {Object.entries(colors.semantic).map(([key, value]) => (
            <ColorSwatch
              key={key}
              color={value}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </ShowcaseGrid>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Backgrounds
        </h3>
        <ShowcaseGrid columns="repeat(auto-fill, minmax(120px, 1fr))">
          {Object.entries(colors.background).map(([key, value]) => (
            <ColorSwatch
              key={key}
              color={value}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </ShowcaseGrid>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Foregrounds
        </h3>
        <ShowcaseGrid columns="repeat(auto-fill, minmax(120px, 1fr))">
          {Object.entries(colors.foreground).map(([key, value]) => (
            <ColorSwatch
              key={key}
              color={value}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </ShowcaseGrid>
      </div>

      <div>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Borders
        </h3>
        <ShowcaseGrid columns="repeat(auto-fill, minmax(120px, 1fr))">
          {Object.entries(colors.border).map(([key, value]) => (
            <ColorSwatch
              key={key}
              color={value}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </ShowcaseGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete overview of all available colors in the design system. Use the theme toggle to see how colors adapt between light and dark themes.',
      },
    },
  },
};
