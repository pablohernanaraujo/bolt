// /src/tokens/reset.css.ts
// CSS reset and base styles
// Normalizes browser defaults and sets up base styles
// RELEVANT FILES: themes.css.ts, tokens.css.ts

import { globalStyle } from '@vanilla-extract/css';

import { colors } from './contracts.css';
import { tokens } from './tokens.css';

// Modern CSS reset based on Josh Comeau's reset
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('*', {
  margin: 0,
});

globalStyle('html', {
  fontSize: '16px',
  lineHeight: tokens.lineHeight.normal,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textSizeAdjust: '100%',
});

globalStyle('body', {
  fontFamily: tokens.fonts.body,
  fontSize: tokens.fontSize.base,
  lineHeight: 'inherit',
  color: colors.foreground.primary,
  backgroundColor: colors.background.primary,
  minHeight: '100vh',
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
});

globalStyle('input, button, textarea, select', {
  font: 'inherit',
});

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontFamily: tokens.fonts.heading,
  fontWeight: tokens.fontWeight.semibold,
  lineHeight: tokens.lineHeight.tight,
});

// Remove default button styles
globalStyle('button', {
  background: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

// Links
globalStyle('a', {
  color: colors.brand.primary,
  textDecoration: 'none',
});

globalStyle('a:hover', {
  textDecoration: 'underline',
});

// Code blocks
globalStyle('code, pre', {
  fontFamily: tokens.fonts.mono,
  fontSize: tokens.fontSize.sm,
});

// Lists
globalStyle('ul, ol', {
  paddingLeft: tokens.space[6],
});

// Focus visible styles
globalStyle(':focus-visible', {
  outline: `2px solid ${colors.border.focus}`,
  outlineOffset: '2px',
});

// Remove focus outline for mouse users
globalStyle(':focus:not(:focus-visible)', {
  outline: 'none',
});
