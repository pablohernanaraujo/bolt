// /src/storybook/controls/checkbox.stories.tsx
// Checkbox component stories showcasing all variants and states
// Complete documentation for the Checkbox component
// RELEVANT FILES: ../../ui/checkbox/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../ui/checkbox';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Checkbox> = {
  title: 'Controls/Checkbox',
  component: Checkbox,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible checkbox component built with React Aria Components. Supports multiple variants, sizes, label positioning, and states with full keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger'],
      description: 'Visual style variant of the checkbox',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the checkbox',
      defaultValue: 'medium',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the label relative to the checkbox',
      defaultValue: 'right',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      defaultValue: false,
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is selected/checked',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'Label text for the checkbox',
      defaultValue: 'Checkbox Option',
    },
  },
  args: {
    children: 'Checkbox Option',
    variant: 'primary',
    size: 'medium',
    labelPosition: 'right',
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Default Checkbox Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Variants Story
 * Showcases all available checkbox variants
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
      <Checkbox variant="primary">Primary Checkbox</Checkbox>
      <Checkbox variant="secondary">Secondary Checkbox</Checkbox>
      <Checkbox variant="success">Success Checkbox</Checkbox>
      <Checkbox variant="danger">Danger Checkbox</Checkbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available checkbox variants: primary, secondary, success, and danger. Each variant provides different visual feedback for the checked state.',
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
      <Checkbox variant="primary" size="small">
        Small Checkbox
      </Checkbox>
      <Checkbox variant="primary" size="medium">
        Medium Checkbox
      </Checkbox>
      <Checkbox variant="primary" size="large">
        Large Checkbox
      </Checkbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available checkbox sizes: small, medium, and large. Size affects both the checkbox input and label text.',
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
      <Checkbox variant="primary" labelPosition="right">
        Label on Right
      </Checkbox>
      <Checkbox variant="primary" labelPosition="left">
        Label on Left
      </Checkbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox labels can be positioned on either side of the checkbox.',
      },
    },
  },
};

/**
 * Without Label Story
 * Checkbox without visible label (requires aria-label)
 */
export const WithoutLabel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Checkbox variant="primary" aria-label="Accept terms and conditions" />
      <Checkbox variant="secondary" aria-label="Subscribe to newsletter" />
      <Checkbox variant="success" aria-label="Enable notifications" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Checkboxes without visible labels must include aria-label for accessibility.',
      },
    },
  },
};

/**
 * States Story
 * Different checkbox states
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
      <Checkbox variant="primary">Unchecked</Checkbox>
      <Checkbox variant="primary" defaultChecked>
        Checked
      </Checkbox>
      <Checkbox variant="primary" disabled>
        Disabled Unchecked
      </Checkbox>
      <Checkbox variant="primary" disabled defaultChecked>
        Disabled Checked
      </Checkbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different checkbox states: unchecked, checked, and disabled states.',
      },
    },
  },
};

/**
 * Form Example Story
 * Checkboxes in a form context
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
        Account Preferences
      </h3>
      <Checkbox variant="primary" defaultChecked>
        Accept Terms & Conditions
      </Checkbox>
      <Checkbox variant="primary">Subscribe to Newsletter</Checkbox>
      <Checkbox variant="success" defaultChecked>
        Enable Two-Factor Authentication
      </Checkbox>
      <Checkbox variant="danger">Allow Data Collection for Analytics</Checkbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of checkboxes used in a form with different variants for different types of options.',
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
    children: 'Playground Checkbox',
    variant: 'primary',
    size: 'medium',
    labelPosition: 'right',
    disabled: false,
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all checkbox props and combinations.',
      },
    },
  },
};
