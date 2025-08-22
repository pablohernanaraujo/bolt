// /src/storybook/typography/h5.stories.tsx
// H5 component stories with interactive controls
// Demonstrates H5 heading component with all props and variations
// RELEVANT FILES: ../../ui/typography/h5/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { H5 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * H5 component meta configuration with controls
 * Provides interactive playground for testing all H5 props
 */
const meta: Meta<typeof H5> = {
  title: 'Typography/H5',
  component: H5,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'H5 heading component for minor section titles. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      defaultValue: 'h5',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'h5' },
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
      defaultValue: 'Minor Section Title',
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
    children: 'Minor Section Title',
    emphasis: 'high',
    as: 'h5',
  },
};

export default meta;
type Story = StoryObj<typeof H5>;

/**
 * Default H5 story with interactive controls
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
      <H5 emphasis="pure">Pure Emphasis (100% opacity)</H5>
      <H5 emphasis="high">High Emphasis (87% opacity) - Default</H5>
      <H5 emphasis="medium">Medium Emphasis (60% opacity)</H5>
      <H5 emphasis="low">Low Emphasis (38% opacity)</H5>
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
 * Shows H5 styled text rendered as different HTML elements
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
      <H5 as="h5">Rendered as h5 (default)</H5>
      <H5 as="h4">Rendered as h4</H5>
      <H5 as="h6">Rendered as h6</H5>
      <H5 as="div">Rendered as div</H5>
      <H5 as="span" style={{ display: 'block' }}>
        Rendered as span
      </H5>
      <H5 as="p">Rendered as p</H5>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'H5 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'H5 with Custom Class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default H5 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates H5 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a Very Long H5 Minor Section Heading That Might Wrap to Multiple Lines in Narrow Containers',
  },
  parameters: {
    docs: {
      description: {
        story:
          'H5 component handles long text content gracefully with proper line height.',
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
      <H5>Default H5</H5>
      <H5 bold>Bold H5</H5>
      <H5 italic>Italic H5</H5>
      <H5 underline>Underlined H5</H5>
      <H5 strikeThrough>Strikethrough H5</H5>
      <H5 highlight>Highlighted H5</H5>
      <div
        style={{
          width: '200px',
          border: '1px dashed #ccc',
        }}
      >
        <H5 isTruncated>This is a very long H5 that will be truncated</H5>
      </div>
      <H5 bold italic underline>
        Bold, Italic & Underlined
      </H5>
      <H5 highlight bold>
        Highlighted & Bold
      </H5>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for H5 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all H5 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground H5 Title',
    emphasis: 'high',
    as: 'h5',
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
          'Interactive playground to test all H5 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
