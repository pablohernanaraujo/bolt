// /src/app/page.css.ts
// Styles for the main design system page with sidebar layout
// Defines responsive layout and content presentation
// RELEVANT FILES: page.tsx, components/sidebar.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '../tokens/contracts.css';
import { tokens } from '../tokens/tokens.css';

/**
 * Main layout container
 * Uses flexbox for sidebar + content layout
 */
export const layout = style({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: colors.background.primary,
  color: colors.foreground.primary,
  fontFamily: tokens.fonts.body,
});

/**
 * Main content area (right side of sidebar)
 */
export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflowX: 'hidden',
});

/**
 * Header bar above main content
 */
export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: tokens.space[6],
  borderBottom: `1px solid ${colors.border.primary}`,
  backgroundColor: colors.background.primary,
  position: 'sticky',
  top: 0,
  zIndex: tokens.zIndex.sticky,
});

export const headerTitle = style({
  fontSize: tokens.fontSize['2xl'],
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.primary,
  margin: 0,
});

/**
 * Scrollable main content container
 */
export const main = style({
  flex: 1,
  padding: tokens.space[8],
  overflowY: 'auto',
  maxWidth: '1200px',
  width: '100%',
});

/**
 * Section container
 */
export const section = style({
  marginBottom: tokens.space[12],
});

export const sectionTitle = style({
  fontSize: tokens.fontSize['3xl'],
  fontWeight: tokens.fontWeight.bold,
  marginBottom: tokens.space[6],
  color: colors.foreground.primary,
});

export const sectionDescription = style({
  fontSize: tokens.fontSize.lg,
  color: colors.foreground.secondary,
  lineHeight: tokens.lineHeight.relaxed,
  marginBottom: tokens.space[8],
  maxWidth: '600px',
});

/**
 * Showcase container for components
 */
export const showcase = style({
  backgroundColor: colors.background.secondary,
  padding: tokens.space[6],
  borderRadius: tokens.radius.lg,
  border: `1px solid ${colors.border.primary}`,
  marginBottom: tokens.space[6],
});

export const showcaseTitle = style({
  fontSize: tokens.fontSize.xl,
  fontWeight: tokens.fontWeight.medium,
  marginBottom: tokens.space[4],
  color: colors.foreground.primary,
});

/**
 * Component groups within showcase
 */
export const componentGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.space[3],
  marginBottom: tokens.space[6],
});

/**
 * Individual component item container
 */
export const componentItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space[2],
  marginBottom: tokens.space[4],
});

/**
 * Label for component examples
 */
export const componentLabel = style({
  fontSize: tokens.fontSize.sm,
  fontFamily: tokens.fonts.mono,
  color: colors.foreground.tertiary,
  marginBottom: tokens.space[2],
});

/**
 * Grid layouts for different content types
 */
export const tokenGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: tokens.space[4],
  marginBottom: tokens.space[6],
});

export const colorGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: tokens.space[4],
  marginBottom: tokens.space[6],
});

export const iconGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.space[4],
  marginBottom: tokens.space[6],
});

/**
 * Individual showcase items
 */
export const tokenItem = style({
  padding: tokens.space[4],
  backgroundColor: colors.background.primary,
  borderRadius: tokens.radius.base,
  border: `1px solid ${colors.border.secondary}`,
});

export const tokenLabel = style({
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  color: colors.foreground.primary,
  marginBottom: tokens.space[2],
});

export const tokenValue = style({
  fontSize: tokens.fontSize.xs,
  fontFamily: tokens.fonts.mono,
  color: colors.foreground.secondary,
  backgroundColor: colors.background.tertiary,
  padding: `${tokens.space[1]} ${tokens.space[2]}`,
  borderRadius: tokens.radius.sm,
  display: 'inline-block',
});

/**
 * Color swatch components
 */
export const colorSwatch = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.space[2],
});

export const colorBox = style({
  width: '80px',
  height: '80px',
  borderRadius: tokens.radius.base,
  border: `2px solid ${colors.border.primary}`,
  boxShadow: `0 2px 4px ${colors.background.tertiary}`,
});

export const colorLabel = style({
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  color: colors.foreground.primary,
  textAlign: 'center',
});

/**
 * Demo elements for visualizing tokens
 */
export const spacingDemo = style({
  height: tokens.space[4],
  backgroundColor: colors.brand.primary,
  borderRadius: tokens.radius.sm,
  marginBottom: tokens.space[2],
});

export const radiusDemo = style({
  width: '60px',
  height: '60px',
  backgroundColor: colors.brand.primary,
  display: 'inline-block',
  marginRight: tokens.space[3],
  marginBottom: tokens.space[2],
});

/**
 * Typography demonstration
 */
export const typographyDemo = style({
  marginBottom: tokens.space[4],
});

export const typographyText = style({
  marginBottom: tokens.space[2],
});

/**
 * Overview section specific styles
 */
export const overviewCard = style({
  backgroundColor: colors.background.secondary,
  padding: tokens.space[8],
  borderRadius: tokens.radius.lg,
  border: `1px solid ${colors.border.primary}`,
  textAlign: 'center',
  marginBottom: tokens.space[8],
});

export const overviewIcon = style({
  marginBottom: tokens.space[4],
});

export const overviewCardTitle = style({
  fontSize: tokens.fontSize.xl,
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.primary,
  marginBottom: tokens.space[3],
});

export const overviewCardDescription = style({
  fontSize: tokens.fontSize.base,
  color: colors.foreground.secondary,
  lineHeight: tokens.lineHeight.relaxed,
  maxWidth: '400px',
  margin: '0 auto',
});

/**
 * Component documentation styles
 */
export const componentSection = style({
  marginBottom: tokens.space[8],
});

export const componentExample = style({
  backgroundColor: colors.background.secondary,
  padding: tokens.space[6],
  borderRadius: tokens.radius.lg,
  border: `1px solid ${colors.border.primary}`,
  marginTop: tokens.space[4],
  marginBottom: tokens.space[4],
});

export const codeExample = style({
  backgroundColor: colors.background.tertiary,
  padding: tokens.space[4],
  borderRadius: tokens.radius.md,
  border: `1px solid ${colors.border.secondary}`,
  marginTop: tokens.space[3],
  overflow: 'auto',
});

export const codeBlock = style({
  backgroundColor: colors.background.tertiary,
  padding: tokens.space[4],
  borderRadius: tokens.radius.md,
  border: `1px solid ${colors.border.secondary}`,
  marginTop: tokens.space[3],
  overflow: 'auto',
  fontSize: tokens.fontSize.sm,
  fontFamily: tokens.fonts.mono,
  color: colors.foreground.primary,
  whiteSpace: 'pre-wrap',
});

/**
 * Example container for component demonstrations
 */
export const exampleContainer = style({
  backgroundColor: colors.background.secondary,
  padding: tokens.space[6],
  borderRadius: tokens.radius.lg,
  border: `1px solid ${colors.border.primary}`,
  marginTop: tokens.space[4],
  marginBottom: tokens.space[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '120px',
});

/**
 * API Reference Table Styles
 */
export const apiTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: colors.background.secondary,
  borderRadius: tokens.radius.lg,
  border: `1px solid ${colors.border.primary}`,
  marginTop: tokens.space[4],
  overflow: 'hidden',
});

export const apiRow = style({
  borderBottom: `1px solid ${colors.border.secondary}`,

  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:nth-child(even)': {
      backgroundColor: colors.background.tertiary,
    },
  },
});

export const apiCell = style({
  padding: `${tokens.space[4]} ${tokens.space[4]}`,
  textAlign: 'left',
  verticalAlign: 'top',
  fontSize: tokens.fontSize.sm,
  color: colors.foreground.primary,

  selectors: {
    '&:first-child': {
      fontFamily: tokens.fonts.mono,
      fontWeight: tokens.fontWeight.medium,
      color: colors.foreground.primary,
      width: '150px',
    },
    '&:nth-child(2)': {
      fontFamily: tokens.fonts.mono,
      fontSize: tokens.fontSize.xs,
      color: colors.foreground.secondary,
      width: '200px',
    },
    '&:nth-child(3)': {
      fontFamily: tokens.fonts.mono,
      fontSize: tokens.fontSize.xs,
      color: colors.brand.primary,
      width: '100px',
      textAlign: 'center',
    },
    '&:nth-child(4)': {
      color: colors.foreground.secondary,
      lineHeight: tokens.lineHeight.normal,
    },
  },
});

/**
 * Component documentation page specific styles
 */
export const example = style({
  marginTop: tokens.space[6],
  marginBottom: tokens.space[6],
});

export const preview = style({
  backgroundColor: colors.background.secondary,
  padding: tokens.space[6],
  borderRadius: tokens.radius.lg,
  border: `1px solid ${colors.border.primary}`,
  marginBottom: tokens.space[4],
});

/**
 * Tab navigation for documentation pages
 */
export const tabContainer = style({
  display: 'flex',
  gap: tokens.space[1],
  marginBottom: tokens.space[8],
  borderBottom: `1px solid ${colors.border.secondary}`,
});

export const tab = style({
  padding: `${tokens.space[3]} ${tokens.space[4]}`,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: `${tokens.radius.md} ${tokens.radius.md} 0 0`,
  cursor: 'pointer',
  fontSize: tokens.fontSize.base,
  fontWeight: tokens.fontWeight.medium,
  color: colors.foreground.secondary,
  transition: 'all 150ms ease',
  borderBottom: '2px solid transparent',

  ':hover': {
    backgroundColor: colors.background.tertiary,
    color: colors.foreground.primary,
  },
});

export const tabActive = style({
  backgroundColor: colors.background.secondary,
  color: colors.foreground.primary,
  borderBottomColor: colors.brand.primary,
});

/**
 * API Reference sections
 */
export const apiSection = style({
  marginBottom: tokens.space[8],
});

/**
 * Responsive design for mobile
 */
export const mobileToggle = style({
  display: 'none',

  '@media': {
    '(max-width: 768px)': {
      display: 'flex',
    },
  },
});

export const desktopSidebar = style({
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
});
