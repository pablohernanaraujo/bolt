// /src/storybook/layout/grid.stories.tsx
// Grid component stories showcasing all layout variations and use cases
// Complete documentation for the Grid and GridItem components
// RELEVANT FILES: ../../ui/layout/grid/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Heart, Icon, Package, Settings, User, Zap } from '../../icons';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Grid, GridItem } from '../../ui/layout/grid';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Grid is a flexible CSS Grid layout component that provides comprehensive grid layout capabilities. It works with GridItem children for precise positioning and spanning across multiple columns or rows.',
      },
    },
  },
  argTypes: {
    templateColumns: {
      control: 'text',
      description: 'CSS grid-template-columns property',
      defaultValue: 'repeat(3, 1fr)',
    },
    templateRows: {
      control: 'text',
      description: 'CSS grid-template-rows property',
    },
    templateAreas: {
      control: 'text',
      description: 'CSS grid-template-areas property for named areas',
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
      description: 'Gap between grid items using design system tokens',
      defaultValue: '4',
    },
    columnGap: {
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
      description: 'Column gap using design system tokens',
    },
    rowGap: {
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
      description: 'Row gap using design system tokens',
    },
    autoColumns: {
      control: 'text',
      description: 'CSS grid-auto-columns property',
    },
    autoRows: {
      control: 'text',
      description: 'CSS grid-auto-rows property',
    },
    autoFlow: {
      control: { type: 'select' },
      options: ['row', 'column', 'row dense', 'column dense'],
      description: 'CSS grid-auto-flow property',
      defaultValue: 'row',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'main', 'aside'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
  },
  args: {
    templateColumns: 'repeat(3, 1fr)',
    gap: '4',
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

/**
 * Default Grid Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    children: (
      <>
        <GridItem>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Item 1
          </div>
        </GridItem>
        <GridItem>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Item 2
          </div>
        </GridItem>
        <GridItem>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(251, 146, 60, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Item 3
          </div>
        </GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Grid with three equal columns and default spacing.',
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
        <GridItem>
          <Button variant="primary">Item 1</Button>
        </GridItem>
        <GridItem>
          <Button variant="secondary">Item 2</Button>
        </GridItem>
        <GridItem>
          <Button variant="ghost">Item 3</Button>
        </GridItem>
        <GridItem>
          <Button variant="primary">Item 4</Button>
        </GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all Grid props and see how they affect layout.',
      },
    },
  },
};

/**
 * Column Templates
 */
export const ColumnTemplates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Equal Columns - repeat(3, 1fr)</h3>
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
          {[1, 2, 3].map((i) => (
            <GridItem key={i}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {i}
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          Fixed + Flexible - 200px 1fr 100px
        </h3>
        <Grid templateColumns="200px 1fr 100px" gap="4">
          {[1, 2, 3].map((i) => (
            <GridItem key={i}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {i}
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          Auto-fit - repeat(auto-fit, minmax(150px, 1fr))
        </h3>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap="4">
          {[1, 2, 3, 4, 5].map((i) => (
            <GridItem key={i}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {i}
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different column template patterns for various layout needs.',
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
        <h3 style={{ marginBottom: '1rem' }}>gap="0" (No gap)</h3>
        <Grid templateColumns="repeat(3, 1fr)" gap="0">
          {[1, 2, 3].map((i) => (
            <GridItem key={i}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  textAlign: 'center',
                }}
              >
                Item {i}
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>gap="2" (Small gap)</h3>
        <Grid templateColumns="repeat(3, 1fr)" gap="2">
          {[1, 2, 3].map((i) => (
            <GridItem key={i}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {i}
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>gap="6" (Large gap)</h3>
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
          {[1, 2, 3].map((i) => (
            <GridItem key={i}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {i}
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different gap sizes using design system space tokens.',
      },
    },
  },
};

/**
 * GridItem Spanning
 */
export const GridItemSpanning: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Column Spanning</h3>
        <Grid templateColumns="repeat(4, 1fr)" gap="4">
          <GridItem colSpan={2}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Spans 2 columns
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Single
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Single
            </div>
          </GridItem>
          <GridItem colSpan={3}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Spans 3 columns
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Single
            </div>
          </GridItem>
        </Grid>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Row Spanning</h3>
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(3, 100px)"
          gap="4"
        >
          <GridItem rowSpan={2}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Spans 2 rows
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Item 2
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Item 3
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Item 4
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Item 5
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'GridItem components with column and row spanning capabilities.',
      },
    },
  },
};

/**
 * Named Grid Areas
 */
export const NamedGridAreas: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Layout with Named Grid Areas</h3>
      <Grid
        templateAreas={`
          "header header header"
          "sidebar main main"
          "footer footer footer"
        `}
        templateColumns="200px 1fr 1fr"
        templateRows="auto 1fr auto"
        gap="4"
        style={{ minHeight: '400px' }}
      >
        <GridItem area="header">
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Header
          </div>
        </GridItem>
        <GridItem area="sidebar">
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Sidebar
          </div>
        </GridItem>
        <GridItem area="main">
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(251, 146, 60, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Main Content
          </div>
        </GridItem>
        <GridItem area="footer">
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Footer
          </div>
        </GridItem>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complex layout using named grid areas for semantic positioning.',
      },
    },
  },
};

/**
 * Card Grid Example
 */
export const CardGrid: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Product Card Grid</h3>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
        {[
          {
            name: 'Premium Plan',
            price: '$29/mo',
            icon: Package,
          },
          {
            name: 'Pro Plan',
            price: '$19/mo',
            icon: Zap,
          },
          {
            name: 'Basic Plan',
            price: '$9/mo',
            icon: User,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            icon: Settings,
          },
        ].map((item, i) => (
          <GridItem key={i}>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Icon icon={item.icon} size="xl" />
              </div>
              <h4
                style={{
                  marginBottom: '0.5rem',
                  fontSize: '1.125rem',
                }}
              >
                {item.name}
              </h4>
              <p
                style={{
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'rgba(59, 130, 246, 1)',
                }}
              >
                {item.price}
              </p>
              <Button variant="primary" size="small" style={{ width: '100%' }}>
                Choose Plan
              </Button>
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive card grid that adapts to container width.',
      },
    },
  },
};

/**
 * Dashboard Layout
 */
export const DashboardLayout: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Dashboard Layout</h3>
      <Grid
        templateColumns="1fr 1fr 300px"
        templateRows="auto auto 1fr"
        gap="6"
        style={{ minHeight: '500px' }}
      >
        {/* Main metric - spans 2 columns */}
        <GridItem colSpan={2}>
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <h4 style={{ marginBottom: '0.5rem' }}>Total Revenue</h4>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
              }}
            >
              $124,563
            </div>
            <Badge variant="solid">+12.3%</Badge>
          </div>
        </GridItem>

        {/* Notifications sidebar - spans all rows */}
        <GridItem rowSpan={3}>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(251, 146, 60, 0.1)',
              borderRadius: '12px',
              height: '100%',
            }}
          >
            <h4 style={{ marginBottom: '1rem' }}>Recent Activity</h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {[
                'New user registered',
                'Payment received',
                'Report generated',
                'System backup completed',
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </GridItem>

        {/* Secondary metrics */}
        <GridItem>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <h5 style={{ marginBottom: '0.5rem' }}>Active Users</h5>
            <div
              style={{
                fontSize: '1.75rem',
                fontWeight: '600',
              }}
            >
              2,341
            </div>
          </div>
        </GridItem>

        <GridItem>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <h5 style={{ marginBottom: '0.5rem' }}>Conversion Rate</h5>
            <div
              style={{
                fontSize: '1.75rem',
                fontWeight: '600',
              }}
            >
              3.2%
            </div>
          </div>
        </GridItem>

        {/* Chart area - spans 2 columns */}
        <GridItem colSpan={2}>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              borderRadius: '12px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon icon={Heart} size="xl" style={{ marginBottom: '1rem' }} />
              <h4>Analytics Chart</h4>
              <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                Chart component would go here
              </p>
            </div>
          </div>
        </GridItem>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex dashboard layout with spanning items and sidebar.',
      },
    },
  },
};

/**
 * Image Gallery
 */
export const ImageGallery: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Image Gallery Layout</h3>
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        autoRows="200px"
        gap="4"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <GridItem key={i} colSpan={i === 0 || i === 4 ? 2 : 1}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(${50 + i * 30}, ${100 + i * 20}, ${200 - i * 15}, 0.2)`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              Image {i + 1}
              {(i === 0 || i === 4) && ' (Featured)'}
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Responsive image gallery with featured items spanning multiple columns.',
      },
    },
  },
};
