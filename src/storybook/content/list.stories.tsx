// /src/storybook/content/list.stories.tsx
// List component stories showcasing all variants, spacing options, and usage examples
// Complete documentation for the List component
// RELEVANT FILES: ../../ui/list/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  FileText,
  Star,
  Users,
} from '../../icons';
import { List } from '../../ui/list';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof List.Root> = {
  title: 'Content/List',
  component: List.Root,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'List component for displaying structured content in various formats. Supports ordered, unordered, and basic list variants with configurable spacing and optional icons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['unordered', 'ordered', 'basic'],
      description:
        'List variant - determines semantic HTML element and styling',
      defaultValue: 'unordered',
    },
    spacing: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Spacing between list items',
      defaultValue: 'md',
    },
    children: {
      control: false,
      description: 'List items content',
    },
  },
  args: {
    variant: 'unordered',
    spacing: 'md',
    children: (
      <>
        <List.Item>First list item</List.Item>
        <List.Item>Second list item</List.Item>
        <List.Item>Third list item</List.Item>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof List.Root>;

/**
 * Default List Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * List Variants Story
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Unordered List (default)
        </h4>
        <List.Root variant="unordered" spacing="md">
          <List.Item>First item with bullet point</List.Item>
          <List.Item>Second item in unordered list</List.Item>
          <List.Item>Third item showing structure</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Ordered List
        </h4>
        <List.Root variant="ordered" spacing="md">
          <List.Item>First step in the process</List.Item>
          <List.Item>Second step with numbering</List.Item>
          <List.Item>Third step showing sequence</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Basic List (no markers)
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item>Clean list item without markers</List.Item>
          <List.Item>Another item for minimal style</List.Item>
          <List.Item>Simple content presentation</List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available list variants: unordered (bullet points), ordered (numbers), and basic (no markers).',
      },
    },
  },
};

/**
 * Spacing Options Story
 */
export const SpacingOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Small Spacing
        </h4>
        <List.Root variant="unordered" spacing="sm">
          <List.Item>Tight spacing between items</List.Item>
          <List.Item>Compact presentation</List.Item>
          <List.Item>Dense information layout</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Medium Spacing (default)
        </h4>
        <List.Root variant="unordered" spacing="md">
          <List.Item>Balanced spacing for readability</List.Item>
          <List.Item>Standard presentation format</List.Item>
          <List.Item>Comfortable reading experience</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Large Spacing
        </h4>
        <List.Root variant="unordered" spacing="lg">
          <List.Item>Generous spacing between items</List.Item>
          <List.Item>Emphasis on each item</List.Item>
          <List.Item>Prominent content display</List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing options: small, medium (default), and large.',
      },
    },
  },
};

/**
 * Lists with Icons Story
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Feature List
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item icon={CheckCircle}>
            Advanced analytics and reporting
          </List.Item>
          <List.Item icon={CheckCircle}>
            Real-time collaboration tools
          </List.Item>
          <List.Item icon={CheckCircle}>Unlimited cloud storage</List.Item>
          <List.Item icon={CheckCircle}>24/7 customer support</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Action Items
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item icon={ArrowRight}>Review quarterly reports</List.Item>
          <List.Item icon={ArrowRight}>
            Update team contact information
          </List.Item>
          <List.Item icon={ArrowRight}>Schedule client meetings</List.Item>
          <List.Item icon={ArrowRight}>Submit expense reports</List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Lists with custom icons for enhanced visual hierarchy and meaning.',
      },
    },
  },
};

/**
 * Mixed Content Story
 */
export const MixedContent: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Team Members
        </h4>
        <List.Root variant="basic" spacing="lg">
          <List.Item icon={Users}>
            <strong>Development Team</strong>
            <br />5 engineers working on core features
          </List.Item>
          <List.Item icon={Users}>
            <strong>Design Team</strong>
            <br />3 designers creating user interfaces
          </List.Item>
          <List.Item icon={Users}>
            <strong>Marketing Team</strong>
            <br />4 specialists managing campaigns
          </List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Upcoming Events
        </h4>
        <List.Root variant="basic" spacing="lg">
          <List.Item icon={Calendar}>
            <strong>Product Launch</strong>
            <br />
            March 15, 2024 - Quarterly release
          </List.Item>
          <List.Item icon={Calendar}>
            <strong>Team Retrospective</strong>
            <br />
            March 20, 2024 - Sprint review meeting
          </List.Item>
          <List.Item icon={Calendar}>
            <strong>Client Presentation</strong>
            <br />
            March 25, 2024 - Feature demonstration
          </List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Lists with rich content including multiple lines and formatted text.',
      },
    },
  },
};

/**
 * Status and Priority Lists Story
 */
export const StatusAndPriority: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Priority Tasks
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item icon={Star}>Critical bug fix in authentication</List.Item>
          <List.Item icon={Star}>Database performance optimization</List.Item>
          <List.Item icon={Star}>Security audit completion</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Document Types
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item icon={FileText}>
            Project requirements specification
          </List.Item>
          <List.Item icon={FileText}>Technical architecture document</List.Item>
          <List.Item icon={FileText}>User acceptance test plan</List.Item>
          <List.Item icon={FileText}>
            Deployment and maintenance guide
          </List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Lists showing different use cases for status indicators and categorization.',
      },
    },
  },
};

/**
 * Nested Lists Story
 */
export const NestedLists: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <h4
        style={{
          marginBottom: '1rem',
          fontSize: '1.125rem',
          fontWeight: '600',
        }}
      >
        Project Structure
      </h4>
      <List.Root variant="unordered" spacing="sm">
        <List.Item>
          Frontend Development
          <List.Root
            variant="unordered"
            spacing="sm"
            style={{ marginTop: '8px' }}
          >
            <List.Item>React components</List.Item>
            <List.Item>CSS styling</List.Item>
            <List.Item>State management</List.Item>
          </List.Root>
        </List.Item>
        <List.Item>
          Backend Development
          <List.Root
            variant="unordered"
            spacing="sm"
            style={{ marginTop: '8px' }}
          >
            <List.Item>API endpoints</List.Item>
            <List.Item>Database schema</List.Item>
            <List.Item>Authentication</List.Item>
          </List.Root>
        </List.Item>
        <List.Item>
          Testing & Deployment
          <List.Root
            variant="unordered"
            spacing="sm"
            style={{ marginTop: '8px' }}
          >
            <List.Item>Unit tests</List.Item>
            <List.Item>Integration tests</List.Item>
            <List.Item>CI/CD pipeline</List.Item>
          </List.Root>
        </List.Item>
      </List.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested lists for hierarchical content structure.',
      },
    },
  },
};

/**
 * Text Emphasis Story
 */
export const TextEmphasis: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Emphasis Levels
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item emphasis="pure">Pure emphasis (100% opacity)</List.Item>
          <List.Item emphasis="high">High emphasis (87% opacity)</List.Item>
          <List.Item emphasis="medium">Medium emphasis (60% opacity)</List.Item>
          <List.Item emphasis="low">Low emphasis (38% opacity)</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Font Weights
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item weight="normal">Normal weight (400)</List.Item>
          <List.Item weight="medium">Medium weight (500)</List.Item>
          <List.Item weight="semibold">Semibold weight (600)</List.Item>
          <List.Item weight="bold">Bold weight (700)</List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different emphasis levels and font weights for visual hierarchy.',
      },
    },
  },
};

/**
 * Text Decorations Story
 */
export const TextDecorations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Text Decorations
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item>Normal text without decoration</List.Item>
          <List.Item decoration="italic">Italic text style</List.Item>
          <List.Item decoration="underline">Underlined text</List.Item>
          <List.Item decoration="line-through">Strikethrough text</List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Size Variants
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item size="xs">Extra small text (12px)</List.Item>
          <List.Item size="sm">Small text (14px)</List.Item>
          <List.Item size="base">Base text (16px)</List.Item>
          <List.Item size="lg">Large text (18px)</List.Item>
          <List.Item size="xl">Extra large text (20px)</List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text decorations and size variants for different contexts.',
      },
    },
  },
};

/**
 * Color Schemes Story
 */
export const ColorSchemes: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <h4
        style={{
          marginBottom: '1rem',
          fontSize: '1.125rem',
          fontWeight: '600',
        }}
      >
        Semantic Colors
      </h4>
      <List.Root variant="basic" spacing="md">
        <List.Item colorScheme="default">Default text color</List.Item>
        <List.Item colorScheme="brand">Brand color text</List.Item>
        <List.Item colorScheme="success">Success message</List.Item>
        <List.Item colorScheme="warning">Warning notification</List.Item>
        <List.Item colorScheme="error">Error message</List.Item>
        <List.Item colorScheme="info">Information text</List.Item>
      </List.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic color schemes for different message types.',
      },
    },
  },
};

/**
 * Combined Emphasis Story
 */
export const CombinedEmphasis: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          Multiple Properties
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item weight="bold" colorScheme="brand" size="lg">
            Important brand message
          </List.Item>
          <List.Item weight="medium" decoration="italic" emphasis="medium">
            Medium italic emphasis
          </List.Item>
          <List.Item
            colorScheme="success"
            weight="semibold"
            decoration="underline"
          >
            Success with underline
          </List.Item>
          <List.Item
            colorScheme="error"
            weight="bold"
            size="sm"
            emphasis="pure"
          >
            Critical error message
          </List.Item>
        </List.Root>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
          }}
        >
          With Icons and Emphasis
        </h4>
        <List.Root variant="basic" spacing="md">
          <List.Item icon={CheckCircle} colorScheme="success" weight="medium">
            Completed task with success styling
          </List.Item>
          <List.Item
            icon={Star}
            colorScheme="warning"
            weight="semibold"
            size="lg"
          >
            Important starred item
          </List.Item>
          <List.Item icon={FileText} decoration="italic" emphasis="medium">
            Document with subtle styling
          </List.Item>
        </List.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combining multiple emphasis properties for rich visual design.',
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
    variant: 'unordered',
    spacing: 'md',
    children: (
      <>
        <List.Item>Playground list item one</List.Item>
        <List.Item>Playground list item two</List.Item>
        <List.Item>Playground list item three</List.Item>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all list props and combinations.',
      },
    },
  },
};
