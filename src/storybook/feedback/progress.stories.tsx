// /src/storybook/feedback/progress.stories.tsx
// Progress component stories showcasing all variants and use cases
// Complete documentation for the Progress component in Storybook
// RELEVANT FILES: ../../ui/progress/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, CheckCircle, Download, Upload } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { Icon } from '../../icons';
import { Body2, Button, H3, HStack, VStack } from '../../ui';
import {
  formatDataProgressValue,
  formatFileProgressValue,
  formatTimeProgressValue,
  Progress,
} from '../../ui/progress';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Progress component for displaying the completion status of tasks or processes. Supports determinate and indeterminate states, multiple variants, sizes, and customizable formatting. Built with full accessibility support using React Aria Components.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Color variant that determines semantic meaning',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the progress bar',
      defaultValue: 'medium',
    },
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
      },
      description: 'Current progress value (undefined for indeterminate)',
    },
    maxValue: {
      control: {
        type: 'number',
        min: 1,
        max: 1000,
        step: 1,
      },
      description: 'Maximum progress value',
      defaultValue: 100,
    },
    label: {
      control: 'text',
      description: 'Descriptive label for the progress',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to display the progress value',
      defaultValue: false,
    },
    isStriped: {
      control: 'boolean',
      description: 'Whether to show striped pattern',
      defaultValue: false,
    },
    isAnimated: {
      control: 'boolean',
      description: 'Whether stripes should be animated',
      defaultValue: false,
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    value: 65,
    maxValue: 100,
    showValue: false,
    isStriped: false,
    isAnimated: false,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Default Progress Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <Body2>
          <strong>Primary</strong> - General progress indication
        </Body2>
        <Progress value={65} maxValue={100} variant="primary" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Success</strong> - Successful operations
        </Body2>
        <Progress value={85} maxValue={100} variant="success" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Warning</strong> - Operations requiring attention
        </Body2>
        <Progress value={45} maxValue={100} variant="warning" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Error</strong> - Failed or problematic operations
        </Body2>
        <Progress value={25} maxValue={100} variant="error" />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different color variants for various semantic meanings and contexts.',
      },
    },
  },
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <Body2>
          <strong>Small</strong> - Compact spaces and subtle indicators
        </Body2>
        <Progress value={50} maxValue={100} size="small" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Medium</strong> - Standard size for most use cases
        </Body2>
        <Progress value={50} maxValue={100} size="medium" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Large</strong> - Prominent display and accessibility
        </Body2>
        <Progress value={50} maxValue={100} size="large" />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available sizes: small (4px), medium (8px), and large (12px) height.',
      },
    },
  },
};

/**
 * With Labels Story
 */
export const WithLabels: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <Progress
          value={35}
          maxValue={100}
          label="Basic progress with label"
          variant="primary"
        />
      </VStack>

      <VStack space="2">
        <Progress
          value={70}
          maxValue={100}
          label="Progress with percentage"
          showValue
          variant="success"
        />
      </VStack>

      <VStack space="2">
        <Progress
          value={45}
          maxValue={100}
          label="Long descriptive label for complex operation"
          showValue
          variant="warning"
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Progress bars with descriptive labels and optional value display.',
      },
    },
  },
};

/**
 * Custom Formatting Story
 */
export const CustomFormatting: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <Progress
          value={512}
          maxValue={1024}
          label="File download progress"
          showValue
          formatValue={formatDataProgressValue}
          variant="primary"
        />
      </VStack>

      <VStack space="2">
        <Progress
          value={3}
          maxValue={10}
          label="Files processed"
          showValue
          formatValue={formatFileProgressValue}
          variant="success"
        />
      </VStack>

      <VStack space="2">
        <Progress
          value={45}
          maxValue={120}
          label="Session time remaining"
          showValue
          formatValue={formatTimeProgressValue}
          variant="warning"
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom value formatting for different data types and contexts.',
      },
    },
  },
};

/**
 * Striped and Animated Story
 */
export const StripedAndAnimated: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <Body2>
          <strong>Normal</strong> - Standard solid progress bar
        </Body2>
        <Progress value={60} maxValue={100} variant="primary" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Striped</strong> - Adds visual texture
        </Body2>
        <Progress value={60} maxValue={100} variant="primary" isStriped />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Striped + Animated</strong> - Moving stripes for active
          operations
        </Body2>
        <Progress
          value={60}
          maxValue={100}
          variant="success"
          isStriped
          isAnimated
        />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual enhancements with striped patterns and animations.',
      },
    },
  },
};

/**
 * Indeterminate State Story
 */
export const IndeterminateState: Story = {
  render: () => (
    <VStack space="6">
      <VStack space="2">
        <Body2>
          <strong>Loading</strong> - When progress is unknown
        </Body2>
        <Progress label="Connecting to server..." variant="primary" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Processing</strong> - During data processing
        </Body2>
        <Progress label="Processing request..." variant="primary" />
      </VStack>

      <VStack space="2">
        <Body2>
          <strong>Syncing</strong> - During synchronization
        </Body2>
        <Progress label="Syncing data..." variant="success" />
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate progress for operations with unknown duration.',
      },
    },
  },
};

/**
 * Real-world Examples Story
 */
export const RealWorldExamples: Story = {
  render: () => {
    const RealWorldExamplesComponent = (): ReactElement => {
      const [downloadProgress, setDownloadProgress] = useState(0);
      const [uploadProgress, setUploadProgress] = useState(0);
      const [isDownloading, setIsDownloading] = useState(false);
      const [isUploading, setIsUploading] = useState(false);

      const startDownload = (): void => {
        setIsDownloading(true);
        setDownloadProgress(0);
        const interval = setInterval(() => {
          setDownloadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsDownloading(false);
              return 100;
            }
            return prev + 2;
          });
        }, 50);
      };

      const startUpload = (): void => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsUploading(false);
              return 100;
            }
            return prev + 1.5;
          });
        }, 80);
      };

      return (
        <VStack space="8">
          {/* File Download */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              width: '100%',
            }}
          >
            <VStack space="4">
              <HStack
                space="3"
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <HStack space="2">
                  <Icon icon={Download} size="sm" />
                  <H3>File Download</H3>
                </HStack>
                <Button
                  size="small"
                  onClick={startDownload}
                  disabled={isDownloading}
                  variant="primary"
                >
                  {isDownloading ? 'Downloading...' : 'Start Download'}
                </Button>
              </HStack>

              <Progress
                value={downloadProgress}
                maxValue={100}
                label={`document.pdf (${(downloadProgress * 2.5).toFixed(1)} MB / 250.0 MB)`}
                showValue
                variant={downloadProgress === 100 ? 'success' : 'primary'}
                isStriped={isDownloading}
                isAnimated={isDownloading}
              />

              {downloadProgress === 100 && (
                <HStack space="2" style={{ color: '#28a745' }}>
                  <Icon icon={CheckCircle} size="sm" />
                  <Body2>Download completed successfully!</Body2>
                </HStack>
              )}
            </VStack>
          </div>

          {/* File Upload */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              width: '100%',
            }}
          >
            <VStack space="4">
              <HStack
                space="3"
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <HStack space="2">
                  <Icon icon={Upload} size="sm" />
                  <H3>File Upload</H3>
                </HStack>
                <Button
                  size="small"
                  onClick={startUpload}
                  disabled={isUploading}
                  variant="secondary"
                >
                  {isUploading ? 'Uploading...' : 'Start Upload'}
                </Button>
              </HStack>

              <Progress
                value={uploadProgress}
                maxValue={100}
                label="Uploading images (3 files)"
                showValue
                variant={uploadProgress === 100 ? 'success' : 'primary'}
                isStriped={isUploading}
                isAnimated={isUploading}
                size="large"
              />

              {isUploading && (
                <Body2>
                  Estimated time remaining:{' '}
                  {Math.ceil((100 - uploadProgress) / 10)} seconds
                </Body2>
              )}
            </VStack>
          </div>

          {/* Multi-step Form */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              width: '100%',
            }}
          >
            <VStack space="4">
              <HStack space="2">
                <Icon icon={AlertTriangle} size="sm" />
                <H3>Multi-step Form</H3>
              </HStack>

              <Progress
                value={2}
                maxValue={4}
                label="Account Setup Progress"
                showValue
                formatValue={(value, max) => `Step ${value} of ${max}`}
                variant="warning"
                size="medium"
              />

              <Body2>Complete all steps to finish your account setup.</Body2>
            </VStack>
          </div>
        </VStack>
      );
    };

    return <RealWorldExamplesComponent />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive examples showing common real-world usage patterns.',
      },
    },
  },
};

/**
 * Loading States Story
 */
export const LoadingStates: Story = {
  render: () => (
    <VStack space="6">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Initial Loading */}
        <div
          style={{
            padding: '1.5rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
          }}
        >
          <VStack space="3">
            <Body2 style={{ fontWeight: 600 }}>Initial Load</Body2>
            <Progress label="Loading application..." variant="primary" />
          </VStack>
        </div>

        {/* Data Fetching */}
        <div
          style={{
            padding: '1.5rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
          }}
        >
          <VStack space="3">
            <Body2 style={{ fontWeight: 600 }}>Fetching Data</Body2>
            <Progress
              value={75}
              maxValue={100}
              label="Loading user data..."
              showValue
              variant="primary"
            />
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
            <Body2 style={{ fontWeight: 600 }}>Processing</Body2>
            <Progress
              value={40}
              maxValue={100}
              label="Analyzing image..."
              showValue
              variant="warning"
              isStriped
              isAnimated
            />
          </VStack>
        </div>

        {/* Completed */}
        <div
          style={{
            padding: '1.5rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
          }}
        >
          <VStack space="3">
            <Body2 style={{ fontWeight: 600 }}>Completed</Body2>
            <Progress
              value={100}
              maxValue={100}
              label="Task completed!"
              showValue
              variant="success"
            />
          </VStack>
        </div>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different loading states and completion scenarios.',
      },
    },
  },
};

/**
 * Accessibility Demo Story
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <VStack space="6">
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <VStack space="4">
          <Body2 style={{ fontWeight: 600 }}>
            Screen Reader Friendly Progress
          </Body2>

          <Progress
            value={60}
            maxValue={100}
            label="Processing important document"
            showValue
            variant="primary"
            size="large"
          />

          <VStack space="2" style={{ alignItems: 'flex-start' }}>
            <Body2>This progress bar includes proper ARIA attributes:</Body2>
            <ul
              style={{
                paddingLeft: '1.5rem',
                margin: 0,
              }}
            >
              <li>
                <code>role="progressbar"</code>
              </li>
              <li>
                <code>aria-valuenow="{`{current value}`}"</code>
              </li>
              <li>
                <code>aria-valuemin="0"</code>
              </li>
              <li>
                <code>aria-valuemax="{`{max value}`}"</code>
              </li>
              <li>
                <code>aria-valuetext="{`{formatted value}`}"</code>
              </li>
              <li>
                <code>aria-label="{`{descriptive label}`}"</code>
              </li>
            </ul>
          </VStack>
        </VStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of built-in accessibility features and ARIA support.',
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
    variant: 'primary',
    size: 'medium',
    value: 65,
    maxValue: 100,
    label: 'Loading progress...',
    showValue: true,
    isStriped: false,
    isAnimated: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all progress props and combinations.',
      },
    },
  },
};
