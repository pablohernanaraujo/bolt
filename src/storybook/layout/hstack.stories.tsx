// /src/storybook/layout/hstack.stories.tsx
// HStack component stories showcasing all layout variations and use cases
// Complete documentation for the HStack component
// RELEVANT FILES: ../../ui/layout/hstack/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Download, Heart, Icon, Package, Settings } from '../../icons';
import { Button } from '../../ui/button';
import { HStack } from '../../ui/layout/hstack';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof HStack> = {
  title: 'Layout/HStack',
  component: HStack,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'HStack is a horizontal layout component that arranges children in a row with configurable spacing, alignment, and wrapping options. Built with flexbox for optimal performance and responsiveness.',
      },
    },
  },
  argTypes: {
    space: {
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
      description: 'Space between child elements using design system tokens',
      defaultValue: '0',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Vertical alignment of children (align-items)',
      defaultValue: 'stretch',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Horizontal distribution of children (justify-content)',
      defaultValue: 'start',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether children should wrap to new lines',
      defaultValue: false,
    },
    reversed: {
      control: 'boolean',
      description: 'Reverse the order of children',
      defaultValue: false,
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'nav', 'header', 'footer'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
  },
  args: {
    space: '4',
    align: 'stretch',
    justify: 'start',
    wrap: false,
    reversed: false,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof HStack>;

/**
 * Default HStack Story
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
        story: 'Basic HStack with three buttons and default spacing.',
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
          'Interactive playground to test all HStack props and see how they affect layout.',
      },
    },
  },
};

/**
 * Spacing Variations
 */
export const SpacingVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="0" (No spacing)</h3>
        <HStack space="0">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="2" (Small spacing)</h3>
        <HStack space="2">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="4" (Medium spacing)</h3>
        <HStack space="4">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="8" (Large spacing)</h3>
        <HStack space="8">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing options using design system space tokens.',
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
        <HStack
          space="4"
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
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="center"</h3>
        <HStack
          space="4"
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
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="end"</h3>
        <HStack
          space="4"
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
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different vertical alignment options for children with varying heights.',
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
        <HStack
          space="4"
          justify="start"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="center"</h3>
        <HStack
          space="4"
          justify="center"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="end"</h3>
        <HStack
          space="4"
          justify="end"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="between"</h3>
        <HStack
          space="4"
          justify="between"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="around"</h3>
        <HStack
          space="4"
          justify="around"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="evenly"</h3>
        <HStack
          justify="evenly"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different horizontal distribution options for space management.',
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
        <h3 style={{ marginBottom: '1rem' }}>wrap=false (default)</h3>
        <HStack
          space="3"
          wrap={false}
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
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>wrap=true</h3>
        <HStack
          space="3"
          wrap={true}
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
        </HStack>
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
 * Reversed Order
 */
export const ReversedOrder: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Normal Order</h3>
        <HStack space="4">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Reversed Order</h3>
        <HStack space="4" reversed>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of normal and reversed child order.',
      },
    },
  },
};

/**
 * Navigation Bar Example
 */
export const NavigationBar: Story = {
  render: () => (
    <HStack
      space="6"
      justify="between"
      align="center"
      as="nav"
      style={{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        borderRadius: '8px',
      }}
    >
      <HStack space="4" align="center">
        <Icon icon={Package} size="lg" />
        <span
          style={{
            fontWeight: '600',
            fontSize: '1.125rem',
          }}
        >
          Brand
        </span>
      </HStack>

      <HStack space="3">
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
      </HStack>

      <HStack space="2">
        <Button variant="secondary" size="small">
          Sign In
        </Button>
        <Button variant="primary" size="small">
          Sign Up
        </Button>
      </HStack>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world navigation bar example with logo, menu items, and action buttons.',
      },
    },
  },
};

/**
 * Button Group Example
 */
export const ButtonGroup: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Connected Button Group</h3>
        <HStack space="0">
          <Button
            variant="secondary"
            style={{
              borderRadius: '6px 0 0 6px',
              borderRight: '0',
            }}
          >
            Left
          </Button>
          <Button
            variant="secondary"
            style={{
              borderRadius: 0,
              borderRight: '0',
            }}
          >
            Center
          </Button>
          <Button
            variant="secondary"
            style={{
              borderRadius: '0 6px 6px 0',
            }}
          >
            Right
          </Button>
        </HStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Action Button Group</h3>
        <HStack space="2">
          <Button variant="ghost" size="small">
            <Icon icon={Download} size="sm" />
            Download
          </Button>
          <Button variant="ghost" size="small">
            <Icon icon={Heart} size="sm" />
            Favorite
          </Button>
          <Button variant="ghost" size="small">
            <Icon icon={Settings} size="sm" />
            Settings
          </Button>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button group examples for connected actions and toolbar-style layouts.',
      },
    },
  },
};

/**
 * Card Actions Example
 */
export const CardActions: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '400px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0' }}>Card Title</h3>
      <p
        style={{
          margin: '0 0 2rem 0',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        This is some card content that demonstrates how HStack can be used for
        card action layouts.
      </p>

      <HStack space="3" justify="end">
        <Button variant="ghost" size="small">
          Cancel
        </Button>
        <Button variant="primary" size="small">
          Save Changes
        </Button>
      </HStack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Card footer actions using HStack for proper spacing and alignment.',
      },
    },
  },
};

/**
 * Complex Nested Layout
 */
export const ComplexLayout: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>
        Complex Layout with Nested HStacks
      </h3>

      {/* Header */}
      <HStack
        space="6"
        justify="between"
        align="center"
        style={{
          padding: '1rem',
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          borderRadius: '8px 8px 0 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <HStack space="3" align="center">
          <Icon icon={Package} size="md" />
          <span style={{ fontWeight: '600' }}>Dashboard</span>
        </HStack>

        <HStack space="2">
          <Button variant="ghost" size="small">
            <Icon icon={Settings} size="sm" />
          </Button>
          <Button variant="primary" size="small">
            New Item
          </Button>
        </HStack>
      </HStack>

      {/* Content */}
      <div
        style={{
          padding: '2rem 1rem',
          backgroundColor: 'rgba(0, 100, 200, 0.05)',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <HStack space="8" align="start">
          {/* Left Column */}
          <div style={{ flex: '1' }}>
            <h4 style={{ marginBottom: '1rem' }}>Main Content</h4>
            <p style={{ marginBottom: '1.5rem' }}>
              This demonstrates how HStack can be used to create complex layouts
              with multiple nested levels.
            </p>

            <HStack space="3" wrap>
              <Button size="small">Action 1</Button>
              <Button size="small">Action 2</Button>
              <Button size="small">Action 3</Button>
              <Button size="small">Action 4</Button>
            </HStack>
          </div>

          {/* Right Column */}
          <div style={{ flex: '0 0 200px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Sidebar</h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <HStack space="2" align="center">
                <Icon icon={Download} size="sm" />
                <span style={{ fontSize: '0.875rem' }}>Download</span>
              </HStack>
              <HStack space="2" align="center">
                <Icon icon={Heart} size="sm" />
                <span style={{ fontSize: '0.875rem' }}>Favorites</span>
              </HStack>
              <HStack space="2" align="center">
                <Icon icon={Settings} size="sm" />
                <span style={{ fontSize: '0.875rem' }}>Settings</span>
              </HStack>
            </div>
          </div>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complex dashboard layout showing how HStack can be nested to create sophisticated UI structures.',
      },
    },
  },
};
