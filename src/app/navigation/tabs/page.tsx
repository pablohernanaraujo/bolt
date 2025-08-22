// /src/app/navigation/tabs/page.tsx
// Tabs component documentation page with live examples
// Comprehensive guide showing usage patterns and best practices
// RELEVANT FILES: ../../../ui/tabs/index.ts, ../../page.css.ts

'use client';

import { type FC, type ReactElement, useState } from 'react';

import {
  Bell,
  Camera,
  Download,
  FileText,
  Folder,
  Heart,
  Home,
  Icon,
  Mail,
  Music,
  Phone,
  Plus,
  Settings,
  ShoppingCart,
  Star,
  Users,
} from '@/icons';
import {
  Badge,
  Body1,
  Body2,
  Button,
  Code,
  Container,
  Divider,
  H1,
  H2,
  H3,
  HStack,
  VStack,
} from '@/ui';
import { Tabs } from '@/ui/tabs';

import * as styles from '../../page.css';

/**
 * Tabs component documentation page
 */
const TabsPage: FC = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<'usage' | 'api' | 'examples'>(
    'usage',
  );
  const [notifications, setNotifications] = useState(3);

  return (
    <Container>
      <VStack space="16">
        <div className={styles.header}>
          <H1>Tabs</H1>
          <Body1>
            Navigation component that organizes content into switchable panels.
            Perfect for grouping related content and providing users with easy
            access to different sections.
          </Body1>

          {/* Live tabs showing current page location */}
          <div style={{ marginTop: '1.5rem' }}>
            <Tabs.Root defaultSelectedKey="overview">
              <Tabs.List>
                <Tabs.Trigger id="overview">
                  <Icon icon={Home} size="sm" />
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger id="components">
                  <Icon icon={FileText} size="sm" />
                  Components
                </Tabs.Trigger>
                <Tabs.Trigger id="examples">
                  <Icon icon={Star} size="sm" />
                  Examples
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content id="overview">
                You're viewing the Tabs component documentation
              </Tabs.Content>
              <Tabs.Content id="components">
                Component API and usage details
              </Tabs.Content>
              <Tabs.Content id="examples">
                Interactive examples and patterns
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>

        <Divider />

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          {(['usage', 'api', 'examples'] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Usage Tab */}
        {activeTab === 'usage' && (
          <VStack space="16">
            {/* Basic Usage */}
            <section className={styles.section}>
              <H2>Basic Usage</H2>
              <Body1>
                Import the tabs components and use them to create tabbed
                interfaces. The compound component structure provides maximum
                flexibility.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Tabs.Root defaultSelectedKey="tab1">
                    <Tabs.List>
                      <Tabs.Trigger id="tab1">
                        <Icon icon={Home} size="sm" />
                        Home
                      </Tabs.Trigger>
                      <Tabs.Trigger id="tab2">
                        <Icon icon={Users} size="sm" />
                        Users
                      </Tabs.Trigger>
                      <Tabs.Trigger id="tab3">
                        <Icon icon={Settings} size="sm" />
                        Settings
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content id="tab1">
                      <Body1>
                        Welcome to the home panel! This is where you'll find
                        your dashboard and overview.
                      </Body1>
                    </Tabs.Content>
                    <Tabs.Content id="tab2">
                      <Body1>
                        Manage users, permissions, and user settings in this
                        panel.
                      </Body1>
                    </Tabs.Content>
                    <Tabs.Content id="tab3">
                      <Body1>
                        Configure application settings and preferences here.
                      </Body1>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
                <Code>
                  {`import { Tabs } from '@/ui/tabs';
import { Icon, Home, Users, Settings } from '@/icons';

<Tabs.Root defaultSelectedKey="tab1">
  <Tabs.List>
    <Tabs.Trigger id="tab1">
      <Icon icon={Home} size="sm" />
      Home
    </Tabs.Trigger>
    <Tabs.Trigger id="tab2">
      <Icon icon={Users} size="sm" />
      Users  
    </Tabs.Trigger>
    <Tabs.Trigger id="tab3">
      <Icon icon={Settings} size="sm" />
      Settings
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content id="tab1">
    Content for home tab
  </Tabs.Content>
  <Tabs.Content id="tab2">
    Content for users tab
  </Tabs.Content>
  <Tabs.Content id="tab3">
    Content for settings tab
  </Tabs.Content>
</Tabs.Root>`}
                </Code>
              </div>
            </section>

            {/* Size Variants */}
            <section className={styles.section}>
              <H2>Size Variants</H2>
              <Body1>
                Tabs come in three sizes: small, medium (default), and large to
                fit different interface densities.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Small</strong>
                      </Body2>
                      <Tabs.Root defaultSelectedKey="small1" size="small">
                        <Tabs.List>
                          <Tabs.Trigger id="small1">First</Tabs.Trigger>
                          <Tabs.Trigger id="small2">Second</Tabs.Trigger>
                          <Tabs.Trigger id="small3">Third</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="small1">
                          Small tab content
                        </Tabs.Content>
                        <Tabs.Content id="small2">
                          Content for small tab 2
                        </Tabs.Content>
                        <Tabs.Content id="small3">
                          Content for small tab 3
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>
                    <div>
                      <Body2>
                        <strong>Medium (Default)</strong>
                      </Body2>
                      <Tabs.Root defaultSelectedKey="med1" size="medium">
                        <Tabs.List>
                          <Tabs.Trigger id="med1">First</Tabs.Trigger>
                          <Tabs.Trigger id="med2">Second</Tabs.Trigger>
                          <Tabs.Trigger id="med3">Third</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="med1">
                          Medium tab content
                        </Tabs.Content>
                        <Tabs.Content id="med2">
                          Content for medium tab 2
                        </Tabs.Content>
                        <Tabs.Content id="med3">
                          Content for medium tab 3
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>
                    <div>
                      <Body2>
                        <strong>Large</strong>
                      </Body2>
                      <Tabs.Root defaultSelectedKey="large1" size="large">
                        <Tabs.List>
                          <Tabs.Trigger id="large1">First</Tabs.Trigger>
                          <Tabs.Trigger id="large2">Second</Tabs.Trigger>
                          <Tabs.Trigger id="large3">Third</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="large1">
                          Large tab content
                        </Tabs.Content>
                        <Tabs.Content id="large2">
                          Content for large tab 2
                        </Tabs.Content>
                        <Tabs.Content id="large3">
                          Content for large tab 3
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Visual Variants */}
            <section className={styles.section}>
              <H2>Visual Variants</H2>
              <Body1>
                Choose between different visual styles to match your design
                needs.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Default</strong>
                      </Body2>
                      <Tabs.Root defaultSelectedKey="def1" variant="default">
                        <Tabs.List>
                          <Tabs.Trigger id="def1">Home</Tabs.Trigger>
                          <Tabs.Trigger id="def2">About</Tabs.Trigger>
                          <Tabs.Trigger id="def3">Contact</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="def1">
                          Default styled content
                        </Tabs.Content>
                        <Tabs.Content id="def2">About us content</Tabs.Content>
                        <Tabs.Content id="def3">
                          Contact information
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>
                    <div>
                      <Body2>
                        <strong>Enclosed</strong>
                      </Body2>
                      <Tabs.Root defaultSelectedKey="enc1" variant="enclosed">
                        <Tabs.List>
                          <Tabs.Trigger id="enc1">Home</Tabs.Trigger>
                          <Tabs.Trigger id="enc2">About</Tabs.Trigger>
                          <Tabs.Trigger id="enc3">Contact</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="enc1">
                          Enclosed tab styling
                        </Tabs.Content>
                        <Tabs.Content id="enc2">About us content</Tabs.Content>
                        <Tabs.Content id="enc3">
                          Contact information
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>
                    <div>
                      <Body2>
                        <strong>Soft Rounded</strong>
                      </Body2>
                      <Tabs.Root
                        defaultSelectedKey="soft1"
                        variant="soft-rounded"
                      >
                        <Tabs.List>
                          <Tabs.Trigger id="soft1">Home</Tabs.Trigger>
                          <Tabs.Trigger id="soft2">About</Tabs.Trigger>
                          <Tabs.Trigger id="soft3">Contact</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="soft1">
                          Soft rounded styling
                        </Tabs.Content>
                        <Tabs.Content id="soft2">About us content</Tabs.Content>
                        <Tabs.Content id="soft3">
                          Contact information
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Orientations */}
            <section className={styles.section}>
              <H2>Orientations</H2>
              <Body1>
                Tabs support both horizontal and vertical orientations for
                different layout needs.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Horizontal (Default)</strong>
                      </Body2>
                      <Tabs.Root
                        defaultSelectedKey="h1"
                        orientation="horizontal"
                      >
                        <Tabs.List>
                          <Tabs.Trigger id="h1">
                            <Icon icon={Music} size="sm" />
                            Music
                          </Tabs.Trigger>
                          <Tabs.Trigger id="h2">
                            <Icon icon={Camera} size="sm" />
                            Photos
                          </Tabs.Trigger>
                          <Tabs.Trigger id="h3">
                            <Icon icon={Folder} size="sm" />
                            Files
                          </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content id="h1">
                          Your music library and playlists
                        </Tabs.Content>
                        <Tabs.Content id="h2">
                          Photo gallery and albums
                        </Tabs.Content>
                        <Tabs.Content id="h3">
                          File management and storage
                        </Tabs.Content>
                      </Tabs.Root>
                    </div>

                    <div>
                      <Body2>
                        <strong>Vertical</strong>
                      </Body2>
                      <div
                        style={{
                          display: 'flex',
                          maxWidth: '600px',
                        }}
                      >
                        <Tabs.Root
                          defaultSelectedKey="v1"
                          orientation="vertical"
                        >
                          <Tabs.List>
                            <Tabs.Trigger id="v1">
                              <Icon icon={Music} size="sm" />
                              Music
                            </Tabs.Trigger>
                            <Tabs.Trigger id="v2">
                              <Icon icon={Camera} size="sm" />
                              Photos
                            </Tabs.Trigger>
                            <Tabs.Trigger id="v3">
                              <Icon icon={Folder} size="sm" />
                              Files
                            </Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content id="v1">
                            Your music library and playlists
                          </Tabs.Content>
                          <Tabs.Content id="v2">
                            Photo gallery and albums
                          </Tabs.Content>
                          <Tabs.Content id="v3">
                            File management and storage
                          </Tabs.Content>
                        </Tabs.Root>
                      </div>
                    </div>
                  </VStack>
                </div>
              </div>
            </section>
          </VStack>
        )}

        {/* API Tab */}
        {activeTab === 'api' && (
          <VStack space="16">
            <section className={styles.section}>
              <H2>Component API</H2>

              <div className={styles.apiSection}>
                <H3>Tabs.Root Props</H3>
                <div className={styles.apiTable}>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>size</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'small' | 'medium' | 'large'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Size variant for all tabs (default: 'medium')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>variant</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>
                        'default' | 'enclosed' | 'soft-rounded' | 'unstyled'
                      </Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Visual style variant (default: 'default')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>orientation</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'horizontal' | 'vertical'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Layout orientation (default: 'horizontal')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>isFitted</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>boolean</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Whether tabs expand to fill container width
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>align</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'start' | 'center' | 'end'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Alignment of tab list (default: 'start')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>defaultSelectedKey</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>string</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>Initially selected tab</div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>selectedKey</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>string</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Controlled selected tab
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>onSelectionChange</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>(key: string) =&gt; void</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Callback when selection changes
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.apiSection}>
                <H3>Tabs.Trigger Props</H3>
                <div className={styles.apiTable}>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>id</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>string</Code>
                    </div>
                    <div className={styles.apiCell}>Yes</div>
                    <div className={styles.apiCell}>
                      Unique identifier matching content id
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>isDisabled</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>boolean</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Whether the tab is disabled
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.apiSection}>
                <H3>Tabs.Content Props</H3>
                <div className={styles.apiTable}>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>id</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>string</Code>
                    </div>
                    <div className={styles.apiCell}>Yes</div>
                    <div className={styles.apiCell}>
                      Unique identifier matching trigger id
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.apiSection}>
                <H3>Usage Example</H3>
                <Code>
                  {`import { Tabs } from '@/ui/tabs';

// Uncontrolled tabs
<Tabs.Root defaultSelectedKey="tab1" size="medium" variant="default">
  <Tabs.List>
    <Tabs.Trigger id="tab1">First Tab</Tabs.Trigger>
    <Tabs.Trigger id="tab2">Second Tab</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content id="tab1">Content 1</Tabs.Content>
  <Tabs.Content id="tab2">Content 2</Tabs.Content>
</Tabs.Root>

// Controlled tabs
const [selectedTab, setSelectedTab] = useState('tab1');

<Tabs.Root 
  selectedKey={selectedTab} 
  onSelectionChange={setSelectedTab}
>
  // ... tabs content
</Tabs.Root>`}
                </Code>
              </div>
            </section>
          </VStack>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <VStack space="16">
            {/* Dashboard Tabs */}
            <section className={styles.section}>
              <H2>Dashboard Tabs</H2>
              <Body1>
                Common pattern for organizing different sections of an
                application dashboard.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Tabs.Root
                    defaultSelectedKey="overview"
                    variant="enclosed"
                    size="large"
                  >
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
                        <Badge variant="solid" size="small">
                          12
                        </Badge>
                      </Tabs.Trigger>
                      <Tabs.Trigger id="settings">
                        <Icon icon={Settings} size="sm" />
                        Settings
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content id="overview">
                      <VStack space="8">
                        <H3>Dashboard Overview</H3>
                        <Body1>
                          Welcome to your dashboard! Here you'll find a summary
                          of your key metrics and recent activity.
                        </Body1>
                        <HStack space="8">
                          <Button variant="primary">View Reports</Button>
                          <Button variant="secondary">Settings</Button>
                        </HStack>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="analytics">
                      <VStack space="8">
                        <H3>Analytics</H3>
                        <Body1>
                          View detailed analytics and insights about your
                          application performance.
                        </Body1>
                        <div
                          style={{
                            padding: '2rem',
                            backgroundColor:
                              'var(--color-background-secondary)',
                            borderRadius: '8px',
                          }}
                        >
                          <Body2>📊 Analytics dashboard would go here</Body2>
                        </div>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="users">
                      <VStack space="8">
                        <H3>User Management</H3>
                        <Body1>
                          Manage user accounts, permissions, and access
                          controls.
                        </Body1>
                        <HStack space="8">
                          <Button variant="primary">
                            <Icon icon={Plus} size="sm" />
                            Add User
                          </Button>
                          <Button variant="secondary">Export</Button>
                        </HStack>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="settings">
                      <VStack space="8">
                        <H3>Application Settings</H3>
                        <Body1>
                          Configure your application preferences and system
                          settings.
                        </Body1>
                        <Button variant="primary">Save Changes</Button>
                      </VStack>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </div>
            </section>

            {/* E-commerce Product Tabs */}
            <section className={styles.section}>
              <H2>Product Information Tabs</H2>
              <Body1>
                E-commerce pattern for organizing product details, reviews, and
                specifications.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Tabs.Root
                    defaultSelectedKey="description"
                    variant="soft-rounded"
                  >
                    <Tabs.List>
                      <Tabs.Trigger id="description">
                        <Icon icon={FileText} size="sm" />
                        Description
                      </Tabs.Trigger>
                      <Tabs.Trigger id="reviews">
                        <Icon icon={Star} size="sm" />
                        Reviews
                        <Badge variant="subtle" size="small">
                          24
                        </Badge>
                      </Tabs.Trigger>
                      <Tabs.Trigger id="shipping">
                        <Icon icon={ShoppingCart} size="sm" />
                        Shipping
                      </Tabs.Trigger>
                      <Tabs.Trigger id="support">
                        <Icon icon={Mail} size="sm" />
                        Support
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content id="description">
                      <VStack space="8">
                        <H3>Product Description</H3>
                        <Body1>
                          This amazing product combines cutting-edge technology
                          with elegant design. Perfect for professionals and
                          enthusiasts alike.
                        </Body1>
                        <ul style={{ marginLeft: '1.5rem' }}>
                          <li>Premium materials and construction</li>
                          <li>Advanced features for enhanced productivity</li>
                          <li>Sleek, modern design that fits any workspace</li>
                          <li>Easy to use with intuitive controls</li>
                        </ul>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="reviews">
                      <VStack space="8">
                        <HStack space="8">
                          <H3>Customer Reviews</H3>
                          <HStack space="2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon key={i} icon={Star} size="sm" />
                            ))}
                            <Body2>4.8 (24 reviews)</Body2>
                          </HStack>
                        </HStack>
                        <div
                          style={{
                            padding: '1rem',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: '8px',
                          }}
                        >
                          <Body2>
                            <strong>Amazing product!</strong> ⭐⭐⭐⭐⭐
                          </Body2>
                          <Body2
                            style={{
                              marginTop: '0.5rem',
                              color: 'var(--color-foreground-secondary)',
                            }}
                          >
                            Really happy with this purchase. Quality is
                            excellent and shipping was fast.
                          </Body2>
                        </div>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="shipping">
                      <VStack space="8">
                        <H3>Shipping Information</H3>
                        <div
                          style={{
                            padding: '1rem',
                            backgroundColor:
                              'var(--color-semantic-success-background)',
                            borderRadius: '8px',
                          }}
                        >
                          <Body2>
                            <strong>Free shipping</strong> on orders over $50!
                          </Body2>
                        </div>
                        <ul style={{ marginLeft: '1.5rem' }}>
                          <li>Standard shipping: 5-7 business days</li>
                          <li>Express shipping: 2-3 business days</li>
                          <li>International shipping available</li>
                          <li>Free returns within 30 days</li>
                        </ul>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="support">
                      <VStack space="8">
                        <H3>Customer Support</H3>
                        <Body1>Need help? We're here to assist you!</Body1>
                        <HStack space="8">
                          <Button variant="primary">
                            <Icon icon={Mail} size="sm" />
                            Email Support
                          </Button>
                          <Button variant="secondary">
                            <Icon icon={Phone} size="sm" />
                            Call Us
                          </Button>
                        </HStack>
                        <Body2>Average response time: 2 hours</Body2>
                      </VStack>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </div>
            </section>

            {/* Fitted Tabs */}
            <section className={styles.section}>
              <H2>Fitted Tabs</H2>
              <Body1>
                Tabs that expand to fill the full width of their container,
                perfect for mobile interfaces.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Tabs.Root defaultSelectedKey="inbox" isFitted>
                    <Tabs.List>
                      <Tabs.Trigger id="inbox">
                        <Icon icon={Mail} size="sm" />
                        Inbox
                        <Badge variant="solid" size="small">
                          {notifications}
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
                    </Tabs.List>
                    <Tabs.Content id="inbox">
                      <VStack space="8">
                        <HStack space="8">
                          <H3>Inbox</H3>
                          <Button
                            variant="ghost"
                            size="small"
                            onClick={() => setNotifications(0)}
                          >
                            Mark all read
                          </Button>
                        </HStack>
                        <Body1>You have {notifications} unread messages</Body1>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="favorites">
                      <VStack space="8">
                        <H3>Favorite Items</H3>
                        <Body1>
                          Your bookmarked and favorite content appears here
                        </Body1>
                      </VStack>
                    </Tabs.Content>
                    <Tabs.Content id="downloads">
                      <VStack space="8">
                        <H3>Downloads</H3>
                        <Body1>Recent downloads and offline content</Body1>
                      </VStack>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </div>
            </section>

            {/* Vertical Sidebar Style */}
            <section className={styles.section}>
              <H2>Vertical Navigation</H2>
              <Body1>
                Vertical tabs work great for sidebar navigation and settings
                panels.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <div
                    style={{
                      display: 'flex',
                      maxWidth: '700px',
                      minHeight: '300px',
                    }}
                  >
                    <Tabs.Root
                      defaultSelectedKey="account"
                      orientation="vertical"
                      variant="enclosed"
                    >
                      <Tabs.List>
                        <Tabs.Trigger id="account">
                          <Icon icon={Users} size="sm" />
                          Account
                        </Tabs.Trigger>
                        <Tabs.Trigger id="notifications">
                          <Icon icon={Bell} size="sm" />
                          Notifications
                          <Badge variant="solid" size="small">
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
                          <VStack space="8">
                            <H3>Account Settings</H3>
                            <Body1>
                              Manage your profile information and account
                              preferences.
                            </Body1>
                            <Button variant="primary">Update Profile</Button>
                          </VStack>
                        </Tabs.Content>
                        <Tabs.Content id="notifications">
                          <VStack space="8">
                            <H3>Notification Preferences</H3>
                            <Body1>
                              Control how and when you receive notifications.
                            </Body1>
                            <div
                              style={{
                                padding: '1rem',
                                backgroundColor:
                                  'var(--color-background-secondary)',
                                borderRadius: '8px',
                              }}
                            >
                              <Body2>
                                📬 You have 2 new notification settings to
                                review
                              </Body2>
                            </div>
                          </VStack>
                        </Tabs.Content>
                        <Tabs.Content id="security">
                          <VStack space="8">
                            <H3>Security Settings</H3>
                            <Body1>
                              Manage your password, two-factor authentication,
                              and security preferences.
                            </Body1>
                            <HStack space="8">
                              <Button variant="primary">Change Password</Button>
                              <Button variant="secondary">Setup 2FA</Button>
                            </HStack>
                          </VStack>
                        </Tabs.Content>
                        <Tabs.Content id="billing">
                          <VStack space="8">
                            <H3>Billing & Subscription</H3>
                            <Body1>
                              View your billing information and manage your
                              subscription.
                            </Body1>
                            <Button variant="primary">View Invoices</Button>
                          </VStack>
                        </Tabs.Content>
                        <Tabs.Content id="advanced">
                          <VStack space="8">
                            <H3>Advanced Settings</H3>
                            <Body1>
                              Advanced configuration options for power users.
                            </Body1>
                          </VStack>
                        </Tabs.Content>
                      </div>
                    </Tabs.Root>
                  </div>
                </div>
              </div>
            </section>
          </VStack>
        )}

        <Divider />

        {/* Best Practices */}
        <section className={styles.section}>
          <H2>Best Practices</H2>

          <VStack space="8">
            <div>
              <H3>When to Use</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>Organizing related content into logical groups</li>
                <li>Switching between different views of the same data</li>
                <li>Space-efficient navigation for multiple sections</li>
                <li>Dashboard interfaces with different data views</li>
                <li>Product detail pages with specifications, reviews, etc.</li>
              </ul>
            </div>

            <div>
              <H3>Guidelines</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>Keep tab labels short and descriptive</li>
                <li>Use icons to improve visual recognition</li>
                <li>Limit to 7 tabs or fewer for optimal usability</li>
                <li>Group related functionality together</li>
                <li>Consider vertical tabs for settings/configuration UIs</li>
                <li>Use badges to show counts or status when relevant</li>
              </ul>
            </div>

            <div>
              <H3>Accessibility</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>Built with React Aria Components for full accessibility</li>
                <li>Keyboard navigation with arrow keys between tabs</li>
                <li>Proper ARIA attributes and roles</li>
                <li>Focus management and screen reader support</li>
                <li>aria-selected and aria-controls attributes</li>
                <li>Support for disabled states</li>
              </ul>
            </div>
          </VStack>
        </section>
      </VStack>
    </Container>
  );
};

export default TabsPage;
