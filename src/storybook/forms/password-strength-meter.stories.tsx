// /src/storybook/forms/password-strength-meter.stories.tsx
// PasswordStrengthMeter component stories showcasing strength analysis and feedback
// Complete documentation for the PasswordStrengthMeter component
// RELEVANT FILES: ../../ui/password-strength-meter/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import { PasswordInput, PasswordStrengthMeter, VStack } from '../../ui';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: 'Forms/PasswordStrengthMeter',
  component: PasswordStrengthMeter,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Password strength meter component that analyzes password security and provides visual feedback with color-coded progress bar and improvement suggestions. Works standalone or paired with PasswordInput.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The password value to analyze',
      defaultValue: '',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the strength label text',
      defaultValue: true,
    },
    showFeedback: {
      control: 'boolean',
      description: 'Whether to show feedback messages for improvement',
      defaultValue: false,
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the strength meter progress bar',
      defaultValue: 'medium',
    },
    labels: {
      control: 'object',
      description: 'Custom labels for strength levels',
    },
  },
  args: {
    value: 'ExamplePassword123!',
    showLabel: true,
    showFeedback: false,
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordStrengthMeter>;

/**
 * Default PasswordStrengthMeter Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    value: 'MyPassword123!',
    showLabel: true,
  },
};

/**
 * Strength Levels Demo
 */
export const StrengthLevels: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Weak Password
        </span>
        <PasswordStrengthMeter
          value="123"
          showLabel={true}
          showFeedback={true}
        />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Fair Password
        </span>
        <PasswordStrengthMeter
          value="password123"
          showLabel={true}
          showFeedback={true}
        />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Good Password
        </span>
        <PasswordStrengthMeter
          value="MyPassword123"
          showLabel={true}
          showFeedback={true}
        />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Strong Password
        </span>
        <PasswordStrengthMeter
          value="MyStr0ng!P@ssw0rd2024"
          showLabel={true}
          showFeedback={true}
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different password strength levels with color-coded progress bars and feedback messages.',
      },
    },
  },
};

/**
 * Interactive Demo
 */
export const InteractiveDemo: Story = {
  render: () => {
    const InteractiveDemoComponent = (): ReactElement => {
      const [password, setPassword] = useState<string>('');

      return (
        <VStack space="4">
          <PasswordInput
            placeholder="Type a password to see strength analysis"
            aria-label="Password for strength testing"
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

    return <InteractiveDemoComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing real-time password strength analysis. Try different password patterns to see how the strength meter responds.',
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
          Small
        </span>
        <PasswordStrengthMeter
          value="MyPassword123!"
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
          value="MyPassword123!"
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
          value="MyPassword123!"
          showLabel={true}
          size="large"
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available sizes for the password strength meter: small, medium, and large.',
      },
    },
  },
};

/**
 * With and Without Feedback
 */
export const FeedbackOptions: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Without Feedback
        </span>
        <PasswordStrengthMeter
          value="weakpass"
          showLabel={true}
          showFeedback={false}
        />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          With Feedback
        </span>
        <PasswordStrengthMeter
          value="weakpass"
          showLabel={true}
          showFeedback={true}
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison showing the strength meter with and without feedback messages for password improvement.',
      },
    },
  },
};

/**
 * Custom Labels
 */
export const CustomLabels: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Default Labels
        </span>
        <PasswordStrengthMeter value="MyPassword123!" showLabel={true} />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Custom Labels
        </span>
        <PasswordStrengthMeter
          value="MyPassword123!"
          showLabel={true}
          labels={{
            weak: 'Muy Débil',
            fair: 'Débil',
            good: 'Buena',
            strong: 'Muy Fuerte',
          }}
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of using custom labels for strength levels, useful for internationalization.',
      },
    },
  },
};

/**
 * Label Only (No Score)
 */
export const LabelOnly: Story = {
  render: () => (
    <VStack space="4">
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Weak
        </span>
        <PasswordStrengthMeter value="123" showLabel={true} size="large" />
      </VStack>
      <VStack space="2">
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Good
        </span>
        <PasswordStrengthMeter
          value="MyPassword123"
          showLabel={true}
          size="large"
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Clean version showing just the progress bar and strength label.',
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
    value: 'Type your password here',
    showLabel: true,
    showFeedback: true,
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all password strength meter props and combinations.',
      },
    },
  },
};
