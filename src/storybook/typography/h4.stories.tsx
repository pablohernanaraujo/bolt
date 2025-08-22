// /src/storybook/typography/h4.stories.tsx
// H4 component stories with interactive controls
// Demonstrates H4 heading component with all props and variations
// RELEVANT FILES: ../../ui/typography/h4/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { H4 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * H4 component meta configuration with controls
 * Provides interactive playground for testing all H4 props
 */
const meta: Meta<typeof H4> = {
  title: 'Typography/H4',
  component: H4,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'H4 heading component for smaller section titles. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'p'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'h4',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'h4' },
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
      defaultValue: 'Small Section Title',
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
    children: 'Small Section Title',
    emphasis: 'high',
    as: 'h4',
  },
};

export default meta;
type Story = StoryObj<typeof H4>;

/**
 * Default H4 story with interactive controls
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
      <H4 emphasis="pure">Pure Emphasis (100% opacity)</H4>
      <H4 emphasis="high">High Emphasis (87% opacity) - Default</H4>
      <H4 emphasis="medium">Medium Emphasis (60% opacity)</H4>
      <H4 emphasis="low">Low Emphasis (38% opacity)</H4>
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
 * Shows H4 styled text rendered as different HTML elements
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
      <H4 as="h4">Rendered as h4 (default)</H4>
      <H4 as="h3">Rendered as h3</H4>
      <H4 as="h5">Rendered as h5</H4>
      <H4 as="div">Rendered as div</H4>
      <H4 as="span" style={{ display: 'block' }}>
        Rendered as span
      </H4>
      <H4 as="p">Rendered as p</H4>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'H4 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'H4 with Custom Class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default H4 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates H4 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a Very Long H4 Small Section Heading That Might Wrap to Multiple Lines in Narrow Containers',
  },
  parameters: {
    docs: {
      description: {
        story:
          'H4 component handles long text content gracefully with proper line height.',
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
      <H4>Default H4</H4>
      <H4 bold>Bold H4</H4>
      <H4 italic>Italic H4</H4>
      <H4 underline>Underlined H4</H4>
      <H4 strikeThrough>Strikethrough H4</H4>
      <H4 highlight>Highlighted H4</H4>
      <div
        style={{
          width: '200px',
          border: '1px dashed #ccc',
        }}
      >
        <H4 isTruncated>This is a very long H4 that will be truncated</H4>
      </div>
      <H4 bold italic underline>
        Bold, Italic & Underlined
      </H4>
      <H4 highlight bold>
        Highlighted & Bold
      </H4>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for H4 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all H4 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground H4 Title',
    emphasis: 'high',
    as: 'h4',
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
          'Interactive playground to test all H4 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
