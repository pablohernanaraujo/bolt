// /src/storybook/layout/content-wrapper.stories.tsx
// Content Wrapper component stories showcasing all variants and use cases
// Complete documentation for the Content Wrapper layout component
// RELEVANT FILES: ../../ui/layout/content-wrapper/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../ui/button';
import { Container } from '../../ui/layout/container';
import { ContentWrapper } from '../../ui/layout/content-wrapper';
import { HStack } from '../../ui/layout/hstack';
import { Body2, Caption, H1, H2, H3 } from '../../ui/typography';
import { withTheme } from '../utils/decorators';

const meta: Meta<typeof ContentWrapper> = {
  title: 'Layout/ContentWrapper',
  component: ContentWrapper,
  decorators: [withTheme],
  parameters: {
    docs: {
      description: {
        component:
          'ContentWrapper is a horizontal padding component designed to work inside Container. It provides semantic variants (screen, header, body, footer) with smart padding defaults, plus a borderless mode for nesting. Perfect for creating consistent horizontal spacing in your layouts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['screen', 'header', 'body', 'footer'],
      description:
        'Semantic variant that determines default padding and usage context',
      defaultValue: 'body',
    },
    paddingX: {
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
        'Horizontal padding using design system tokens (overrides variant default)',
    },
    borderless: {
      control: 'boolean',
      description: 'Remove all horizontal padding for clean nesting',
      defaultValue: false,
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'header', 'footer', 'main', 'article'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
  },
  args: {
    variant: 'body',
    borderless: false,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof ContentWrapper>;

/**
 * Default ContentWrapper Story
 */
export const Default: Story = {
  render: (args) => (
    <Container paddingY="8">
      <ContentWrapper {...args}>
        <H2>Content Wrapper</H2>
        <Body2>
          This ContentWrapper provides horizontal padding while Container
          provides vertical padding. Together they create a complete layout
          system.
        </Body2>
      </ContentWrapper>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic ContentWrapper with default body variant inside a Container.',
      },
    },
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  render: (args) => (
    <Container paddingY="6">
      <ContentWrapper {...args}>
        <H3>Interactive ContentWrapper</H3>
        <Body2>
          Use the controls to experiment with different variants, padding
          values, and borderless mode.
        </Body2>
        <HStack space="4" style={{ marginTop: '1rem' }}>
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
        </HStack>
      </ContentWrapper>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all ContentWrapper props and see how they affect layout.',
      },
    },
  },
};

/**
 * Variant Examples
 */
export const VariantExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="screen" (24px padding)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="screen"
            style={{
              backgroundColor: 'rgba(0, 100, 200, 0.1)',
              border: '1px solid rgba(0, 100, 200, 0.3)',
            }}
          >
            <H3>Screen Content</H3>
            <Body2>
              Full-screen content with comfortable 24px horizontal padding for
              readability.
            </Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="header" (16px padding)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="header"
            style={{
              backgroundColor: 'rgba(0, 150, 0, 0.1)',
              border: '1px solid rgba(0, 150, 0, 0.3)',
            }}
          >
            <H3>Header Content</H3>
            <Body2>
              Navigation/header areas with tighter 16px padding to maximize
              space.
            </Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="body" (24px padding)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            style={{
              backgroundColor: 'rgba(150, 0, 150, 0.1)',
              border: '1px solid rgba(150, 0, 150, 0.3)',
            }}
          >
            <H3>Body Content</H3>
            <Body2>
              Main content areas with standard 24px padding for optimal reading
              experience.
            </Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="footer" (16px padding)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="footer"
            style={{
              backgroundColor: 'rgba(200, 100, 0, 0.1)',
              border: '1px solid rgba(200, 100, 0, 0.3)',
            }}
          >
            <H3>Footer Content</H3>
            <Body2>
              Footer/action areas with compact 16px padding for efficient space
              usage.
            </Body2>
          </ContentWrapper>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different variants showing default padding values and intended usage contexts.',
      },
    },
  },
};

/**
 * Custom Padding Override
 */
export const CustomPadding: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="body" with default padding (24px)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            style={{
              backgroundColor: 'rgba(0, 100, 200, 0.1)',
              border: '1px solid rgba(0, 100, 200, 0.3)',
            }}
          >
            <Body2>Default body variant padding</Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="body" with paddingX="2" override (8px)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            paddingX="2"
            style={{
              backgroundColor: 'rgba(0, 150, 0, 0.1)',
              border: '1px solid rgba(0, 150, 0, 0.3)',
            }}
          >
            <Body2>Custom small padding overrides variant default</Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          variant="body" with paddingX="12" override (48px)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            paddingX="12"
            style={{
              backgroundColor: 'rgba(150, 0, 150, 0.1)',
              border: '1px solid rgba(150, 0, 150, 0.3)',
            }}
          >
            <Body2>Custom large padding overrides variant default</Body2>
          </ContentWrapper>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples showing how paddingX prop overrides variant default padding.',
      },
    },
  },
};

/**
 * Borderless and Nesting
 */
export const BorderlessNesting: Story = {
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
          Regular ContentWrapper (24px padding)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            style={{
              backgroundColor: 'rgba(0, 100, 200, 0.1)',
              border: '1px solid rgba(0, 100, 200, 0.3)',
            }}
          >
            <Body2>Regular ContentWrapper with standard padding</Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          borderless=true (0px padding)
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            borderless
            style={{
              backgroundColor: 'rgba(0, 150, 0, 0.1)',
              border: '1px solid rgba(0, 150, 0, 0.3)',
            }}
          >
            <Body2>Borderless ContentWrapper with no padding for nesting</Body2>
          </ContentWrapper>
        </Container>
      </div>

      <div>
        <Caption style={{ marginBottom: '0.5rem' }}>
          Nested ContentWrappers using borderless
        </Caption>
        <Container paddingY="4">
          <ContentWrapper
            variant="body"
            borderless
            style={{
              backgroundColor: 'rgba(200, 200, 200, 0.2)',
              border: '2px solid rgba(100, 100, 100, 0.3)',
            }}
          >
            <ContentWrapper
              variant="header"
              paddingX="4"
              style={{
                backgroundColor: 'rgba(0, 150, 0, 0.2)',
                border: '1px solid rgba(0, 150, 0, 0.4)',
                marginBottom: '1rem',
              }}
            >
              <Body2 style={{ fontWeight: 'bold' }}>
                Nested Header (16px padding)
              </Body2>
            </ContentWrapper>

            <ContentWrapper
              variant="body"
              paddingX="8"
              style={{
                backgroundColor: 'rgba(0, 100, 200, 0.2)',
                border: '1px solid rgba(0, 100, 200, 0.4)',
              }}
            >
              <Body2>Nested Body Content (32px padding)</Body2>
              <Body2>
                This shows how borderless allows clean nesting without padding
                conflicts.
              </Body2>
            </ContentWrapper>
          </ContentWrapper>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of borderless mode for nesting ContentWrappers without padding conflicts.',
      },
    },
  },
};

/**
 * Semantic HTML Elements
 */
export const SemanticElements: Story = {
  render: () => (
    <Container paddingY="0">
      <ContentWrapper
        variant="header"
        as="header"
        style={{
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          borderBottom: '1px solid rgba(0, 100, 200, 0.3)',
          marginBottom: '1rem',
        }}
      >
        <H3 style={{ margin: 0 }}>Site Header</H3>
        <Body2>Rendered as {`<header>`} element with header variant</Body2>
      </ContentWrapper>

      <ContentWrapper
        variant="body"
        as="main"
        style={{
          backgroundColor: 'rgba(0, 150, 0, 0.1)',
          border: '1px solid rgba(0, 150, 0, 0.3)',
          marginBottom: '1rem',
        }}
      >
        <H3 style={{ margin: '0 0 1rem 0' }}>Main Content</H3>
        <Body2>Rendered as {`<main>`} element with body variant</Body2>
        <Body2>
          This demonstrates semantic HTML usage with appropriate variants.
        </Body2>
      </ContentWrapper>

      <ContentWrapper
        variant="footer"
        as="footer"
        style={{
          backgroundColor: 'rgba(150, 0, 150, 0.1)',
          borderTop: '1px solid rgba(150, 0, 150, 0.3)',
        }}
      >
        <Body2 style={{ margin: 0 }}>
          Site Footer - Rendered as {`<footer>`} element with footer variant
        </Body2>
      </ContentWrapper>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ContentWrapper using semantic HTML elements that match their variant purposes.',
      },
    },
  },
};

/**
 * Real-world Layout Example
 */
export const RealWorldLayout: Story = {
  render: () => (
    <Container paddingY="0">
      {/* Header */}
      <ContentWrapper
        variant="header"
        as="header"
        style={{
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          borderBottom: '1px solid rgba(0, 100, 200, 0.2)',
        }}
      >
        <HStack space="6" justify="between" align="center">
          <H2 style={{ margin: 0 }}>Design System</H2>
          <HStack space="3">
            <Button variant="ghost" size="small">
              Docs
            </Button>
            <Button variant="ghost" size="small">
              Components
            </Button>
            <Button variant="primary" size="small">
              Get Started
            </Button>
          </HStack>
        </HStack>
      </ContentWrapper>

      {/* Hero Section */}
      <ContentWrapper
        variant="screen"
        as="section"
        style={{
          backgroundColor: 'rgba(0, 150, 0, 0.05)',
          padding: '4rem 0',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <H1>Build Consistent UIs</H1>
          <Body2 style={{ marginBottom: '2rem' }}>
            A comprehensive design system with layout components that handle
            spacing, so you can focus on building great experiences.
          </Body2>
          <HStack space="4" justify="center">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">View Docs</Button>
          </HStack>
        </div>
      </ContentWrapper>

      {/* Main Content */}
      <ContentWrapper variant="body" as="main">
        <H2>Features</H2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          <div>
            <H3>Layout System</H3>
            <Body2>
              Container + ContentWrapper provide a complete layout solution with
              vertical and horizontal spacing control.
            </Body2>
          </div>
          <div>
            <H3>Semantic Variants</H3>
            <Body2>
              Header, body, and footer variants with smart padding defaults for
              different content types.
            </Body2>
          </div>
          <div>
            <H3>Nestable</H3>
            <Body2>
              Borderless mode allows clean nesting without padding conflicts for
              complex layouts.
            </Body2>
          </div>
        </div>
      </ContentWrapper>

      {/* Footer */}
      <ContentWrapper
        variant="footer"
        as="footer"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          marginTop: '4rem',
        }}
      >
        <HStack space="6" justify="between" align="center">
          <Body2 style={{ margin: 0 }}>© 2024 Design System</Body2>
          <HStack space="4">
            <Button variant="ghost" size="small">
              Privacy
            </Button>
            <Button variant="ghost" size="small">
              Terms
            </Button>
            <Button variant="ghost" size="small">
              Support
            </Button>
          </HStack>
        </HStack>
      </ContentWrapper>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete page layout example showing how ContentWrapper variants work together to create a cohesive design.',
      },
    },
  },
};
