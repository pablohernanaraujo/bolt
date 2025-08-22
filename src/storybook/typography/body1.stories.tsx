// /src/storybook/typography/body1.stories.tsx
// Body1 component stories with interactive controls
// Demonstrates Body1 text component with all props and variations
// RELEVANT FILES: ../../ui/typography/body1/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Body1 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Body1 component meta configuration with controls
 * Provides interactive playground for testing all Body1 props
 */
const meta: Meta<typeof Body1> = {
  title: 'Typography/Body1',
  component: Body1,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Body1 text component for main body content. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      options: ['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'p',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'p' },
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
      defaultValue: 'This is Body1 text for main content paragraphs.',
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
    children: 'This is Body1 text for main content paragraphs.',
    emphasis: 'high',
    as: 'p',
  },
};

export default meta;
type Story = StoryObj<typeof Body1>;

/**
 * Default Body1 story with interactive controls
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
      <Body1 emphasis="pure">Pure Emphasis (100% opacity)</Body1>
      <Body1 emphasis="high">High Emphasis (87% opacity) - Default</Body1>
      <Body1 emphasis="medium">Medium Emphasis (60% opacity)</Body1>
      <Body1 emphasis="low">Low Emphasis (38% opacity)</Body1>
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
 * Shows Body1 styled text rendered as different HTML elements
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
      <Body1 as="p">Rendered as p (default)</Body1>
      <Body1 as="div">Rendered as div</Body1>
      <Body1 as="span" style={{ display: 'block' }}>
        Rendered as span
      </Body1>
      <Body1 as="h4">Rendered as h4</Body1>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Body1 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'Body1 text with custom class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Body1 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Body1 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a longer Body1 text example that demonstrates how the component handles multiple sentences and longer paragraphs. The text should maintain proper line height and readability even when spanning multiple lines in various container widths.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Body1 component handles long text content gracefully with proper line height and readability.',
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
      <Body1>Default Body1 text</Body1>
      <Body1 bold>Bold Body1 text</Body1>
      <Body1 italic>Italic Body1 text</Body1>
      <Body1 underline>Underlined Body1 text</Body1>
      <Body1 strikeThrough>Strikethrough Body1 text</Body1>
      <Body1 highlight>Highlighted Body1 text</Body1>
      <div
        style={{
          width: '300px',
          border: '1px dashed #ccc',
        }}
      >
        <Body1 isTruncated>
          This is a very long Body1 text that will be truncated when it
          overflows
        </Body1>
      </div>
      <Body1 bold italic underline>
        Bold, Italic & Underlined Body1
      </Body1>
      <Body1 highlight bold>
        Highlighted & Bold Body1
      </Body1>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Body1 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Body1 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Body1 text content',
    emphasis: 'high',
    as: 'p',
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
          'Interactive playground to test all Body1 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
