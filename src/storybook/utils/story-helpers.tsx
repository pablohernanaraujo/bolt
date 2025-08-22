/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/storybook/utils/story-helpers.tsx
// Helper functions and utilities for creating Storybook stories
// Common patterns and templates for consistent story structure
// RELEVANT FILES: decorators.tsx, ../components/*.stories.tsx

import { ComponentType, type ReactElement } from 'react';

/**
 * Creates a grid of color swatches for color palette stories
 */
export const ColorSwatch = ({
  color,
  label,
  description,
}: {
  color: string;
  label: string;
  description?: string;
}): ReactElement => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: color,
        borderRadius: '8px',
        border: '2px solid #dee2e6',
        margin: '0 auto 8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    />
    <div
      style={{
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px',
      }}
    >
      {label}
    </div>
    {description && (
      <div
        style={{
          fontSize: '12px',
          color: '#6c757d',
        }}
      >
        {description}
      </div>
    )}
    <code
      style={{
        fontSize: '11px',
        backgroundColor: '#f8f9fa',
        padding: '2px 6px',
        borderRadius: '4px',
        display: 'block',
        marginTop: '4px',
      }}
    >
      {color}
    </code>
  </div>
);

/**
 * Creates a typography specimen for font stories
 */
export const TypographySpecimen = ({
  fontFamily,
  fontSize,
  fontWeight,
  text = 'The quick brown fox jumps over the lazy dog',
  label,
}: {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  text?: string;
  label: string;
}): ReactElement => (
  <div style={{ marginBottom: '24px' }}>
    <div
      style={{
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px',
        color: '#495057',
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        marginBottom: '8px',
        lineHeight: '1.4',
      }}
    >
      {text}
    </div>
    <div
      style={{
        display: 'flex',
        gap: '16px',
        fontSize: '12px',
        color: '#6c757d',
      }}
    >
      {fontFamily && <code>font-family: {fontFamily}</code>}
      {fontSize && <code>font-size: {fontSize}</code>}
      {fontWeight && <code>font-weight: {fontWeight}</code>}
    </div>
  </div>
);

/**
 * Creates a spacing demonstration block
 */
export const SpacingDemo = ({
  size,
  label,
  value,
}: {
  size: string;
  label: string;
  value: string;
}): ReactElement => (
  <div style={{ marginBottom: '16px' }}>
    <div
      style={{
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px',
      }}
    >
      {label}
    </div>
    <div
      style={{
        width: size,
        height: '24px',
        backgroundColor: '#0066cc',
        borderRadius: '4px',
        marginBottom: '8px',
      }}
    />
    <code
      style={{
        fontSize: '12px',
        backgroundColor: '#f8f9fa',
        padding: '4px 8px',
        borderRadius: '4px',
      }}
    >
      {value}
    </code>
  </div>
);

/**
 * Creates a token display item
 */
export const TokenItem = ({
  name,
  value,
  visual,
}: {
  name: string;
  value: string;
  visual?: ReactElement;
}): ReactElement => (
  <div
    style={{
      padding: '16px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
    }}
  >
    <div
      style={{
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px',
      }}
    >
      {name}
    </div>
    {visual && <div style={{ marginBottom: '12px' }}>{visual}</div>}
    <code
      style={{
        fontSize: '12px',
        backgroundColor: '#f8f9fa',
        padding: '4px 8px',
        borderRadius: '4px',
        display: 'block',
      }}
    >
      {value}
    </code>
  </div>
);

/**
 * Creates a component showcase grid
 */
export const ShowcaseGrid = ({
  children,
  columns = 'repeat(auto-fit, minmax(200px, 1fr))',
}: {
  children: ReactElement[];
  columns?: string;
}): ReactElement => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: columns,
      gap: '24px',
      padding: '16px',
    }}
  >
    {children}
  </div>
);

/**
 * Story template helper for consistent story structure
 */
export const createStoryTemplate = <T extends Record<string, any>>(
  Component: ComponentType<T>,
  defaultArgs: Partial<T> = {},
): ComponentType<T> => {
  const Template = (args: T): ReactElement => <Component {...args} />;
  Template.args = defaultArgs as T;
  return Template;
};
