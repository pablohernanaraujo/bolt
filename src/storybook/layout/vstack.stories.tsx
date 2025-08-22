// /src/storybook/layout/vstack.stories.tsx
// VStack component stories showcasing all layout variations and use cases for vertical layouts
// Complete documentation for the VStack component with examples and real-world usage
// RELEVANT FILES: ../../ui/layout/vstack/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Download, Heart, Icon, Package, Settings, User } from '../../icons';
import { Button } from '../../ui/button';
import { VStack } from '../../ui/layout/vstack';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof VStack> = {
  title: 'Layout/VStack',
  component: VStack,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'VStack is a vertical layout component that arranges children in a column with configurable spacing, alignment, and wrapping options. Built with flexbox for optimal performance and responsiveness, it provides the vertical counterpart to HStack.',
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
      description: 'Horizontal alignment of children (align-items)',
      defaultValue: 'stretch',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Vertical distribution of children (justify-content)',
      defaultValue: 'start',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether children should wrap to new columns',
      defaultValue: false,
    },
    reversed: {
      control: 'boolean',
      description: 'Reverse the order of children (bottom to top)',
      defaultValue: false,
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'nav', 'header', 'footer', 'form'],
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
type Story = StoryObj<typeof VStack>;

/**
 * Default VStack Story
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
        story:
          'Basic VStack with three buttons arranged vertically with default spacing.',
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
        <Button size="small">Item 1</Button>
        <Button size="small">Item 2</Button>
        <Button size="small">Item 3</Button>
        <Button size="small">Item 4</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all VStack props and see how they affect vertical layout.',
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
        gap: '3rem',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="0" (No spacing)</h3>
        <VStack
          space="0"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="2" (Small spacing)</h3>
        <VStack
          space="2"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="4" (Medium spacing)</h3>
        <VStack
          space="4"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>space="8" (Large spacing)</h3>
        <VStack
          space="8"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
        </VStack>
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
 * Horizontal Alignment Options
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
        <h3 style={{ marginBottom: '1rem' }}>align="start" (Left aligned)</h3>
        <VStack
          space="3"
          align="start"
          style={{
            width: '300px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Small</Button>
          <Button size="large">Large Button</Button>
          <Button>Normal</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          align="center" (Center aligned)
        </h3>
        <VStack
          space="3"
          align="center"
          style={{
            width: '300px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Small</Button>
          <Button size="large">Large Button</Button>
          <Button>Normal</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="end" (Right aligned)</h3>
        <VStack
          space="3"
          align="end"
          style={{
            width: '300px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Small</Button>
          <Button size="large">Large Button</Button>
          <Button>Normal</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>align="stretch" (Full width)</h3>
        <VStack
          space="3"
          align="stretch"
          style={{
            width: '300px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">Small (stretched)</Button>
          <Button size="large">Large Button (stretched)</Button>
          <Button>Normal (stretched)</Button>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different horizontal alignment options for children with varying widths.',
      },
    },
  },
};

/**
 * Vertical Justification Options
 */
export const JustificationOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="start"</h3>
        <VStack
          space="2"
          justify="start"
          style={{
            height: '300px',
            width: '150px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="center"</h3>
        <VStack
          space="2"
          justify="center"
          style={{
            height: '300px',
            width: '150px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="end"</h3>
        <VStack
          space="2"
          justify="end"
          style={{
            height: '300px',
            width: '150px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="between"</h3>
        <VStack
          space="2"
          justify="between"
          style={{
            height: '300px',
            width: '150px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>justify="evenly"</h3>
        <VStack
          justify="evenly"
          style={{
            height: '300px',
            width: '150px',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button size="small">First</Button>
          <Button size="small">Second</Button>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different vertical distribution options for space management.',
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
        <VStack
          space="2"
          wrap={false}
          style={{
            maxHeight: '200px',
            width: '200px',
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
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>wrap=true</h3>
        <VStack
          space="2"
          wrap={true}
          style={{
            maxHeight: '200px',
            width: '300px',
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
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of wrap behavior when content exceeds container height.',
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
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Normal Order (top to bottom)</h3>
        <VStack
          space="3"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Reversed Order (bottom to top)</h3>
        <VStack
          space="3"
          reversed
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            padding: '1rem',
          }}
        >
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of normal and reversed child order in vertical layout.',
      },
    },
  },
};

/**
 * Sidebar Navigation Example
 */
export const SidebarNavigation: Story = {
  render: () => (
    <VStack
      space="2"
      align="stretch"
      as="nav"
      style={{
        width: '240px',
        padding: '1.5rem',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <Icon icon={Package} size="lg" />
        <span
          style={{
            marginLeft: '0.5rem',
            fontWeight: '600',
            fontSize: '1.125rem',
          }}
        >
          Dashboard
        </span>
      </div>

      <VStack space="1" align="stretch">
        <Button
          variant="ghost"
          size="small"
          style={{
            justifyContent: 'flex-start',
            padding: '0.75rem',
          }}
        >
          <Icon icon={Package} size="sm" />
          <span style={{ marginLeft: '0.5rem' }}>Projects</span>
        </Button>
        <Button
          variant="ghost"
          size="small"
          style={{
            justifyContent: 'flex-start',
            padding: '0.75rem',
          }}
        >
          <Icon icon={User} size="sm" />
          <span style={{ marginLeft: '0.5rem' }}>Team</span>
        </Button>
        <Button
          variant="ghost"
          size="small"
          style={{
            justifyContent: 'flex-start',
            padding: '0.75rem',
          }}
        >
          <Icon icon={Settings} size="sm" />
          <span style={{ marginLeft: '0.5rem' }}>Settings</span>
        </Button>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world sidebar navigation example showing vertical menu structure.',
      },
    },
  },
};

/**
 * Form Layout Example
 */
export const FormLayout: Story = {
  render: () => (
    <VStack
      space="6"
      align="stretch"
      as="form"
      style={{
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: 'rgba(0, 100, 200, 0.1)',
        borderRadius: '8px',
      }}
    >
      <h2
        style={{
          margin: 0,
          textAlign: 'center',
        }}
      >
        Create Account
      </h2>

      <VStack space="4" align="stretch">
        <VStack space="1" align="stretch">
          <label
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Full Name
          </label>
          <input
            style={{
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
            placeholder="Enter your full name"
            type="text"
          />
        </VStack>

        <VStack space="1" align="stretch">
          <label
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Email
          </label>
          <input
            style={{
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
            placeholder="Enter your email"
            type="email"
          />
        </VStack>

        <VStack space="1" align="stretch">
          <label
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Password
          </label>
          <input
            style={{
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
            placeholder="Create a password"
            type="password"
          />
        </VStack>
      </VStack>

      <VStack space="3" align="stretch">
        <Button variant="primary" size="large">
          Create Account
        </Button>
        <Button variant="ghost" size="medium">
          Already have an account? Sign in
        </Button>
      </VStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form layout example showing how VStack creates clean, organized forms.',
      },
    },
  },
};

/**
 * Card Stack Example
 */
export const CardStack: Story = {
  render: () => (
    <VStack space="4" style={{ maxWidth: '320px' }}>
      <h3 style={{ margin: 0 }}>Recent Activity</h3>

      {[1, 2, 3].map((num) => (
        <div
          key={num}
          style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <VStack space="3" align="stretch">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h4 style={{ margin: 0 }}>Task {num}</h4>
              <Icon
                icon={num === 1 ? Download : num === 2 ? Heart : Settings}
                size="sm"
              />
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.875rem',
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              This is a description for task {num}. It shows how cards can be
              stacked vertically.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <Button variant="ghost" size="small">
                View
              </Button>
              <Button variant="primary" size="small">
                Edit
              </Button>
            </div>
          </VStack>
        </div>
      ))}
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Card stack example showing vertical arrangement of content cards.',
      },
    },
  },
};

/**
 * Complex Dashboard Layout
 */
export const ComplexLayout: Story = {
  render: () => (
    <div
      style={{
        padding: '1rem',
        maxWidth: '800px',
      }}
    >
      <h3 style={{ marginBottom: '1.5rem' }}>
        Dashboard Layout with Nested VStacks
      </h3>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
        }}
      >
        {/* Main Content */}
        <VStack space="6" style={{ flex: 1 }}>
          {/* Stats Cards */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            {['Revenue', 'Users', 'Orders'].map((metric) => (
              <div
                key={metric}
                style={{
                  flex: 1,
                  padding: '1.5rem',
                  backgroundColor: 'rgba(0, 100, 200, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <VStack space="2" align="center">
                  <h4
                    style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      fontWeight: '500',
                    }}
                  >
                    {metric}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '2rem',
                      fontWeight: '700',
                    }}
                  >
                    {metric === 'Revenue'
                      ? '$12,394'
                      : metric === 'Users'
                        ? '1,429'
                        : '89'}
                  </p>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'green',
                    }}
                  >
                    +12% from last month
                  </span>
                </VStack>
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'rgba(0, 100, 200, 0.1)',
              borderRadius: '8px',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <VStack space="3" align="center">
              <Icon icon={Package} size="xl" />
              <h4 style={{ margin: 0 }}>Analytics Chart</h4>
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                Chart visualization would go here
              </p>
            </VStack>
          </div>
        </VStack>

        {/* Sidebar */}
        <VStack
          space="4"
          style={{
            width: '280px',
            padding: '1.5rem',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: 0 }}>Recent Activity</h4>

          <VStack space="3">
            {[
              {
                icon: Download,
                text: 'New report generated',
                time: '2m ago',
              },
              {
                icon: Heart,
                text: 'Customer feedback received',
                time: '1h ago',
              },
              {
                icon: Settings,
                text: 'System update completed',
                time: '3h ago',
              },
            ].map((activity, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Icon icon={activity.icon} size="sm" />
                <VStack space="0" style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.875rem' }}>{activity.text}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {activity.time}
                  </span>
                </VStack>
              </div>
            ))}
          </VStack>

          <Button variant="ghost" size="small" style={{ marginTop: '1rem' }}>
            View All Activity
          </Button>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complex dashboard layout showing how VStack can be used to create sophisticated UI structures with nested vertical layouts.',
      },
    },
  },
};
