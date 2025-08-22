// /src/storybook/typography/h3.stories.tsx
// H3 component stories with interactive controls
// Demonstrates H3 heading component with all props and variations
// RELEVANT FILES: ../../ui/typography/h3/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { H3 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * H3 component meta configuration with controls
 * Provides interactive playground for testing all H3 props
 */
const meta: Meta<typeof H3> = {
  title: 'Typography/H3',
  component: H3,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'H3 heading component for subsection titles. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      defaultValue: 'h3',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'h3' },
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
      defaultValue: 'Subsection Title',
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
    children: 'Subsection Title',
    emphasis: 'high',
    as: 'h3',
  },
};

export default meta;
type Story = StoryObj<typeof H3>;

/**
 * Default H3 story with interactive controls
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
      <H3 emphasis="pure">Pure Emphasis (100% opacity)</H3>
      <H3 emphasis="high">High Emphasis (87% opacity) - Default</H3>
      <H3 emphasis="medium">Medium Emphasis (60% opacity)</H3>
      <H3 emphasis="low">Low Emphasis (38% opacity)</H3>
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
 * Shows H3 styled text rendered as different HTML elements
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
      <H3 as="h3">Rendered as h3 (default)</H3>
      <H3 as="h2">Rendered as h2</H3>
      <H3 as="h4">Rendered as h4</H3>
      <H3 as="div">Rendered as div</H3>
      <H3 as="span" style={{ display: 'block' }}>
        Rendered as span
      </H3>
      <H3 as="p">Rendered as p</H3>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'H3 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'H3 with Custom Class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default H3 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates H3 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a Very Long H3 Subsection Heading That Might Wrap to Multiple Lines in Narrow Containers',
  },
  parameters: {
    docs: {
      description: {
        story:
          'H3 component handles long text content gracefully with proper line height.',
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
      <H3>Default H3</H3>
      <H3 bold>Bold H3</H3>
      <H3 italic>Italic H3</H3>
      <H3 underline>Underlined H3</H3>
      <H3 strikeThrough>Strikethrough H3</H3>
      <H3 highlight>Highlighted H3</H3>
      <div
        style={{
          width: '200px',
          border: '1px dashed #ccc',
        }}
      >
        <H3 isTruncated>This is a very long H3 that will be truncated</H3>
      </div>
      <H3 bold italic underline>
        Bold, Italic & Underlined
      </H3>
      <H3 highlight bold>
        Highlighted & Bold
      </H3>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for H3 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all H3 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground H3 Title',
    emphasis: 'high',
    as: 'h3',
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
          'Interactive playground to test all H3 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
