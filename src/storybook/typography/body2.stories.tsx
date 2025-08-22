// /src/storybook/typography/body2.stories.tsx
// Body2 component stories with interactive controls
// Demonstrates Body2 text component with all props and variations
// RELEVANT FILES: ../../ui/typography/body2/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Body2 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Body2 component meta configuration with controls
 * Provides interactive playground for testing all Body2 props
 */
const meta: Meta<typeof Body2> = {
  title: 'Typography/Body2',
  component: Body2,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Body2 text component for secondary body content. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      defaultValue: 'This is Body2 text for secondary content.',
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
    children: 'This is Body2 text for secondary content.',
    emphasis: 'high',
    as: 'p',
  },
};

export default meta;
type Story = StoryObj<typeof Body2>;

/**
 * Default Body2 story with interactive controls
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
      <Body2 emphasis="pure">Pure Emphasis (100% opacity)</Body2>
      <Body2 emphasis="high">High Emphasis (87% opacity) - Default</Body2>
      <Body2 emphasis="medium">Medium Emphasis (60% opacity)</Body2>
      <Body2 emphasis="low">Low Emphasis (38% opacity)</Body2>
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
 * Shows Body2 styled text rendered as different HTML elements
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
      <Body2 as="p">Rendered as p (default)</Body2>
      <Body2 as="div">Rendered as div</Body2>
      <Body2 as="span" style={{ display: 'block' }}>
        Rendered as span
      </Body2>
      <Body2 as="h5">Rendered as h5</Body2>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Body2 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'Body2 text with custom class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Body2 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Body2 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a longer Body2 text example that demonstrates how the component handles multiple sentences and longer paragraphs. Body2 is typically used for secondary content, descriptions, or supplementary information that supports the main content.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Body2 component handles long text content gracefully with proper line height and readability.',
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
      <Body2>Default Body2 text</Body2>
      <Body2 bold>Bold Body2 text</Body2>
      <Body2 italic>Italic Body2 text</Body2>
      <Body2 underline>Underlined Body2 text</Body2>
      <Body2 strikeThrough>Strikethrough Body2 text</Body2>
      <Body2 highlight>Highlighted Body2 text</Body2>
      <div
        style={{
          width: '300px',
          border: '1px dashed #ccc',
        }}
      >
        <Body2 isTruncated>
          This is a very long Body2 text that will be truncated when it
          overflows
        </Body2>
      </div>
      <Body2 bold italic underline>
        Bold, Italic & Underlined Body2
      </Body2>
      <Body2 highlight bold>
        Highlighted & Bold Body2
      </Body2>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Body2 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Body2 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Body2 text content',
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
          'Interactive playground to test all Body2 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
