// /src/storybook/forms/input.stories.tsx
// Input component stories showcasing all variants, sizes, and states
// Complete documentation for the Input component
// RELEVANT FILES: ../../ui/input/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '../../ui';
import { Input, InputField } from '../../ui/input';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof InputField> = {
  title: 'Forms/InputField',
  component: InputField,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible input component built with React Aria Components. Supports multiple variants, sizes, and input types with full keyboard navigation and validation states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the input',
      defaultValue: 'outline',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the input',
      defaultValue: 'medium',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Type of the input field',
      defaultValue: 'text',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the input has an error state',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      defaultValue: 'Enter text...',
    },
    'aria-label': {
      control: 'text',
      description:
        'Accessibility label for the input (required when no visible label)',
      defaultValue: 'Input field',
    },
  },
  args: {
    placeholder: 'Enter text...',
    variant: 'outline',
    size: 'medium',
    type: 'text',
    hasError: false,
    isDisabled: false,
    'aria-label': 'Input field',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

/**
 * Default Input Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    placeholder: 'Default input',
    'aria-label': 'Default input field',
  },
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <VStack space="4">
      <InputField
        variant="outline"
        placeholder="Outline variant"
        aria-label="Outline variant"
      />
      <InputField
        variant="filled"
        placeholder="Filled variant"
        aria-label="Filled variant"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available input variants: outline (border style) and filled (background style).',
      },
    },
  },
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
    <VStack space="4">
      <InputField
        variant="outline"
        size="small"
        placeholder="Small input"
        aria-label="Small input"
      />
      <InputField
        variant="outline"
        size="medium"
        placeholder="Medium input"
        aria-label="Medium input"
      />
      <InputField
        variant="outline"
        size="large"
        placeholder="Large input"
        aria-label="Large input"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available input sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * Input Types Story
 */
export const InputTypes: Story = {
  render: () => (
    <VStack space="4">
      <InputField
        type="text"
        placeholder="Text input"
        aria-label="Text input"
      />
      <InputField
        type="email"
        placeholder="Email input"
        aria-label="Email input"
      />
      <InputField
        type="password"
        placeholder="Password input"
        aria-label="Password input"
      />
      <InputField
        type="number"
        placeholder="Number input"
        aria-label="Number input"
      />
      <InputField
        type="tel"
        placeholder="Telephone input"
        aria-label="Telephone input"
      />
      <InputField type="url" placeholder="URL input" aria-label="URL input" />
      <InputField
        type="search"
        placeholder="Search input"
        aria-label="Search input"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different input types with appropriate keyboard and validation behavior.',
      },
    },
  },
};

/**
 * States Story
 */
export const States: Story = {
  render: () => (
    <VStack space="4">
      <InputField placeholder="Normal state" aria-label="Normal state" />
      <InputField
        placeholder="Disabled state"
        aria-label="Disabled state"
        isDisabled
      />
      <InputField placeholder="Error state" aria-label="Error state" hasError />
      <InputField
        placeholder="Disabled with error"
        aria-label="Disabled with error"
        isDisabled
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different input states: normal, disabled, error, and combinations.',
      },
    },
  },
};

/**
 * Filled Variant with States
 */
export const FilledVariantStates: Story = {
  render: () => (
    <VStack space="4">
      <InputField
        variant="filled"
        placeholder="Normal filled"
        aria-label="Normal filled"
      />
      <InputField
        variant="filled"
        placeholder="Disabled filled"
        aria-label="Disabled filled"
        isDisabled
      />
      <InputField
        variant="filled"
        placeholder="Error filled"
        aria-label="Error filled"
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filled variant in different states.',
      },
    },
  },
};

/**
 * Size and Variant Combinations
 */
export const Combinations: Story = {
  render: () => (
    <VStack space="4">
      <Input
        variant="outline"
        size="small"
        type="email"
        placeholder="Small outline email"
        aria-label="Small outline email"
      />
      <Input
        variant="filled"
        size="medium"
        type="password"
        placeholder="Medium filled password"
        aria-label="Medium filled password"
      />
      <Input
        variant="outline"
        size="large"
        type="search"
        placeholder="Large outline search"
        aria-label="Large outline search"
      />
      <Input
        variant="filled"
        size="large"
        type="url"
        placeholder="Large filled URL"
        aria-label="Large filled URL with error"
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various combinations of variants, sizes, types, and states.',
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
    placeholder: 'Playground input',
    variant: 'outline',
    size: 'medium',
    type: 'text',
    hasError: false,
    isDisabled: false,
    'aria-label': 'Playground input field',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all input props and combinations.',
      },
    },
  },
};
