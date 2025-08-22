// /src/storybook/content/badge.stories.tsx
// Badge component stories showcasing all variants, color schemes, and sizes
// Complete documentation for the Badge component
// RELEVANT FILES: ../../ui/badge/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../ui/badge';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Badge> = {
  title: 'Content/Badge',
  component: Badge,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component for status indicators and labels. Used to highlight an item's status for quick recognition. Supports multiple variants, color schemes, and sizes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'subtle', 'outline'],
      description: 'Visual style variant of the badge',
      defaultValue: 'subtle',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['default', 'brand', 'success', 'warning', 'error', 'info'],
      description: 'Color scheme of the badge',
      defaultValue: 'default',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the badge',
      defaultValue: 'medium',
    },
    children: {
      control: 'text',
      description: 'Badge content',
      defaultValue: 'Badge',
    },
  },
  args: {
    children: 'Badge',
    variant: 'subtle',
    colorScheme: 'default',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default Badge Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge variant="solid" colorScheme="brand">
        Solid
      </Badge>
      <Badge variant="subtle" colorScheme="brand">
        Subtle
      </Badge>
      <Badge variant="outline" colorScheme="brand">
        Outline
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available badge variants: solid (filled background), subtle (light background), and outline (bordered).',
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
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Badge variant="solid" colorScheme="default">
          Default
        </Badge>
        <Badge variant="solid" colorScheme="brand">
          Brand
        </Badge>
        <Badge variant="solid" colorScheme="success">
          Success
        </Badge>
        <Badge variant="solid" colorScheme="warning">
          Warning
        </Badge>
        <Badge variant="solid" colorScheme="error">
          Error
        </Badge>
        <Badge variant="solid" colorScheme="info">
          Info
        </Badge>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Badge variant="subtle" colorScheme="default">
          Default
        </Badge>
        <Badge variant="subtle" colorScheme="brand">
          Brand
        </Badge>
        <Badge variant="subtle" colorScheme="success">
          Success
        </Badge>
        <Badge variant="subtle" colorScheme="warning">
          Warning
        </Badge>
        <Badge variant="subtle" colorScheme="error">
          Error
        </Badge>
        <Badge variant="subtle" colorScheme="info">
          Info
        </Badge>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Badge variant="outline" colorScheme="default">
          Default
        </Badge>
        <Badge variant="outline" colorScheme="brand">
          Brand
        </Badge>
        <Badge variant="outline" colorScheme="success">
          Success
        </Badge>
        <Badge variant="outline" colorScheme="warning">
          Warning
        </Badge>
        <Badge variant="outline" colorScheme="error">
          Error
        </Badge>
        <Badge variant="outline" colorScheme="info">
          Info
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All color schemes available for each variant.',
      },
    },
  },
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Badge variant="solid" colorScheme="brand" size="small">
        Small
      </Badge>
      <Badge variant="solid" colorScheme="brand" size="medium">
        Medium
      </Badge>
      <Badge variant="solid" colorScheme="brand" size="large">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available badge sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * Status Examples Story
 */
export const StatusExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge variant="solid" colorScheme="success">
        Active
      </Badge>
      <Badge variant="subtle" colorScheme="warning">
        Pending
      </Badge>
      <Badge variant="outline" colorScheme="error">
        Expired
      </Badge>
      <Badge variant="solid" colorScheme="info">
        New
      </Badge>
      <Badge variant="subtle" colorScheme="brand">
        Pro
      </Badge>
      <Badge variant="outline" colorScheme="default">
        Draft
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status indicator use cases.',
      },
    },
  },
};

/**
 * Inline Usage Story
 */
export const InlineUsage: Story = {
  render: () => (
    <div
      style={{
        fontSize: '16px',
        lineHeight: '1.5',
      }}
    >
      <p>
        This feature is currently{' '}
        <Badge variant="subtle" colorScheme="warning" size="small">
          Beta
        </Badge>{' '}
        and available to{' '}
        <Badge variant="solid" colorScheme="brand" size="small">
          Pro
        </Badge>{' '}
        users only.
      </p>
      <p style={{ marginTop: '1rem' }}>
        Your subscription status:{' '}
        <Badge variant="solid" colorScheme="success">
          Active
        </Badge>
      </p>
      <p style={{ marginTop: '1rem' }}>
        API Version:{' '}
        <Badge variant="outline" colorScheme="info">
          v2.0
        </Badge>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used inline within text content.',
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
    children: 'Playground Badge',
    variant: 'subtle',
    colorScheme: 'brand',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all badge props and combinations.',
      },
    },
  },
};
