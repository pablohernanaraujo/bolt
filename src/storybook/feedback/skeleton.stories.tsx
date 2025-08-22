// /src/storybook/feedback/skeleton.stories.tsx
// Skeleton component stories showcasing all variants and use cases
// Complete documentation for the Skeleton components in Storybook
// RELEVANT FILES: ../../ui/skeleton/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Image, MessageSquare, Square, User } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { Icon } from '../../icons';
import {
  Avatar,
  Badge,
  Body2,
  Button,
  Divider,
  Grid,
  H3,
  HStack,
  VStack,
} from '../../ui';
import { Skeleton, SkeletonCircle, SkeletonText } from '../../ui/skeleton';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton loading placeholders that show the structure of content while data is loading. Provides a smooth visual experience and reduces perceived loading time through subtle animations. Perfect for maintaining layout stability during async operations.',
      },
    },
  },
  argTypes: {
    height: {
      control: { type: 'text' },
      description: 'Height of the skeleton (CSS value)',
      defaultValue: '20px',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the skeleton (CSS value)',
      defaultValue: '100%',
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'full'],
      description: 'Border radius of the skeleton',
      defaultValue: 'medium',
    },
    speed: {
      control: { type: 'select' },
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
      defaultValue: 'normal',
    },
    isAnimated: {
      control: 'boolean',
      description: 'Whether to show animation',
      defaultValue: true,
    },
    isLoaded: {
      control: 'boolean',
      description: 'Whether content has finished loading',
      defaultValue: false,
    },
  },
  args: {
    height: '20px',
    width: '100%',
    borderRadius: 'medium',
    speed: 'normal',
    isAnimated: true,
    isLoaded: false,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Default Skeleton Story
 */
export const Default: Story = {
  decorators: [withCentered],
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

/**
 * Basic Shapes Story
 */
export const BasicShapes: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Rectangular Skeletons</H3>
        <VStack space="3" style={{ maxWidth: '400px' }}>
          <Skeleton height="20px" />
          <Skeleton height="20px" width="80%" />
          <Skeleton height="20px" width="60%" />
          <Skeleton height="120px" />
        </VStack>
      </div>

      <div>
        <H3>Circular Skeletons</H3>
        <HStack space="4" align="center">
          <VStack space="2" align="center">
            <SkeletonCircle size="xs" />
            <Body2>XS</Body2>
          </VStack>
          <VStack space="2" align="center">
            <SkeletonCircle size="sm" />
            <Body2>SM</Body2>
          </VStack>
          <VStack space="2" align="center">
            <SkeletonCircle size="md" />
            <Body2>MD</Body2>
          </VStack>
          <VStack space="2" align="center">
            <SkeletonCircle size="lg" />
            <Body2>LG</Body2>
          </VStack>
          <VStack space="2" align="center">
            <SkeletonCircle size="xl" />
            <Body2>XL</Body2>
          </VStack>
          <VStack space="2" align="center">
            <SkeletonCircle size="2xl" />
            <Body2>2XL</Body2>
          </VStack>
        </HStack>
      </div>

      <div>
        <H3>Text Skeleton</H3>
        <div style={{ maxWidth: '400px' }}>
          <SkeletonText noOfLines={4} spacing="0.75rem" />
        </div>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic skeleton shapes: rectangular, circular, and text skeletons with different sizes.',
      },
    },
  },
};

/**
 * Animation Speeds Story
 */
export const AnimationSpeeds: Story = {
  render: () => (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      <VStack space="3" align="center">
        <H3>Slow</H3>
        <Skeleton height="60px" speed="slow" />
        <Body2>3s duration</Body2>
        <Body2>For critical content</Body2>
      </VStack>

      <VStack space="3" align="center">
        <H3>Normal</H3>
        <Skeleton height="60px" speed="normal" />
        <Body2>2s duration</Body2>
        <Body2>Standard usage</Body2>
      </VStack>

      <VStack space="3" align="center">
        <H3>Fast</H3>
        <Skeleton height="60px" speed="fast" />
        <Body2>1s duration</Body2>
        <Body2>For quick interactions</Body2>
      </VStack>

      <VStack space="3" align="center">
        <H3>Static</H3>
        <Skeleton height="60px" isAnimated={false} />
        <Body2>No animation</Body2>
        <Body2>For performance</Body2>
      </VStack>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different animation speeds and static option for various use cases.',
      },
    },
  },
};

/**
 * Border Radius Variants Story
 */
export const BorderRadiusVariants: Story = {
  render: () => (
    <HStack space="6" align="center">
      <VStack space="2" align="center">
        <Skeleton height="60px" width="80px" borderRadius="none" />
        <Body2>None</Body2>
      </VStack>
      <VStack space="2" align="center">
        <Skeleton height="60px" width="80px" borderRadius="small" />
        <Body2>Small</Body2>
      </VStack>
      <VStack space="2" align="center">
        <Skeleton height="60px" width="80px" borderRadius="medium" />
        <Body2>Medium</Body2>
      </VStack>
      <VStack space="2" align="center">
        <Skeleton height="60px" width="80px" borderRadius="large" />
        <Body2>Large</Body2>
      </VStack>
      <VStack space="2" align="center">
        <Skeleton height="60px" width="60px" borderRadius="full" />
        <Body2>Full</Body2>
      </VStack>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available border radius options for different content types.',
      },
    },
  },
};

/**
 * Loading States Story
 */
export const LoadingStates: Story = {
  render: () => {
    const LoadingExample = (): ReactElement => {
      const [isLoaded, setIsLoaded] = useState(false);

      return (
        <VStack space="4" style={{ maxWidth: '400px' }}>
          <HStack space="4">
            <Button variant="primary" onClick={() => setIsLoaded(!isLoaded)}>
              {isLoaded ? 'Show Skeleton' : 'Show Content'}
            </Button>
          </HStack>

          <div
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '1rem',
            }}
          >
            <VStack space="3">
              <HStack space="3" align="start">
                <SkeletonCircle size="lg" isLoaded={isLoaded}>
                  <Avatar size="lg" name="John Doe" />
                </SkeletonCircle>

                <VStack space="2" style={{ flex: 1 }}>
                  <Skeleton height="18px" isLoaded={isLoaded}>
                    <H3>John Doe</H3>
                  </Skeleton>
                  <Skeleton height="16px" width="70%" isLoaded={isLoaded}>
                    <Body2>Software Engineer</Body2>
                  </Skeleton>
                  <HStack space="2">
                    <Skeleton
                      height="24px"
                      width="60px"
                      borderRadius="full"
                      isLoaded={isLoaded}
                    >
                      <Badge variant="solid">Pro</Badge>
                    </Skeleton>
                  </HStack>
                </VStack>
              </HStack>

              <SkeletonText noOfLines={3} isLoaded={isLoaded}>
                <Body2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation.
                </Body2>
              </SkeletonText>
            </VStack>
          </div>
        </VStack>
      );
    };

    return <LoadingExample />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing transition from skeleton to loaded content.',
      },
    },
  },
};

/**
 * Common Patterns Story
 */
export const CommonPatterns: Story = {
  render: () => (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="6">
      {/* Product Card */}
      <div
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <VStack space="3">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Icon icon={Image} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>Product Card</Body2>
          </div>

          <Skeleton height="150px" borderRadius="medium" />
          <VStack space="2">
            <Skeleton height="20px" />
            <Skeleton height="16px" width="60%" />
            <SkeletonText noOfLines={2} spacing="0.25rem" />
          </VStack>
          <Skeleton height="36px" borderRadius="medium" />
        </VStack>
      </div>

      {/* User Profile */}
      <div
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <VStack space="3">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Icon icon={User} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>User Profile</Body2>
          </div>

          <HStack space="3" align="start">
            <SkeletonCircle size="2xl" />
            <VStack space="2" style={{ flex: 1 }}>
              <Skeleton height="24px" width="150px" />
              <Skeleton height="18px" width="120px" />
              <HStack space="2">
                <Skeleton height="24px" width="60px" borderRadius="full" />
                <Skeleton height="24px" width="80px" borderRadius="full" />
              </HStack>
            </VStack>
          </HStack>

          <Divider />

          <Grid templateColumns="repeat(3, 1fr)" gap="4">
            {[1, 2, 3].map((i) => (
              <VStack key={i} space="1" align="center">
                <Skeleton height="20px" width="40px" />
                <Skeleton height="16px" width="60px" />
              </VStack>
            ))}
          </Grid>

          <SkeletonText noOfLines={3} />
        </VStack>
      </div>

      {/* Comment Thread */}
      <div
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <VStack space="3">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Icon icon={MessageSquare} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>Comments</Body2>
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: '4px',
                padding: '0.75rem',
              }}
            >
              <HStack space="3" align="start">
                <SkeletonCircle size="md" />
                <VStack space="2" style={{ flex: 1 }}>
                  <HStack space="2" align="center">
                    <Skeleton height="16px" width="100px" />
                    <Skeleton height="14px" width="60px" />
                  </HStack>
                  <SkeletonText
                    noOfLines={item === 1 ? 3 : item === 2 ? 2 : 1}
                    spacing="0.25rem"
                  />
                  <HStack space="4">
                    <Skeleton height="14px" width="40px" />
                    <Skeleton height="14px" width="50px" />
                  </HStack>
                </VStack>
              </HStack>
            </div>
          ))}
        </VStack>
      </div>

      {/* Data Table */}
      <div
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <VStack space="3">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Icon icon={Square} size="sm" />
            <Body2 style={{ fontWeight: 600 }}>Data Table</Body2>
          </div>

          {/* Table Header */}
          <HStack
            space="3"
            style={{
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <Skeleton height="16px" width="80px" />
            <Skeleton height="16px" width="100px" />
            <Skeleton height="16px" width="60px" />
            <Skeleton height="16px" width="80px" />
          </HStack>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <HStack key={row} space="3" align="center">
              <SkeletonCircle size="sm" />
              <Skeleton height="16px" width="100px" />
              <Skeleton height="16px" width="60px" />
              <Skeleton height="24px" width="60px" borderRadius="small" />
            </HStack>
          ))}
        </VStack>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Common skeleton patterns for different types of content and layouts.',
      },
    },
  },
};

/**
 * Custom Sizes Story
 */
export const CustomSizes: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Custom Dimensions</H3>
        <VStack space="3" style={{ maxWidth: '500px' }}>
          <Skeleton height="10px" width="100%" />
          <Skeleton height="20px" width="80%" />
          <Skeleton height="30px" width="60%" />
          <Skeleton height="40px" width="40%" />
          <Skeleton height="60px" width="200px" />
        </VStack>
      </div>

      <div>
        <H3>Custom Circle Sizes</H3>
        <HStack space="4" align="center">
          <SkeletonCircle size="20px" />
          <SkeletonCircle size="40px" />
          <SkeletonCircle size="60px" />
          <SkeletonCircle size="80px" />
          <SkeletonCircle size="100px" />
        </HStack>
      </div>

      <div>
        <H3>Variable Text Lines</H3>
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
          <div>
            <Body2
              style={{
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              1 Line
            </Body2>
            <SkeletonText noOfLines={1} />
          </div>
          <div>
            <Body2
              style={{
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              3 Lines
            </Body2>
            <SkeletonText noOfLines={3} />
          </div>
          <div>
            <Body2
              style={{
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              5 Lines
            </Body2>
            <SkeletonText noOfLines={5} />
          </div>
        </Grid>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of custom sizes and dimensions for skeletons.',
      },
    },
  },
};

/**
 * Accessibility Features Story
 */
export const AccessibilityFeatures: Story = {
  render: () => (
    <VStack space="6" style={{ maxWidth: '600px' }}>
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <VStack space="3">
          <H3>ARIA Attributes</H3>
          <Body2>
            All skeleton components include proper ARIA attributes for screen
            readers:
          </Body2>
          <ul
            style={{
              paddingLeft: '1.5rem',
              margin: 0,
            }}
          >
            <li>
              <code>role="status"</code> - Identifies as status indicator
            </li>
            <li>
              <code>aria-busy="true"</code> - Indicates loading state
            </li>
            <li>
              <code>aria-live="polite"</code> - Announces changes politely
            </li>
            <li>
              <code>aria-label</code> - Provides description for screen readers
            </li>
          </ul>
        </VStack>
      </div>

      <div>
        <H3>Screen Reader Friendly Example</H3>
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <VStack space="3">
            <Skeleton height="20px" aria-label="Loading article title" />
            <SkeletonText
              noOfLines={3}
              aria-label="Loading article content with 3 paragraphs"
            />
            <HStack space="3">
              <SkeletonCircle size="md" aria-label="Loading author avatar" />
              <Skeleton
                height="16px"
                width="120px"
                aria-label="Loading author name"
              />
            </HStack>
          </VStack>
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
        }}
      >
        <VStack space="2">
          <H3>Motion Preferences</H3>
          <Body2>
            Skeletons respect <code>prefers-reduced-motion</code> settings and
            automatically disable animations for users with motion sensitivity.
          </Body2>
        </VStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features and considerations for skeleton components.',
      },
    },
  },
};

/**
 * Performance Considerations Story
 */
export const PerformanceConsiderations: Story = {
  render: () => (
    <VStack space="6" style={{ maxWidth: '600px' }}>
      <div>
        <H3>Large Lists with Skeletons</H3>
        <Body2>Example of many skeleton items (performance test)</Body2>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <VStack space="2">
            {Array.from({ length: 50 }).map((_, index) => (
              <HStack key={index} space="3" align="center">
                <SkeletonCircle size="sm" />
                <VStack space="1" style={{ flex: 1 }}>
                  <Skeleton
                    height="14px"
                    width={`${60 + Math.random() * 40}%`}
                  />
                  <Skeleton
                    height="12px"
                    width={`${40 + Math.random() * 30}%`}
                  />
                </VStack>
                <Skeleton height="24px" width="50px" borderRadius="small" />
              </HStack>
            ))}
          </VStack>
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#e8f5e8',
          border: '1px solid #c3e6c3',
          borderRadius: '8px',
        }}
      >
        <VStack space="2">
          <H3>Performance Tips</H3>
          <ul
            style={{
              paddingLeft: '1.5rem',
              margin: 0,
            }}
          >
            <li>
              Use <code>isAnimated=false</code> for large lists
            </li>
            <li>Consider virtual scrolling for many items</li>
            <li>Batch skeleton updates when possible</li>
            <li>Use CSS transforms for better performance</li>
          </ul>
        </VStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Performance considerations when using many skeleton components.',
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
    height: '40px',
    width: '300px',
    borderRadius: 'medium',
    speed: 'normal',
    isAnimated: true,
    isLoaded: false,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Skeleton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all skeleton props and combinations.',
      },
    },
  },
};
