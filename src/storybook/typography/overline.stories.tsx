// /src/storybook/typography/overline.stories.tsx
// Overline component stories with interactive controls
// Demonstrates Overline text component with all props and variations
// RELEVANT FILES: ../../ui/typography/overline/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Overline } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

/**
 * Overline component meta configuration with controls
 * Provides interactive playground for testing all Overline props
 */
const meta: Meta<typeof Overline> = {
  title: 'Typography/Overline',
  component: Overline,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Overline text component for small uppercase labels and category text. Supports emphasis levels for visual hierarchy and polymorphic rendering.',
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
      options: [
        'span',
        'div',
        'p',
        'small',
        'label',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ],
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
      defaultValue: 'OVERLINE LABEL',
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
    children: 'OVERLINE LABEL',
    emphasis: 'high',
    as: 'span',
  },
};

export default meta;
type Story = StoryObj<typeof Overline>;

/**
 * Default Overline story with interactive controls
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
      <Overline emphasis="pure">PURE EMPHASIS (100% OPACITY)</Overline>
      <Overline emphasis="high">HIGH EMPHASIS (87% OPACITY) - DEFAULT</Overline>
      <Overline emphasis="medium">MEDIUM EMPHASIS (60% OPACITY)</Overline>
      <Overline emphasis="low">LOW EMPHASIS (38% OPACITY)</Overline>
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
 * Shows Overline styled text rendered as different HTML elements
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
      <Overline as="span">RENDERED AS SPAN (DEFAULT)</Overline>
      <Overline as="label">RENDERED AS LABEL</Overline>
      <Overline as="small">RENDERED AS SMALL</Overline>
      <Overline as="div">RENDERED AS DIV</Overline>
      <Overline as="p">RENDERED AS P</Overline>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Overline can be rendered as different HTML elements while maintaining its visual styling. Useful for semantic HTML requirements like labels.',
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
    children: 'OVERLINE WITH CUSTOM CLASS',
    className: 'custom-class-example',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom CSS classes can be added via the className prop. They will be merged with the default Overline styles.',
      },
    },
  },
};

/**
 * Long text example
 * Demonstrates Overline with longer content
 */
export const LongText: Story = {
  args: {
    children:
      'THIS IS A LONGER OVERLINE TEXT EXAMPLE THAT DEMONSTRATES HOW THE COMPONENT HANDLES LONGER CATEGORY LABELS',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Overline component handles long text content gracefully while maintaining its uppercase styling.',
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
      <Overline>DEFAULT OVERLINE</Overline>
      <Overline bold>BOLD OVERLINE</Overline>
      <Overline italic>ITALIC OVERLINE</Overline>
      <Overline underline>UNDERLINED OVERLINE</Overline>
      <Overline strikeThrough>STRIKETHROUGH OVERLINE</Overline>
      <Overline highlight>HIGHLIGHTED OVERLINE</Overline>
      <div
        style={{
          width: '200px',
          border: '1px dashed #ccc',
        }}
      >
        <Overline isTruncated>
          THIS IS A VERY LONG OVERLINE THAT WILL BE TRUNCATED
        </Overline>
      </div>
      <Overline bold italic underline>
        BOLD, ITALIC & UNDERLINED
      </Overline>
      <Overline highlight bold>
        HIGHLIGHTED & BOLD
      </Overline>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different text styling modifiers available for Overline component. These can be combined for various visual effects.',
      },
    },
  },
};

/**
 * Interactive playground
 * Full control over all Overline props
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'PLAYGROUND OVERLINE',
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
          'Interactive playground to test all Overline props and combinations. Use the controls to experiment with different settings.',
      },
    },
  },
};
