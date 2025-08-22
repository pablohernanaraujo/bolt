// /src/storybook/controls/toggle.stories.tsx
// Toggle component stories showcasing all variants and states
// Complete documentation for the Toggle component
// RELEVANT FILES: ../../ui/toggle/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../../ui/toggle';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Toggle> = {
  title: 'Controls/Toggle',
  component: Toggle,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible toggle/switch component built with React Aria Components. Supports multiple variants, sizes, label positioning, and states with full keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger'],
      description: 'Visual style variant of the toggle',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the toggle',
      defaultValue: 'medium',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the label relative to the toggle',
      defaultValue: 'right',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
      defaultValue: false,
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the toggle is selected/checked',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'Label text for the toggle',
      defaultValue: 'Toggle Option',
    },
  },
  args: {
    children: 'Toggle Option',
    variant: 'primary',
    size: 'medium',
    labelPosition: 'right',
    isDisabled: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/**
 * Default Toggle Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Variants Story
 * Showcases all available toggle variants
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Toggle variant="primary">Primary Toggle</Toggle>
      <Toggle variant="secondary">Secondary Toggle</Toggle>
      <Toggle variant="success">Success Toggle</Toggle>
      <Toggle variant="danger">Danger Toggle</Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available toggle variants: primary, secondary, success, and danger. Each variant provides different visual feedback for the checked state.',
      },
    },
  },
};

/**
 * Sizes Story
 * Demonstrates the three available sizes
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Toggle variant="primary" size="small">
        Small Toggle
      </Toggle>
      <Toggle variant="primary" size="medium">
        Medium Toggle
      </Toggle>
      <Toggle variant="primary" size="large">
        Large Toggle
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available toggle sizes: small, medium, and large. Size affects both the toggle switch and label text.',
      },
    },
  },
};

/**
 * Label Positions Story
 * Shows different label positioning options
 */
export const LabelPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Toggle variant="primary" labelPosition="right">
        Label on Right
      </Toggle>
      <Toggle variant="primary" labelPosition="left">
        Label on Left
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle labels can be positioned on either side of the switch.',
      },
    },
  },
};

/**
 * Without Label Story
 * Toggle without visible label (requires aria-label)
 */
export const WithoutLabel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Toggle variant="primary" aria-label="Enable notifications" />
      <Toggle variant="secondary" aria-label="Enable dark mode" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggles without visible labels must include aria-label for accessibility.',
      },
    },
  },
};

/**
 * States Story
 * Different toggle states
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Toggle variant="primary">Unchecked</Toggle>
      <Toggle variant="primary" defaultSelected>
        Checked
      </Toggle>
      <Toggle variant="primary" isDisabled>
        Disabled Unchecked
      </Toggle>
      <Toggle variant="primary" isDisabled defaultSelected>
        Disabled Checked
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different toggle states: unchecked, checked, and disabled states.',
      },
    },
  },
};

/**
 * Form Example Story
 * Toggles in a form context
 */
export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: 'system-ui',
        }}
      >
        Notification Settings
      </h3>
      <Toggle variant="primary" defaultSelected>
        Email Notifications
      </Toggle>
      <Toggle variant="primary">Push Notifications</Toggle>
      <Toggle variant="success" defaultSelected>
        Security Alerts
      </Toggle>
      <Toggle variant="danger">Marketing Emails</Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of toggles used in a settings form with different variants for different types of settings.',
      },
    },
  },
};

/**
 * Interactive Playground
 * Allows testing all props interactively
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Toggle',
    variant: 'primary',
    size: 'medium',
    labelPosition: 'right',
    isDisabled: false,
    isSelected: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all toggle props and combinations.',
      },
    },
  },
};
