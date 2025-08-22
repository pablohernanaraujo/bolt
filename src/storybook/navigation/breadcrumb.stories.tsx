// /src/storybook/navigation/breadcrumb.stories.tsx
// Breadcrumb component stories showcasing all variants and features
// Complete documentation for the Breadcrumb component with real-world examples
// RELEVANT FILES: ../../ui/breadcrumb/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import {
  FileText,
  Folder,
  Home,
  Icon,
  Package,
  Settings,
  Slash,
  Users,
} from '../../icons';
import {
  Breadcrumb,
  BreadcrumbCurrentLink,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  type BreadcrumbItemData,
} from '../../ui/breadcrumb';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumb navigation component showing the user's location within a site's hierarchy. Supports custom separators, icons, responsive design, and overflow handling.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for the breadcrumb',
      defaultValue: 'medium',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'subtle'],
      description: 'Visual style variant',
      defaultValue: 'default',
    },
    maxItems: {
      control: {
        type: 'number',
        min: 3,
        max: 10,
      },
      description: 'Maximum items before truncation (min 3)',
    },
    itemsBeforeCollapse: {
      control: {
        type: 'number',
        min: 1,
        max: 3,
      },
      description: 'Items to show before ellipsis',
      defaultValue: 1,
    },
    itemsAfterCollapse: {
      control: {
        type: 'number',
        min: 1,
        max: 3,
      },
      description: 'Items to show after ellipsis',
      defaultValue: 1,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Sample breadcrumb data for examples
const sampleItems: BreadcrumbItemData[] = [
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

const shortItems: BreadcrumbItemData[] = [
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
    label: 'Getting Started',
    isCurrentPage: true,
  },
];

/**
 * Default breadcrumb with simple navigation path
 */
export const Default: Story = {
  args: {
    items: shortItems,
    size: 'medium',
    variant: 'default',
  },
};

/**
 * Breadcrumb with icons for better visual hierarchy
 */
export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: <Icon icon={Home} size="xs" />,
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: <Icon icon={Settings} size="xs" />,
      },
      {
        id: 'users',
        label: 'User Management',
        href: '/settings/users',
        icon: <Icon icon={Users} size="xs" />,
      },
      {
        id: 'permissions',
        label: 'Permissions',
        isCurrentPage: true,
      },
    ],
    size: 'medium',
    variant: 'default',
  },
};

/**
 * Different size variants
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
        <Breadcrumb items={shortItems} size="small" />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Breadcrumb items={shortItems} size="medium" />
      </div>
      <div>
        <h3>Large Size</h3>
        <Breadcrumb items={shortItems} size="large" />
      </div>
    </div>
  ),
};

/**
 * Visual variants for different contexts
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
        <Breadcrumb items={shortItems} variant="default" />
      </div>
      <div>
        <h3>Subtle Variant</h3>
        <Breadcrumb items={shortItems} variant="subtle" />
      </div>
    </div>
  ),
};

/**
 * Custom separators
 */
export const CustomSeparators: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3>Default Chevron Separator</h3>
        <Breadcrumb items={shortItems} />
      </div>
      <div>
        <h3>Slash Separator</h3>
        <Breadcrumb
          items={shortItems}
          separator={<Icon icon={Slash} size="xs" />}
        />
      </div>
      <div>
        <h3>Text Separator</h3>
        <Breadcrumb items={shortItems} separator="→" />
      </div>
      <div>
        <h3>Pipe Separator</h3>
        <Breadcrumb items={shortItems} separator="|" />
      </div>
    </div>
  ),
};

/**
 * Truncated breadcrumb with ellipsis for long paths
 */
export const WithTruncation: Story = {
  args: {
    items: sampleItems,
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 2,
    size: 'medium',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3>Full Path (No Truncation)</h3>
        <Breadcrumb items={sampleItems} />
      </div>
      <div>
        <h3>Truncated Path (Max 4 items)</h3>
        <Breadcrumb {...args} />
      </div>
      <div>
        <h3>More Aggressive Truncation (Max 3 items)</h3>
        <Breadcrumb
          items={sampleItems}
          maxItems={3}
          itemsBeforeCollapse={1}
          itemsAfterCollapse={1}
        />
      </div>
    </div>
  ),
};

/**
 * Compound component usage for maximum flexibility
 */
export const CompoundComponents: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3>Using Compound Components</h3>
        <BreadcrumbRoot size="medium" variant="default">
          <BreadcrumbList>
            <BreadcrumbItem icon={<Icon icon={Home} size="xs" />}>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem icon={<Icon icon={Folder} size="xs" />}>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Icon icon={Slash} size="xs" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink href="/projects/design-system">
                Design System
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbCurrentLink>Components</BreadcrumbCurrentLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbRoot>
      </div>
    </div>
  ),
};

/**
 * Responsive behavior demonstration
 */
export const Responsive: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <p>
        <strong>Resize the viewport to see responsive behavior</strong>
      </p>
      <p>Text truncates on smaller screens with ellipsis overflow handling.</p>

      <Breadcrumb
        items={[
          {
            id: 'home',
            label: 'Home Dashboard',
            href: '/',
          },
          {
            id: 'admin',
            label: 'System Administration',
            href: '/admin',
          },
          {
            id: 'users',
            label: 'User Management Portal',
            href: '/admin/users',
          },
          {
            id: 'permissions',
            label: 'Advanced Permission Settings',
            href: '/admin/users/permissions',
          },
          {
            id: 'roles',
            label: 'Role-Based Access Control Configuration',
            isCurrentPage: true,
          },
        ]}
        maxItems={5}
      />
    </div>
  ),
};

/**
 * Real-world e-commerce example
 */
export const EcommerceExample: Story = {
  render: () => (
    <Breadcrumb
      items={[
        {
          id: 'home',
          label: 'Store',
          href: '/',
          icon: <Icon icon={Home} size="xs" />,
        },
        {
          id: 'category',
          label: 'Electronics',
          href: '/electronics',
          icon: <Icon icon={Package} size="xs" />,
        },
        {
          id: 'subcategory',
          label: 'Smartphones',
          href: '/electronics/smartphones',
        },
        {
          id: 'brand',
          label: 'Apple',
          href: '/electronics/smartphones/apple',
        },
        {
          id: 'product',
          label: 'iPhone 15 Pro Max 256GB Natural Titanium',
          isCurrentPage: true,
        },
      ]}
      maxItems={4}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={2}
      variant="subtle"
    />
  ),
};

/**
 * Documentation site example
 */
export const DocumentationExample: Story = {
  render: () => (
    <Breadcrumb
      items={[
        {
          id: 'docs',
          label: 'Documentation',
          href: '/docs',
          icon: <Icon icon={FileText} size="xs" />,
        },
        {
          id: 'components',
          label: 'Components',
          href: '/docs/components',
        },
        {
          id: 'navigation',
          label: 'Navigation',
          href: '/docs/components/navigation',
        },
        {
          id: 'breadcrumb',
          label: 'Breadcrumb',
          isCurrentPage: true,
        },
      ]}
      size="large"
    />
  ),
};

/**
 * Controlled breadcrumb with dynamic updates
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = (): ReactElement => {
      const [currentPath, setCurrentPath] = useState(['home']);

      const pathMap: Record<string, BreadcrumbItemData> = {
        home: {
          id: 'home',
          label: 'Home',
          href: '/',
          icon: <Icon icon={Home} size="xs" />,
        },
        products: {
          id: 'products',
          label: 'Products',
          href: '/products',
        },
        services: {
          id: 'services',
          label: 'Services',
          href: '/services',
        },
        about: {
          id: 'about',
          label: 'About Us',
          href: '/about',
        },
        contact: {
          id: 'contact',
          label: 'Contact',
          href: '/contact',
        },
      };

      const items = currentPath.map((pathId, index) => ({
        ...pathMap[pathId],
        isCurrentPage: index === currentPath.length - 1,
      }));

      const addPath = (pathId: string): void => {
        if (!currentPath.includes(pathId)) {
          setCurrentPath([...currentPath, pathId]);
        }
      };

      const resetPath = (): void => {
        setCurrentPath(['home']);
      };

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => addPath('products')}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Add Products
            </button>
            <button
              onClick={() => addPath('services')}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Add Services
            </button>
            <button
              onClick={() => addPath('about')}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Add About
            </button>
            <button
              onClick={() => addPath('contact')}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Add Contact
            </button>
            <button
              onClick={resetPath}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Reset to Home
            </button>
          </div>

          <Breadcrumb items={items} variant="subtle" />

          <div
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-foreground-tertiary)',
            }}
          >
            Current path: {currentPath.join(' → ')}
          </div>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Accessibility features demonstration
 */
export const AccessibilityFeatures: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div>
        <h3>Accessibility Features</h3>
        <ul
          style={{
            marginTop: '0.5rem',
            paddingLeft: '1.5rem',
          }}
        >
          <li>Proper semantic HTML structure with nav and ol elements</li>
          <li>ARIA labels and navigation landmarks</li>
          <li>Keyboard navigation support (Tab, Enter, Space, Escape)</li>
          <li>aria-current="page" for current location</li>
          <li>Screen reader announcements for state changes</li>
        </ul>
      </div>

      <div>
        <h3>Try keyboard navigation:</h3>
        <Breadcrumb
          items={sampleItems}
          maxItems={4}
          aria-label="Product category navigation"
        />
      </div>

      <div
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-foreground-tertiary)',
        }}
      >
        <p>
          <strong>Keyboard shortcuts:</strong>
        </p>
        <ul
          style={{
            marginTop: '0.25rem',
            paddingLeft: '1.5rem',
          }}
        >
          <li>Tab: Navigate between links</li>
          <li>Enter/Space: Activate links or expand ellipsis</li>
          <li>Escape: Close ellipsis dropdown</li>
        </ul>
      </div>
    </div>
  ),
};
