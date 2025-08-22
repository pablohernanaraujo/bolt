// /src/storybook/typography/h1.stories.tsx
// H1 component stories with interactive controls
// Demonstrates H1 heading component with all props and variations
// RELEVANT FILES: ../../ui/typography/h1/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { H1 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * H1 component meta configuration with controls
 * Provides interactive playground for testing all H1 props
 */
const meta: Meta<typeof H1> = {
  title: 'Typography/H1',
  component: H1,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'H1 heading component for main page titles. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      defaultValue: 'h1',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'h1' },
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
      defaultValue: 'Main Page Title',
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
    children: 'Main Page Title',
    emphasis: 'high',
    as: 'h1',
  },
};

export default meta;
type Story = StoryObj<typeof H1>;

/**
 * Default H1 story with interactive controls
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
      <H1 emphasis="pure">Pure Emphasis (100% opacity)</H1>
      <H1 emphasis="high">High Emphasis (87% opacity) - Default</H1>
      <H1 emphasis="medium">Medium Emphasis (60% opacity)</H1>
      <H1 emphasis="low">Low Emphasis (38% opacity)</H1>
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
 * Shows H1 styled text rendered as different HTML elements
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
      <H1 as="h1">Rendered as h1 (default)</H1>
      <H1 as="h2">Rendered as h2</H1>
      <H1 as="div">Rendered as div</H1>
      <H1 as="span" style={{ display: 'block' }}>
        Rendered as span
      </H1>
      <H1 as="p">Rendered as p</H1>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'H1 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'H1 with Custom Class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default H1 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates H1 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a Very Long H1 Heading That Might Wrap to Multiple Lines in Narrow Containers',
  },
  parameters: {
    docs: {
      description: {
        story:
          'H1 component handles long text content gracefully with proper line height.',
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
      <H1>Default H1</H1>
      <H1 bold>Bold H1</H1>
      <H1 italic>Italic H1</H1>
      <H1 underline>Underlined H1</H1>
      <H1 strikeThrough>Strikethrough H1</H1>
      <H1 highlight>Highlighted H1</H1>
      <div
        style={{
          width: '200px',
          border: '1px dashed #ccc',
        }}
      >
        <H1 isTruncated>This is a very long H1 that will be truncated</H1>
      </div>
      <H1 bold italic underline>
        Bold, Italic & Underlined
      </H1>
      <H1 highlight bold>
        Highlighted & Bold
      </H1>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for H1 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all H1 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground H1 Title',
    emphasis: 'high',
    as: 'h1',
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
          'Interactive playground to test all H1 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
