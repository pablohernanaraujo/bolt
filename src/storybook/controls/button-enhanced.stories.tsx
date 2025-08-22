// /src/storybook/controls/button-enhanced.stories.tsx
// Enhanced Button stories with comprehensive accessibility and interaction testing
// Includes focus management, keyboard navigation, and screen reader testing
// RELEVANT FILES: ../../ui/button/index.tsx, button.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { Download, Heart, Icon, Loader2, ChevronDown } from '../../icons';
import { Button } from '../../ui/button';
import { VStack, HStack, Container } from '../../ui/layout';
import { H2, H3, Body1, Body2 } from '../../ui/typography';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Button> = {
  title: 'Controls/Button (Enhanced)',
  component: Button,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Enhanced Button component documentation with comprehensive accessibility testing, interaction patterns, and real-world usage examples.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the button',
    },
  },
  args: {
    children: 'Enhanced Button',
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Comprehensive Button Showcase
 */
export const ComprehensiveShowcase: Story = {
  render: () => (
    <Container>
      <VStack gap="8">
        <div>
          <H2>Button Component Showcase</H2>
          <Body1>
            Complete demonstration of all button variants, sizes, and states with 
            accessibility considerations.
          </Body1>
        </div>

        <section aria-labelledby="variants-heading">
          <H3 id="variants-heading">Variants</H3>
          <HStack gap="4" style={{ flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </HStack>
        </section>

        <section aria-labelledby="sizes-heading">
          <H3 id="sizes-heading">Sizes</H3>
          <HStack gap="4" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </HStack>
        </section>

        <section aria-labelledby="states-heading">
          <H3 id="states-heading">States</H3>
          <HStack gap="4" style={{ flexWrap: 'wrap' }}>
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button aria-pressed="true">Pressed (Toggle)</Button>
            <Button aria-expanded="false">
              Expandable
              <Icon icon={ChevronDown} size="sm" />
            </Button>
          </HStack>
        </section>

        <section aria-labelledby="icons-heading">
          <H3 id="icons-heading">With Icons</H3>
          <VStack gap="3">
            <HStack gap="4" style={{ flexWrap: 'wrap' }}>
              <Button>
                <Icon icon={Download} size="sm" />
                Download
              </Button>
              <Button variant="secondary">
                <Icon icon={Heart} size="sm" />
                Favorite
              </Button>
              <Button variant="ghost">
                <Icon icon={Loader2} size="sm" className="animate-spin" />
                Loading
              </Button>
            </HStack>
            <Body2 style={{ color: '#666' }}>
              Icons should have appropriate size and spacing. Loading states should 
              include appropriate ARIA attributes.
            </Body2>
          </VStack>
        </section>

        <section aria-labelledby="accessibility-heading">
          <H3 id="accessibility-heading">Accessibility Features</H3>
          <VStack gap="3">
            <HStack gap="4" style={{ flexWrap: 'wrap' }}>
              <Button 
                aria-label="Save document"
                title="Save the current document (Ctrl+S)"
              >
                <Icon icon={Download} size="sm" />
              </Button>
              <Button 
                aria-describedby="save-help"
                variant="secondary"
              >
                Save with Help
              </Button>
              <Button 
                role="switch" 
                aria-checked="false"
                variant="ghost"
              >
                Toggle Setting
              </Button>
            </HStack>
            <Body2 id="save-help" style={{ color: '#666' }}>
              This button saves your changes. Unsaved changes will be lost if you navigate away.
            </Body2>
          </VStack>
        </section>
      </VStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all button features with accessibility best practices.',
      },
    },
  },
};

/**
 * Keyboard Navigation Test
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <Container>
      <VStack gap="6">
        <div>
          <H2>Keyboard Navigation</H2>
          <Body1>
            Test keyboard navigation with Tab, Space, and Enter keys. Focus indicators 
            should be clearly visible.
          </Body1>
        </div>

        <div role="group" aria-labelledby="button-group-label">
          <H3 id="button-group-label">Button Group</H3>
          <HStack gap="3" style={{ flexWrap: 'wrap' }}>
            <Button 
              data-testid="first-button"
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  const next = e.currentTarget.nextElementSibling as HTMLButtonElement;
                  next?.focus();
                }
              }}
            >
              First (→ to next)
            </Button>
            <Button 
              data-testid="second-button"
              variant="secondary"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  const prev = e.currentTarget.previousElementSibling as HTMLButtonElement;
                  prev?.focus();
                } else if (e.key === 'ArrowRight') {
                  const next = e.currentTarget.nextElementSibling as HTMLButtonElement;
                  next?.focus();
                }
              }}
            >
              Second (← →)
            </Button>
            <Button 
              data-testid="third-button"
              variant="ghost"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  const prev = e.currentTarget.previousElementSibling as HTMLButtonElement;
                  prev?.focus();
                }
              }}
            >
              Third (← to prev)
            </Button>
          </HStack>
        </div>

        <div>
          <H3>Focus Management</H3>
          <Body2>
            Buttons should have visible focus indicators and respond to both Space and Enter keys.
          </Body2>
        </div>
      </VStack>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that buttons are focusable
    const firstButton = canvas.getByTestId('first-button');
    const secondButton = canvas.getByTestId('second-button');
    const thirdButton = canvas.getByTestId('third-button');

    // Focus the first button
    await userEvent.tab();
    await expect(firstButton).toHaveFocus();

    // Tab to next button
    await userEvent.tab();
    await expect(secondButton).toHaveFocus();

    // Tab to third button
    await userEvent.tab();
    await expect(thirdButton).toHaveFocus();

    // Test Space key activation
    await userEvent.keyboard(' ');
    
    // Test Enter key activation
    await userEvent.keyboard('{Enter}');
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard navigation testing with arrow keys and focus management.',
      },
    },
  },
};

/**
 * Screen Reader Test
 */
export const ScreenReaderCompatibility: Story = {
  render: () => (
    <Container>
      <VStack gap="6">
        <div>
          <H2>Screen Reader Compatibility</H2>
          <Body1>
            Buttons with proper ARIA attributes for screen reader users.
          </Body1>
        </div>

        <section aria-labelledby="forms-heading">
          <H3 id="forms-heading">Form Buttons</H3>
          <form onSubmit={(e) => e.preventDefault()}>
            <VStack gap="3">
              <HStack gap="3">
                <Button type="submit" data-testid="submit-button">
                  Submit Form
                </Button>
                <Button type="reset" variant="secondary">
                  Reset Form
                </Button>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </HStack>
              <Body2 style={{ color: '#666' }}>
                Form buttons with appropriate type attributes for screen readers.
              </Body2>
            </VStack>
          </form>
        </section>

        <section aria-labelledby="toggle-heading">
          <H3 id="toggle-heading">Toggle Buttons</H3>
          <VStack gap="3">
            <HStack gap="3">
              <Button 
                role="switch"
                aria-checked="false"
                aria-labelledby="notifications-label"
                data-testid="toggle-button"
              >
                Enable Notifications
              </Button>
              <Button 
                aria-pressed="true"
                data-testid="pressed-button"
              >
                Bold (Pressed)
              </Button>
            </HStack>
            <Body2 id="notifications-label" style={{ color: '#666' }}>
              Toggle buttons announce their state to screen readers.
            </Body2>
          </VStack>
        </section>

        <section aria-labelledby="icon-heading">
          <H3 id="icon-heading">Icon-Only Buttons</H3>
          <HStack gap="3">
            <Button 
              aria-label="Download file"
              title="Download file"
              data-testid="icon-button"
            >
              <Icon icon={Download} size="md" />
            </Button>
            <Button 
              aria-label="Add to favorites"
              title="Add to favorites"
              variant="secondary"
            >
              <Icon icon={Heart} size="md" />
            </Button>
          </HStack>
        </section>
      </VStack>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that aria-label is present on icon-only buttons
    const iconButton = canvas.getByTestId('icon-button');
    await expect(iconButton).toHaveAttribute('aria-label', 'Download file');

    // Test that toggle button has proper aria-checked
    const toggleButton = canvas.getByTestId('toggle-button');
    await expect(toggleButton).toHaveAttribute('aria-checked', 'false');

    // Test that pressed button has proper aria-pressed
    const pressedButton = canvas.getByTestId('pressed-button');
    await expect(pressedButton).toHaveAttribute('aria-pressed', 'true');

    // Test that submit button has proper type
    const submitButton = canvas.getByTestId('submit-button');
    await expect(submitButton).toHaveAttribute('type', 'submit');
  },
  parameters: {
    docs: {
      description: {
        story: 'Screen reader compatibility with proper ARIA attributes and semantic HTML.',
      },
    },
  },
};

/**
 * Loading States
 */
export const LoadingStates: Story = {
  render: () => (
    <Container>
      <VStack gap="6">
        <div>
          <H2>Loading States</H2>
          <Body1>
            Proper handling of loading states with accessibility considerations.
          </Body1>
        </div>

        <HStack gap="4" style={{ flexWrap: 'wrap' }}>
          <Button 
            disabled
            aria-busy="true"
            aria-describedby="loading-description"
          >
            <Icon icon={Loader2} size="sm" className="animate-spin" />
            Loading...
          </Button>
          <Button 
            disabled
            aria-busy="true"
            variant="secondary"
          >
            <Icon icon={Loader2} size="sm" className="animate-spin" />
            Saving
          </Button>
          <Button 
            disabled
            aria-busy="true"
            variant="ghost"
          >
            Processing
          </Button>
        </HStack>

        <Body2 id="loading-description" style={{ color: '#666' }}>
          Loading buttons should be disabled and include aria-busy="true" for screen readers.
        </Body2>
      </VStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states with proper accessibility attributes.',
      },
    },
  },
};

/**
 * Interactive Playground with Validation
 */
export const InteractivePlayground: Story = {
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    type: 'button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test that button renders with correct props
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent(args.children as string);
    
    if (args.disabled) {
      await expect(button).toBeDisabled();
    } else {
      await expect(button).not.toBeDisabled();
      
      // Test click interaction
      await userEvent.click(button);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with automated testing to validate props and interactions.',
      },
    },
  },
};