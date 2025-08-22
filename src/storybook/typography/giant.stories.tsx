// /src/storybook/typography/giant.stories.tsx
// Giant component stories with interactive controls
// Demonstrates Giant text component with all props and variations
// RELEVANT FILES: ../../ui/typography/giant/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Giant } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Giant component meta configuration with controls
 * Provides interactive playground for testing all Giant props
 */
const meta: Meta<typeof Giant> = {
  title: 'Typography/Giant',
  component: Giant,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Giant text component for hero text and large display content. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      defaultValue: 'Giant Hero Text',
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
    children: 'Giant Hero Text',
    emphasis: 'high',
    as: 'h1',
  },
};

export default meta;
type Story = StoryObj<typeof Giant>;

/**
 * Default Giant story with interactive controls
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
      <Giant emphasis="pure">Pure Emphasis (100% opacity)</Giant>
      <Giant emphasis="high">High Emphasis (87% opacity) - Default</Giant>
      <Giant emphasis="medium">Medium Emphasis (60% opacity)</Giant>
      <Giant emphasis="low">Low Emphasis (38% opacity)</Giant>
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
 * Shows Giant styled text rendered as different HTML elements
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
      <Giant as="h1">Rendered as h1 (default)</Giant>
      <Giant as="h2">Rendered as h2</Giant>
      <Giant as="div">Rendered as div</Giant>
      <Giant as="span" style={{ display: 'block' }}>
        Rendered as span
      </Giant>
      <Giant as="p">Rendered as p</Giant>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Giant can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'Giant with Custom Class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Giant styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Giant with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a Very Long Giant Hero Text That Spans Multiple Lines and Shows How Large Display Text Handles Wrapping',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Giant component handles long text content gracefully with proper line height for large display text.',
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
      <Giant>Default Giant</Giant>
      <Giant bold>Bold Giant</Giant>
      <Giant italic>Italic Giant</Giant>
      <Giant underline>Underlined Giant</Giant>
      <Giant strikeThrough>Strikethrough Giant</Giant>
      <Giant highlight>Highlighted Giant</Giant>
      <div
        style={{
          width: '300px',
          border: '1px dashed #ccc',
        }}
      >
        <Giant isTruncated>
          This is a very long Giant text that will be truncated
        </Giant>
      </div>
      <Giant bold italic underline>
        Bold, Italic & Underlined
      </Giant>
      <Giant highlight bold>
        Highlighted & Bold
      </Giant>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Giant component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Giant props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Giant Text',
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
          'Interactive playground to test all Giant props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
