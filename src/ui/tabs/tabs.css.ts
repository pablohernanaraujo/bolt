// /src/ui/tabs/tabs.css.ts
// Styling for Tabs components using vanilla-extract with design tokens
// Provides styles for all tab components with theme integration
// RELEVANT FILES: tabs.tsx, types.ts, ../../tokens/contracts.css.ts

import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

// CSS variables for dynamic theming
const tabBorderColor = createVar();
const tabSelectedColor = createVar();
const tabSelectedBg = createVar();

/**
 * Base styles for the tabs root container
 */
export const tabsRoot = style({
  width: '100%',
});

/**
 * Base styles for the tab list container
 */
export const tabsList = style({
  display: 'flex',
  position: 'relative',
  vars: {
    [tabBorderColor]: colors.border.primary,
    [tabSelectedColor]: colors.brand.primary,
    [tabSelectedBg]: colors.background.primary,
  },
});

/**
 * Tab list variants for different orientations and alignments
 */
export const tabsListVariants = styleVariants({
  // Orientation variants
  horizontal: {
    flexDirection: 'row',
    borderBottom: `1px solid ${tabBorderColor}`,
  },
  vertical: {
    flexDirection: 'column',
    borderRight: `1px solid ${tabBorderColor}`,
  },
  // Alignment variants
  start: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  // Fitted variant
  fitted: {
    flex: 1,
  },
});

/**
 * Recipe for tab trigger styling with variants
 */
export const tabTrigger = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[2],
    position: 'relative',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    textAlign: 'center',
    color: colors.foreground.secondary,
    transition: 'all 0.2s ease-in-out',
    outline: 'none',

    // Base states
    ':hover': {
      color: colors.foreground.primary,
      backgroundColor: colors.background.secondary,
    },

    ':focus-visible': {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: '2px',
    },

    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
      color: colors.foreground.tertiary,
    },

    // Selected state
    selectors: {
      '&[data-selected="true"]': {
        color: tabSelectedColor,
        borderColor: tabSelectedColor,
      },
    },
  },

  variants: {
    size: {
      small: {
        padding: `${tokens.space[1]} ${tokens.space[3]}`,
        fontSize: tokens.fontSize.sm,
        minHeight: tokens.space[8],
      },
      medium: {
        padding: `${tokens.space[2]} ${tokens.space[4]}`,
        fontSize: tokens.fontSize.base,
        minHeight: tokens.space[10],
      },
      large: {
        padding: `${tokens.space[3]} ${tokens.space[6]}`,
        fontSize: tokens.fontSize.lg,
        minHeight: tokens.space[12],
      },
    },

    variant: {
      default: {
        borderRadius: 0,
        borderBottom: '2px solid transparent',
        marginBottom: '-1px',

        selectors: {
          '&[data-selected="true"]': {
            borderBottomColor: tabSelectedColor,
          },
        },
      },

      enclosed: {
        border: `1px solid ${tabBorderColor}`,
        borderBottom: 'none',
        borderRadius: `${tokens.radius.md} ${tokens.radius.md} 0 0`,
        marginRight: '-1px',

        selectors: {
          '&[data-selected="true"]': {
            backgroundColor: tabSelectedBg,
            borderColor: tabBorderColor,
            marginBottom: '-1px',
          },
        },
      },

      'soft-rounded': {
        borderRadius: tokens.radius.md,

        selectors: {
          '&[data-selected="true"]': {
            backgroundColor: colors.brand.primary,
            color: colors.foreground.inverse,
          },
        },
      },

      unstyled: {
        // No additional styles, just base
      },
    },

    orientation: {
      horizontal: {
        // Default horizontal styles are in base
      },
      vertical: {
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
        borderRight: '2px solid transparent',
        borderBottom: 'none',
        marginRight: '-1px',
        marginBottom: '0',

        selectors: {
          '&[data-selected="true"]': {
            borderRightColor: tabSelectedColor,
            borderBottomColor: 'transparent',
          },
        },
      },
    },

    isFitted: {
      true: {
        flex: 1,
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    variant: 'default',
    orientation: 'horizontal',
    isFitted: false,
  },
});

/**
 * Base styles for tab content panels
 */
export const tabContent = style({
  padding: tokens.space[4],
  outline: 'none',

  ':focus-visible': {
    outline: `2px solid ${colors.border.focus}`,
    outlineOffset: '2px',
  },
});

/**
 * Tab content variants for different orientations
 */
export const tabContentVariants = styleVariants({
  horizontal: {
    marginTop: tokens.space[4],
  },
  vertical: {
    marginLeft: tokens.space[4],
  },
});
