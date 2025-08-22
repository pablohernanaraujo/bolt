// /src/storybook/controls/icon-button.stories.tsx
// IconButton component stories showcasing all variants and states
// Complete documentation for the IconButton component
// RELEVANT FILES: ../../ui/icon-button/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  Bell,
  Download,
  Edit,
  Heart,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share,
  Trash2,
} from '../../icons';
import { IconButton } from '../../ui/icon-button';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof IconButton> = {
  title: 'Controls/IconButton',
  component: IconButton,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible icon button component built with React Aria Components. Optimized for icon-only usage with proper accessibility. Supports multiple variants, sizes, and states with full keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant of the icon button',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the icon button',
      defaultValue: 'medium',
    },
    icon: {
      control: false,
      description: 'The Lucide icon component to display',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 16, 20, 24, 32],
      description: 'Size of the icon within the button',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers (required)',
      defaultValue: 'Icon button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
  },
  args: {
    icon: Heart,
    variant: 'primary',
    size: 'medium',
    'aria-label': 'Like',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Default IconButton Story
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
      }}
    >
      <IconButton icon={Heart} variant="primary" aria-label="Like - Primary" />
      <IconButton
        icon={Download}
        variant="secondary"
        aria-label="Download - Secondary"
      />
      <IconButton
        icon={Settings}
        variant="ghost"
        aria-label="Settings - Ghost"
      />
      <IconButton icon={Trash2} variant="danger" aria-label="Delete - Danger" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available icon button variants: primary, secondary, ghost, and danger.',
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
      <IconButton
        icon={Heart}
        variant="primary"
        size="small"
        aria-label="Small like button"
      />
      <IconButton
        icon={Heart}
        variant="primary"
        size="medium"
        aria-label="Medium like button"
      />
      <IconButton
        icon={Heart}
        variant="primary"
        size="large"
        aria-label="Large like button"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available icon button sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * Different Icons Story
 */
export const DifferentIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <IconButton icon={Plus} variant="primary" aria-label="Add" />
      <IconButton icon={Edit} variant="secondary" aria-label="Edit" />
      <IconButton icon={Share} variant="ghost" aria-label="Share" />
      <IconButton icon={Search} variant="ghost" aria-label="Search" />
      <IconButton icon={Bell} variant="ghost" aria-label="Notifications" />
      <IconButton
        icon={MoreHorizontal}
        variant="ghost"
        aria-label="More options"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon buttons with different icons to show versatility. Uses various Lucide React icons.',
      },
    },
  },
};

/**
 * Custom Icon Sizes Story
 */
export const CustomIconSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <IconButton
        icon={Heart}
        variant="primary"
        size="medium"
        iconSize="xs"
        aria-label="Extra small icon"
      />
      <IconButton
        icon={Heart}
        variant="primary"
        size="medium"
        iconSize="sm"
        aria-label="Small icon"
      />
      <IconButton
        icon={Heart}
        variant="primary"
        size="medium"
        iconSize="md"
        aria-label="Medium icon (default)"
      />
      <IconButton
        icon={Heart}
        variant="primary"
        size="medium"
        iconSize="lg"
        aria-label="Large icon"
      />
      <IconButton
        icon={Heart}
        variant="primary"
        size="medium"
        iconSize={32}
        aria-label="Custom 32px icon"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon buttons with custom icon sizes. You can override the default icon size for each button size.',
      },
    },
  },
};

/**
 * States Story
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <IconButton icon={Heart} variant="primary" aria-label="Normal state" />
      <IconButton
        icon={Heart}
        variant="primary"
        isDisabled
        aria-label="Disabled state"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon button states: normal and disabled.',
      },
    },
  },
};

/**
 * Accessibility Story
 */
export const Accessibility: Story = {
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
          fontSize: '14px',
          marginBottom: '0.5rem',
          color: '#666',
        }}
      >
        All icon buttons require descriptive aria-label for screen readers:
      </div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <IconButton
          icon={Plus}
          variant="primary"
          aria-label="Add new item to the list"
        />
        <IconButton
          icon={Edit}
          variant="secondary"
          aria-label="Edit this document"
        />
        <IconButton
          icon={Trash2}
          variant="danger"
          aria-label="Delete permanently"
        />
        <IconButton
          icon={Share}
          variant="ghost"
          aria-label="Share with others"
        />
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#666',
        }}
      >
        Focus these buttons with Tab key to see focus indicators.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features: all icon buttons require descriptive aria-label attributes for screen readers. Focus management and keyboard navigation are handled automatically.',
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
    icon: Heart,
    variant: 'primary',
    size: 'medium',
    'aria-label': 'Playground button',
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all icon button props and combinations.',
      },
    },
  },
};
