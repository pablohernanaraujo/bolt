// /src/storybook/forms/password-input.stories.tsx
// PasswordInput component stories showcasing all variants, sizes, and states
// Complete documentation for the PasswordInput component with visibility toggle
// RELEVANT FILES: ../../ui/password-input/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import { Button, PasswordInput, PasswordStrengthMeter, VStack } from '../../ui';
import { FormField } from '../../ui/form-field';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible password input component built with React Aria Components. Features password visibility toggle with eye/eye-off icons. Supports multiple variants, sizes, and controlled/uncontrolled visibility states with full keyboard navigation and validation states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the password input',
      defaultValue: 'outline',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the password input',
      defaultValue: 'medium',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the password input has an error state',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the password input is disabled',
      defaultValue: false,
    },
    defaultVisible: {
      control: 'boolean',
      description: 'Initial visibility state of the password',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the password input',
      defaultValue: 'Enter password...',
    },
    toggleAriaLabel: {
      control: 'text',
      description: 'Custom aria-label for the visibility toggle button',
    },
    'aria-label': {
      control: 'text',
      description:
        'Accessibility label for the password input (required when no visible label)',
      defaultValue: 'Password input field',
    },
  },
  args: {
    placeholder: 'Enter password...',
    variant: 'outline',
    size: 'medium',
    hasError: false,
    disabled: false,
    defaultVisible: false,
    'aria-label': 'Password input field',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

/**
 * Default PasswordInput Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    placeholder: 'Enter your password',
    'aria-label': 'Default password input field',
  },
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <VStack space="4">
      <PasswordInput
        variant="outline"
        placeholder="Outline password input"
        aria-label="Outline variant"
      />
      <PasswordInput
        variant="filled"
        placeholder="Filled password input"
        aria-label="Filled variant"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available password input variants: outline (border style) and filled (background style).',
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
      <PasswordInput
        variant="outline"
        size="small"
        placeholder="Small password input"
        aria-label="Small password input"
      />
      <PasswordInput
        variant="outline"
        size="medium"
        placeholder="Medium password input"
        aria-label="Medium password input"
      />
      <PasswordInput
        variant="outline"
        size="large"
        placeholder="Large password input"
        aria-label="Large password input"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available password input sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * Visibility States Story
 */
export const VisibilityStates: Story = {
  render: () => (
    <VStack space="4">
      <PasswordInput
        placeholder="Hidden by default"
        aria-label="Hidden password input"
        defaultVisible={false}
      />
      <PasswordInput
        placeholder="Visible by default"
        aria-label="Visible password input"
        defaultVisible={true}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Password inputs can start hidden or visible. Click the eye icon to toggle visibility.',
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
      <PasswordInput placeholder="Normal state" aria-label="Normal state" />
      <PasswordInput
        placeholder="Disabled state"
        aria-label="Disabled state"
        disabled
      />
      <PasswordInput
        placeholder="Error state"
        aria-label="Error state"
        hasError
      />
      <PasswordInput
        placeholder="Disabled with error"
        aria-label="Disabled with error"
        disabled
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different password input states: normal, disabled, error, and combinations.',
      },
    },
  },
};

/**
 * Controlled Visibility Story
 */
export const ControlledVisibility: Story = {
  render: () => {
    const ControlledVisibilityComponent = (): ReactElement => {
      const [isVisible, setIsVisible] = useState(false);

      return (
        <VStack space="4">
          <PasswordInput
            placeholder="Controlled visibility"
            aria-label="Controlled visibility password input"
            isVisible={isVisible}
            onVisibilityChange={setIsVisible}
          />
          <Button
            variant="secondary"
            size="small"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? 'Hide' : 'Show'} Password Externally
          </Button>
        </VStack>
      );
    };

    return <ControlledVisibilityComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Password input with controlled visibility state. Use isVisible and onVisibilityChange for external control.',
      },
    },
  },
};

/**
 * With FormField Story
 */
export const WithFormField: Story = {
  render: () => (
    <VStack space="4">
      <FormField label="Password">
        <PasswordInput placeholder="Enter your password" />
      </FormField>
      <FormField label="New Password">
        <PasswordInput variant="filled" placeholder="Enter new password" />
      </FormField>
      <FormField label="Confirm Password">
        <PasswordInput placeholder="Confirm password" hasError />
      </FormField>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Password input integrated with FormField component for proper labeling, helper text, and error messages.',
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
      <PasswordInput
        variant="filled"
        placeholder="Normal filled"
        aria-label="Normal filled"
      />
      <PasswordInput
        variant="filled"
        placeholder="Disabled filled"
        aria-label="Disabled filled"
        disabled
      />
      <PasswordInput
        variant="filled"
        placeholder="Error filled"
        aria-label="Error filled"
        hasError
      />
      <PasswordInput
        variant="filled"
        placeholder="Filled with visible password"
        aria-label="Filled with visible password"
        defaultVisible={true}
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Filled variant in different states including visibility toggle.',
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
      <PasswordInput
        variant="outline"
        size="small"
        placeholder="Small outline password"
        aria-label="Small outline password"
      />
      <PasswordInput
        variant="filled"
        size="medium"
        placeholder="Medium filled password"
        aria-label="Medium filled password"
        defaultVisible={true}
      />
      <PasswordInput
        variant="outline"
        size="large"
        placeholder="Large outline password"
        aria-label="Large outline password"
      />
      <PasswordInput
        variant="filled"
        size="large"
        placeholder="Large filled with error"
        aria-label="Large filled password with error"
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Various combinations of variants, sizes, visibility states, and error states.',
      },
    },
  },
};

/**
 * Custom Toggle Label
 */
export const CustomToggleLabel: Story = {
  render: () => (
    <VStack space="4">
      <PasswordInput
        placeholder="Custom toggle aria-label"
        aria-label="Password with custom toggle label"
        toggleAriaLabel="Toggle password visibility for this field"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Password input with custom aria-label for the visibility toggle button for better accessibility.',
      },
    },
  },
};

/**
 * With Password Strength Meter
 */
export const WithStrengthMeter: Story = {
  render: () => {
    const WithStrengthMeterComponent = (): ReactElement => {
      const [password, setPassword] = useState('');

      return (
        <VStack space="3">
          <PasswordInput
            placeholder="Type password to see strength"
            aria-label="Password with strength meter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthMeter
            value={password}
            showLabel={true}
            showFeedback={true}
          />
        </VStack>
      );
    };

    return <WithStrengthMeterComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Password input combined with strength meter for real-time feedback. Type a password to see strength analysis and improvement suggestions.',
      },
    },
  },
};

/**
 * Signup Form Example
 */
export const SignupFormExample: Story = {
  render: () => {
    const SignupFormExampleComponent = (): ReactElement => {
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');

      return (
        <VStack space="4">
          <FormField label="Create Password">
            <VStack space="3">
              <PasswordInput
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrengthMeter
                value={password}
                showLabel={true}
                showFeedback={true}
              />
            </VStack>
          </FormField>
          <FormField label="Confirm Password">
            <PasswordInput
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              hasError={
                password !== confirmPassword && confirmPassword.length > 0
              }
            />
          </FormField>
        </VStack>
      );
    };

    return <SignupFormExampleComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete signup form example with password strength meter and confirmation field.',
      },
    },
  },
};

/**
 * Strength Meter Sizes
 */
export const StrengthMeterSizes: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Small
        </span>
        <PasswordStrengthMeter
          value="ExamplePassword123!"
          showLabel={true}
          size="small"
        />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Medium (default)
        </span>
        <PasswordStrengthMeter
          value="ExamplePassword123!"
          showLabel={true}
          size="medium"
        />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Large
        </span>
        <PasswordStrengthMeter
          value="ExamplePassword123!"
          showLabel={true}
          size="large"
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes available for the password strength meter.',
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
    placeholder: 'Playground password input',
    variant: 'outline',
    size: 'medium',
    hasError: false,
    disabled: false,
    defaultVisible: false,
    'aria-label': 'Playground password input field',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all password input props and combinations.',
      },
    },
  },
};
