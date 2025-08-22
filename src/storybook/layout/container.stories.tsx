// /src/storybook/layout/container.stories.tsx
// Container component stories showcasing all padding variations and use cases
// Complete documentation for the Container layout component
// RELEVANT FILES: ../../ui/layout/container/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../ui/button';
import { Container } from '../../ui/layout/container';
import { HStack } from '../../ui/layout/hstack';
import { Body2, Caption, H1, H2, H3 } from '../../ui/typography';
import { withTheme } from '../utils/decorators';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  decorators: [withTheme],
  parameters: {
    docs: {
      description: {
        component:
          'Container is a full-width layout component that provides consistent vertical padding for page content. It maintains 100% width while offering configurable top and bottom spacing using design system tokens.',
      },
    },
  },
  argTypes: {
    paddingY: {
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
      description:
        'Vertical padding (top and bottom) using design system space tokens',
      defaultValue: '6',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'main', 'section', 'article', 'header', 'footer'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
  },
  args: {
    paddingY: '6',
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

/**
 * Default Container Story
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <H1>Container Component</H1>
        <Body2>
          This container provides consistent vertical padding while maintaining
          full width. Perfect for page layouts and content sections.
        </Body2>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Container with default vertical padding (24px).',
      },
    },
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  args: {
    children: (
      <>
        <H2>Interactive Container</H2>
        <Body2>
          Use the controls below to experiment with different padding values and
          HTML elements.
        </Body2>
        <HStack space="4" style={{ marginTop: '1rem' }}>
          <Button variant="primary">Action Button</Button>
          <Button variant="secondary">Secondary Action</Button>
        </HStack>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all Container props and see how they affect layout.',
      },
    },
  },
};

/**
 * Padding Variations
 */
export const PaddingVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          paddingY="0" (No padding)
        </Caption>
        <Container
          paddingY="0"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
          }}
        >
          <Body2>Content with no vertical padding</Body2>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          paddingY="2" (Small - 8px)
        </Caption>
        <Container
          paddingY="2"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
          }}
        >
          <Body2>Content with small vertical padding</Body2>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          paddingY="6" (Default - 24px)
        </Caption>
        <Container
          paddingY="6"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
          }}
        >
          <Body2>Content with default vertical padding</Body2>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          paddingY="12" (Large - 48px)
        </Caption>
        <Container
          paddingY="12"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
          }}
        >
          <Body2>Content with large vertical padding</Body2>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          paddingY="20" (Extra Large - 80px)
        </Caption>
        <Container
          paddingY="20"
          style={{
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            border: '1px solid rgba(0, 100, 200, 0.3)',
          }}
        >
          <Body2>Content with extra large vertical padding</Body2>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding options using design system space tokens.',
      },
    },
  },
};

/**
 * Semantic HTML Elements
 */
export const SemanticElements: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>as="main"</Caption>
        <Container
          as="main"
          paddingY="8"
          style={{
            backgroundColor: 'rgba(0, 150, 0, 0.1)',
            border: '1px solid rgba(0, 150, 0, 0.3)',
          }}
        >
          <H3>Main Content Area</H3>
          <Body2>
            This container renders as a {`<main>`} element, perfect for the
            primary content area of your page.
          </Body2>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>as="section"</Caption>
        <Container
          as="section"
          paddingY="6"
          style={{
            backgroundColor: 'rgba(150, 0, 150, 0.1)',
            border: '1px solid rgba(150, 0, 150, 0.3)',
          }}
        >
          <H3>Content Section</H3>
          <Body2>
            This container renders as a {`<section>`} element, ideal for
            distinct content sections within your page.
          </Body2>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>as="article"</Caption>
        <Container
          as="article"
          paddingY="10"
          style={{
            backgroundColor: 'rgba(200, 100, 0, 0.1)',
            border: '1px solid rgba(200, 100, 0, 0.3)',
          }}
        >
          <H3>Article Content</H3>
          <Body2>
            This container renders as an {`<article>`} element, suitable for
            self-contained content like blog posts or news articles.
          </Body2>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Container component can render as different semantic HTML elements while maintaining consistent styling.',
      },
    },
  },
};

/**
 * Page Layout Example
 */
export const PageLayout: Story = {
  render: () => (
    <div>
      {/* Header */}
      <Container
        paddingY="4"
        style={{
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <HStack space="6" justify="between" align="center">
          <H2 style={{ margin: 0 }}>Website Header</H2>
          <HStack space="3">
            <Button variant="ghost" size="small">
              Home
            </Button>
            <Button variant="ghost" size="small">
              About
            </Button>
            <Button variant="primary" size="small">
              Contact
            </Button>
          </HStack>
        </HStack>
      </Container>

      {/* Main Content */}
      <Container as="main" paddingY="12">
        <H1>Page Title</H1>
        <Body2 style={{ marginBottom: '2rem' }}>
          This demonstrates how Container can be used to create consistent page
          layouts with appropriate vertical spacing. The header has smaller
          padding while the main content has larger padding for better visual
          hierarchy.
        </Body2>

        <HStack space="4">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
        </HStack>
      </Container>

      {/* Footer */}
      <Container
        paddingY="6"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Body2
          style={{
            textAlign: 'center',
            margin: 0,
          }}
        >
          © 2024 Design System. Built with Container components.
        </Body2>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world page layout example showing how Container creates consistent vertical rhythm across different page sections.',
      },
    },
  },
};

/**
 * Nested Content Example
 */
export const NestedContent: Story = {
  render: () => (
    <Container
      as="main"
      paddingY="16"
      style={{
        backgroundColor: 'rgba(0, 100, 200, 0.05)',
        border: '1px solid rgba(0, 100, 200, 0.2)',
      }}
    >
      <H1>Product Showcase</H1>
      <Body2 style={{ marginBottom: '2rem' }}>
        This container demonstrates how nested content works within the
        Container component. The container provides consistent padding while
        inner content maintains proper spacing.
      </Body2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Product Card 1 */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <H3 style={{ margin: '0 0 1rem 0' }}>Product One</H3>
          <Body2 style={{ margin: '0 0 1.5rem 0' }}>
            Description of the first product with some details about its
            features.
          </Body2>
          <Button variant="primary" size="small">
            Learn More
          </Button>
        </div>

        {/* Product Card 2 */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <H3 style={{ margin: '0 0 1rem 0' }}>Product Two</H3>
          <Body2 style={{ margin: '0 0 1.5rem 0' }}>
            Description of the second product highlighting key benefits.
          </Body2>
          <Button variant="secondary" size="small">
            Learn More
          </Button>
        </div>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how Container works with complex nested content layouts.',
      },
    },
  },
};
