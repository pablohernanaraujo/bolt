// /src/storybook/forms/pin-input.stories.tsx
// PinInput component stories showcasing all variants, sizes, types, and functionality
// Complete documentation for the PinInput components with interactive examples
// RELEVANT FILES: ../../ui/pin-input/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  HStack,
  PinInput,
  PinInputField,
  PinInputGroup,
  PinInputSeparator,
  VStack,
} from '../../ui';
import { FormField } from '../../ui/form-field';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof PinInput> = {
  title: 'Forms/PinInput',
  component: PinInput,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible PIN input component built with React Aria Components. Provides auto-focus progression, intelligent paste handling, keyboard navigation, and masking for security. Perfect for OTP codes, verification codes, PIN entries, and security codes with full composition pattern support.',
      },
    },
  },
  argTypes: {
    length: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
      description: 'Number of PIN input fields',
      defaultValue: 4,
    },
    type: {
      control: { type: 'select' },
      options: ['numeric', 'alphanumeric'],
      description:
        'Type of input accepted - numeric (0-9) or alphanumeric (A-Z, 0-9)',
      defaultValue: 'numeric',
    },
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the PIN input fields',
      defaultValue: 'outline',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the PIN input fields',
      defaultValue: 'medium',
    },
    masked: {
      control: 'boolean',
      description: 'Whether to mask the input values (for security)',
      defaultValue: false,
    },
    maskChar: {
      control: 'text',
      description: 'Character to use for masking (when masked=true)',
      defaultValue: '•',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all PIN input fields are disabled',
      defaultValue: false,
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the PIN input has an error state',
      defaultValue: false,
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to automatically focus the first field',
      defaultValue: false,
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for the PIN input',
      defaultValue: 'PIN input',
    },
  },
  args: {
    length: 4,
    type: 'numeric',
    variant: 'outline',
    size: 'medium',
    masked: false,
    maskChar: '•',
    disabled: false,
    hasError: false,
    autoFocus: false,
    'aria-label': 'PIN input',
  },
};

export default meta;
type Story = StoryObj<typeof PinInput>;

/**
 * Default PinInput Story
 */
export const Default: Story = {
  decorators: [withCentered],
  render: (args) => (
    <PinInput {...args}>
      <PinInputGroup>
        {Array.from({ length: args.length || 4 }, (_, i) => (
          <PinInputField key={i} index={i} />
        ))}
      </PinInputGroup>
    </PinInput>
  ),
  args: {
    length: 4,
    'aria-label': 'Default PIN input',
  },
};

/**
 * Basic Lengths Story
 */
export const BasicLengths: Story = {
  render: () => (
    <VStack space="4">
      {/* 4-digit PIN */}
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          4-digit PIN (default)
        </span>
        <PinInput length={4} aria-label="4-digit PIN">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      {/* 6-digit verification code */}
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          6-digit verification code
        </span>
        <PinInput length={6} aria-label="6-digit verification code">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      {/* 8-digit code */}
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          8-digit code
        </span>
        <PinInput length={8} aria-label="8-digit code">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
            <PinInputField index={6} />
            <PinInputField index={7} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different PIN lengths for various use cases - 4-digit PINs, 6-digit OTP codes, and 8-digit verification codes.',
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
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Numeric only (0-9)
        </span>
        <PinInput length={4} type="numeric" aria-label="Numeric PIN input">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Alphanumeric (A-Z, 0-9)
        </span>
        <PinInput
          length={4}
          type="alphanumeric"
          aria-label="Alphanumeric PIN input"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available input types: numeric (digits only) and alphanumeric (letters and digits). Try typing letters in numeric mode to see validation.',
      },
    },
  },
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Outline variant (default)
        </span>
        <PinInput length={4} variant="outline" aria-label="Outline variant PIN">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Filled variant
        </span>
        <PinInput length={4} variant="filled" aria-label="Filled variant PIN">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available PIN input variants: outline (border style) and filled (background style).',
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
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Small size
        </span>
        <PinInput length={4} size="small" aria-label="Small PIN input">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Medium size (default)
        </span>
        <PinInput length={4} size="medium" aria-label="Medium PIN input">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Large size
        </span>
        <PinInput length={4} size="large" aria-label="Large PIN input">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available PIN input sizes: small, medium (default), and large.',
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
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Normal state
        </span>
        <PinInput length={4} aria-label="Normal state PIN">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Disabled state
        </span>
        <PinInput
          length={4}
          disabled
          defaultValue="1234"
          aria-label="Disabled state PIN"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Error state
        </span>
        <PinInput length={4} hasError aria-label="Error state PIN">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different PIN input states: normal, disabled (with preset value), and error state.',
      },
    },
  },
};

/**
 * Masked PIN Story
 */
export const MaskedPIN: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Hidden values with default mask (•)
        </span>
        <PinInput length={4} masked aria-label="Masked PIN input">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Custom mask character (*)
        </span>
        <PinInput
          length={4}
          masked
          maskChar="*"
          aria-label="Custom masked PIN input"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Custom mask character (■)
        </span>
        <PinInput
          length={4}
          masked
          maskChar="■"
          aria-label="Block masked PIN input"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Masked PIN inputs for security purposes. Values are hidden but still accessible programmatically. Try typing to see the masking in action.',
      },
    },
  },
};

/**
 * With Separators Story
 */
export const WithSeparators: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Grouped with dashes
        </span>
        <PinInput length={6} aria-label="PIN with dashes">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
          </PinInputGroup>
          <PinInputSeparator>-</PinInputSeparator>
          <PinInputGroup>
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Phone number style
        </span>
        <PinInput length={8} type="numeric" aria-label="Phone number style">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
          </PinInputGroup>
          <PinInputSeparator>•</PinInputSeparator>
          <PinInputGroup>
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
          <PinInputSeparator>•</PinInputSeparator>
          <PinInputGroup>
            <PinInputField index={6} />
            <PinInputField index={7} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Credit card style
        </span>
        <PinInput
          length={8}
          type="numeric"
          variant="filled"
          aria-label="Credit card style"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
          <PinInputSeparator> - </PinInputSeparator>
          <PinInputGroup>
            <PinInputField index={4} />
            <PinInputField index={5} />
            <PinInputField index={6} />
            <PinInputField index={7} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'PIN inputs with visual separators for better organization. Useful for phone numbers, credit card codes, and other segmented data.',
      },
    },
  },
};

/**
 * Auto-focus Story
 */
export const AutoFocus: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Auto-focus first field on mount
        </span>
        <PinInput length={4} autoFocus aria-label="Auto-focus PIN input">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'PIN input with auto-focus enabled. The first field will be automatically focused when the component mounts.',
      },
    },
  },
};

/**
 * Controlled PIN Story
 */
export const ControlledPIN: Story = {
  render: function Render() {
    const [pin, setPin] = useState('');

    const handleClear = (): void => setPin('');
    const handleSetDemo = (): void => setPin('1234');

    return (
      <VStack space="4">
        <VStack space="2">
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Controlled PIN input
          </span>
          <PinInput
            length={4}
            value={pin}
            onChange={setPin}
            onComplete={(value) => console.log('PIN completed:', value)}
            aria-label="Controlled PIN input"
          >
            <PinInputGroup>
              <PinInputField index={0} />
              <PinInputField index={1} />
              <PinInputField index={2} />
              <PinInputField index={3} />
            </PinInputGroup>
          </PinInput>
        </VStack>

        <HStack space="2">
          <Button variant="secondary" size="small" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="secondary" size="small" onClick={handleSetDemo}>
            Set "1234"
          </Button>
        </HStack>

        <div
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          Current value: "{pin}"
        </div>
      </VStack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled PIN input with external state management. The value is controlled and can be set/cleared programmatically.',
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
      <FormField
        label="Verification Code"
        hint="Enter the 6-digit code sent to your phone"
      >
        <PinInput length={6} autoFocus aria-label="Verification code">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </FormField>

      <FormField label="Security PIN" hint="PIN must be 4 digits">
        <PinInput length={4} hasError masked aria-label="Security PIN">
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </FormField>

      <FormField
        label="Two-Factor Authentication"
        hint="Enter the code from your authenticator app"
      >
        <PinInput
          length={6}
          type="alphanumeric"
          variant="filled"
          aria-label="Two-factor authentication code"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </FormField>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'PIN input integrated with FormField component for proper labeling, helper text, and error messages.',
      },
    },
  },
};

/**
 * Real-world Examples Story
 */
export const RealWorldExamples: Story = {
  render: () => (
    <VStack space="6">
      {/* Two-factor authentication */}
      <VStack space="2">
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          Two-Factor Authentication
        </span>
        <span
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          Enter the 6-digit code from your authenticator app
        </span>
        <PinInput
          length={6}
          type="numeric"
          autoFocus
          onComplete={(code) => console.log('2FA Code:', code)}
          aria-label="Two-factor authentication code"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      {/* Credit card security code */}
      <VStack space="2">
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          Credit Card Security Code
        </span>
        <span
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          Enter the 3-digit code on the back of your card
        </span>
        <PinInput
          length={3}
          type="numeric"
          masked
          variant="filled"
          aria-label="Credit card security code"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      {/* ATM PIN */}
      <VStack space="2">
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          ATM PIN
        </span>
        <span
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          Enter your 4-digit PIN
        </span>
        <PinInput
          length={4}
          type="numeric"
          masked
          maskChar="*"
          size="large"
          aria-label="ATM PIN"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world use cases: 2FA codes, credit card security codes, and ATM PINs with appropriate configurations for each scenario.',
      },
    },
  },
};

/**
 * Combination Examples Story
 */
export const CombinationExamples: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Large filled alphanumeric with separators
        </span>
        <PinInput
          length={6}
          type="alphanumeric"
          variant="filled"
          size="large"
          aria-label="Large filled alphanumeric PIN"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
          </PinInputGroup>
          <PinInputSeparator>-</PinInputSeparator>
          <PinInputGroup>
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Small outline masked numeric
        </span>
        <PinInput
          length={4}
          type="numeric"
          variant="outline"
          size="small"
          masked
          aria-label="Small masked numeric PIN"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
            <PinInputField index={3} />
          </PinInputGroup>
        </PinInput>
      </VStack>

      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Medium filled with error and auto-focus
        </span>
        <PinInput
          length={6}
          variant="filled"
          hasError
          autoFocus
          aria-label="Error state with auto-focus"
        >
          <PinInputGroup>
            <PinInputField index={0} />
            <PinInputField index={1} />
            <PinInputField index={2} />
          </PinInputGroup>
          <PinInputSeparator>•</PinInputSeparator>
          <PinInputGroup>
            <PinInputField index={3} />
            <PinInputField index={4} />
            <PinInputField index={5} />
          </PinInputGroup>
        </PinInput>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Various combinations of variants, sizes, types, states, and features to demonstrate the flexibility of the PIN input component.',
      },
    },
  },
};

/**
 * Paste Handling Demo Story
 */
export const PasteHandlingDemo: Story = {
  render: function Render() {
    const [pastedValue, setPastedValue] = useState('');

    return (
      <VStack space="4">
        <VStack space="2">
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Try pasting "123456" or any text to see intelligent paste handling
          </span>
          <PinInput
            length={6}
            value={pastedValue}
            onChange={setPastedValue}
            aria-label="Paste handling demo"
          >
            <PinInputGroup>
              <PinInputField index={0} />
              <PinInputField index={1} />
              <PinInputField index={2} />
              <PinInputField index={3} />
              <PinInputField index={4} />
              <PinInputField index={5} />
            </PinInputGroup>
          </PinInput>
        </VStack>

        <div
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          Current value: "{pastedValue}"
        </div>

        <div
          style={{
            fontSize: '12px',
            color: '#888',
            maxWidth: '400px',
          }}
        >
          <strong>Paste behavior:</strong> When you paste text longer than the
          PIN length, it will take the first N valid characters. Invalid
          characters are filtered out based on the input type
          (numeric/alphanumeric).
        </div>
      </VStack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of intelligent paste handling. The component automatically distributes pasted content across fields and filters invalid characters.',
      },
    },
  },
};

/**
 * Interactive Playground Story
 */
export const Playground: Story = {
  decorators: [withCentered],
  render: (args) => (
    <PinInput {...args}>
      <PinInputGroup>
        {Array.from({ length: args.length || 4 }, (_, i) => (
          <PinInputField key={i} index={i} />
        ))}
      </PinInputGroup>
    </PinInput>
  ),
  args: {
    length: 4,
    type: 'numeric',
    variant: 'outline',
    size: 'medium',
    masked: false,
    maskChar: '•',
    disabled: false,
    hasError: false,
    autoFocus: false,
    'aria-label': 'Playground PIN input',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all PIN input props and combinations. Use the controls panel to experiment with different configurations.',
      },
    },
  },
};
