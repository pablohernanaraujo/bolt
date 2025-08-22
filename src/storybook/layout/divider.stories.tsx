// /src/storybook/layout/divider.stories.tsx
// Divider component stories showcasing all orientations, variants, and sizes
// Complete documentation for the Divider component
// RELEVANT FILES: ../../ui/divider/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Body2, H3, HStack, VStack } from '../../ui';
import { Divider } from '../../ui/divider';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible divider component for visual separation of content. Supports horizontal and vertical orientations with multiple visual styles and sizes.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider line',
      defaultValue: 'horizontal',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      description: 'Visual style of the divider line',
      defaultValue: 'solid',
    },
    size: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
      description: 'Thickness of the divider line',
      defaultValue: 'thin',
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'Spacing around the divider',
      defaultValue: 'medium',
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'thin',
    spacing: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

/**
 * Default Divider Story
 */
export const Default: Story = {
  decorators: [withCentered],
  render: (args) => (
    <div
      style={{
        width: '200px',
        height: '100px',
      }}
    >
      <Divider {...args} />
    </div>
  ),
};

/**
 * Horizontal Dividers with Different Variants
 */
export const HorizontalVariants: Story = {
  render: () => (
    <VStack space="4">
      <div>
        <H3 style={{ marginBottom: '16px' }}>Solid</H3>
        <Body2>Content above the divider</Body2>
        <Divider variant="solid" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Dashed</H3>
        <Body2>Content above the divider</Body2>
        <Divider variant="dashed" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Dotted</H3>
        <Body2>Content above the divider</Body2>
        <Divider variant="dotted" />
        <Body2>Content below the divider</Body2>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal dividers with different visual styles: solid, dashed, and dotted.',
      },
    },
  },
};

/**
 * Horizontal Dividers with Different Sizes
 */
export const HorizontalSizes: Story = {
  render: () => (
    <VStack space="4">
      <div>
        <H3 style={{ marginBottom: '16px' }}>Thin (1px)</H3>
        <Body2>Content above the divider</Body2>
        <Divider size="thin" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Medium (2px)</H3>
        <Body2>Content above the divider</Body2>
        <Divider size="medium" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Thick (4px)</H3>
        <Body2>Content above the divider</Body2>
        <Divider size="thick" />
        <Body2>Content below the divider</Body2>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal dividers with different thickness sizes: thin (1px), medium (2px), and thick (4px).',
      },
    },
  },
};

/**
 * Horizontal Dividers with Different Spacing
 */
export const HorizontalSpacing: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3 style={{ marginBottom: '16px' }}>No Spacing</H3>
        <Body2>Content above the divider</Body2>
        <Divider spacing="none" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Small Spacing</H3>
        <Body2>Content above the divider</Body2>
        <Divider spacing="small" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Medium Spacing</H3>
        <Body2>Content above the divider</Body2>
        <Divider spacing="medium" />
        <Body2>Content below the divider</Body2>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Large Spacing</H3>
        <Body2>Content above the divider</Body2>
        <Divider spacing="large" />
        <Body2>Content below the divider</Body2>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal dividers with different spacing amounts around them: none, small, medium, and large.',
      },
    },
  },
};

/**
 * Vertical Dividers with Different Variants
 */
export const VerticalVariants: Story = {
  render: () => (
    <VStack space="4">
      <div>
        <H3 style={{ marginBottom: '16px' }}>Solid</H3>
        <HStack align="center" style={{ minHeight: '60px' }}>
          <Body2>Left content</Body2>
          <Divider orientation="vertical" variant="solid" />
          <Body2>Right content</Body2>
        </HStack>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Dashed</H3>
        <HStack align="center" style={{ minHeight: '60px' }}>
          <Body2>Left content</Body2>
          <Divider orientation="vertical" variant="dashed" />
          <Body2>Right content</Body2>
        </HStack>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Dotted</H3>
        <HStack align="center" style={{ minHeight: '60px' }}>
          <Body2>Left content</Body2>
          <Divider orientation="vertical" variant="dotted" />
          <Body2>Right content</Body2>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical dividers with different visual styles: solid, dashed, and dotted.',
      },
    },
  },
};

/**
 * Vertical Dividers with Different Sizes
 */
export const VerticalSizes: Story = {
  render: () => (
    <VStack space="4">
      <div>
        <H3 style={{ marginBottom: '16px' }}>Thin (1px)</H3>
        <HStack align="center" style={{ minHeight: '60px' }}>
          <Body2>Left content</Body2>
          <Divider orientation="vertical" size="thin" />
          <Body2>Right content</Body2>
        </HStack>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Medium (2px)</H3>
        <HStack align="center" style={{ minHeight: '60px' }}>
          <Body2>Left content</Body2>
          <Divider orientation="vertical" size="medium" />
          <Body2>Right content</Body2>
        </HStack>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>Thick (4px)</H3>
        <HStack align="center" style={{ minHeight: '60px' }}>
          <Body2>Left content</Body2>
          <Divider orientation="vertical" size="thick" />
          <Body2>Right content</Body2>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical dividers with different thickness sizes: thin (1px), medium (2px), and thick (4px).',
      },
    },
  },
};

/**
 * Usage in Layout Components
 */
export const LayoutUsage: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3 style={{ marginBottom: '16px' }}>
          Navigation Bar with Vertical Dividers
        </H3>
        <HStack align="center" space="0">
          <Body2>Home</Body2>
          <Divider orientation="vertical" spacing="medium" />
          <Body2>About</Body2>
          <Divider orientation="vertical" spacing="medium" />
          <Body2>Contact</Body2>
          <Divider orientation="vertical" spacing="medium" />
          <Body2>Help</Body2>
        </HStack>
      </div>

      <div>
        <H3 style={{ marginBottom: '16px' }}>
          Content Sections with Horizontal Dividers
        </H3>
        <VStack space="0">
          <Body2>
            This is the first section of content. It contains some important
            information that needs to be separated from the next section.
          </Body2>
          <Divider spacing="large" />
          <Body2>
            This is the second section. The divider above clearly separates this
            content from the previous section.
          </Body2>
          <Divider spacing="large" />
          <Body2>
            And this is the third section, also clearly separated by the divider
            components.
          </Body2>
        </VStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of using dividers in common layout patterns: navigation bars with vertical dividers and content sections with horizontal dividers.',
      },
    },
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        width: '300px',
        height: '200px',
        padding: '20px',
      }}
    >
      {args.orientation === 'horizontal' ? (
        <VStack space="0">
          <Body2>Content above the divider</Body2>
          <Divider {...args} />
          <Body2>Content below the divider</Body2>
        </VStack>
      ) : (
        <HStack align="center" style={{ height: '100%' }}>
          <Body2>Left content</Body2>
          <Divider {...args} />
          <Body2>Right content</Body2>
        </HStack>
      )}
    </div>
  ),
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'thin',
    spacing: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all divider props and combinations.',
      },
    },
  },
};
