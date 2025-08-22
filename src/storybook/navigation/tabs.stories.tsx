// /src/storybook/navigation/tabs.stories.tsx
// Tabs component stories showcasing all variants and features
// Complete documentation for the Tabs component
// RELEVANT FILES: ../../ui/tabs/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import {
  Bell,
  Calendar,
  Camera,
  Download,
  FileText,
  Folder,
  Heart,
  Home,
  Icon,
  Mail,
  Music,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from '../../icons';
import { Badge, Body1, Button, HStack, VStack } from '../../ui';
import { Tabs } from '../../ui/tabs';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Tabs.Root> = {
  title: 'Navigation/Tabs',
  component: Tabs.Root,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible tabs component for organizing content into switchable panels. Built with React Aria Components with support for keyboard navigation, multiple variants, and orientations.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for all tabs in the group',
      defaultValue: 'medium',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'enclosed', 'soft-rounded', 'unstyled'],
      description: 'Visual variant for the tabs',
      defaultValue: 'default',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the tabs',
      defaultValue: 'horizontal',
    },
    isFitted: {
      control: 'boolean',
      description: 'Whether tabs should be fitted to container',
      defaultValue: false,
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment of tab list',
      defaultValue: 'start',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

/**
 * Default tabs with basic configuration
 */
export const Default: Story = {
  args: {
    size: 'medium',
    variant: 'default',
    orientation: 'horizontal',
    isFitted: false,
    align: 'start',
  },
  render: (args) => (
    <Tabs.Root {...args} defaultSelectedKey="home">
      <Tabs.List>
        <Tabs.Trigger id="home">
          <Icon icon={Home} size="sm" />
          Home
        </Tabs.Trigger>
        <Tabs.Trigger id="users">
          <Icon icon={Users} size="sm" />
          Users
        </Tabs.Trigger>
        <Tabs.Trigger id="settings">
          <Icon icon={Settings} size="sm" />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="home">
        <Body1>
          Welcome to the home panel! This is where you'll find your dashboard
          and overview.
        </Body1>
      </Tabs.Content>
      <Tabs.Content id="users">
        <Body1>
          Manage users, permissions, and user settings in this panel.
        </Body1>
      </Tabs.Content>
      <Tabs.Content id="settings">
        <Body1>Configure application settings and preferences here.</Body1>
      </Tabs.Content>
    </Tabs.Root>
  ),
};

/**
 * Different size variants for various contexts
 */
export const Sizes: Story = {
  render: () => (
    <VStack space="8">
      <div>
        <h3>Small</h3>
        <Tabs.Root size="small" defaultSelectedKey="tab1">
          <Tabs.List>
            <Tabs.Trigger id="tab1">First</Tabs.Trigger>
            <Tabs.Trigger id="tab2">Second</Tabs.Trigger>
            <Tabs.Trigger id="tab3">Third</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab1">Small tab content</Tabs.Content>
          <Tabs.Content id="tab2">Content for small tab 2</Tabs.Content>
          <Tabs.Content id="tab3">Content for small tab 3</Tabs.Content>
        </Tabs.Root>
      </div>

      <div>
        <h3>Medium (Default)</h3>
        <Tabs.Root size="medium" defaultSelectedKey="tab1">
          <Tabs.List>
            <Tabs.Trigger id="tab1">First</Tabs.Trigger>
            <Tabs.Trigger id="tab2">Second</Tabs.Trigger>
            <Tabs.Trigger id="tab3">Third</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab1">Medium tab content</Tabs.Content>
          <Tabs.Content id="tab2">Content for medium tab 2</Tabs.Content>
          <Tabs.Content id="tab3">Content for medium tab 3</Tabs.Content>
        </Tabs.Root>
      </div>

      <div>
        <h3>Large</h3>
        <Tabs.Root size="large" defaultSelectedKey="tab1">
          <Tabs.List>
            <Tabs.Trigger id="tab1">First</Tabs.Trigger>
            <Tabs.Trigger id="tab2">Second</Tabs.Trigger>
            <Tabs.Trigger id="tab3">Third</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab1">Large tab content</Tabs.Content>
          <Tabs.Content id="tab2">Content for large tab 2</Tabs.Content>
          <Tabs.Content id="tab3">Content for large tab 3</Tabs.Content>
        </Tabs.Root>
      </div>
    </VStack>
  ),
};

/**
 * Different visual variants for various use cases
 */
export const Variants: Story = {
  render: () => (
    <VStack space="8">
      <div>
        <h3>Default</h3>
        <Tabs.Root variant="default" defaultSelectedKey="home">
          <Tabs.List>
            <Tabs.Trigger id="home">Home</Tabs.Trigger>
            <Tabs.Trigger id="about">About</Tabs.Trigger>
            <Tabs.Trigger id="contact">Contact</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="home">Default styled content</Tabs.Content>
          <Tabs.Content id="about">About us content</Tabs.Content>
          <Tabs.Content id="contact">Contact information</Tabs.Content>
        </Tabs.Root>
      </div>

      <div>
        <h3>Enclosed</h3>
        <Tabs.Root variant="enclosed" defaultSelectedKey="home">
          <Tabs.List>
            <Tabs.Trigger id="home">Home</Tabs.Trigger>
            <Tabs.Trigger id="about">About</Tabs.Trigger>
            <Tabs.Trigger id="contact">Contact</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="home">Enclosed tab styling</Tabs.Content>
          <Tabs.Content id="about">About us content</Tabs.Content>
          <Tabs.Content id="contact">Contact information</Tabs.Content>
        </Tabs.Root>
      </div>

      <div>
        <h3>Soft Rounded</h3>
        <Tabs.Root variant="soft-rounded" defaultSelectedKey="home">
          <Tabs.List>
            <Tabs.Trigger id="home">Home</Tabs.Trigger>
            <Tabs.Trigger id="about">About</Tabs.Trigger>
            <Tabs.Trigger id="contact">Contact</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="home">Soft rounded styling</Tabs.Content>
          <Tabs.Content id="about">About us content</Tabs.Content>
          <Tabs.Content id="contact">Contact information</Tabs.Content>
        </Tabs.Root>
      </div>
    </VStack>
  ),
};

/**
 * Tabs with icons for better visual recognition
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs.Root defaultSelectedKey="music" variant="enclosed">
      <Tabs.List>
        <Tabs.Trigger id="music">
          <Icon icon={Music} size="sm" />
          Music
        </Tabs.Trigger>
        <Tabs.Trigger id="photos">
          <Icon icon={Camera} size="sm" />
          Photos
        </Tabs.Trigger>
        <Tabs.Trigger id="files">
          <Icon icon={Folder} size="sm" />
          Files
        </Tabs.Trigger>
        <Tabs.Trigger id="settings">
          <Icon icon={Settings} size="sm" />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="music">Your music library and playlists</Tabs.Content>
      <Tabs.Content id="photos">Photo gallery and albums</Tabs.Content>
      <Tabs.Content id="files">File management and storage</Tabs.Content>
      <Tabs.Content id="settings">
        Application preferences and configuration
      </Tabs.Content>
    </Tabs.Root>
  ),
};

/**
 * Tabs with badges showing counts or status
 */
export const WithBadges: Story = {
  render: () => (
    <Tabs.Root defaultSelectedKey="inbox" variant="soft-rounded">
      <Tabs.List>
        <Tabs.Trigger id="inbox">
          <Icon icon={Mail} size="sm" />
          Inbox
          <Badge variant="solid" size="small">
            3
          </Badge>
        </Tabs.Trigger>
        <Tabs.Trigger id="favorites">
          <Icon icon={Heart} size="sm" />
          Favorites
        </Tabs.Trigger>
        <Tabs.Trigger id="downloads">
          <Icon icon={Download} size="sm" />
          Downloads
          <Badge variant="subtle" size="small">
            12
          </Badge>
        </Tabs.Trigger>
        <Tabs.Trigger id="notifications">
          <Icon icon={Bell} size="sm" />
          Notifications
          <Badge variant="subtle" size="small">
            2
          </Badge>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="inbox">
        <Body1>You have 3 unread messages in your inbox</Body1>
      </Tabs.Content>
      <Tabs.Content id="favorites">
        <Body1>Your bookmarked and favorite content appears here</Body1>
      </Tabs.Content>
      <Tabs.Content id="downloads">
        <Body1>Recent downloads and offline content</Body1>
      </Tabs.Content>
      <Tabs.Content id="notifications">
        <Body1>System notifications and alerts</Body1>
      </Tabs.Content>
    </Tabs.Root>
  ),
};

/**
 * Vertical orientation for sidebar-style navigation
 */
export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        maxWidth: '600px',
        minHeight: '300px',
      }}
    >
      <Tabs.Root
        orientation="vertical"
        variant="enclosed"
        defaultSelectedKey="account"
        style={{ width: '100%' }}
      >
        <Tabs.List style={{ width: '200px' }}>
          <Tabs.Trigger id="account">
            <Icon icon={Users} size="sm" />
            Account
          </Tabs.Trigger>
          <Tabs.Trigger id="notifications">
            <Icon icon={Bell} size="sm" />
            Notifications
            <Badge variant="subtle" size="small">
              2
            </Badge>
          </Tabs.Trigger>
          <Tabs.Trigger id="security">
            <Icon icon={Settings} size="sm" />
            Security
          </Tabs.Trigger>
          <Tabs.Trigger id="billing">
            <Icon icon={ShoppingCart} size="sm" />
            Billing
          </Tabs.Trigger>
          <Tabs.Trigger id="advanced" isDisabled>
            <Icon icon={FileText} size="sm" />
            Advanced
          </Tabs.Trigger>
        </Tabs.List>
        <div style={{ flex: 1 }}>
          <Tabs.Content id="account">
            <VStack space="4">
              <h3>Account Settings</h3>
              <Body1>
                Manage your profile information and account preferences.
              </Body1>
              <Button variant="primary">Update Profile</Button>
            </VStack>
          </Tabs.Content>
          <Tabs.Content id="notifications">
            <VStack space="4">
              <h3>Notification Preferences</h3>
              <Body1>Control how and when you receive notifications.</Body1>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: '8px',
                }}
              >
                <Body1>📬 You have 2 new notification settings to review</Body1>
              </div>
            </VStack>
          </Tabs.Content>
          <Tabs.Content id="security">
            <VStack space="4">
              <h3>Security Settings</h3>
              <Body1>
                Manage your password, two-factor authentication, and security
                preferences.
              </Body1>
              <HStack space="4">
                <Button variant="primary">Change Password</Button>
                <Button variant="secondary">Setup 2FA</Button>
              </HStack>
            </VStack>
          </Tabs.Content>
          <Tabs.Content id="billing">
            <VStack space="4">
              <h3>Billing & Subscription</h3>
              <Body1>
                View your billing information and manage your subscription.
              </Body1>
              <Button variant="primary">View Invoices</Button>
            </VStack>
          </Tabs.Content>
          <Tabs.Content id="advanced">
            <VStack space="4">
              <h3>Advanced Settings</h3>
              <Body1>Advanced configuration options for power users.</Body1>
            </VStack>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  ),
};

/**
 * Fitted tabs that expand to fill container width
 */
export const Fitted: Story = {
  render: () => (
    <Tabs.Root isFitted defaultSelectedKey="overview">
      <Tabs.List>
        <Tabs.Trigger id="overview">
          <Icon icon={Home} size="sm" />
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger id="products">
          <Icon icon={Package} size="sm" />
          Products
        </Tabs.Trigger>
        <Tabs.Trigger id="orders">
          <Icon icon={ShoppingCart} size="sm" />
          Orders
        </Tabs.Trigger>
        <Tabs.Trigger id="customers">
          <Icon icon={Users} size="sm" />
          Customers
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="overview">
        <Body1>Business overview and key metrics</Body1>
      </Tabs.Content>
      <Tabs.Content id="products">
        <Body1>Product catalog and inventory management</Body1>
      </Tabs.Content>
      <Tabs.Content id="orders">
        <Body1>Order processing and fulfillment</Body1>
      </Tabs.Content>
      <Tabs.Content id="customers">
        <Body1>Customer management and support</Body1>
      </Tabs.Content>
    </Tabs.Root>
  ),
};

/**
 * Tabs with different alignment options
 */
export const Alignment: Story = {
  render: () => (
    <VStack space="8">
      <div>
        <h3>Start Aligned (Default)</h3>
        <Tabs.Root align="start" defaultSelectedKey="tab1">
          <Tabs.List>
            <Tabs.Trigger id="tab1">First</Tabs.Trigger>
            <Tabs.Trigger id="tab2">Second</Tabs.Trigger>
            <Tabs.Trigger id="tab3">Third</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab1">Start aligned content</Tabs.Content>
          <Tabs.Content id="tab2">Second tab content</Tabs.Content>
          <Tabs.Content id="tab3">Third tab content</Tabs.Content>
        </Tabs.Root>
      </div>

      <div>
        <h3>Center Aligned</h3>
        <Tabs.Root align="center" defaultSelectedKey="tab1">
          <Tabs.List>
            <Tabs.Trigger id="tab1">First</Tabs.Trigger>
            <Tabs.Trigger id="tab2">Second</Tabs.Trigger>
            <Tabs.Trigger id="tab3">Third</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab1">Center aligned content</Tabs.Content>
          <Tabs.Content id="tab2">Second tab content</Tabs.Content>
          <Tabs.Content id="tab3">Third tab content</Tabs.Content>
        </Tabs.Root>
      </div>

      <div>
        <h3>End Aligned</h3>
        <Tabs.Root align="end" defaultSelectedKey="tab1">
          <Tabs.List>
            <Tabs.Trigger id="tab1">First</Tabs.Trigger>
            <Tabs.Trigger id="tab2">Second</Tabs.Trigger>
            <Tabs.Trigger id="tab3">Third</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab1">End aligned content</Tabs.Content>
          <Tabs.Content id="tab2">Second tab content</Tabs.Content>
          <Tabs.Content id="tab3">Third tab content</Tabs.Content>
        </Tabs.Root>
      </div>
    </VStack>
  ),
};

/**
 * Controlled tabs with external state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = (): ReactElement => {
      const [selectedTab, setSelectedTab] = useState('tab1');

      return (
        <VStack space="4">
          <div>
            <strong>Current tab:</strong> {selectedTab}
          </div>

          <HStack space="4">
            <Button
              variant={selectedTab === 'tab1' ? 'primary' : 'secondary'}
              onClick={() => setSelectedTab('tab1')}
            >
              Select Tab 1
            </Button>
            <Button
              variant={selectedTab === 'tab2' ? 'primary' : 'secondary'}
              onClick={() => setSelectedTab('tab2')}
            >
              Select Tab 2
            </Button>
            <Button
              variant={selectedTab === 'tab3' ? 'primary' : 'secondary'}
              onClick={() => setSelectedTab('tab3')}
            >
              Select Tab 3
            </Button>
          </HStack>

          <Tabs.Root
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="enclosed"
          >
            <Tabs.List>
              <Tabs.Trigger id="tab1">
                <Icon icon={Home} size="sm" />
                First Tab
              </Tabs.Trigger>
              <Tabs.Trigger id="tab2">
                <Icon icon={Calendar} size="sm" />
                Second Tab
              </Tabs.Trigger>
              <Tabs.Trigger id="tab3">
                <Icon icon={Settings} size="sm" />
                Third Tab
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content id="tab1">
              <Body1>
                This tab is controlled externally by the buttons above
              </Body1>
            </Tabs.Content>
            <Tabs.Content id="tab2">
              <Body1>Tab selection is managed by React state</Body1>
            </Tabs.Content>
            <Tabs.Content id="tab3">
              <Body1>Useful for complex workflows and wizards</Body1>
            </Tabs.Content>
          </Tabs.Root>
        </VStack>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Complex dashboard-style tabs with rich content
 */
export const Dashboard: Story = {
  render: () => (
    <Tabs.Root defaultSelectedKey="overview" variant="enclosed" size="large">
      <Tabs.List>
        <Tabs.Trigger id="overview">
          <Icon icon={Home} size="sm" />
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger id="analytics">
          <Icon icon={FileText} size="sm" />
          Analytics
        </Tabs.Trigger>
        <Tabs.Trigger id="users">
          <Icon icon={Users} size="sm" />
          Users
          <Badge variant="subtle" size="small">
            12
          </Badge>
        </Tabs.Trigger>
        <Tabs.Trigger id="settings">
          <Icon icon={Settings} size="sm" />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="overview">
        <VStack space="4">
          <h3>Dashboard Overview</h3>
          <Body1>
            Welcome to your dashboard! Here you'll find a summary of your key
            metrics and recent activity.
          </Body1>
          <HStack space="4">
            <Button variant="primary">
              <Icon icon={FileText} size="sm" />
              View Reports
            </Button>
            <Button variant="secondary">
              <Icon icon={Settings} size="sm" />
              Settings
            </Button>
          </HStack>
        </VStack>
      </Tabs.Content>
      <Tabs.Content id="analytics">
        <VStack space="4">
          <h3>Analytics</h3>
          <Body1>
            View detailed analytics and insights about your application
            performance.
          </Body1>
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--color-border-primary)',
            }}
          >
            <Body1>📊 Analytics dashboard would go here</Body1>
          </div>
        </VStack>
      </Tabs.Content>
      <Tabs.Content id="users">
        <VStack space="4">
          <h3>User Management</h3>
          <Body1>Manage user accounts, permissions, and access controls.</Body1>
          <HStack space="4">
            <Button variant="primary">
              <Icon icon={Plus} size="sm" />
              Add User
            </Button>
            <Button variant="secondary">
              <Icon icon={Download} size="sm" />
              Export
            </Button>
          </HStack>
        </VStack>
      </Tabs.Content>
      <Tabs.Content id="settings">
        <VStack space="4">
          <h3>Application Settings</h3>
          <Body1>
            Configure your application preferences and system settings.
          </Body1>
          <Button variant="primary">Save Changes</Button>
        </VStack>
      </Tabs.Content>
    </Tabs.Root>
  ),
};

/**
 * Interactive playground for testing all configurations
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    size: 'medium',
    variant: 'default',
    orientation: 'horizontal',
    isFitted: false,
    align: 'start',
  },
  render: (args) => (
    <div style={{ width: args.orientation === 'vertical' ? '600px' : '100%' }}>
      <Tabs.Root {...args} defaultSelectedKey="tab1">
        <Tabs.List>
          <Tabs.Trigger id="tab1">
            <Icon icon={Home} size="sm" />
            First Tab
          </Tabs.Trigger>
          <Tabs.Trigger id="tab2">
            <Icon icon={Search} size="sm" />
            Second Tab
            <Badge variant="subtle" size="small">
              2
            </Badge>
          </Tabs.Trigger>
          <Tabs.Trigger id="tab3">
            <Icon icon={Settings} size="sm" />
            Third Tab
          </Tabs.Trigger>
          <Tabs.Trigger id="tab4" isDisabled>
            <Icon icon={FileText} size="sm" />
            Disabled
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab1">
          <Body1>
            Content for the first tab. This is a playground where you can test
            different configurations using the controls panel.
          </Body1>
        </Tabs.Content>
        <Tabs.Content id="tab2">
          <Body1>
            Second tab content with a badge indicator. Try changing the variant
            and size to see how it affects the appearance.
          </Body1>
        </Tabs.Content>
        <Tabs.Content id="tab3">
          <Body1>
            Third tab content. Test the orientation prop to see how tabs work in
            vertical layout mode.
          </Body1>
        </Tabs.Content>
        <Tabs.Content id="tab4">
          <Body1>
            This content won't be visible because the tab is disabled.
          </Body1>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
};
