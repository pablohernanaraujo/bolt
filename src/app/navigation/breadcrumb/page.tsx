// /src/app/navigation/breadcrumb/page.tsx
// Breadcrumb component documentation page with live examples
// Comprehensive guide showing usage patterns and best practices
// RELEVANT FILES: ../../../ui/breadcrumb/index.ts, ../../page.css.ts

'use client';

import { type FC, type ReactElement, useState } from 'react';

import {
  FileText,
  Folder,
  Home,
  Icon,
  Package,
  Settings,
  Slash,
  Users,
} from '@/icons';
import {
  Body1,
  Body2,
  Code,
  Container,
  Divider,
  H1,
  H2,
  H3,
  VStack,
} from '@/ui';
import {
  Breadcrumb,
  BreadcrumbCurrentLink,
  BreadcrumbItem,
  type BreadcrumbItemData,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';

import * as styles from '../../page.css';

/**
 * Breadcrumb component documentation page
 */
const BreadcrumbPage: FC = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<'usage' | 'api' | 'examples'>(
    'usage',
  );

  // Sample data for examples
  const basicItems: BreadcrumbItemData[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: <Icon icon={Home} size="xs" />,
    },
    {
      id: 'docs',
      label: 'Documentation',
      href: '/docs',
      icon: <Icon icon={FileText} size="xs" />,
    },
    {
      id: 'current',
      label: 'Breadcrumb',
      isCurrentPage: true,
    },
  ];

  const longPathItems: BreadcrumbItemData[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: <Icon icon={Home} size="xs" />,
    },
    {
      id: 'products',
      label: 'Products',
      href: '/products',
      icon: <Icon icon={Package} size="xs" />,
    },
    {
      id: 'electronics',
      label: 'Electronics',
      href: '/products/electronics',
    },
    {
      id: 'computers',
      label: 'Computers',
      href: '/products/electronics/computers',
    },
    {
      id: 'laptops',
      label: 'Laptops',
      href: '/products/electronics/computers/laptops',
    },
    {
      id: 'gaming',
      label: 'Gaming Laptops',
      isCurrentPage: true,
    },
  ];

  const [currentPath, setCurrentPath] = useState(['home', 'settings']);

  const pathMap: Record<string, BreadcrumbItemData> = {
    home: {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: <Icon icon={Home} size="xs" />,
    },
    settings: {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: <Icon icon={Settings} size="xs" />,
    },
    users: {
      id: 'users',
      label: 'Users',
      href: '/settings/users',
      icon: <Icon icon={Users} size="xs" />,
    },
    permissions: {
      id: 'permissions',
      label: 'Permissions',
      href: '/settings/users/permissions',
    },
  };

  const dynamicItems = currentPath.map((pathId, index) => ({
    ...pathMap[pathId],
    isCurrentPage: index === currentPath.length - 1,
  }));

  const addToPath = (pathId: string): void => {
    if (!currentPath.includes(pathId)) {
      setCurrentPath([...currentPath, pathId]);
    }
  };

  const resetPath = (): void => {
    setCurrentPath(['home']);
  };

  return (
    <Container>
      <VStack space="16">
        <div className={styles.header}>
          <H1>Breadcrumb</H1>
          <Body1>
            Navigation component that shows users their current location within
            a site's hierarchy. Provides clear paths for navigation and context
            awareness.
          </Body1>

          {/* Live breadcrumb showing current page location */}
          <div style={{ marginTop: '1.5rem' }}>
            <Breadcrumb
              items={[
                {
                  id: 'home',
                  label: 'Home',
                  href: '/',
                  icon: <Icon icon={Home} size="xs" />,
                },
                {
                  id: 'navigation',
                  label: 'Navigation',
                  href: '/navigation',
                },
                {
                  id: 'breadcrumb',
                  label: 'Breadcrumb',
                  isCurrentPage: true,
                },
              ]}
              variant="subtle"
            />
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
                Import the breadcrumb components and use them to create
                navigation paths.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Breadcrumb items={basicItems} />
                </div>
                <Code>
                  {`import { Breadcrumb } from '@/ui/breadcrumb';
import { Icon, Home, FileText } from '@/icons';

const items = [
  { id: 'home', label: 'Home', href: '/', icon: <Icon icon={Home} size="xs" /> },
  { id: 'docs', label: 'Documentation', href: '/docs', icon: <Icon icon={FileText} size="xs" /> },
  { id: 'current', label: 'Breadcrumb', isCurrentPage: true },
];

<Breadcrumb items={items} />`}
                </Code>
              </div>
            </section>

            {/* Size Variants */}
            <section className={styles.section}>
              <H2>Size Variants</H2>
              <Body1>
                Breadcrumbs come in three sizes: small, medium (default), and
                large.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="8">
                    <div>
                      <Body2>
                        <strong>Small</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} size="small" />
                    </div>
                    <div>
                      <Body2>
                        <strong>Medium (Default)</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} size="medium" />
                    </div>
                    <div>
                      <Body2>
                        <strong>Large</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} size="large" />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Visual Variants */}
            <section className={styles.section}>
              <H2>Visual Variants</H2>
              <Body1>
                Choose between default and subtle variants for different visual
                contexts.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="8">
                    <div>
                      <Body2>
                        <strong>Default</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} variant="default" />
                    </div>
                    <div>
                      <Body2>
                        <strong>Subtle</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} variant="subtle" />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Custom Separators */}
            <section className={styles.section}>
              <H2>Custom Separators</H2>
              <Body1>
                Customize the separator between breadcrumb items to match your
                design.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="8">
                    <div>
                      <Body2>
                        <strong>Default Chevron</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} />
                    </div>
                    <div>
                      <Body2>
                        <strong>Slash</strong>
                      </Body2>
                      <Breadcrumb
                        items={basicItems}
                        separator={<Icon icon={Slash} size="xs" />}
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Arrow</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} separator="→" />
                    </div>
                    <div>
                      <Body2>
                        <strong>Pipe</strong>
                      </Body2>
                      <Breadcrumb items={basicItems} separator="|" />
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
                <H3>Breadcrumb Props</H3>
                <div className={styles.apiTable}>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>items</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>BreadcrumbItemData[]</Code>
                    </div>
                    <div className={styles.apiCell}>Yes</div>
                    <div className={styles.apiCell}>
                      Array of breadcrumb items to render
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>size</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'small' | 'medium' | 'large'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Size variant (default: 'medium')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>variant</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'default' | 'subtle'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Visual style variant (default: 'default')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>separator</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>ReactNode</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Custom separator component or text
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>maxItems</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>number</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Maximum items before truncation
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>itemsBeforeCollapse</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>number</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Items to show before ellipsis (default: 1)
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>itemsAfterCollapse</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>number</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Items to show after ellipsis (default: 1)
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.apiSection}>
                <H3>BreadcrumbItemData Interface</H3>
                <Code>
                  {`interface BreadcrumbItemData {
  id: string;                    // Unique identifier
  label: string;                 // Display text
  href?: string;                 // URL for navigation (omit for current page)
  icon?: ReactElement;           // Optional icon
  isCurrentPage?: boolean;       // Whether this is the current page
}`}
                </Code>
              </div>
            </section>
          </VStack>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <VStack space="16">
            {/* Long Path with Truncation */}
            <section className={styles.section}>
              <H2>Long Path with Truncation</H2>
              <Body1>
                Handle long navigation paths by truncating with ellipsis to
                prevent overflow.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="8">
                    <div>
                      <Body2>
                        <strong>Full Path</strong>
                      </Body2>
                      <Breadcrumb items={longPathItems} />
                    </div>
                    <div>
                      <Body2>
                        <strong>Truncated (Max 4 items)</strong>
                      </Body2>
                      <Breadcrumb
                        items={longPathItems}
                        maxItems={4}
                        itemsBeforeCollapse={1}
                        itemsAfterCollapse={2}
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Compound Components */}
            <section className={styles.section}>
              <H2>Compound Components</H2>
              <Body1>
                Use individual breadcrumb components for maximum flexibility and
                custom layouts.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <BreadcrumbRoot size="medium" variant="subtle">
                    <BreadcrumbList>
                      <BreadcrumbItem icon={<Icon icon={Home} size="xs" />}>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator>
                        <Icon icon={Slash} size="xs" />
                      </BreadcrumbSeparator>

                      <BreadcrumbItem icon={<Icon icon={Folder} size="xs" />}>
                        <BreadcrumbLink href="/projects">
                          Projects
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator />

                      <BreadcrumbItem isCurrentPage>
                        <BreadcrumbCurrentLink>
                          Design System
                        </BreadcrumbCurrentLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </BreadcrumbRoot>
                </div>

                <Code>
                  {`<BreadcrumbRoot size="medium" variant="subtle">
  <BreadcrumbList>
    <BreadcrumbItem icon={<Icon icon={Home} size="xs" />}>
      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    
    <BreadcrumbSeparator>
      <Icon icon={Slash} size="xs" />
    </BreadcrumbSeparator>
    
    <BreadcrumbItem icon={<Icon icon={Folder} size="xs" />}>
      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
    </BreadcrumbItem>
    
    <BreadcrumbSeparator />
    
    <BreadcrumbItem isCurrentPage>
      <BreadcrumbCurrentLink>Design System</BreadcrumbCurrentLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</BreadcrumbRoot>`}
                </Code>
              </div>
            </section>

            {/* Dynamic/Controlled Breadcrumb */}
            <section className={styles.section}>
              <H2>Dynamic Breadcrumb</H2>
              <Body1>
                Breadcrumbs can be controlled programmatically based on
                application state.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="8">
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        onClick={() => addToPath('users')}
                        style={{
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                        }}
                      >
                        Add Users
                      </button>
                      <button
                        onClick={() => addToPath('permissions')}
                        style={{
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                        }}
                      >
                        Add Permissions
                      </button>
                      <button
                        onClick={resetPath}
                        style={{
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                        }}
                      >
                        Reset
                      </button>
                    </div>

                    <Breadcrumb items={dynamicItems} variant="subtle" />

                    <Body2
                      style={{ color: 'var(--color-foreground-tertiary)' }}
                    >
                      Current path: {currentPath.join(' → ')}
                    </Body2>
                  </VStack>
                </div>
              </div>
            </section>

            {/* E-commerce Example */}
            <section className={styles.section}>
              <H2>E-commerce Navigation</H2>
              <Body1>
                Common pattern for product category navigation in e-commerce
                applications.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Breadcrumb
                    items={[
                      {
                        id: 'store',
                        label: 'Store',
                        href: '/',
                        icon: <Icon icon={Home} size="xs" />,
                      },
                      {
                        id: 'electronics',
                        label: 'Electronics',
                        href: '/electronics',
                        icon: <Icon icon={Package} size="xs" />,
                      },
                      {
                        id: 'smartphones',
                        label: 'Smartphones',
                        href: '/electronics/smartphones',
                      },
                      {
                        id: 'apple',
                        label: 'Apple',
                        href: '/electronics/smartphones/apple',
                      },
                      {
                        id: 'product',
                        label: 'iPhone 15 Pro Max',
                        isCurrentPage: true,
                      },
                    ]}
                    maxItems={4}
                    variant="subtle"
                  />
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
                <li>Multi-level navigation with clear hierarchy</li>
                <li>Users need context about their current location</li>
                <li>Applications with deep content structures</li>
                <li>E-commerce category navigation</li>
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
                <li>Keep breadcrumb labels concise and descriptive</li>
                <li>Use truncation for very long paths (maxItems prop)</li>
                <li>
                  Include icons for better visual hierarchy when appropriate
                </li>
                <li>Make sure the current page is not clickable</li>
                <li>Test with keyboard navigation for accessibility</li>
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
                <li>Uses semantic HTML with nav and ol elements</li>
                <li>Proper ARIA labels and navigation landmarks</li>
                <li>Keyboard navigation support with focus management</li>
                <li>Screen reader announcements for state changes</li>
                <li>aria-current="page" for current location</li>
              </ul>
            </div>
          </VStack>
        </section>
      </VStack>
    </Container>
  );
};

export default BreadcrumbPage;
