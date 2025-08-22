// /src/storybook/typography/body3.stories.tsx
// Body3 component stories with interactive controls
// Demonstrates Body3 text component with all props and variations
// RELEVANT FILES: ../../ui/typography/body3/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Body3 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Body3 component meta configuration with controls
 * Provides interactive playground for testing all Body3 props
 */
const meta: Meta<typeof Body3> = {
  title: 'Typography/Body3',
  component: Body3,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Body3 text component for smaller body content. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      defaultValue: 'This is Body3 text for smaller content.',
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
    children: 'This is Body3 text for smaller content.',
    emphasis: 'high',
    as: 'p',
  },
};

export default meta;
type Story = StoryObj<typeof Body3>;

/**
 * Default Body3 story with interactive controls
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
      <Body3 emphasis="pure">Pure Emphasis (100% opacity)</Body3>
      <Body3 emphasis="high">High Emphasis (87% opacity) - Default</Body3>
      <Body3 emphasis="medium">Medium Emphasis (60% opacity)</Body3>
      <Body3 emphasis="low">Low Emphasis (38% opacity)</Body3>
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
 * Shows Body3 styled text rendered as different HTML elements
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
      <Body3 as="p">Rendered as p (default)</Body3>
      <Body3 as="div">Rendered as div</Body3>
      <Body3 as="span" style={{ display: 'block' }}>
        Rendered as span
      </Body3>
      <Body3 as="h6">Rendered as h6</Body3>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Body3 can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements.',
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
    children: 'Body3 text with custom class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Body3 styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Body3 with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a longer Body3 text example that demonstrates how the component handles multiple sentences and longer paragraphs. Body3 is typically used for smaller content, fine print, or supporting details that complement larger text.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Body3 component handles long text content gracefully with proper line height and readability.',
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
      <Body3>Default Body3 text</Body3>
      <Body3 bold>Bold Body3 text</Body3>
      <Body3 italic>Italic Body3 text</Body3>
      <Body3 underline>Underlined Body3 text</Body3>
      <Body3 strikeThrough>Strikethrough Body3 text</Body3>
      <Body3 highlight>Highlighted Body3 text</Body3>
      <div
        style={{
          width: '300px',
          border: '1px dashed #ccc',
        }}
      >
        <Body3 isTruncated>
          This is a very long Body3 text that will be truncated when it
          overflows
        </Body3>
      </div>
      <Body3 bold italic underline>
        Bold, Italic & Underlined Body3
      </Body3>
      <Body3 highlight bold>
        Highlighted & Bold Body3
      </Body3>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Body3 component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Body3 props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Body3 text content',
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
          'Interactive playground to test all Body3 props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
