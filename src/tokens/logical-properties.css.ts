/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/tokens/logical-properties.css.ts
// CSS logical properties utilities for RTL support with vanilla-extract
// Provides logical property helpers and contracts for directional-agnostic styling
// RELEVANT FILES: spacing.css.ts, contracts.css.ts, themes/index.ts, rtl-detection.ts

import { createVar, style } from '@vanilla-extract/css';

/**
 * Logical property CSS variables for consistent RTL/LTR support
 * These variables automatically adapt based on the document's direction
 */
export const logicalPropertyVars = {
  // Inline direction variables (horizontal in LTR/RTL)
  inlineStart: createVar('inline-start'),
  inlineEnd: createVar('inline-end'),

  // Block direction variables (vertical)
  blockStart: createVar('block-start'),
  blockEnd: createVar('block-end'),

  // Text alignment variables
  textAlignStart: createVar('text-align-start'),
  textAlignEnd: createVar('text-align-end'),

  // Border radius logical variables
  borderStartStartRadius: createVar('border-start-start-radius'),
  borderStartEndRadius: createVar('border-start-end-radius'),
  borderEndStartRadius: createVar('border-end-start-radius'),
  borderEndEndRadius: createVar('border-end-end-radius'),
};

/**
 * Logical spacing utilities
 * Provides consistent spacing that adapts to text direction
 */
export const logicalSpacing = {
  /**
   * Margin inline start (left in LTR, right in RTL)
   */
  marginInlineStart: (value: string) =>
    style({
      marginInlineStart: value,
    }),

  /**
   * Margin inline end (right in LTR, left in RTL)
   */
  marginInlineEnd: (value: string) =>
    style({
      marginInlineEnd: value,
    }),

  /**
   * Margin inline (horizontal margins)
   */
  marginInline: (start: string, end?: string) =>
    style({
      marginInline: end ? `${start} ${end}` : start,
    }),

  /**
   * Margin block start (top)
   */
  marginBlockStart: (value: string) =>
    style({
      marginBlockStart: value,
    }),

  /**
   * Margin block end (bottom)
   */
  marginBlockEnd: (value: string) =>
    style({
      marginBlockEnd: value,
    }),

  /**
   * Margin block (vertical margins)
   */
  marginBlock: (start: string, end?: string) =>
    style({
      marginBlock: end ? `${start} ${end}` : start,
    }),

  /**
   * Padding inline start (left in LTR, right in RTL)
   */
  paddingInlineStart: (value: string) =>
    style({
      paddingInlineStart: value,
    }),

  /**
   * Padding inline end (right in LTR, left in RTL)
   */
  paddingInlineEnd: (value: string) =>
    style({
      paddingInlineEnd: value,
    }),

  /**
   * Padding inline (horizontal padding)
   */
  paddingInline: (start: string, end?: string) =>
    style({
      paddingInline: end ? `${start} ${end}` : start,
    }),

  /**
   * Padding block start (top)
   */
  paddingBlockStart: (value: string) =>
    style({
      paddingBlockStart: value,
    }),

  /**
   * Padding block end (bottom)
   */
  paddingBlockEnd: (value: string) =>
    style({
      paddingBlockEnd: value,
    }),

  /**
   * Padding block (vertical padding)
   */
  paddingBlock: (start: string, end?: string) =>
    style({
      paddingBlock: end ? `${start} ${end}` : start,
    }),
};

/**
 * Logical border utilities
 * Provides border styling that adapts to text direction
 */
export const logicalBorders = {
  /**
   * Border inline start (left in LTR, right in RTL)
   */
  borderInlineStart: (value: string) =>
    style({
      borderInlineStart: value,
    }),

  /**
   * Border inline end (right in LTR, left in RTL)
   */
  borderInlineEnd: (value: string) =>
    style({
      borderInlineEnd: value,
    }),

  /**
   * Border inline start width
   */
  borderInlineStartWidth: (value: string) =>
    style({
      borderInlineStartWidth: value,
    }),

  /**
   * Border inline end width
   */
  borderInlineEndWidth: (value: string) =>
    style({
      borderInlineEndWidth: value,
    }),

  /**
   * Border inline start color
   */
  borderInlineStartColor: (value: string) =>
    style({
      borderInlineStartColor: value,
    }),

  /**
   * Border inline end color
   */
  borderInlineEndColor: (value: string) =>
    style({
      borderInlineEndColor: value,
    }),

  /**
   * Border block start (top)
   */
  borderBlockStart: (value: string) =>
    style({
      borderBlockStart: value,
    }),

  /**
   * Border block end (bottom)
   */
  borderBlockEnd: (value: string) =>
    style({
      borderBlockEnd: value,
    }),
};

/**
 * Logical border radius utilities
 * Provides border radius that adapts to text direction
 */
export const logicalBorderRadius = {
  /**
   * Border start start radius (top-left in LTR, top-right in RTL)
   */
  borderStartStartRadius: (value: string) =>
    style({
      borderStartStartRadius: value,
    }),

  /**
   * Border start end radius (top-right in LTR, top-left in RTL)
   */
  borderStartEndRadius: (value: string) =>
    style({
      borderStartEndRadius: value,
    }),

  /**
   * Border end start radius (bottom-left in LTR, bottom-right in RTL)
   */
  borderEndStartRadius: (value: string) =>
    style({
      borderEndStartRadius: value,
    }),

  /**
   * Border end end radius (bottom-right in LTR, bottom-left in RTL)
   */
  borderEndEndRadius: (value: string) =>
    style({
      borderEndEndRadius: value,
    }),
};

/**
 * Logical positioning utilities
 * Provides positioning that adapts to text direction
 */
export const logicalPositioning = {
  /**
   * Inline start position (left in LTR, right in RTL)
   */
  inlineStart: (value: string) =>
    style({
      insetInlineStart: value,
    }),

  /**
   * Inline end position (right in LTR, left in RTL)
   */
  inlineEnd: (value: string) =>
    style({
      insetInlineEnd: value,
    }),

  /**
   * Block start position (top)
   */
  blockStart: (value: string) =>
    style({
      insetBlockStart: value,
    }),

  /**
   * Block end position (bottom)
   */
  blockEnd: (value: string) =>
    style({
      insetBlockEnd: value,
    }),

  /**
   * Inline positioning (horizontal)
   */
  inline: (start: string, end?: string) =>
    style({
      insetInline: end ? `${start} ${end}` : start,
    }),

  /**
   * Block positioning (vertical)
   */
  block: (start: string, end?: string) =>
    style({
      insetBlock: end ? `${start} ${end}` : start,
    }),
};

/**
 * Logical text alignment utilities
 * Provides text alignment that adapts to text direction
 */
export const logicalTextAlign = {
  /**
   * Text align start (left in LTR, right in RTL)
   */
  start: style({
    textAlign: 'start',
  }),

  /**
   * Text align end (right in LTR, left in RTL)
   */
  end: style({
    textAlign: 'end',
  }),

  /**
   * Text align center (same in all directions)
   */
  center: style({
    textAlign: 'center',
  }),

  /**
   * Text align justify (same in all directions)
   */
  justify: style({
    textAlign: 'justify',
  }),
};

/**
 * Logical float utilities
 * Provides float positioning that adapts to text direction
 */
export const logicalFloat = {
  /**
   * Float inline start (left in LTR, right in RTL)
   */
  inlineStart: style({
    float: 'inline-start',
  }),

  /**
   * Float inline end (right in LTR, left in RTL)
   */
  inlineEnd: style({
    float: 'inline-end',
  }),

  /**
   * Clear inline start
   */
  clearInlineStart: style({
    clear: 'inline-start',
  }),

  /**
   * Clear inline end
   */
  clearInlineEnd: style({
    clear: 'inline-end',
  }),

  /**
   * Clear both inline directions
   */
  clearBoth: style({
    clear: 'both',
  }),
};

/**
 * Logical transform utilities
 * Provides transforms that adapt to text direction
 */
export const logicalTransforms = {
  /**
   * Translate inline start
   */
  translateInlineStart: (value: string) =>
    style({
      transform: `translateX(${value})`,
      '@media': {
        '(dir: rtl)': {
          transform: `translateX(-${value})`,
        },
      },
    }),

  /**
   * Translate inline end
   */
  translateInlineEnd: (value: string) =>
    style({
      transform: `translateX(-${value})`,
      '@media': {
        '(dir: rtl)': {
          transform: `translateX(${value})`,
        },
      },
    }),
};

/**
 * Helper function to build logical spacing classes
 * Creates a complete set of spacing utilities for a given token value
 */
export const buildLogicalSpacingClasses = (
  tokenValue: string,
): Record<string, any> => ({
  marginInlineStart: logicalSpacing.marginInlineStart(tokenValue),
  marginInlineEnd: logicalSpacing.marginInlineEnd(tokenValue),
  marginInline: logicalSpacing.marginInline(tokenValue),
  marginBlockStart: logicalSpacing.marginBlockStart(tokenValue),
  marginBlockEnd: logicalSpacing.marginBlockEnd(tokenValue),
  marginBlock: logicalSpacing.marginBlock(tokenValue),
  paddingInlineStart: logicalSpacing.paddingInlineStart(tokenValue),
  paddingInlineEnd: logicalSpacing.paddingInlineEnd(tokenValue),
  paddingInline: logicalSpacing.paddingInline(tokenValue),
  paddingBlockStart: logicalSpacing.paddingBlockStart(tokenValue),
  paddingBlockEnd: logicalSpacing.paddingBlockEnd(tokenValue),
  paddingBlock: logicalSpacing.paddingBlock(tokenValue),
});

/**
 * Helper function to apply logical properties conditionally
 * Useful for components that need different styling in RTL vs LTR
 */
export const applyLogicalProperties = (
  ltrProperties: Record<string, string>,
  rtlProperties?: Record<string, string>,
): string => {
  if (!rtlProperties) {
    return style(ltrProperties);
  }

  return style({
    ...ltrProperties,
    '@media': {
      '(dir: rtl)': rtlProperties,
    },
  });
};

/**
 * RTL-aware directional classes
 * Provides utilities for different behavior in RTL vs LTR contexts
 */
export const directionalClasses = {
  // Only apply in LTR context
  ltrOnly: style({
    '@media': {
      '(dir: rtl)': {
        display: 'none',
      },
    },
  }),

  // Only apply in RTL context
  rtlOnly: style({
    display: 'none',
    '@media': {
      '(dir: rtl)': {
        display: 'initial',
      },
    },
  }),

  // Hide in RTL contexts
  hideInRtl: style({
    '@media': {
      '(dir: rtl)': {
        display: 'none',
      },
    },
  }),

  // Hide in LTR contexts
  hideInLtr: style({
    display: 'none',
    '@media': {
      '(dir: rtl)': {
        display: 'initial',
      },
    },
  }),
};
