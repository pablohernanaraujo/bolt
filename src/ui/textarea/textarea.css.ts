// /src/ui/textarea/textarea.css.ts
// Styles for the TextArea component using vanilla-extract
// Provides variant styles, sizes, and states with design tokens
// RELEVANT FILES: textarea.tsx, types.ts, ../../tokens/index.ts

import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base textarea field styles
 * Common styles shared across all variants and sizes
 */
export const textareaBase = style({
  // Reset and base styles
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,
  width: '100%',
  minHeight: '80px',

  // Typography
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.normal,
  lineHeight: tokens.lineHeight.relaxed,
  color: colors.foreground.primary,

  // Transitions
  transition: tokens.transition.fast,

  // Placeholder styles
  selectors: {
    '&::placeholder': {
      color: colors.foreground.secondary,
      opacity: 1,
    },
    '&::-webkit-input-placeholder': {
      color: colors.foreground.secondary,
    },
    '&::-moz-placeholder': {
      color: colors.foreground.secondary,
      opacity: 1,
    },
    '&:-ms-input-placeholder': {
      color: colors.foreground.secondary,
    },
  },
});

/**
 * TextArea container styles based on variant
 */
export const textareaVariants = styleVariants({
  outline: {
    backgroundColor: colors.background.primary,
    border: `1px solid ${colors.border.primary}`,

    selectors: {
      '&:hover': {
        borderColor: colors.border.secondary,
      },
      '&:focus-within': {
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
      '&[data-disabled]': {
        backgroundColor: colors.background.secondary,
        borderColor: colors.border.secondary,
        cursor: 'not-allowed',
      },
      '&[data-invalid]': {
        borderColor: colors.semantic.error,
      },
      '&[data-invalid]:focus-within': {
        borderColor: colors.semantic.error,
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },

  filled: {
    backgroundColor: colors.background.secondary,
    border: `1px solid transparent`,

    selectors: {
      '&:hover': {
        backgroundColor: colors.background.tertiary,
      },
      '&:focus-within': {
        backgroundColor: colors.background.primary,
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
      '&[data-disabled]': {
        backgroundColor: colors.background.secondary,
        cursor: 'not-allowed',
      },
      '&[data-invalid]': {
        borderColor: colors.semantic.error,
        backgroundColor: colors.background.primary,
      },
      '&[data-invalid]:focus-within': {
        borderColor: colors.semantic.error,
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },
});

/**
 * TextArea size variants
 */
export const textareaSizes = styleVariants({
  small: {
    minHeight: '60px',
    padding: tokens.space[3],
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.base,
  },

  medium: {
    minHeight: '80px',
    padding: tokens.space[4],
    fontSize: tokens.fontSize.base,
    borderRadius: tokens.radius.md,
  },

  large: {
    minHeight: '100px',
    padding: tokens.space[5],
    fontSize: tokens.fontSize.lg,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Resize variants for textarea
 */
export const textareaResize = styleVariants({
  none: {
    resize: 'none',
  },
  vertical: {
    resize: 'vertical',
  },
  horizontal: {
    resize: 'horizontal',
  },
  both: {
    resize: 'both',
  },
});

/**
 * Disabled textarea styles
 */
export const textareaDisabled = style({
  selectors: {
    '&[data-disabled]': {
      color: colors.foreground.tertiary,
      cursor: 'not-allowed',
    },
    '&[data-disabled]::placeholder': {
      color: colors.foreground.tertiary,
    },
  },
});

/**
 * TextArea recipe combining all variants
 */
export const textareaRecipe = recipe({
  base: [textareaBase, textareaDisabled],

  variants: {
    variant: textareaVariants,
    size: textareaSizes,
    resize: textareaResize,
  },

  defaultVariants: {
    variant: 'outline',
    size: 'medium',
    resize: 'vertical',
  },
});
