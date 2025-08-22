// /src/storybook/controls/button.stories.tsx
// Button component stories showcasing all variants and states
// Complete documentation for the Button component
// RELEVANT FILES: ../../ui/button/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Download, Heart, Icon } from '../../icons';
import { Button } from '../../ui/button';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Button> = {
  title: 'Controls/Button',
  component: Button,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible button component built with React Aria Components. Supports multiple variants, sizes, and states with full keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant of the button',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      defaultValue: 'medium',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'Button content',
      defaultValue: 'Button',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default Button Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available button variants: primary, secondary, ghost, and danger.',
      },
    },
  },
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary" size="small">
        Small
      </Button>
      <Button variant="primary" size="medium">
        Medium
      </Button>
      <Button variant="primary" size="large">
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available button sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * With Icons Story
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary">
        <Icon icon={Download} size="sm" />
        Download
      </Button>
      <Button variant="secondary">
        <Icon icon={Heart} size="sm" />
        Favorite
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons with icons. Icons should be placed before the text content.',
      },
    },
  },
};

/**
 * States Story
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: normal and disabled.',
      },
    },
  },
};

/**
 * Full Width Story
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button that takes the full width of its container.',
      },
    },
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Button',
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all button props and combinations.',
      },
    },
  },
};
