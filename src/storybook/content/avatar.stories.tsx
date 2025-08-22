// /src/storybook/content/avatar.stories.tsx
// Avatar component stories showcasing all variants and states
// Complete documentation for the Avatar component
// RELEVANT FILES: ../../ui/avatar/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Crown, Heart, Shield, Star } from 'lucide-react';
import { AvatarWithImage as Avatar } from '../../ui';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Avatar> = {
  title: 'Content/Avatar',
  component: Avatar,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Avatar component for displaying user profile pictures, initials, or fallback icons. Supports multiple sizes, shapes, status indicators, and automatic fallbacks.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the avatar image',
    },
    name: {
      control: 'text',
      description: 'Name for generating initials',
      defaultValue: 'John Doe',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
      defaultValue: 'md',
    },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square'],
      description: 'Shape variant of the avatar',
      defaultValue: 'circle',
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator for the avatar',
    },
    showStatus: {
      control: 'boolean',
      description: 'Whether to show the status indicator',
      defaultValue: false,
    },
  },
  args: {
    name: 'John Doe',
    size: 'md',
    variant: 'circle',
    showStatus: false,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default Avatar Story
 */
export const Default: Story = {
  decorators: [withCentered],
};

/**
 * Sizes Story
 * Demonstrates all available avatar sizes
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          alt="User"
          size="xs"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '12px',
          }}
        >
          XS
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face"
          alt="User"
          size="sm"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '12px',
          }}
        >
          SM
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          alt="User"
          size="md"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '12px',
          }}
        >
          MD
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
          alt="User"
          size="lg"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '12px',
          }}
        >
          LG
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
          alt="User"
          size="xl"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '12px',
          }}
        >
          XL
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available avatar sizes: xs (24px), sm (32px), md (40px), lg (48px), and xl (64px).',
      },
    },
  },
};

/**
 * Variants Story
 * Shows different shape variants
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          alt="Circle avatar"
          size="lg"
          variant="circle"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Circle
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          alt="Rounded avatar"
          size="lg"
          variant="rounded"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Rounded
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face"
          alt="Square avatar"
          size="lg"
          variant="square"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Square
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatar shape variants: circle (fully rounded), rounded (medium border radius), and square (small border radius).',
      },
    },
  },
};

/**
 * Status Indicators Story
 * Shows different status indicators
 */
export const StatusIndicators: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          alt="Online user"
          size="lg"
          showStatus
          status="online"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Online
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
          alt="Away user"
          size="lg"
          showStatus
          status="away"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Away
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
          alt="Busy user"
          size="lg"
          showStatus
          status="busy"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Busy
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          alt="Offline user"
          size="lg"
          showStatus
          status="offline"
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Offline
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Status indicators show user availability: online (green), away (yellow), busy (red), and offline (gray).',
      },
    },
  },
};

/**
 * Initials Fallback Story
 * Shows automatic initials generation
 */
export const InitialsFallback: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Ana García" size="lg" variant="circle" />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Ana García
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Pedro Martínez" size="lg" variant="rounded" />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Pedro Martínez
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="María López" size="lg" variant="square" />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          María López
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Carlos" size="lg" />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Single Name
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'When no image is provided, the avatar automatically generates initials from the name. For single names, it uses the first two characters.',
      },
    },
  },
};

/**
 * Custom Icons Story
 * Shows custom icon fallbacks
 */
export const CustomIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar size="lg" icon={Crown} />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Crown
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="lg" icon={Star} variant="rounded" />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Star
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="lg" icon={Heart} variant="square" />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Heart
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="lg" icon={Shield} />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '14px',
          }}
        >
          Shield
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Custom icons can be used as fallbacks when no image or name is provided. Any Lucide icon can be used.',
      },
    },
  },
};

/**
 * Group Display Story
 * Shows avatars in group layouts
 */
export const GroupDisplay: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Spaced Group</h4>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face"
            alt="User 1"
            size="sm"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="User 2"
            size="sm"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
            alt="User 3"
            size="sm"
          />
          <Avatar name="MR" size="sm" />
          <Avatar size="sm" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Overlapping Group</h4>
        <div
          style={{
            display: 'flex',
            marginLeft: '0.5rem',
          }}
        >
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            alt="User 1"
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 4,
              marginLeft: '-0.5rem',
            }}
          />
          <Avatar
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            alt="User 2"
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 3,
              marginLeft: '-0.5rem',
            }}
          />
          <Avatar
            name="LP"
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 2,
              marginLeft: '-0.5rem',
            }}
          />
          <Avatar
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 1,
              marginLeft: '-0.5rem',
            }}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatars can be displayed in groups, either spaced apart or overlapping for a stack effect.',
      },
    },
  },
};

/**
 * Profile Card Example Story
 * Shows avatar in a realistic context
 */
export const ProfileCardExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
        }}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          alt="Juan Pérez"
          size="md"
          showStatus
          status="online"
        />
        <div>
          <div
            style={{
              fontWeight: '500',
              marginBottom: '0.25rem',
            }}
          >
            Juan Pérez
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            Online
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
        }}
      >
        <Avatar name="Ana María González" size="md" showStatus status="away" />
        <div>
          <div
            style={{
              fontWeight: '500',
              marginBottom: '0.25rem',
            }}
          >
            Ana María González
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            Away
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
        }}
      >
        <Avatar size="md" icon={Shield} showStatus status="busy" />
        <div>
          <div
            style={{
              fontWeight: '500',
              marginBottom: '0.25rem',
            }}
          >
            Administrador
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            Busy
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of avatars used in profile cards or user lists with names and status.',
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
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User avatar',
    name: 'John Doe',
    size: 'lg',
    variant: 'circle',
    showStatus: true,
    status: 'online',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all avatar props and combinations. Try removing the src to see initials, or both src and name to see the icon fallback.',
      },
    },
  },
};
