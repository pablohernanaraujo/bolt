// /src/storybook/controls/link.stories.tsx
// Link component stories showcasing all variants, sizes and states
// Complete documentation for the Link component with typography integration
// RELEVANT FILES: ../../ui/link/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Download, Mail, Phone } from '../../icons';
import { Link } from '../../ui/link';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Link> = {
  title: 'Controls/Link',
  component: Link,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible Link component built with React Aria Components and complete typography system integration. Supports multiple variants, sizes, underline behavior, external link detection, and icon positioning with full keyboard navigation and screen reader support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'external', 'disabled'],
      description: 'Visual style variant of the link',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: [
        'caption',
        'body3',
        'body2',
        'body1',
        'h5',
        'h4',
        'h3',
        'h2',
        'h1',
      ],
      description: 'Typography size following design system scale',
      defaultValue: 'body2',
    },
    underlineBehavior: {
      control: { type: 'select' },
      options: ['none', 'hover', 'always'],
      description: 'Underline display behavior',
      defaultValue: 'hover',
    },
    emphasis: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Text emphasis level for visual hierarchy',
      defaultValue: 'high',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to the text',
      defaultValue: 'right',
    },
    isExternal: {
      control: 'boolean',
      description: 'Whether this is an external link',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
      defaultValue: false,
    },
    bold: {
      control: 'boolean',
      description: 'Makes the text bold',
      defaultValue: false,
    },
    italic: {
      control: 'boolean',
      description: 'Makes the text italic',
      defaultValue: false,
    },
    highlight: {
      control: 'boolean',
      description: 'Highlights the text with primary color background',
      defaultValue: false,
    },
    isTruncated: {
      control: 'boolean',
      description: 'Truncates text with ellipsis when it overflows',
      defaultValue: false,
    },
    href: {
      control: 'text',
      description: 'The URL the link should navigate to',
      defaultValue: '#example',
    },
    children: {
      control: 'text',
      description: 'Text content of the link',
      defaultValue: 'Example Link',
    },
  },
  args: {
    children: 'Example Link',
    href: '#example',
    variant: 'primary',
    size: 'body2',
    underlineBehavior: 'hover',
    emphasis: 'high',
    iconPosition: 'right',
    isExternal: false,
    isDisabled: false,
    bold: false,
    italic: false,
    highlight: false,
    isTruncated: false,
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * Default Link Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Variants Story
 * Showcases all available link variants
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Link variant="primary" href="#primary">
        Primary Link
      </Link>
      <Link variant="secondary" href="#secondary">
        Secondary Link
      </Link>
      <Link variant="external" href="https://external.com" isExternal>
        External Link
      </Link>
      <Link variant="disabled" isDisabled>
        Disabled Link
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available link variants: primary (main brand color), secondary (subtle), external (for external links with icon), and disabled (non-interactive).',
      },
    },
  },
};

/**
 * Typography Sizes Story
 * Demonstrates integration with typography system
 */
export const TypographySizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Link size="h1" href="#h1">
        H1 Link - 48px
      </Link>
      <Link size="h2" href="#h2">
        H2 Link - 36px
      </Link>
      <Link size="h3" href="#h3">
        H3 Link - 30px
      </Link>
      <Link size="h4" href="#h4">
        H4 Link - 24px
      </Link>
      <Link size="h5" href="#h5">
        H5 Link - 20px
      </Link>
      <Link size="body1" href="#body1">
        Body1 Link - 18px
      </Link>
      <Link size="body2" href="#body2">
        Body2 Link - 16px
      </Link>
      <Link size="body3" href="#body3">
        Body3 Link - 14px
      </Link>
      <Link size="caption" href="#caption">
        Caption Link - 12px
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Links integrate seamlessly with the typography system, inheriting consistent sizing, weights, and spacing from design tokens.',
      },
    },
  },
};

/**
 * Underline Behavior Story
 * Shows different underline display options
 */
export const UnderlineBehavior: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <Link underlineBehavior="none" href="#none">
        No Underline
      </Link>
      <Link underlineBehavior="hover" href="#hover">
        Underline on Hover
      </Link>
      <Link underlineBehavior="always" href="#always">
        Always Underlined
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Control when underlines are displayed: never, only on hover/focus, or always visible.',
      },
    },
  },
};

/**
 * Typography Modifiers Story
 * Shows typography style modifiers
 */
export const TypographyModifiers: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Link bold href="#bold">
        Bold Link
      </Link>
      <Link italic href="#italic">
        Italic Link
      </Link>
      <Link highlight href="#highlight">
        Highlighted Link
      </Link>
      <Link underline strikeThrough href="#strikethrough">
        Strikethrough Link
      </Link>
      <Link isTruncated href="#truncated" style={{ maxWidth: '150px' }}>
        This is a very long link that will be truncated
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Links support all typography modifiers: bold, italic, highlight, strikethrough, and truncation.',
      },
    },
  },
};

/**
 * Icons Story
 * Demonstrates icon usage and positioning
 */
export const Icons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2rem',
        }}
      >
        <Link icon={ArrowRight} iconPosition="right" href="#arrow">
          Link with Arrow
        </Link>
        <Link icon={Download} iconPosition="left" href="#download">
          Download File
        </Link>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
        }}
      >
        <Link icon={Mail} href="mailto:example@email.com">
          Send Email
        </Link>
        <Link icon={Phone} href="tel:+1234567890">
          Call Phone
        </Link>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Links support custom icons with flexible positioning. Icons scale with the text size and inherit text color.',
      },
    },
  },
};

/**
 * External Links Story
 * Shows external link handling and security attributes
 */
export const ExternalLinks: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Link href="https://github.com" isExternal>
        GitHub Repository
      </Link>
      <Link variant="external" href="https://docs.example.com" isExternal>
        External Documentation
      </Link>
      <Link
        href="https://api.example.com"
        isExternal
        underlineBehavior="always"
      >
        API Reference
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'External links automatically receive security attributes (target="_blank", rel="noopener noreferrer") and can display external link indicators.',
      },
    },
  },
};

/**
 * States Story
 * Different link states and interactions
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Link href="#normal">Normal State</Link>
      <Link href="#visited" style={{ color: 'purple' }}>
        Visited State (simulated)
      </Link>
      <Link
        href="#focus"
        style={{
          outline: '2px solid blue',
          outlineOffset: '2px',
        }}
      >
        Focused State (simulated)
      </Link>
      <Link isDisabled>Disabled State</Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Links provide clear visual feedback for different interaction states: normal, visited, focused, and disabled.',
      },
    },
  },
};

/**
 * Polymorphic Usage Story
 * Shows usage with different HTML elements
 */
export const PolymorphicUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Link href="#default">Default Anchor Element</Link>
      <Link as="button" onClick={() => alert('Button clicked!')}>
        Button with Link Style
      </Link>
      <Link as="span" role="link" tabIndex={0}>
        Span with Link Style
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The Link component is polymorphic and can render as different HTML elements while maintaining link styling.',
      },
    },
  },
};

/**
 * Context Examples Story
 * Shows links in different contexts
 */
export const ContextExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3
          style={{
            margin: '0 0 1rem 0',
            fontFamily: 'system-ui',
          }}
        >
          Navigation Links
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          <Link href="#home">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </div>

      <div>
        <h3
          style={{
            margin: '0 0 1rem 0',
            fontFamily: 'system-ui',
          }}
        >
          Inline Text Links
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: 'system-ui',
            lineHeight: 1.6,
          }}
        >
          This is a paragraph with an <Link href="#inline">inline link</Link>{' '}
          that flows naturally with the text. You can also have{' '}
          <Link href="https://external.com" isExternal>
            external links
          </Link>{' '}
          that open in new tabs.
        </p>
      </div>

      <div>
        <h3
          style={{
            margin: '0 0 1rem 0',
            fontFamily: 'system-ui',
          }}
        >
          Action Links
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <Link icon={Download} href="#download">
            Download Report
          </Link>
          <Link icon={ArrowRight} href="#learn-more">
            Learn More
          </Link>
          <Link variant="secondary" href="#cancel">
            Cancel Action
          </Link>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of links in different contexts: navigation menus, inline text, and action lists.',
      },
    },
  },
};

/**
 * Interactive Playground
 * Allows testing all props interactively
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    children: 'Playground Link',
    href: '#playground',
    variant: 'primary',
    size: 'body2',
    underlineBehavior: 'hover',
    emphasis: 'high',
    iconPosition: 'right',
    isExternal: false,
    isDisabled: false,
    bold: false,
    italic: false,
    highlight: false,
    isTruncated: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all Link props and combinations. Experiment with different variants, sizes, and modifiers.',
      },
    },
  },
};
