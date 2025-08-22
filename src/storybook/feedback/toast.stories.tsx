// /src/storybook/feedback/toast.stories.tsx
// Storybook stories for Toast component
// Provides interactive documentation and testing scenarios for feedback
// RELEVANT FILES: /src/ui/toast/toast.tsx, /src/ui/toast/types.ts

import type { Meta, StoryObj } from '@storybook/react';

import { ReactElement } from 'react';
import { Heart } from '../../icons';
import {
  Button,
  HStack,
  Toast,
  ToastProvider,
  useToast,
  VStack,
} from '../../ui';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast notifications provide brief feedback about an operation through a message that appears temporarily.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Visual variant of the toast',
    },
    title: {
      control: 'text',
      description: 'Optional title for the toast',
    },
    description: {
      control: 'text',
      description: 'Main content of the toast',
    },
    duration: {
      control: 'number',
      description:
        'Auto-dismiss duration in milliseconds (null = no auto-dismiss)',
    },
    isClosable: {
      control: 'boolean',
      description: 'Whether the toast can be manually closed',
    },
    status: {
      control: 'select',
      options: ['assertive', 'polite'],
      description: 'ARIA live region status',
    },
  },
  args: {
    id: 'story-toast',
    variant: 'info',
    title: 'Notification',
    description: 'This is a sample toast message for Storybook.',
    duration: 5000,
    isClosable: true,
    status: 'polite',
    onClose: () => console.log('toast-closed'),
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/**
 * Default toast story
 */
export const Default: Story = {};

/**
 * Success variant
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your action was completed successfully.',
  },
};

/**
 * Error variant
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
};

/**
 * Warning variant
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your input before proceeding.',
  },
};

/**
 * Info variant (no title)
 */
export const Info: Story = {
  args: {
    variant: 'info',
    title: undefined,
    description: 'This is an informational message without a title.',
  },
};

/**
 * Custom icon
 */
export const CustomIcon: Story = {
  args: {
    variant: 'success',
    title: 'Favorite Added',
    description: 'Item added to your favorites.',
    icon: <Heart size={20} fill="currentColor" />,
  },
};

/**
 * Non-closable toast
 */
export const NonClosable: Story = {
  args: {
    variant: 'error',
    title: 'Critical Error',
    description: 'This error requires immediate attention.',
    isClosable: false,
    duration: null, // Won't auto-dismiss
  },
};

/**
 * Long content
 */
export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Long Message Example',
    description:
      'This is a longer toast message that demonstrates how the component handles multiple lines of text. The content should wrap properly and maintain good readability even with extensive content.',
    duration: 8000,
  },
};

/**
 * Interactive demo component for provider stories
 */
const ToastDemo = (): ReactElement => {
  const { toast, closeAll } = useToast();

  const showToast = (
    variant: 'success' | 'error' | 'warning' | 'info',
  ): void => {
    toast({
      variant,
      title: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Message`,
      description: `This is a ${variant} toast notification.`,
      duration: 5000,
    });
  };

  return (
    <VStack space="4">
      <HStack space="2" wrap>
        <Button onClick={() => showToast('success')}>Success</Button>
        <Button onClick={() => showToast('error')}>Error</Button>
        <Button onClick={() => showToast('warning')}>Warning</Button>
        <Button onClick={() => showToast('info')}>Info</Button>
      </HStack>
      <HStack space="2">
        <Button
          variant="secondary"
          onClick={() => {
            // Show multiple toasts
            showToast('success');
            setTimeout(() => showToast('info'), 100);
            setTimeout(() => showToast('warning'), 200);
          }}
        >
          Show Multiple
        </Button>
        <Button variant="danger" onClick={closeAll}>
          Close All
        </Button>
      </HStack>
    </VStack>
  );
};

/**
 * Provider with interactive controls
 */
export const InteractiveDemo: StoryObj<typeof ToastProvider> = {
  render: () => (
    <ToastProvider position="bottom-right" max={3}>
      <div style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Toast Interactive Demo</h3>
        <p
          style={{
            marginBottom: '2rem',
            color: '#666',
          }}
        >
          Click the buttons below to trigger toast notifications. Notice how
          they stack, animate, and can be dismissed.
        </p>
        <ToastDemo />
      </div>
    </ToastProvider>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Different positions
 */
export const Positions: StoryObj<typeof ToastProvider> = {
  render: () => {
    const PositionDemo = (): ReactElement => {
      const positions = [
        'top-left',
        'top',
        'top-right',
        'bottom-left',
        'bottom',
        'bottom-right',
      ] as const;

      return (
        <div style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Toast Positioning</h3>
          <p
            style={{
              marginBottom: '2rem',
              color: '#666',
            }}
          >
            Click buttons to see toasts appear in different positions.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              maxWidth: '600px',
            }}
          >
            {positions.map((position) => (
              <ToastProvider key={position} position={position} max={1}>
                <PositionButton position={position} />
              </ToastProvider>
            ))}
          </div>
        </div>
      );
    };

    const PositionButton = ({
      position,
    }: {
      position: string;
    }): ReactElement => {
      const { toast } = useToast();

      return (
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              variant: 'info',
              title: position,
              description: `Toast in ${position} position`,
              duration: 3000,
            })
          }
        >
          {position}
        </Button>
      );
    };

    return <PositionDemo />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Accessibility features
 */
export const Accessibility: Story = {
  args: {
    variant: 'error',
    title: 'Accessibility Features',
    description:
      'This toast demonstrates accessibility features: ARIA live regions, keyboard navigation, and screen reader support.',
    status: 'assertive',
    duration: null, // Won't auto-dismiss for testing
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates accessibility features including ARIA live regions, keyboard support (Escape to close), and proper semantic roles.',
      },
    },
  },
};
