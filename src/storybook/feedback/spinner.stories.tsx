// /src/storybook/feedback/spinner.stories.tsx
// Spinner component stories showcasing all variants and use cases
// Complete documentation for the Spinner component in Storybook
// RELEVANT FILES: ../../ui/spinner/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Download, RefreshCw, Save, Upload } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { Icon } from '../../icons';
import { Body2, Button, Center, HStack, VStack } from '../../ui';
import { Spinner } from '../../ui/spinner';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Spinner component for indicating loading states. Used to provide visual feedback during data fetching, processing, or any asynchronous operations. Supports multiple sizes, color schemes, and accessibility features.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the spinner',
      defaultValue: 'medium',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['default', 'brand', 'success', 'warning', 'error', 'info'],
      description: 'Color scheme of the spinner',
      defaultValue: 'brand',
    },
    showTrack: {
      control: 'boolean',
      description: 'Whether to show the background track',
      defaultValue: true,
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
      defaultValue: 'Loading',
    },
  },
  args: {
    size: 'medium',
    colorScheme: 'brand',
    showTrack: true,
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/**
 * Default Spinner Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
    <HStack space="8" align="center">
      <VStack align="center" space="2">
        <Spinner size="small" />
        <Body2>Small</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner size="medium" />
        <Body2>Medium</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner size="large" />
        <Body2>Large</Body2>
      </VStack>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available spinner sizes: small (16px), medium (24px), and large (32px).',
      },
    },
  },
};

/**
 * Color Schemes Story
 */
export const ColorSchemes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
      }}
    >
      <VStack align="center" space="2">
        <Spinner colorScheme="default" />
        <Body2>Default</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner colorScheme="brand" />
        <Body2>Brand</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner colorScheme="success" />
        <Body2>Success</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner colorScheme="warning" />
        <Body2>Warning</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner colorScheme="error" />
        <Body2>Error</Body2>
      </VStack>
      <VStack align="center" space="2">
        <Spinner colorScheme="info" />
        <Body2>Info</Body2>
      </VStack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color schemes for different contexts and states.',
      },
    },
  },
};

/**
 * Track Visibility Story
 */
export const TrackVisibility: Story = {
  render: () => (
    <HStack space="8" align="center">
      <VStack align="center" space="2">
        <div
          style={{
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <Spinner showTrack={true} size="large" />
        </div>
        <Body2>With Track</Body2>
      </VStack>
      <VStack align="center" space="2">
        <div
          style={{
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <Spinner showTrack={false} size="large" />
        </div>
        <Body2>Without Track</Body2>
      </VStack>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Spinner with and without background track for better visibility.',
      },
    },
  },
};

/**
 * Button Loading State Story
 */
export const ButtonLoadingState: Story = {
  render: () => {
    const ButtonWithLoading = (): ReactElement => {
      const [isLoading, setIsLoading] = useState(false);

      const handleClick = (): void => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
      };

      return (
        <VStack space="4">
          <HStack space="4">
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={handleClick}
            >
              <HStack space="2" align="center">
                {isLoading ? (
                  <Spinner size="small" colorScheme="default" />
                ) : (
                  <Icon icon={Save} size="sm" />
                )}
                <span>{isLoading ? 'Saving...' : 'Save'}</span>
              </HStack>
            </Button>

            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={handleClick}
            >
              <HStack space="2" align="center">
                {isLoading && <Spinner size="small" />}
                <span>{isLoading ? 'Processing...' : 'Process'}</span>
              </HStack>
            </Button>
          </HStack>
          <Body2>Click the buttons to see loading state</Body2>
        </VStack>
      );
    };

    return <ButtonWithLoading />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner integrated within buttons during asynchronous actions.',
      },
    },
  },
};

/**
 * Inline Loading Story
 */
export const InlineLoading: Story = {
  render: () => (
    <VStack space="4">
      <HStack space="2" align="center">
        <Spinner size="small" />
        <Body2>Loading user data...</Body2>
      </HStack>

      <HStack space="2" align="center">
        <Icon icon={Download} size="sm" />
        <Body2>Downloading file...</Body2>
        <Spinner size="small" colorScheme="info" />
      </HStack>

      <HStack space="2" align="center">
        <Spinner size="small" colorScheme="success" />
        <Body2>Syncing changes</Body2>
        <Icon icon={RefreshCw} size="sm" />
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner used inline with text for contextual loading feedback.',
      },
    },
  },
};

/**
 * Full Page Loading Story
 */
export const FullPageLoading: Story = {
  render: () => (
    <div
      style={{
        height: '300px',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <Center style={{ height: '100%' }}>
        <VStack align="center" space="3">
          <Spinner size="large" colorScheme="brand" />
          <Body2>Loading content...</Body2>
        </VStack>
      </Center>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Centered spinner for full page or section loading states.',
      },
    },
  },
};

/**
 * Custom Styling Story
 */
export const CustomStyling: Story = {
  render: () => (
    <HStack space="6" align="center">
      <VStack align="center" space="2">
        <Spinner
          size="large"
          colorScheme="brand"
          style={{ transform: 'scale(1.5)' }}
        />
        <Body2>Scaled</Body2>
      </VStack>

      <VStack align="center" space="2">
        <div style={{ opacity: 0.5 }}>
          <Spinner size="large" colorScheme="error" />
        </div>
        <Body2>Semi-transparent</Body2>
      </VStack>

      <VStack align="center" space="2">
        <div
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
          }}
        >
          <Spinner
            size="medium"
            showTrack={false}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <Body2>Custom Background</Body2>
      </VStack>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of custom styling applied to the spinner component.',
      },
    },
  },
};

/**
 * Loading States Story
 */
export const LoadingStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
      }}
    >
      {/* Data Fetching */}
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
        }}
      >
        <VStack space="3">
          <HStack space="2" align="center">
            <Icon icon={Download} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>Fetching Data</Body2>
          </HStack>
          <Center style={{ height: '80px' }}>
            <Spinner colorScheme="info" />
          </Center>
        </VStack>
      </div>

      {/* Processing */}
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
        }}
      >
        <VStack space="3">
          <HStack space="2" align="center">
            <Body2 style={{ fontWeight: 600 }}>Processing Image</Body2>
            <Spinner size="small" colorScheme="warning" />
          </HStack>
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '100%',
                backgroundColor: '#ffc107',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <Body2>60% complete</Body2>
        </VStack>
      </div>

      {/* Uploading */}
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
        }}
      >
        <VStack space="3">
          <HStack space="2" align="center">
            <Icon icon={Upload} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>Uploading Files</Body2>
          </HStack>
          <HStack space="2" align="center">
            <Spinner size="small" colorScheme="success" />
            <Body2>3 of 5 files uploaded</Body2>
          </HStack>
        </VStack>
      </div>

      {/* Auto-refresh */}
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
        }}
      >
        <VStack space="3">
          <HStack space="2" align="center">
            <Icon icon={RefreshCw} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>Auto-refresh</Body2>
          </HStack>
          <HStack space="2" align="center">
            <Body2>Updating in 5s</Body2>
            <Spinner size="small" colorScheme="default" />
          </HStack>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Various loading states and contexts where spinners are commonly used.',
      },
    },
  },
};

/**
 * Accessibility Example
 */
export const AccessibilityExample: Story = {
  render: () => (
    <VStack space="4">
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <VStack space="3">
          <Body2 style={{ fontWeight: 600 }}>Screen Reader Friendly</Body2>
          <Spinner
            label="Loading search results"
            colorScheme="brand"
            size="large"
          />
          <Body2>This spinner includes proper ARIA attributes:</Body2>
          <ul
            style={{
              paddingLeft: '1.5rem',
              margin: 0,
            }}
          >
            <li>
              <code>role="status"</code>
            </li>
            <li>
              <code>aria-label="Loading search results"</code>
            </li>
            <li>
              <code>aria-busy="true"</code>
            </li>
            <li>
              <code>aria-live="polite"</code>
            </li>
          </ul>
        </VStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of accessibility features with proper ARIA attributes.',
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
    size: 'medium',
    colorScheme: 'brand',
    showTrack: true,
    label: 'Loading',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all spinner props and combinations.',
      },
    },
  },
};
