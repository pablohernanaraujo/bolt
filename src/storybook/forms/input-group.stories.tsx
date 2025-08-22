// /src/storybook/forms/input-group.stories.tsx
// Storybook stories for InputGroup components showcasing addons and elements
// Demonstrates various layouts and combinations with inputs
// RELEVANT FILES: ../../ui/input-group/index.tsx, ../../ui/input/index.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  Check,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Phone,
  Search,
  X,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  InputWithClear,
  VStack,
} from '../../ui';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof InputGroup> = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'InputGroup allows you to add addons and elements to inputs for enhanced functionality and visual clarity. Supports static addons and overlay elements.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the input group',
      defaultValue: 'outline',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the input group',
      defaultValue: 'medium',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input group is disabled',
      defaultValue: false,
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the input group has an error state',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

/**
 * Basic InputGroup with left addon
 */
export const WithLeftAddon: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="mywebsite" />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon>$</InputLeftAddon>
        <Input placeholder="0.00" type="number" />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon>+1</InputLeftAddon>
        <Input placeholder="(555) 123-4567" type="tel" />
      </InputGroup>
    </VStack>
  ),
};

/**
 * Basic InputGroup with right addon
 */
export const WithRightAddon: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup>
        <Input placeholder="mywebsite" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup>
        <Input placeholder="100" type="number" />
        <InputRightAddon>USD</InputRightAddon>
      </InputGroup>

      <InputGroup>
        <Input placeholder="john.doe" />
        <InputRightAddon>@example.com</InputRightAddon>
      </InputGroup>
    </VStack>
  ),
};

/**
 * InputGroup with both addons
 */
export const WithBothAddons: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="mywebsite" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup>
        <InputLeftAddon>$</InputLeftAddon>
        <Input placeholder="0.00" type="number" />
        <InputRightAddon>USD</InputRightAddon>
      </InputGroup>
    </VStack>
  ),
};

/**
 * InputGroup with left element (icon)
 */
export const WithLeftElement: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup>
        <InputLeftElement>
          <Search size={16} />
        </InputLeftElement>
        <Input placeholder="Search..." />
      </InputGroup>

      <InputGroup>
        <InputLeftElement>
          <Mail size={16} />
        </InputLeftElement>
        <Input placeholder="Email address" type="email" />
      </InputGroup>

      <InputGroup>
        <InputLeftElement>
          <Phone size={16} />
        </InputLeftElement>
        <Input placeholder="Phone number" type="tel" />
      </InputGroup>
    </VStack>
  ),
};

/**
 * InputGroup with right element
 */
export const WithRightElement: Story = {
  render: () => {
    const WithRightElementComponent = (): ReactNode => {
      const [showPassword, setShowPassword] = useState(false);

      return (
        <VStack space="4">
          <InputGroup>
            <Input placeholder="Enter amount" type="number" />
            <InputRightElement>
              <DollarSign size={16} />
            </InputRightElement>
          </InputGroup>

          <InputGroup>
            <Input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
            />
            <InputRightElement isInteractive>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </InputRightElement>
          </InputGroup>

          <InputGroup>
            <Input placeholder="Verification complete" />
            <InputRightElement>
              <Check size={16} style={{ color: 'green' }} />
            </InputRightElement>
          </InputGroup>
        </VStack>
      );
    };

    return <WithRightElementComponent />;
  },
};

/**
 * InputWithClear component demonstration
 */
export const ClearableInput: Story = {
  render: () => {
    const ClearableInputComponent = (): ReactNode => {
      const [value, setValue] = useState('');

      return (
        <VStack space="4">
          <InputWithClear
            placeholder="Type something to see clear button..."
            onClear={() => console.log('Cleared!')}
          />

          <InputWithClear
            placeholder="Controlled input with clear"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue('')}
          />

          <InputWithClear
            placeholder="Search..."
            defaultValue="Default value"
            clearIcon={<X size={14} />}
          />
        </VStack>
      );
    };

    return <ClearableInputComponent />;
  },
};

/**
 * Complex combinations
 */
export const ComplexCombinations: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup>
        <InputLeftElement>
          <Search size={16} />
        </InputLeftElement>
        <Input placeholder="Search websites..." />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup>
        <InputLeftAddon>
          <Globe size={16} />
        </InputLeftAddon>
        <Input placeholder="example.com" />
        <InputRightElement isInteractive>
          <button type="button" aria-label="Verify domain">
            <Check size={16} />
          </button>
        </InputRightElement>
      </InputGroup>

      <InputGroup>
        <InputLeftAddon>$</InputLeftAddon>
        <InputLeftElement>
          <DollarSign size={16} />
        </InputLeftElement>
        <Input placeholder="0.00" type="number" />
        <InputRightAddon>USD</InputRightAddon>
      </InputGroup>
    </VStack>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup size="small">
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="Small input group" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup size="medium">
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="Medium input group" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup size="large">
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="Large input group" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>
    </VStack>
  ),
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup variant="outline">
        <InputLeftAddon>$</InputLeftAddon>
        <Input placeholder="Outline variant" />
        <InputRightAddon>USD</InputRightAddon>
      </InputGroup>

      <InputGroup variant="filled">
        <InputLeftAddon>$</InputLeftAddon>
        <Input placeholder="Filled variant" />
        <InputRightAddon>USD</InputRightAddon>
      </InputGroup>
    </VStack>
  ),
};

/**
 * States
 */
export const States: Story = {
  render: () => (
    <VStack space="4">
      <InputGroup>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="Normal state" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup isDisabled>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="Disabled state" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>

      <InputGroup hasError>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input placeholder="Error state" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>
    </VStack>
  ),
};

/**
 * Real-world examples
 */
export const RealWorldExamples: Story = {
  render: () => {
    const RealWorldExamplesComponent = (): ReactNode => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [website, setWebsite] = useState('');
      const [amount, setAmount] = useState('');

      return (
        <VStack space="6">
          {/* Email with clear */}
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Email Address
            </label>
            <InputWithClear
              placeholder="john.doe@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClear={() => setEmail('')}
            />
          </div>

          {/* Password with visibility toggle */}
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <InputGroup>
              <InputLeftElement>
                <Lock size={16} />
              </InputLeftElement>
              <Input
                placeholder="Enter password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement isInteractive>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </InputRightElement>
            </InputGroup>
          </div>

          {/* Website URL */}
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Website URL
            </label>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                placeholder="example"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>
          </div>

          {/* Currency input */}
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Amount
            </label>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                placeholder="0.00"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <InputRightAddon>USD</InputRightAddon>
            </InputGroup>
          </div>
        </VStack>
      );
    };

    return <RealWorldExamplesComponent />;
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    variant: 'outline',
    size: 'medium',
    isDisabled: false,
    hasError: false,
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputLeftAddon>https://</InputLeftAddon>
      <Input placeholder="Playground input" />
      <InputRightAddon>.com</InputRightAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test InputGroup with different props and combinations.',
      },
    },
  },
};
