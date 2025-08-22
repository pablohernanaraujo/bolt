// /src/storybook/controls/radio-group.stories.tsx
// RadioGroup component stories showcasing all variants and states
// Complete documentation for the RadioGroup component
// RELEVANT FILES: ../../ui/radio-group/index.tsx, ../../ui/radio/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '../../ui';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof RadioGroup> = {
  title: 'Controls/RadioGroup',
  component: RadioGroup,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible radio group component built with React Aria Components. Supports multiple variants, sizes, orientations, and states with full keyboard navigation and screen reader support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger'],
      description: 'Visual style variant of the radio group',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the radio buttons',
      defaultValue: 'medium',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the radio group',
      defaultValue: 'vertical',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: 'Label for the radio group',
      defaultValue: 'Choose an option',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    orientation: 'vertical',
    isDisabled: false,
    label: 'Choose an option',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * Default RadioGroup Story
 */
export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="option1">First Option</Radio>
      <Radio value="option2">Second Option</Radio>
      <Radio value="option3">Third Option</Radio>
    </RadioGroup>
  ),
  decorators: [withCentered],
};

/**
 * Variants Story
 * Showcases all available radio group variants
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <RadioGroup
        variant="primary"
        label="Primary RadioGroup"
        defaultValue="primary1"
      >
        <Radio value="primary1">Primary Option 1</Radio>
        <Radio value="primary2">Primary Option 2</Radio>
        <Radio value="primary3">Primary Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="secondary"
        label="Secondary RadioGroup"
        defaultValue="secondary1"
      >
        <Radio value="secondary1">Secondary Option 1</Radio>
        <Radio value="secondary2">Secondary Option 2</Radio>
        <Radio value="secondary3">Secondary Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="success"
        label="Success RadioGroup"
        defaultValue="success1"
      >
        <Radio value="success1">Success Option 1</Radio>
        <Radio value="success2">Success Option 2</Radio>
        <Radio value="success3">Success Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="danger"
        label="Danger RadioGroup"
        defaultValue="danger1"
      >
        <Radio value="danger1">Danger Option 1</Radio>
        <Radio value="danger2">Danger Option 2</Radio>
        <Radio value="danger3">Danger Option 3</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available radio group variants: primary, secondary, success, and danger. Each variant provides different visual feedback for the selected state.',
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
        gap: '2rem',
      }}
    >
      <RadioGroup
        variant="primary"
        size="small"
        label="Small RadioGroup"
        defaultValue="small1"
      >
        <Radio value="small1">Small Option 1</Radio>
        <Radio value="small2">Small Option 2</Radio>
        <Radio value="small3">Small Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="primary"
        size="medium"
        label="Medium RadioGroup"
        defaultValue="medium1"
      >
        <Radio value="medium1">Medium Option 1</Radio>
        <Radio value="medium2">Medium Option 2</Radio>
        <Radio value="medium3">Medium Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="primary"
        size="large"
        label="Large RadioGroup"
        defaultValue="large1"
      >
        <Radio value="large1">Large Option 1</Radio>
        <Radio value="large2">Large Option 2</Radio>
        <Radio value="large3">Large Option 3</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available radio group sizes: small, medium, and large. Size affects both the radio inputs and label text.',
      },
    },
  },
};

/**
 * Orientations Story
 * Shows different layout orientations
 */
export const Orientations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <RadioGroup
        variant="primary"
        orientation="vertical"
        label="Vertical RadioGroup"
        defaultValue="vertical1"
      >
        <Radio value="vertical1">Vertical Option 1</Radio>
        <Radio value="vertical2">Vertical Option 2</Radio>
        <Radio value="vertical3">Vertical Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="primary"
        orientation="horizontal"
        label="Horizontal RadioGroup"
        defaultValue="horizontal1"
      >
        <Radio value="horizontal1">Horizontal 1</Radio>
        <Radio value="horizontal2">Horizontal 2</Radio>
        <Radio value="horizontal3">Horizontal 3</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Radio groups can be arranged vertically (default) or horizontally.',
      },
    },
  },
};

/**
 * States Story
 * Different radio group states
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <RadioGroup variant="primary" label="Normal State" defaultValue="normal1">
        <Radio value="normal1">Normal Option 1</Radio>
        <Radio value="normal2">Normal Option 2</Radio>
        <Radio value="normal3">Normal Option 3</Radio>
      </RadioGroup>

      <RadioGroup
        variant="primary"
        label="Disabled State"
        isDisabled
        defaultValue="disabled1"
      >
        <Radio value="disabled1">Disabled Option 1</Radio>
        <Radio value="disabled2">Disabled Option 2</Radio>
        <Radio value="disabled3">Disabled Option 3</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different radio group states: normal and disabled.',
      },
    },
  },
};

/**
 * Without Label Story
 * Radio group without visible label (requires aria-label)
 */
export const WithoutLabel: Story = {
  render: () => (
    <RadioGroup
      variant="primary"
      aria-label="Choose your preferred theme"
      defaultValue="theme1"
    >
      <Radio value="theme1">Light Theme</Radio>
      <Radio value="theme2">Dark Theme</Radio>
      <Radio value="theme3">System Theme</Radio>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Radio groups without visible labels must include aria-label for accessibility.',
      },
    },
  },
};

/**
 * Form Example Story
 * Radio groups in a form context
 */
export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: 'system-ui',
        }}
      >
        User Preferences
      </h3>

      <RadioGroup
        variant="primary"
        label="Preferred Theme"
        defaultValue="light"
      >
        <Radio value="light">Light Theme</Radio>
        <Radio value="dark">Dark Theme</Radio>
        <Radio value="system">Use System Setting</Radio>
      </RadioGroup>

      <RadioGroup
        variant="success"
        label="Notification Level"
        defaultValue="all"
      >
        <Radio value="all">All Notifications</Radio>
        <Radio value="important">Important Only</Radio>
        <Radio value="none">No Notifications</Radio>
      </RadioGroup>

      <RadioGroup
        variant="secondary"
        orientation="horizontal"
        label="Date Format"
        defaultValue="dmy"
      >
        <Radio value="dmy">DD/MM/YYYY</Radio>
        <Radio value="mdy">MM/DD/YYYY</Radio>
        <Radio value="ymd">YYYY-MM-DD</Radio>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of radio groups used in a form with different variants and orientations.',
      },
    },
  },
};

/**
 * Interactive Playground
 * Allows testing all props interactively
 */
export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="playground1">Playground Option 1</Radio>
      <Radio value="playground2">Playground Option 2</Radio>
      <Radio value="playground3">Playground Option 3</Radio>
    </RadioGroup>
  ),
  decorators: [withCentered],
  args: {
    label: 'Playground RadioGroup',
    variant: 'primary',
    size: 'medium',
    orientation: 'vertical',
    isDisabled: false,
    defaultValue: 'playground1',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all radio group props and combinations.',
      },
    },
  },
};
