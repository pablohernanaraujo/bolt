// /src/storybook/forms/form-field.stories.tsx
// FormField component stories showcasing complete form field composition
// Complete documentation for the FormField component
// RELEVANT FILES: ../../ui/form-field/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '../../ui';
import { FormField } from '../../ui/form-field';
import { Input } from '../../ui/input';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Complete form field component that combines label, input, hint text, and error messages. Built with React Aria Components for proper accessibility relationships and screen reader support.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the form field',
      defaultValue: 'Field Label',
    },
    hint: {
      control: 'text',
      description: 'Help text to display below the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display when field has validation errors',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
      defaultValue: false,
    },
    inputProps: {
      control: 'object',
      description: 'Props to pass to the underlying Input component',
    },
  },
  args: {
    label: 'Field Label',
    required: false,
    isDisabled: false,
    inputProps: {
      placeholder: 'Enter text...',
      variant: 'outline',
      size: 'medium',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

/**
 * Default FormField Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    label: 'Username',
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
};

/**
 * With Hint Text
 */
export const WithHint: Story = {
  decorators: [withCentered],
  args: {
    label: 'Password',
    hint: 'Password must be at least 8 characters long',
    inputProps: {
      type: 'password',
      placeholder: 'Enter your password',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Form field with helpful hint text below the input.',
      },
    },
  },
};

/**
 * Required Field
 */
export const Required: Story = {
  decorators: [withCentered],
  args: {
    label: 'Email',
    required: true,
    inputProps: {
      type: 'email',
      placeholder: 'example@email.com',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Required field with visual indicator and proper ARIA attributes.',
      },
    },
  },
};

/**
 * With Error
 */
export const WithError: Story = {
  decorators: [withCentered],
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    inputProps: {
      type: 'email',
      placeholder: 'example@email.com',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Form field showing error state with error message.',
      },
    },
  },
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  decorators: [withCentered],
  args: {
    label: 'Disabled Field',
    hint: 'This field is not available',
    isDisabled: true,
    inputProps: {
      placeholder: 'Not available',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled form field with proper visual and accessibility states.',
      },
    },
  },
};

/**
 * Different Input Variants
 */
export const InputVariants: Story = {
  render: () => (
    <VStack space="4">
      <FormField
        label="Outline Input"
        hint="Default outline style"
        inputProps={{
          variant: 'outline',
          placeholder: 'Outline variant',
        }}
      />
      <FormField
        label="Filled Input"
        hint="Filled background style"
        inputProps={{
          variant: 'filled',
          placeholder: 'Filled variant',
        }}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form fields with different input variants.',
      },
    },
  },
};

/**
 * Different Input Sizes
 */
export const InputSizes: Story = {
  render: () => (
    <VStack space="4">
      <FormField
        label="Small Input"
        hint="Compact size for limited space"
        inputProps={{
          size: 'small',
          placeholder: 'Small input',
        }}
      />
      <FormField
        label="Medium Input"
        hint="Default size for most use cases"
        inputProps={{
          size: 'medium',
          placeholder: 'Medium input',
        }}
      />
      <FormField
        label="Large Input"
        hint="Larger size for emphasis"
        inputProps={{
          size: 'large',
          placeholder: 'Large input',
        }}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form fields with different input sizes.',
      },
    },
  },
};

/**
 * Different Input Types
 */
export const InputTypes: Story = {
  render: () => (
    <VStack space="4">
      <FormField
        label="Email Address"
        hint="We'll never share your email"
        inputProps={{
          type: 'email',
          placeholder: 'example@email.com',
        }}
      />
      <FormField
        label="Phone Number"
        hint="Include country code"
        inputProps={{
          type: 'tel',
          placeholder: '+1 (555) 123-4567',
        }}
      />
      <FormField
        label="Website URL"
        hint="Your personal or company website"
        inputProps={{
          type: 'url',
          placeholder: 'https://example.com',
        }}
      />
      <FormField
        label="Search Query"
        hint="What are you looking for?"
        inputProps={{
          type: 'search',
          placeholder: 'Search...',
        }}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form fields with different input types and appropriate keyboards.',
      },
    },
  },
};

/**
 * Complex Form Example
 */
export const ComplexForm: Story = {
  render: () => (
    <VStack space="6">
      <FormField
        label="Full Name"
        required
        inputProps={{
          placeholder: 'John Doe',
          variant: 'outline',
        }}
      />
      <FormField
        label="Email Address"
        required
        hint="We'll use this to send you updates"
        inputProps={{
          type: 'email',
          placeholder: 'john@example.com',
          variant: 'outline',
        }}
      />
      <FormField
        label="Password"
        required
        hint="Must be at least 8 characters with one number and one special character"
        inputProps={{
          type: 'password',
          placeholder: 'Enter a strong password',
          variant: 'outline',
        }}
      />
      <FormField
        label="Phone Number"
        hint="Optional - for account recovery"
        inputProps={{
          type: 'tel',
          placeholder: '+1 (555) 123-4567',
          variant: 'filled',
        }}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of a complete form with various field types and states.',
      },
    },
  },
};

/**
 * Error States Example
 */
export const ErrorStates: Story = {
  render: () => (
    <VStack space="4">
      <FormField
        label="Username"
        required
        error="Username is already taken"
        inputProps={{
          placeholder: 'Choose a username',
        }}
      />
      <FormField
        label="Email"
        required
        error="Please enter a valid email address"
        inputProps={{
          type: 'email',
          placeholder: 'example@email.com',
        }}
      />
      <FormField
        label="Password"
        required
        error="Password must be at least 8 characters"
        inputProps={{
          type: 'password',
          placeholder: 'Enter password',
        }}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form fields showing various error states and messages.',
      },
    },
  },
};

/**
 * Custom Input Example
 */
export const CustomInput: Story = {
  decorators: [withCentered],
  args: {
    label: 'Custom Input',
    hint: 'This uses a custom input component',
    children: (
      <Input
        variant="filled"
        size="large"
        placeholder="Custom styled input"
        aria-label="Custom styled input"
        style={{
          borderRadius: '20px',
          backgroundColor: 'var(--colors-primary-alpha10)',
        }}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form field with custom input component using the children prop.',
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
    label: 'Playground Field',
    hint: 'Try changing the props',
    required: false,
    isDisabled: false,
    inputProps: {
      placeholder: 'Interactive input',
      variant: 'outline',
      size: 'medium',
      type: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all form field props and combinations.',
      },
    },
  },
};
