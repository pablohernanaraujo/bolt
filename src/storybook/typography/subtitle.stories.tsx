// /src/storybook/typography/subtitle.stories.tsx
// Subtitle component stories with interactive controls
// Demonstrates Subtitle text component with all props and variations
// RELEVANT FILES: ../../ui/typography/subtitle/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Subtitle } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Subtitle component meta configuration with controls
 * Provides interactive playground for testing all Subtitle props
 */
const meta: Meta<typeof Subtitle> = {
  title: 'Typography/Subtitle',
  component: Subtitle,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Subtitle text component for supporting text under headings. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
      },
    },
  },
  argTypes: {
    emphasis: {
      control: { type: 'select' },
      options: ['high', 'medium', 'low', 'pure'],
      description:
        'Text emphasis level for visual hierarchy (controls opacity)',
      defaultValue: 'high',
      table: {
        type: { summary: 'KeyEmphasis' },
        defaultValue: { summary: 'high' },
      },
    },
    as: {
      control: { type: 'select' },
      options: ['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'span',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'span' },
      },
    },
    bold: {
      control: 'boolean',
      description: 'Makes the text bold',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isTruncated: {
      control: 'boolean',
      description: 'Truncates text with ellipsis when it overflows',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    italic: {
      control: 'boolean',
      description: 'Makes the text italic',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    underline: {
      control: 'boolean',
      description: 'Adds underline decoration to the text',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    strikeThrough: {
      control: 'boolean',
      description: 'Adds strikethrough decoration to the text',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    highlight: {
      control: 'boolean',
      description: 'Highlights the text with a primary color background',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Text content to display',
      defaultValue: 'Subtitle supporting text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    children: 'Subtitle supporting text',
    emphasis: 'high',
    as: 'span',
  },
};

export default meta;
type Story = StoryObj<typeof Subtitle>;

/**
 * Default Subtitle story with interactive controls
 * Use the controls panel to adjust props dynamically
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Emphasis levels demonstration
 * Shows all available emphasis options and their visual impact
 */
export const EmphasisLevels: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Subtitle emphasis="pure">Pure Emphasis (100% opacity)</Subtitle>
      <Subtitle emphasis="high">High Emphasis (87% opacity) - Default</Subtitle>
      <Subtitle emphasis="medium">Medium Emphasis (60% opacity)</Subtitle>
      <Subtitle emphasis="low">Low Emphasis (38% opacity)</Subtitle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different emphasis levels control text opacity for visual hierarchy. Pure is 100%, high is 87% (default), medium is 60%, and low is 38%.',
      },
    },
  },
};

/**
 * Polymorphic rendering examples
 * Shows Subtitle styled text rendered as different HTML elements
 */
export const PolymorphicAs: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Subtitle as="span">Rendered as span (default)</Subtitle>
      <Subtitle as="div">Rendered as div</Subtitle>
      <Subtitle as="p">Rendered as p</Subtitle>
      <Subtitle as="h4">Rendered as h4</Subtitle>
      <Subtitle as="h5">Rendered as h5</Subtitle>
      <Subtitle as="h6">Rendered as h6</Subtitle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Subtitle can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
      },
    },
  },
};

/**
 * With custom className
 * Shows how to apply additional CSS classes
 */
export const WithClassName: Story = {
  args: {
    children: 'Subtitle with custom class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Subtitle styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Subtitle with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a longer subtitle text example that provides additional context and supporting information for the main heading or section title above it.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Subtitle component handles long text content gracefully with proper line height and readability.',
      },
    },
  },
};

/**
 * Text styling modifiers demonstration
 * Shows all new text styling options and combinations
 */
export const TextStyling: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Subtitle>Default Subtitle text</Subtitle>
      <Subtitle bold>Bold Subtitle text</Subtitle>
      <Subtitle italic>Italic Subtitle text</Subtitle>
      <Subtitle underline>Underlined Subtitle text</Subtitle>
      <Subtitle strikeThrough>Strikethrough Subtitle text</Subtitle>
      <Subtitle highlight>Highlighted Subtitle text</Subtitle>
      <div
        style={{
          width: '300px',
          border: '1px dashed #ccc',
        }}
      >
        <Subtitle isTruncated>
          This is a very long Subtitle text that will be truncated when it
          overflows
        </Subtitle>
      </div>
      <Subtitle bold italic underline>
        Bold, Italic & Underlined Subtitle
      </Subtitle>
      <Subtitle highlight bold>
        Highlighted & Bold Subtitle
      </Subtitle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Subtitle component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Subtitle props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground subtitle text',
    emphasis: 'high',
    as: 'span',
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    highlight: false,
    isTruncated: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all Subtitle props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
