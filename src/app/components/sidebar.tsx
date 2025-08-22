// /src/app/components/sidebar.tsx
// Navigation sidebar component for design system
// Provides categorized navigation to different sections and components
// RELEVANT FILES: sidebar.css.ts, layout.tsx

'use client';

import { type FC, type ReactElement } from 'react';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ChevronRight,
  FileText,
  Icon,
  MessageCircle,
  Package,
  Palette,
  Settings,
  Square,
  User,
} from '@/icons';
import { H1 } from '@/ui/typography';

import * as styles from './sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
  children?: SidebarItem[];
}

export interface SidebarProps {
  /**
   * Whether the sidebar is collapsed (for responsive)
   */
  isCollapsed?: boolean;
}

/**
 * Sidebar navigation structure
 * Organized by categories with expandable sections
 */
export const sidebarItems: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Package,
    href: '/',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: Square,
    href: '/foundations',
    children: [
      {
        id: 'design-tokens',
        label: 'Design Tokens',
        href: '/foundations/design-tokens',
      },
      {
        id: 'colors',
        label: 'Colors',
        href: '/foundations/colors',
      },
      {
        id: 'typography',
        label: 'Typography',
        href: '/foundations/typography',
      },
      {
        id: 'spacing',
        label: 'Spacing',
        href: '/foundations/spacing',
      },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: Square,
    href: '/layout',
    children: [
      {
        id: 'container',
        label: 'Container',
        href: '/layout/container',
      },
      {
        id: 'content-wrapper',
        label: 'ContentWrapper',
        href: '/layout/content-wrapper',
      },
      {
        id: 'hstack',
        label: 'HStack',
        href: '/layout/hstack',
      },
      {
        id: 'vstack',
        label: 'VStack',
        href: '/layout/vstack',
      },
      {
        id: 'flex',
        label: 'Flex',
        href: '/layout/flex',
      },
      {
        id: 'divider',
        label: 'Divider',
        href: '/layout/divider',
      },
      {
        id: 'aspect-ratio',
        label: 'AspectRatio',
        href: '/layout/aspect-ratio',
      },
      {
        id: 'grid',
        label: 'Grid',
        href: '/layout/grid',
      },
    ],
  },
  {
    id: 'controls',
    label: 'Controls',
    icon: Settings,
    href: '/controls',
    children: [
      {
        id: 'button',
        label: 'Button',
        href: '/controls/button',
      },
      {
        id: 'icon-button',
        label: 'IconButton',
        href: '/controls/icon-button',
      },
      {
        id: 'checkbox',
        label: 'Checkbox',
        href: '/controls/checkbox',
      },
      {
        id: 'toggle',
        label: 'Toggle',
        href: '/controls/toggle',
      },
      {
        id: 'radio-group',
        label: 'RadioGroup',
        href: '/controls/radio-group',
      },
      {
        id: 'link',
        label: 'Link',
        href: '/controls/link',
      },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: User,
    href: '/content',
    children: [
      {
        id: 'badge',
        label: 'Badge',
        href: '/content/badge',
      },
      {
        id: 'avatar',
        label: 'Avatar',
        href: '/content/avatar',
      },
      {
        id: 'list',
        label: 'List',
        href: '/content/list',
      },
      {
        id: 'code',
        label: 'Code',
        href: '/content/code',
      },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: FileText,
    href: '/forms',
    children: [
      {
        id: 'input',
        label: 'Input',
        href: '/forms/input',
      },
      {
        id: 'password-input',
        label: 'PasswordInput',
        href: '/forms/password-input',
      },
      {
        id: 'pin-input',
        label: 'PinInput',
        href: '/forms/pin-input',
      },
      {
        id: 'textarea',
        label: 'TextArea',
        href: '/forms/textarea',
      },
      {
        id: 'input-group',
        label: 'InputGroup',
        href: '/forms/input-group',
      },
      {
        id: 'form-field',
        label: 'FormField',
        href: '/forms/form-field',
      },
      {
        id: 'file-upload',
        label: 'FileUpload',
        href: '/forms/file-upload',
      },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    icon: Square,
    href: '/overlays',
    children: [
      {
        id: 'modal',
        label: 'Modal',
        href: '/overlays/modal',
      },
      {
        id: 'drawer',
        label: 'Drawer',
        href: '/overlays/drawer',
      },
      {
        id: 'tooltip',
        label: 'Tooltip',
        href: '/overlays/tooltip',
      },
      {
        id: 'menu',
        label: 'Menu',
        href: '/overlays/menu',
      },
      {
        id: 'popover',
        label: 'Popover',
        href: '/overlays/popover',
      },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: Square,
    href: '/navigation',
    children: [
      {
        id: 'accordion',
        label: 'Accordion',
        href: '/navigation/accordion',
      },
      {
        id: 'breadcrumb',
        label: 'Breadcrumb',
        href: '/navigation/breadcrumb',
      },
      {
        id: 'tabs',
        label: 'Tabs',
        href: '/navigation/tabs',
      },
      {
        id: 'pagination',
        label: 'Pagination',
        href: '/navigation/pagination',
      },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: MessageCircle,
    href: '/feedback',
    children: [
      {
        id: 'skeleton',
        label: 'Skeleton',
        href: '/feedback/skeleton',
      },
      {
        id: 'spinner',
        label: 'Spinner',
        href: '/feedback/spinner',
      },
      {
        id: 'progress',
        label: 'Progress',
        href: '/feedback/progress',
      },
      {
        id: 'toast',
        label: 'Toast',
        href: '/feedback/toast',
      },
    ],
  },
  {
    id: 'icons',
    label: 'Icons',
    icon: Palette,
    href: '/icons',
  },
];

/**
 * Individual sidebar item component
 */
interface SidebarItemComponentProps {
  item: SidebarItem;
  level?: number;
}

const SidebarItemComponent: FC<SidebarItemComponentProps> = ({
  item,
  level = 0,
}): ReactElement => {
  const pathname = usePathname();
  const isSelected = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isParentSelected = item.children?.some(
    (child) => pathname === child.href,
  );

  return (
    <div>
      <Link
        href={item.href}
        className={`${styles.sidebarItem} ${isSelected ? styles.sidebarItemSelected : ''} ${
          level > 0 ? styles.sidebarItemChild : ''
        }`}
      >
        <div className={styles.sidebarItemContent}>
          {level === 0 && item.icon && (
            <Icon
              icon={item.icon}
              size="sm"
              className={styles.sidebarItemIcon}
            />
          )}
          <span className={styles.sidebarItemLabel}>{item.label}</span>
        </div>
        {hasChildren && (
          <Icon
            icon={ChevronRight}
            size="xs"
            className={`${styles.sidebarItemChevron} ${
              isParentSelected ? styles.sidebarItemChevronExpanded : ''
            }`}
          />
        )}
      </Link>

      {/* Render children if parent is selected or child is selected */}
      {hasChildren && (isParentSelected || isSelected) && (
        <div className={styles.sidebarChildren}>
          {item.children!.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Sidebar component
 * Provides navigation for the design system showcase
 */
export const Sidebar: FC<SidebarProps> = ({
  isCollapsed = false,
}): ReactElement => {
  const pathname = usePathname();

  if (isCollapsed) {
    return (
      <div className={styles.sidebarCollapsed}>
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.sidebarIconButton} ${
              pathname === item.href ? styles.sidebarIconButtonSelected : ''
            }`}
            title={item.label}
          >
            {item.icon && <Icon icon={item.icon} size="sm" />}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <H1>Design System</H1>
      </div>

      <div className={styles.sidebarContent}>
        {sidebarItems.map((item) => (
          <SidebarItemComponent key={item.id} item={item} />
        ))}
      </div>
    </nav>
  );
};
