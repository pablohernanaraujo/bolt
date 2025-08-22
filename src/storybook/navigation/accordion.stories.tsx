// /src/storybook/navigation/accordion.stories.tsx
// Accordion component stories showcasing all variants and features
// Complete documentation for the Accordion component
// RELEVANT FILES: ../../ui/accordion/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import {
  FileText,
  Heart,
  Icon,
  Settings,
  Shield,
  Star,
  Users,
} from '../../icons';
import { Accordion, AccordionItem } from '../../ui/accordion';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Accordion> = {
  title: 'Navigation/Accordion',
  component: Accordion,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible accordion component for expanding and collapsing content sections. Supports single/multiple selection, keyboard navigation, and various visual styles.',
      },
    },
  },
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Whether single or multiple items can be expanded',
      defaultValue: 'single',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'separated'],
      description: 'Visual style variant of the accordion',
      defaultValue: 'default',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the accordion',
      defaultValue: 'medium',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the accordion takes full width',
      defaultValue: true,
    },
    allowAllClosed: {
      control: 'boolean',
      description: 'In single mode, whether all items can be collapsed',
      defaultValue: true,
    },
    disableAnimation: {
      control: 'boolean',
      description: 'Disable expand/collapse animations',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/**
 * Default accordion with single selection mode
 */
export const Default: Story = {
  args: {
    selectionMode: 'single',
    variant: 'default',
    size: 'medium',
    fullWidth: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="item-1" title="What is React?">
        React is a JavaScript library for building user interfaces, particularly
        web applications with complex, interactive UIs. It was developed by
        Facebook and is now maintained by Meta and the open-source community.
      </AccordionItem>
      <AccordionItem id="item-2" title="Why use TypeScript?">
        TypeScript adds static typing to JavaScript, helping catch errors early
        in development, improving code maintainability, and providing better IDE
        support with features like auto-completion and refactoring.
      </AccordionItem>
      <AccordionItem id="item-3" title="What are design tokens?">
        Design tokens are the visual design atoms of the design system —
        specifically, they are named entities that store visual design
        attributes. They help maintain consistency across different platforms
        and technologies.
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion with multiple items that can be expanded simultaneously
 */
export const MultipleSelection: Story = {
  args: {
    selectionMode: 'multiple',
    variant: 'default',
    size: 'medium',
    defaultExpandedKeys: ['feature-1', 'feature-3'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="feature-1" title="Component Library">
        Our component library provides a comprehensive set of UI components
        built with accessibility and performance in mind. Each component follows
        consistent design patterns and API conventions.
      </AccordionItem>
      <AccordionItem id="feature-2" title="Design System">
        The design system includes design tokens, typography scales, color
        palettes, spacing units, and other foundational elements that ensure
        visual consistency across all applications.
      </AccordionItem>
      <AccordionItem id="feature-3" title="Documentation">
        Comprehensive documentation with live examples, API references, and best
        practices helps developers quickly understand and implement components
        in their applications.
      </AccordionItem>
      <AccordionItem id="feature-4" title="Accessibility">
        All components are built with WCAG 2.1 AA compliance in mind, featuring
        proper ARIA attributes, keyboard navigation, and screen reader support
        out of the box.
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion items with icons for better visual hierarchy
 */
export const WithIcons: Story = {
  args: {
    variant: 'bordered',
    size: 'medium',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem
        id="docs"
        title="Documentation"
        icon={<Icon icon={FileText} size="sm" />}
      >
        Access comprehensive documentation including API references, usage
        examples, and implementation guides for all components in the design
        system.
      </AccordionItem>
      <AccordionItem
        id="settings"
        title="Settings"
        icon={<Icon icon={Settings} size="sm" />}
      >
        Configure your preferences, notification settings, appearance options,
        and other account-related configurations to customize your experience.
      </AccordionItem>
      <AccordionItem
        id="team"
        title="Team Management"
        icon={<Icon icon={Users} size="sm" />}
      >
        Manage team members, assign roles and permissions, invite new
        collaborators, and organize your team structure for optimal
        collaboration.
      </AccordionItem>
      <AccordionItem
        id="security"
        title="Security"
        icon={<Icon icon={Shield} size="sm" />}
      >
        Review security settings, enable two-factor authentication, manage API
        keys, and monitor access logs to keep your account secure.
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Different visual variants for various use cases
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3>Default Variant</h3>
        <Accordion variant="default">
          <AccordionItem id="default-1" title="Default Style Item 1">
            Simple border-bottom style for minimal visual footprint.
          </AccordionItem>
          <AccordionItem id="default-2" title="Default Style Item 2">
            Clean appearance that works well in most contexts.
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Bordered Variant</h3>
        <Accordion variant="bordered">
          <AccordionItem id="bordered-1" title="Bordered Style Item 1">
            Fully bordered with rounded corners for a contained look.
          </AccordionItem>
          <AccordionItem id="bordered-2" title="Bordered Style Item 2">
            Provides clear visual boundaries between accordion and surrounding
            content.
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Separated Variant</h3>
        <Accordion variant="separated">
          <AccordionItem id="separated-1" title="Separated Style Item 1">
            Each item appears as a separate card with shadow.
          </AccordionItem>
          <AccordionItem id="separated-2" title="Separated Style Item 2">
            Maximum visual distinction between items for emphasis.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

/**
 * Different size options for various contexts
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3>Small Size</h3>
        <Accordion size="small" variant="bordered">
          <AccordionItem id="small-1" title="Small Accordion">
            Compact size suitable for dense interfaces or sidebar navigation.
          </AccordionItem>
          <AccordionItem id="small-2" title="Another Small Item">
            Takes up less vertical space while maintaining readability.
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Medium Size (Default)</h3>
        <Accordion size="medium" variant="bordered">
          <AccordionItem id="medium-1" title="Medium Accordion">
            Standard size that works well for most use cases.
          </AccordionItem>
          <AccordionItem id="medium-2" title="Another Medium Item">
            Balanced spacing and font size for optimal readability.
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Large Size</h3>
        <Accordion size="large" variant="bordered">
          <AccordionItem id="large-1" title="Large Accordion">
            Larger size for emphasis or touch-friendly interfaces.
          </AccordionItem>
          <AccordionItem id="large-2" title="Another Large Item">
            More prominent with increased padding and font size.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

/**
 * Controlled accordion with external state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = (): ReactElement => {
      const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
        new Set(['controlled-1']),
      );

      return (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Expanded items:</strong>{' '}
            {expandedKeys.size > 0
              ? Array.from(expandedKeys).join(', ')
              : 'None'}
          </div>

          <div
            style={{
              marginBottom: '1rem',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <button
              onClick={() =>
                setExpandedKeys(
                  new Set(['controlled-1', 'controlled-2', 'controlled-3']),
                )
              }
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Expand All
            </button>
            <button
              onClick={() => setExpandedKeys(new Set())}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Collapse All
            </button>
            <button
              onClick={() => setExpandedKeys(new Set(['controlled-2']))}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Expand Only Item 2
            </button>
          </div>

          <Accordion
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
            selectionMode="multiple"
            variant="bordered"
          >
            <AccordionItem id="controlled-1" title="Controlled Item 1">
              This accordion's expanded state is controlled externally.
            </AccordionItem>
            <AccordionItem id="controlled-2" title="Controlled Item 2">
              You can programmatically expand or collapse items using buttons.
            </AccordionItem>
            <AccordionItem id="controlled-3" title="Controlled Item 3">
              Useful for implementing wizards or step-by-step processes.
            </AccordionItem>
          </Accordion>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Accordion with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    variant: 'bordered',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="active-1" title="Active Item 1">
        This item can be expanded and collapsed normally.
      </AccordionItem>
      <AccordionItem
        id="disabled-1"
        title="Disabled Item (Premium Feature)"
        isDisabled
      >
        This content is not accessible because the item is disabled.
      </AccordionItem>
      <AccordionItem id="active-2" title="Active Item 2">
        Another active item that works normally.
      </AccordionItem>
      <AccordionItem
        id="disabled-2"
        title="Disabled Item (Coming Soon)"
        isDisabled
      >
        This feature is coming soon and currently disabled.
      </AccordionItem>
      <AccordionItem id="active-3" title="Active Item 3">
        The last active item in this accordion.
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion without animations for reduced motion preference
 */
export const NoAnimation: Story = {
  args: {
    disableAnimation: true,
    variant: 'bordered',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="no-anim-1" title="Item without animation">
        This accordion expands and collapses instantly without any animation.
        Useful for users who prefer reduced motion.
      </AccordionItem>
      <AccordionItem id="no-anim-2" title="Another item">
        All transitions are disabled when disableAnimation is true.
      </AccordionItem>
      <AccordionItem id="no-anim-3" title="Third item">
        This respects the user's motion preferences for accessibility.
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Complex nested content example
 */
export const ComplexContent: Story = {
  args: {
    variant: 'separated',
    size: 'large',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem
        id="overview"
        title="Product Overview"
        icon={<Icon icon={Star} size="sm" />}
      >
        <div style={{ padding: '1rem 0' }}>
          <h4>Key Features</h4>
          <ul
            style={{
              marginTop: '0.5rem',
              paddingLeft: '1.5rem',
            }}
          >
            <li>Advanced analytics dashboard</li>
            <li>Real-time collaboration tools</li>
            <li>AI-powered insights</li>
            <li>Custom reporting capabilities</li>
          </ul>

          <h4 style={{ marginTop: '1rem' }}>Benefits</h4>
          <p style={{ marginTop: '0.5rem' }}>
            Our platform helps teams work more efficiently by providing powerful
            tools for project management, communication, and data analysis.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        id="pricing"
        title="Pricing Plans"
        icon={<Icon icon={Heart} size="sm" />}
      >
        <div style={{ padding: '1rem 0' }}>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
            }}
          >
            <div
              style={{
                padding: '1rem',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            >
              <h4>Starter - $9/month</h4>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                }}
              >
                Perfect for individuals and small teams just getting started.
              </p>
            </div>
            <div
              style={{
                padding: '1rem',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            >
              <h4>Professional - $29/month</h4>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                }}
              >
                Advanced features for growing teams and businesses.
              </p>
            </div>
            <div
              style={{
                padding: '1rem',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            >
              <h4>Enterprise - Custom</h4>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                }}
              >
                Tailored solutions for large organizations with specific needs.
              </p>
            </div>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Using items prop instead of children
 */
export const WithItemsProp: Story = {
  args: {
    variant: 'bordered',
    items: [
      {
        id: 'item-prop-1',
        title: 'First Item via Props',
        children: 'Content for the first item passed through the items prop.',
      },
      {
        id: 'item-prop-2',
        title: 'Second Item via Props',
        children:
          'Content for the second item. This approach is useful for dynamic content.',
      },
      {
        id: 'item-prop-3',
        title: 'Third Item via Props',
        children:
          'The items prop allows for easier programmatic generation of accordion items.',
        isDisabled: true,
      },
    ],
  },
};
