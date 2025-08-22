// /src/ui/accordion/accordion.css.ts
// Styles for Accordion component using vanilla-extract
// Provides variants, sizes, and animation styles
// RELEVANT FILES: accordion.tsx, types.ts, helpers.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens';
import { colors, shadows } from '@/tokens/contracts.css';

// Animation keyframes for smooth expand/collapse
const expandKeyframes = keyframes({
  from: {
    height: 0,
    opacity: 0,
  },
  to: {
    height: 'var(--accordion-content-height)',
    opacity: 1,
  },
});

const collapseKeyframes = keyframes({
  from: {
    height: 'var(--accordion-content-height)',
    opacity: 1,
  },
  to: {
    height: 0,
    opacity: 0,
  },
});

// Base styles for accordion container
export const accordion = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// Accordion item container
export const accordionItem = style({
  width: '100%',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
});

// Accordion trigger button (header)
export const accordionTrigger = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  textAlign: 'left',
  fontFamily: tokens.fonts.body,
  transition: 'all 0.2s ease',
  outline: 'none',

  ':hover': {
    backgroundColor: colors.background.secondary,
  },

  ':focus-visible': {
    outline: `2px solid ${colors.brand.primary}`,
    outlineOffset: '2px',
    borderRadius: tokens.radius.md,
  },

  selectors: {
    '&[data-pressed]': {
      backgroundColor: colors.background.tertiary,
    },
    '&[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

// Trigger content wrapper
export const accordionTriggerContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space[3],
  flex: 1,
});

// Icon in trigger
export const accordionIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease',

  selectors: {
    '[data-expanded="true"] &': {
      transform: 'rotate(90deg)',
    },
  },
});

// Chevron icon
export const accordionChevron = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease',
  color: colors.foreground.tertiary,

  selectors: {
    '[data-expanded="true"] &': {
      transform: 'rotate(180deg)',
    },
  },
});

// Content panel
export const accordionContent = style({
  overflow: 'hidden',
  transition: 'all 0.3s ease',

  selectors: {
    '&[data-expanded="true"]': {
      animation: `${expandKeyframes} 0.3s ease forwards`,
    },
    '&[data-expanded="false"]': {
      animation: `${collapseKeyframes} 0.3s ease forwards`,
    },
  },
});

// Inner content wrapper
export const accordionContentInner = style({
  paddingTop: tokens.space[2],
  paddingBottom: tokens.space[4],
});

// Size variants
export const sizeVariants = styleVariants({
  small: {
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.normal,
  },
  medium: {
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.normal,
  },
  large: {
    fontSize: tokens.fontSize.lg,
    lineHeight: tokens.lineHeight.normal,
  },
});

// Trigger size variants
export const triggerSizeVariants = styleVariants({
  small: {
    padding: `${tokens.space[2]} ${tokens.space[3]}`,
    minHeight: '36px',
  },
  medium: {
    padding: `${tokens.space[3]} ${tokens.space[4]}`,
    minHeight: '44px',
  },
  large: {
    padding: `${tokens.space[4]} ${tokens.space[5]}`,
    minHeight: '52px',
  },
});

// Content size variants
export const contentSizeVariants = styleVariants({
  small: {
    paddingLeft: tokens.space[3],
    paddingRight: tokens.space[3],
  },
  medium: {
    paddingLeft: tokens.space[4],
    paddingRight: tokens.space[4],
  },
  large: {
    paddingLeft: tokens.space[5],
    paddingRight: tokens.space[5],
  },
});

// Visual variants
export const variants = styleVariants({
  default: {
    borderBottom: `1px solid ${colors.border.primary}`,

    selectors: {
      '&:first-child': {
        borderTop: `1px solid ${colors.border.primary}`,
      },
    },
  },
  bordered: {
    border: `1px solid ${colors.border.primary}`,
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space[2],
    overflow: 'hidden',
  },
  separated: {
    border: `1px solid ${colors.border.primary}`,
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space[3],
    backgroundColor: colors.background.primary,
    boxShadow: shadows.small,
  },
});

// Full width modifier
export const fullWidth = style({
  width: '100%',
});

// Disabled state
export const disabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

// No animation modifier
export const noAnimation = style({
  selectors: {
    [`${accordionContent}&`]: {
      animation: 'none !important',
      transition: 'none !important',
    },
    [`${accordionChevron}&`]: {
      transition: 'none !important',
    },
    [`${accordionIcon}&`]: {
      transition: 'none !important',
    },
  },
});
