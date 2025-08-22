// /src/storybook/layout/center.stories.tsx
// Center component stories showcasing all centering variations and use cases
// Complete documentation for the Center component
// RELEVANT FILES: ../../ui/layout/center/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Download, Heart, Icon, Settings, Square } from '../../icons';
import { Button } from '../../ui/button';
import { Center } from '../../ui/layout/center';
import { VStack } from '../../ui/layout/vstack';
import { Body2, H3 } from '../../ui/typography';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Center> = {
  title: 'Layout/Center',
  component: Center,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Center is a layout component that centers content both horizontally and vertically using flexbox. It provides a simple and reliable solution for centering elements without complex positioning.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'main', 'header', 'footer'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
    children: {
      control: false,
      description: 'Content to be centered',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
  args: {
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Center>;

/**
 * Default Center Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    children: <Button variant="primary">Centered Button</Button>,
    style: {
      height: '200px',
      backgroundColor: 'rgba(0, 100, 200, 0.1)',
      border: '1px solid rgba(0, 100, 200, 0.3)',
      borderRadius: '8px',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic Center component with a button centered both horizontally and vertically.',
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
    children: <Button>Center Me!</Button>,
    style: {
      height: '180px',
      backgroundColor: 'rgba(0, 100, 200, 0.1)',
      border: '1px solid rgba(0, 100, 200, 0.3)',
      borderRadius: '8px',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test Center component with different content and styling.',
      },
    },
  },
};

/**
 * Different Content Types
 */
export const ContentTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Button Content</h3>
        <Center
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <Button variant="secondary">Click Me</Button>
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Icon Content</h3>
        <Center
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <Icon icon={Square} size="xl" />
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Text Content</h3>
        <Center
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <span
            style={{
              fontWeight: '600',
              fontSize: '1.125rem',
            }}
          >
            Centered Text
          </span>
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Complex Content</h3>
        <Center
          style={{
            height: '160px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <VStack space="3" style={{ textAlign: 'center' }}>
            <Icon icon={Download} size="lg" />
            <span style={{ fontWeight: '600' }}>Download Complete</span>
            <Button size="small">View File</Button>
          </VStack>
        </Center>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different types of content that can be centered: buttons, icons, text, and complex layouts.',
      },
    },
  },
};

/**
 * Different Container Heights
 */
export const ContainerHeights: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Small Container (80px)</h3>
        <Center
          style={{
            height: '80px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <Button size="small">Small</Button>
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Medium Container (150px)</h3>
        <Center
          style={{
            height: '150px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <Button variant="primary">Medium</Button>
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Large Container (250px)</h3>
        <Center
          style={{
            height: '250px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <Button variant="secondary" size="large">
            Large
          </Button>
        </Center>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Center component works consistently across different container heights.',
      },
    },
  },
};

/**
 * Polymorphic Rendering
 */
export const PolymorphicRendering: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>as="div" (default)</h3>
        <Center
          style={{
            height: '100px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <span>Div Element</span>
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>as="section"</h3>
        <Center
          as="section"
          style={{
            height: '100px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <span>Section Element</span>
        </Center>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>as="article"</h3>
        <Center
          as="article"
          style={{
            height: '100px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
            borderRadius: '8px',
          }}
        >
          <span>Article Element</span>
        </Center>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Center component can render as different HTML elements using the "as" prop.',
      },
    },
  },
};

/**
 * Loading State Example
 */
export const LoadingState: Story = {
  render: () => (
    <Center
      style={{
        height: '200px',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        border: '1px solid rgba(0, 100, 200, 0.3)',
        borderRadius: '8px',
      }}
    >
      <VStack space="3" style={{ textAlign: 'center' }}>
        <Icon icon={Square} size="lg" />
        <span>Loading...</span>
      </VStack>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: centering loading states with icon and text.',
      },
    },
  },
};

/**
 * Empty State Example
 */
export const EmptyState: Story = {
  render: () => (
    <Center
      style={{
        height: '280px',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        border: '1px solid rgba(0, 100, 200, 0.3)',
        borderRadius: '8px',
      }}
    >
      <VStack
        space="4"
        style={{
          textAlign: 'center',
          maxWidth: '300px',
        }}
      >
        <Icon icon={Square} size="xl" />
        <VStack space="2">
          <H3 style={{ margin: 0 }}>No Data Found</H3>
          <Body2 style={{ textAlign: 'center' }}>
            Try adjusting your search criteria or create new content.
          </Body2>
        </VStack>
        <Button variant="primary" size="small">
          Create New
        </Button>
      </VStack>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Empty state pattern with centered content, including icon, heading, description, and call-to-action.',
      },
    },
  },
};

/**
 * Modal Overlay Example
 */
export const ModalOverlay: Story = {
  render: () => (
    <Center
      style={{
        height: '300px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        color: 'white',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <VStack space="4">
          <H3 style={{ margin: 0 }}>Confirm Action</H3>
          <Body2>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </Body2>
          <VStack space="2">
            <Button variant="primary" size="small" style={{ width: '100%' }}>
              Delete Item
            </Button>
            <Button variant="ghost" size="small" style={{ width: '100%' }}>
              Cancel
            </Button>
          </VStack>
        </VStack>
      </div>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Modal dialog example showing how Center can be used for overlay positioning.',
      },
    },
  },
};

/**
 * Card Layout Example
 */
export const CardLayout: Story = {
  render: () => (
    <Center
      style={{
        height: '220px',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        border: '1px solid rgba(0, 100, 200, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '280px',
        }}
      >
        <VStack space="4">
          <Icon icon={Heart} size="lg" />
          <VStack space="2">
            <H3 style={{ margin: 0 }}>Feature Card</H3>
            <Body2>This card is perfectly centered within its container.</Body2>
          </VStack>
          <Button variant="primary" size="small">
            Learn More
          </Button>
        </VStack>
      </div>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Card layout centered within a container, perfect for feature highlights or promotional content.',
      },
    },
  },
};

/**
 * Responsive Container
 */
export const ResponsiveContainer: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '0.875rem',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        Resize the container below to see how centering is maintained:
      </p>
      <Center
        style={{
          height: '180px',
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          border: '1px solid rgba(0, 100, 200, 0.3)',
          borderRadius: '8px',
          resize: 'both',
          overflow: 'auto',
          minHeight: '120px',
          minWidth: '200px',
        }}
      >
        <VStack space="2" style={{ textAlign: 'center' }}>
          <Icon icon={Settings} size="md" />
          <span style={{ fontWeight: '600' }}>Resize Me!</span>
          <span style={{ fontSize: '0.875rem' }}>
            Drag the corner to resize
          </span>
        </VStack>
      </Center>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of how Center maintains perfect centering even when container dimensions change.',
      },
    },
  },
};

/**
 * Multiple Centers
 */
export const MultipleCenters: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
      }}
    >
      <Center
        style={{
          height: '150px',
          backgroundColor: 'rgba(255, 0, 100, 0.1)',
          border: '1px solid rgba(255, 0, 100, 0.3)',
          borderRadius: '8px',
        }}
      >
        <Button variant="primary">Left</Button>
      </Center>

      <Center
        style={{
          height: '150px',
          backgroundColor: 'rgba(0, 200, 100, 0.1)',
          border: '1px solid rgba(0, 200, 100, 0.3)',
          borderRadius: '8px',
        }}
      >
        <Button variant="secondary">Right</Button>
      </Center>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple Center components can be used side by side for grid layouts.',
      },
    },
  },
};
