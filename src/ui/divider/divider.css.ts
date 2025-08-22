// /src/ui/divider/divider.css.ts
// Vanilla-extract styles for Divider component using design tokens
// Provides orientation, variant, size, and spacing style variants
// RELEVANT FILES: types.ts, ../../tokens/contracts.css.ts, ../../tokens/tokens.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base divider styles
 * Common styles applied to all divider orientations and variants
 */
export const divider = style({
  border: 'none',
  backgroundColor: colors.border.primary,
  flexShrink: 0,
});

/**
 * Orientation variant styles
 * Controls direction and dimensions based on horizontal/vertical orientation
 */
export const orientations = styleVariants({
  horizontal: {
    width: '100%',
    height: '1px',
  },
  vertical: {
    width: '1px',
    height: '100%',
    minHeight: tokens.space[6], // Minimum height for visibility
  },
});

/**
 * Visual style variant styles
 * Different line styles for various design needs
 */
export const variants = styleVariants({
  solid: {
    backgroundColor: colors.border.primary,
  },
  dashed: {
    backgroundColor: 'transparent',
    backgroundImage: `linear-gradient(to right, ${colors.border.primary} 50%, transparent 50%)`,
    backgroundSize: `${tokens.space[2]} 1px`,
    backgroundRepeat: 'repeat-x',
  },
  dotted: {
    backgroundColor: 'transparent',
    backgroundImage: `radial-gradient(circle, ${colors.border.primary} 1px, transparent 1px)`,
    backgroundSize: `${tokens.space[1]} ${tokens.space[1]}`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center',
  },
});

/**
 * Vertical variant styles for dashed and dotted
 * Special handling for vertical orientation patterns
 */
export const verticalVariants = styleVariants({
  solid: {
    backgroundColor: colors.border.primary,
  },
  dashed: {
    backgroundColor: 'transparent',
    backgroundImage: `linear-gradient(to bottom, ${colors.border.primary} 50%, transparent 50%)`,
    backgroundSize: `1px ${tokens.space[2]}`,
    backgroundRepeat: 'repeat-y',
  },
  dotted: {
    backgroundColor: 'transparent',
    backgroundImage: `radial-gradient(circle, ${colors.border.primary} 1px, transparent 1px)`,
    backgroundSize: `${tokens.space[1]} ${tokens.space[1]}`,
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
  },
});

/**
 * Size variant styles
 * Controls thickness of the divider line
 */
export const sizes = styleVariants({
  thin: {
    // Base size already set in orientation variants (1px)
  },
  medium: {
    // No additional styles needed for thin as it's the default
  },
  thick: {
    // No additional styles needed for thin as it's the default
  },
});

/**
 * Size variant styles for horizontal orientation
 * Controls height for horizontal dividers
 */
export const horizontalSizes = styleVariants({
  thin: {
    height: '1px',
  },
  medium: {
    height: '2px',
  },
  thick: {
    height: '4px',
  },
});

/**
 * Size variant styles for vertical orientation
 * Controls width for vertical dividers
 */
export const verticalSizes = styleVariants({
  thin: {
    width: '1px',
  },
  medium: {
    width: '2px',
  },
  thick: {
    width: '4px',
  },
});

/**
 * Spacing variant styles for horizontal dividers
 * Controls vertical margin around horizontal dividers
 */
export const horizontalSpacing = styleVariants({
  none: {
    margin: 0,
  },
  small: {
    marginTop: tokens.space[2],
    marginBottom: tokens.space[2],
  },
  medium: {
    marginTop: tokens.space[4],
    marginBottom: tokens.space[4],
  },
  large: {
    marginTop: tokens.space[6],
    marginBottom: tokens.space[6],
  },
});

/**
 * Spacing variant styles for vertical dividers
 * Controls horizontal margin around vertical dividers
 */
export const verticalSpacing = styleVariants({
  none: {
    margin: 0,
  },
  small: {
    marginLeft: tokens.space[2],
    marginRight: tokens.space[2],
  },
  medium: {
    marginLeft: tokens.space[4],
    marginRight: tokens.space[4],
  },
  large: {
    marginLeft: tokens.space[6],
    marginRight: tokens.space[6],
  },
});
