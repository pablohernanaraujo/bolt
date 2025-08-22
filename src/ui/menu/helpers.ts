// /src/ui/menu/helpers.ts
// Utility functions and className builders for Menu components
// Handles className composition and placement calculations
// RELEVANT FILES: menu.css.ts, types.ts, menu.tsx

// Define Placement type locally to match React Aria's placement values
type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'start'
  | 'end'
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'left top'
  | 'left bottom'
  | 'right top'
  | 'right bottom';

import * as styles from './menu.css';
import {
  type MenuItemVariant,
  type MenuPlacement,
  type MenuSize,
  type MenuVariant,
} from './types';

/**
 * Builds className for Menu component
 * Combines base styles with size and variant modifiers
 *
 * @param size - Size variant of the menu
 * @param variant - Visual variant of the menu
 * @param customClassName - Additional custom className
 * @returns Combined className string
 */
export const buildMenuClassName = (
  size: MenuSize = 'medium',
  variant: MenuVariant = 'default',
  customClassName?: string,
): string => {
  const classNames = [
    styles.menuBase,
    styles.menuSize[size],
    styles.menuVariant[variant],
  ];

  if (customClassName) {
    classNames.push(customClassName);
  }

  return classNames.join(' ');
};

/**
 * Builds className for MenuItem component
 * Combines base styles with size and variant modifiers
 *
 * @param size - Size variant of the menu item
 * @param variant - Visual variant of the menu item
 * @param customClassName - Additional custom className
 * @returns Combined className string
 */
export const buildMenuItemClassName = (
  size: MenuSize = 'medium',
  variant: MenuItemVariant = 'default',
  customClassName?: string,
): string => {
  const classNames = [
    styles.menuItemBase,
    styles.menuItemSize[size],
    styles.menuItemVariant[variant],
  ];

  if (customClassName) {
    classNames.push(customClassName);
  }

  return classNames.join(' ');
};

/**
 * Converts our custom MenuPlacement to React Aria Placement
 * Maps from our simplified placement props to React Aria's placement system
 *
 * @param placement - Our menu placement type
 * @returns React Aria compatible placement
 */
export const getAriaPlacement = (placement: MenuPlacement): Placement => {
  const placementMap: Record<MenuPlacement, Placement> = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    start: 'start',
    end: 'end',
    'top start': 'top start',
    'top end': 'top end',
    'bottom start': 'bottom start',
    'bottom end': 'bottom end',
    'left top': 'left top',
    'left bottom': 'left bottom',
    'right top': 'right top',
    'right bottom': 'right bottom',
  };

  return placementMap[placement] || 'bottom start';
};

/**
 * Calculates offset for menu positioning based on size
 * Provides appropriate spacing between trigger and menu
 *
 * @param size - Menu size variant
 * @param customOffset - Custom offset override
 * @returns Offset in pixels
 */
export const getOffsetForSize = (
  size: MenuSize,
  customOffset?: number,
): number => {
  if (customOffset !== undefined) {
    return customOffset;
  }

  // Default offsets based on size
  const offsetMap: Record<MenuSize, number> = {
    small: 2,
    medium: 4,
    large: 6,
  };

  return offsetMap[size];
};

/**
 * Builds className for MenuSection component
 * Handles section container styling
 *
 * @param customClassName - Additional custom className
 * @returns Combined className string
 */
export const buildMenuSectionClassName = (customClassName?: string): string => {
  const classNames = [styles.menuSection];

  if (customClassName) {
    classNames.push(customClassName);
  }

  return classNames.join(' ');
};

/**
 * Builds className for MenuSeparator component
 * Handles separator/divider styling
 *
 * @param customClassName - Additional custom className
 * @returns Combined className string
 */
export const buildMenuSeparatorClassName = (
  customClassName?: string,
): string => {
  const classNames = [styles.menuSeparator];

  if (customClassName) {
    classNames.push(customClassName);
  }

  return classNames.join(' ');
};

/**
 * Calculates menu width constraints based on size and custom values
 * Ensures menu doesn't exceed viewport or specified limits
 *
 * @param size - Menu size variant
 * @param minWidth - Custom minimum width
 * @param maxWidth - Custom maximum width
 * @returns Width constraint object
 */
export const getMenuWidthConstraints = (
  size: MenuSize,
  minWidth?: number,
  maxWidth?: number,
): { minWidth: number; maxWidth: number } => {
  // Default width constraints per size
  const sizeConstraints: Record<
    MenuSize,
    { minWidth: number; maxWidth: number }
  > = {
    small: {
      minWidth: 160,
      maxWidth: 240,
    },
    medium: {
      minWidth: 200,
      maxWidth: 320,
    },
    large: {
      minWidth: 240,
      maxWidth: 400,
    },
  };

  const defaults = sizeConstraints[size];

  return {
    minWidth: minWidth ?? defaults.minWidth,
    maxWidth: maxWidth ?? defaults.maxWidth,
  };
};

/**
 * Determines if menu item should show keyboard shortcut
 * Helps decide layout and spacing for menu items
 *
 * @param shortcut - Shortcut text
 * @param hasEndIcon - Whether item has an end icon
 * @returns Whether to show shortcut
 */
export const shouldShowShortcut = (
  shortcut?: string,
  hasEndIcon: boolean = false,
): boolean => Boolean(shortcut && !hasEndIcon);

/**
 * Validates menu placement value
 * Ensures placement is one of the supported options
 *
 * @param placement - Placement value to validate
 * @returns Whether placement is valid
 */
export const isValidMenuPlacement = (
  placement: string,
): placement is MenuPlacement => {
  const validPlacements: MenuPlacement[] = [
    'top',
    'bottom',
    'left',
    'right',
    'start',
    'end',
    'top start',
    'top end',
    'bottom start',
    'bottom end',
    'left top',
    'left bottom',
    'right top',
    'right bottom',
  ];

  return validPlacements.includes(placement as MenuPlacement);
};

/**
 * Gets transform origin for menu animations based on placement
 * Ensures smooth entry/exit animations from correct position
 *
 * @param placement - Menu placement
 * @returns Transform origin CSS value
 */
export const getTransformOrigin = (placement: MenuPlacement): string => {
  const originMap: Record<string, string> = {
    top: 'bottom center',
    bottom: 'top center',
    left: 'right center',
    right: 'left center',
    'top start': 'bottom left',
    'top end': 'bottom right',
    'bottom start': 'top left',
    'bottom end': 'top right',
    'left top': 'right top',
    'left bottom': 'right bottom',
    'right top': 'left top',
    'right bottom': 'left bottom',
  };

  return originMap[placement] || 'top center';
};

/**
 * Scroll menu item into view when navigating with keyboard
 * Ensures focused item is always visible in scrollable menus
 *
 * @param menuElement - Menu container element
 * @param itemElement - Menu item element to scroll to
 */
export const scrollItemIntoView = (
  menuElement: HTMLElement,
  itemElement: HTMLElement,
): void => {
  const menuRect = menuElement.getBoundingClientRect();
  const itemRect = itemElement.getBoundingClientRect();

  // Calculate if item is outside visible area
  const isAboveView = itemRect.top < menuRect.top;
  const isBelowView = itemRect.bottom > menuRect.bottom;

  if (isAboveView || isBelowView) {
    itemElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
};
