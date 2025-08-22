// /src/storybook/layout/flex.stories.tsx
// Flex component stories showcasing all layout variations and use cases
// Complete documentation for the flexible layout component
// RELEVANT FILES: ../../ui/layout/flex/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Download, Heart, Icon, Package, Settings } from '../../icons';
import { Button } from '../../ui/button';
import { Flex } from '../../ui/layout/flex';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Flex is a flexible layout component that provides complete flexbox control for arranging children. Combines capabilities of HStack and VStack with full control over direction, wrapping, alignment, and spacing. Built with zero-runtime CSS using vanilla-extract.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Primary axis direction and item order (flex-direction)',
      defaultValue: 'row',
    },
    wrap: {
      control: { type: 'select' },
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Whether flex items should wrap to new lines (flex-wrap)',
      defaultValue: 'nowrap',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment of children (align-items)',
      defaultValue: 'stretch',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis distribution of children (justify-content)',
      defaultValue: 'start',
    },
    gap: {
      control: { type: 'select' },
      options: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
      ],
      description: 'Gap between child elements using design system tokens',
      defaultValue: '0',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'nav', 'header', 'footer'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
  },
  args: {
    direction: 'row',
    wrap: 'nowrap',
    align: 'stretch',
    justify: 'start',
    gap: '4',
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

/**
 * Default Flex Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    children: (
      <>
        <Button variant="primary">First</Button>
        <Button variant="secondary">Second</Button>
        <Button variant="ghost">Third</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Flex with three buttons and default spacing.',
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
    children: (
      <>
        <Button size="small">Button 1</Button>
        <Button size="small">Button 2</Button>
        <Button size="small">Button 3</Button>
        <Button size="small">Button 4</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all Flex props and see how they affect layout.',
      },
    },
  },
};

/**
 * Direction Variations
 */
export const DirectionVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>direction="row" (default)</h3>
        <Flex direction="row" gap="4">
          <Button size="small">Item 1</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>direction="column"</h3>
        <Flex direction="column" gap="4" align="start">
          <Button size="small">Item 1</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>direction="row-reverse"</h3>
        <Flex direction="row-reverse" gap="4">
          <Button size="small">Item 1 (appears last)</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3 (appears first)</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>direction="column-reverse"</h3>
        <Flex direction="column-reverse" gap="4" align="start">
          <Button size="small">Item 1 (appears bottom)</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3 (appears top)</Button>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different flex direction options for main axis control.',
      },
    },
  },
};

/**
 * Gap Variations
 */
export const GapVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>gap="0" (No spacing)</h3>
        <Flex gap="0">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>gap="2" (Small spacing)</h3>
        <Flex gap="2">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>gap="4" (Medium spacing)</h3>
        <Flex gap="4">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>gap="8" (Large spacing)</h3>
        <Flex gap="8">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different gap options using design system space tokens.',
      },
    },
  },
};

/**
 * Alignment Options
 */
export const AlignmentOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="start"</h3>
        <Flex
          gap="4"
          align="start"
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button>Normal</Button>
          <Button size="large">Large Button</Button>
          <Button size="small">Small</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="center"</h3>
        <Flex
          gap="4"
          align="center"
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button>Normal</Button>
          <Button size="large">Large Button</Button>
          <Button size="small">Small</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="end"</h3>
        <Flex
          gap="4"
          align="end"
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button>Normal</Button>
          <Button size="large">Large Button</Button>
          <Button size="small">Small</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="stretch"</h3>
        <Flex
          gap="4"
          align="stretch"
          style={{
            height: '120px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button>Normal</Button>
          <Button>Another</Button>
          <Button>Third</Button>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different cross-axis alignment options for children with varying heights.',
      },
    },
  },
};

/**
 * Justification Options
 */
export const JustificationOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="start"</h3>
        <Flex
          gap="4"
          justify="start"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="center"</h3>
        <Flex
          gap="4"
          justify="center"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="end"</h3>
        <Flex
          gap="4"
          justify="end"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="between"</h3>
        <Flex
          justify="between"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="around"</h3>
        <Flex
          justify="around"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="evenly"</h3>
        <Flex
          justify="evenly"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different main-axis distribution options for space management.',
      },
    },
  },
};

/**
 * Wrap Functionality
 */
export const WrapFunctionality: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>wrap="nowrap" (default)</h3>
        <Flex
          gap="3"
          wrap="nowrap"
          style={{
            maxWidth: '400px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Item 1</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3</Button>
          <Button size="small">Item 4</Button>
          <Button size="small">Item 5</Button>
          <Button size="small">Item 6</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>wrap="wrap"</h3>
        <Flex
          gap="3"
          wrap="wrap"
          style={{
            maxWidth: '400px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Item 1</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3</Button>
          <Button size="small">Item 4</Button>
          <Button size="small">Item 5</Button>
          <Button size="small">Item 6</Button>
          <Button size="small">Item 7</Button>
          <Button size="small">Item 8</Button>
        </Flex>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>wrap="wrap-reverse"</h3>
        <Flex
          gap="3"
          wrap="wrap-reverse"
          style={{
            maxWidth: '400px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Item 1</Button>
          <Button size="small">Item 2</Button>
          <Button size="small">Item 3</Button>
          <Button size="small">Item 4</Button>
          <Button size="small">Item 5</Button>
          <Button size="small">Item 6</Button>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of wrap behavior when content exceeds container width.',
      },
    },
  },
};

/**
 * Card Layout Example
 */
export const CardLayout: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="4"
      style={{
        maxWidth: '400px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}
    >
      <h3 style={{ margin: '0' }}>User Profile</h3>
      <p
        style={{
          margin: '0',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        This card demonstrates how Flex can create vertical layouts with
        consistent spacing and proper content alignment.
      </p>

      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <span style={{ fontWeight: '600' }}>Email:</span>
          <span>user@example.com</span>
        </Flex>
        <Flex justify="between" align="center">
          <span style={{ fontWeight: '600' }}>Role:</span>
          <span>Administrator</span>
        </Flex>
        <Flex justify="between" align="center">
          <span style={{ fontWeight: '600' }}>Status:</span>
          <span style={{ color: 'green' }}>Active</span>
        </Flex>
      </Flex>

      <Flex justify="end" gap="3">
        <Button variant="ghost" size="small">
          Cancel
        </Button>
        <Button variant="primary" size="small">
          Save Changes
        </Button>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Card layout example showing vertical content structure with action buttons.',
      },
    },
  },
};

/**
 * Navigation Bar Example
 */
export const NavigationBar: Story = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      gap="6"
      as="nav"
      style={{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Flex align="center" gap="4">
        <Icon icon={Package} size="lg" />
        <span
          style={{
            fontWeight: '600',
            fontSize: '1.125rem',
          }}
        >
          Brand
        </span>
      </Flex>

      <Flex gap="3">
        <Button variant="ghost" size="small">
          Home
        </Button>
        <Button variant="ghost" size="small">
          Products
        </Button>
        <Button variant="ghost" size="small">
          About
        </Button>
        <Button variant="ghost" size="small">
          Contact
        </Button>
      </Flex>

      <Flex gap="2">
        <Button variant="secondary" size="small">
          Sign In
        </Button>
        <Button variant="primary" size="small">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Navigation bar example with logo, menu items, and action buttons using justify="between".',
      },
    },
  },
};

/**
 * Dashboard Layout Example
 */
export const DashboardLayout: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Dashboard with Nested Flex</h3>

      {/* Header */}
      <Flex
        justify="between"
        align="center"
        gap="6"
        style={{
          padding: '1rem',
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          borderRadius: '8px 8px 0 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Flex align="center" gap="3">
          <Icon icon={Package} size="md" />
          <span style={{ fontWeight: '600' }}>Dashboard</span>
        </Flex>

        <Flex gap="2">
          <Button variant="ghost" size="small">
            <Icon icon={Settings} size="sm" />
          </Button>
          <Button variant="primary" size="small">
            New Item
          </Button>
        </Flex>
      </Flex>

      {/* Content */}
      <div
        style={{
          padding: '2rem 1rem',
          backgroundColor: 'rgba(0, 100, 200, 0.05)',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <Flex gap="8" align="start">
          {/* Left Column */}
          <Flex direction="column" gap="4" style={{ flex: '1' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Main Content</h4>
            <p
              style={{
                margin: '0',
                marginBottom: '1.5rem',
              }}
            >
              This demonstrates how Flex can create complex layouts with
              multiple nested levels and different directions.
            </p>

            <Flex gap="3" wrap="wrap">
              <Button size="small">Action 1</Button>
              <Button size="small">Action 2</Button>
              <Button size="small">Action 3</Button>
              <Button size="small">Action 4</Button>
            </Flex>
          </Flex>

          {/* Right Column */}
          <Flex direction="column" gap="3" style={{ flex: '0 0 200px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Sidebar</h4>
            <Flex direction="column" gap="2">
              <Flex align="center" gap="2">
                <Icon icon={Download} size="sm" />
                <span style={{ fontSize: '0.875rem' }}>Download</span>
              </Flex>
              <Flex align="center" gap="2">
                <Icon icon={Heart} size="sm" />
                <span style={{ fontSize: '0.875rem' }}>Favorites</span>
              </Flex>
              <Flex align="center" gap="2">
                <Icon icon={Settings} size="sm" />
                <span style={{ fontSize: '0.875rem' }}>Settings</span>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complex dashboard layout showing how Flex can be nested to create sophisticated UI structures.',
      },
    },
  },
};

/**
 * Form Layout Example
 */
export const FormLayout: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="4"
      style={{
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: 'rgba(0, 100, 200, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3 style={{ margin: '0' }}>Contact Form</h3>

      <Flex direction="column" gap="3">
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              opacity: 0.7,
            }}
          >
            Full Name
          </span>
        </div>
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              opacity: 0.7,
            }}
          >
            Email Address
          </span>
        </div>
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            minHeight: '80px',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              opacity: 0.7,
            }}
          >
            Your Message
          </span>
        </div>
      </Flex>

      <Flex justify="end" gap="3">
        <Button variant="secondary" size="small">
          Cancel
        </Button>
        <Button variant="primary" size="small">
          Send Message
        </Button>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form layout example using vertical direction for inputs and horizontal for actions.',
      },
    },
  },
};
