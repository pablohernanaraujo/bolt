// /src/storybook/typography/caption.stories.tsx
// Caption component stories with interactive controls
// Demonstrates Caption text component with all props and variations
// RELEVANT FILES: ../../ui/typography/caption/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Caption } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Caption component meta configuration with controls
 * Provides interactive playground for testing all Caption props
 */
const meta: Meta<typeof Caption> = {
  title: 'Typography/Caption',
  component: Caption,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Caption text component for small explanatory text, labels, and image captions. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      options: ['span', 'div', 'p', 'figcaption', 'small', 'label'],
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
      defaultValue: 'Caption text for descriptions',
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
    children: 'Caption text for descriptions',
    emphasis: 'high',
    as: 'span',
  },
};

export default meta;
type Story = StoryObj<typeof Caption>;

/**
 * Default Caption story with interactive controls
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
      <Caption emphasis="pure">Pure Emphasis (100% opacity)</Caption>
      <Caption emphasis="high">High Emphasis (87% opacity) - Default</Caption>
      <Caption emphasis="medium">Medium Emphasis (60% opacity)</Caption>
      <Caption emphasis="low">Low Emphasis (38% opacity)</Caption>
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
 * Shows Caption styled text rendered as different HTML elements
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
      <Caption as="span">Rendered as span (default)</Caption>
      <Caption as="figcaption">Rendered as figcaption</Caption>
      <Caption as="small">Rendered as small</Caption>
      <Caption as="label">Rendered as label</Caption>
      <Caption as="div">Rendered as div</Caption>
      <Caption as="p">Rendered as p</Caption>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Caption can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements like figcaptions and labels.',
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
    children: 'Caption with custom class',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Caption styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Caption with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'This is a longer caption text example that demonstrates how the component handles descriptive text for images, tables, or other content that requires detailed explanation or attribution information.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Caption component handles long text content gracefully with proper line height and readability.',
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
      <Caption>Default Caption text</Caption>
      <Caption bold>Bold Caption text</Caption>
      <Caption italic>Italic Caption text</Caption>
      <Caption underline>Underlined Caption text</Caption>
      <Caption strikeThrough>Strikethrough Caption text</Caption>
      <Caption highlight>Highlighted Caption text</Caption>
      <div
        style={{
          width: '200px',
          border: '1px dashed #ccc',
        }}
      >
        <Caption isTruncated>
          This is a very long Caption text that will be truncated when it
          overflows
        </Caption>
      </div>
      <Caption bold italic underline>
        Bold, Italic & Underlined Caption
      </Caption>
      <Caption highlight bold>
        Highlighted & Bold Caption
      </Caption>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Caption component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Caption props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground caption text',
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
          'Interactive playground to test all Caption props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
