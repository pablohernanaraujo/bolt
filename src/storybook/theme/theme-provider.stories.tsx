// /src/storybook/theme/theme-provider.stories.tsx
// ThemeProvider component stories showcasing theme management capabilities
// Demonstrates server-client hydration, system theme following, and persistence
// RELEVANT FILES: ../../ui/theme-provider/index.tsx, ../../ui/theme-toggle/index.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../../ui/button';
import { Card } from '../../ui/content/badge'; // Assuming there's a card component
import { 
  ThemeProvider, 
  ThemeScript, 
  useTheme,
  useThemeHydrated,
  useCurrentTheme 
} from '../../ui/theme-provider';
import { ThemeToggleEnhanced } from '../../ui/theme-toggle';
import { H2, H3, Body1, Body2 } from '../../ui/typography';
import { VStack, HStack, Container } from '../../ui/layout';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Comprehensive theme management system with React context, server-side rendering support, and system preference detection. Provides theme state to all child components with proper hydration handling.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    defaultTheme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Initial theme (overrides server-detected theme)',
      defaultValue: 'light',
    },
    followSystemTheme: {
      control: 'boolean',
      description: 'Whether to automatically follow system theme changes',
      defaultValue: false,
    },
    storageKey: {
      control: 'text',
      description: 'Storage key for theme preference (defaults to theme-preference)',
      defaultValue: 'theme-preference',
    },
    disableTransitions: {
      control: 'boolean',
      description: 'Whether to disable transitions during theme changes',
      defaultValue: false,
    },
  },
  args: {
    defaultTheme: 'light',
    followSystemTheme: false,
    storageKey: 'theme-preference',
    disableTransitions: false,
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

/**
 * Theme consumer component for demonstrating theme access
 */
const ThemeConsumer = () => {
  const { 
    theme, 
    setTheme, 
    toggleTheme, 
    isHydrated, 
    followSystemTheme,
    setFollowSystemTheme 
  } = useTheme();

  return (
    <Container paddingY="6">
      <VStack gap="6">
        <div>
          <H2>Theme Provider Demo</H2>
          <Body1>
            This demonstrates the ThemeProvider component managing global theme state.
          </Body1>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          borderRadius: '8px',
          backgroundColor: theme === 'dark' ? '#2a2b2e' : '#f5f5f5',
          transition: 'background-color 0.3s ease'
        }}>
          <VStack gap="4">
            <H3>Current Theme Information</H3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <Body2 style={{ fontWeight: 600 }}>Current Theme:</Body2>
                <Body1>{theme}</Body1>
              </div>
              <div>
                <Body2 style={{ fontWeight: 600 }}>Hydration Status:</Body2>
                <Body1>{isHydrated ? 'Hydrated' : 'Not hydrated'}</Body1>
              </div>
              <div>
                <Body2 style={{ fontWeight: 600 }}>Follow System:</Body2>
                <Body1>{followSystemTheme ? 'Yes' : 'No'}</Body1>
              </div>
            </div>
          </VStack>
        </div>

        <VStack gap="3">
          <H3>Theme Controls</H3>
          <HStack gap="3" style={{ flexWrap: 'wrap' }}>
            <Button 
              variant="primary" 
              onClick={() => setTheme('light')}
              disabled={theme === 'light' && !followSystemTheme}
            >
              Set Light Theme
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setTheme('dark')}
              disabled={theme === 'dark' && !followSystemTheme}
            >
              Set Dark Theme
            </Button>
            <Button variant="secondary" onClick={toggleTheme}>
              Toggle Theme
            </Button>
          </HStack>
          
          <HStack gap="3" style={{ flexWrap: 'wrap' }}>
            <Button 
              variant={followSystemTheme ? "danger" : "secondary"} 
              onClick={() => setFollowSystemTheme(!followSystemTheme)}
            >
              {followSystemTheme ? 'Stop Following System' : 'Follow System Theme'}
            </Button>
            <ThemeToggleEnhanced 
              showLabel 
              showSystemOption 
              showLoadingState
              variant="secondary"
            />
          </HStack>
        </VStack>

        <div style={{ 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: `2px solid ${theme === 'dark' ? '#3a3b3e' : '#e5e5e5'}`,
          transition: 'border-color 0.3s ease'
        }}>
          <VStack gap="4">
            <H3>Demo Content</H3>
            <Body1>
              This content automatically adapts to the current theme. The background colors, 
              text colors, and border colors all change based on the theme context.
            </Body1>
            <HStack gap="3">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="ghost">Ghost Action</Button>
            </HStack>
          </VStack>
        </div>
      </VStack>
    </Container>
  );
};

/**
 * Hook usage demonstration
 */
const HooksDemoComponent = () => {
  const currentTheme = useCurrentTheme();
  const isHydrated = useThemeHydrated();
  
  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: currentTheme === 'dark' ? '#2a2b2e' : '#f9f9f9',
      borderRadius: '6px',
      transition: 'background-color 0.3s ease'
    }}>
      <H3>Theme Hooks Demo</H3>
      <Body2>useCurrentTheme(): {currentTheme}</Body2>
      <Body2>useThemeHydrated(): {isHydrated.toString()}</Body2>
    </div>
  );
};

/**
 * Default ThemeProvider Story
 */
export const Default: Story = {
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeConsumer />
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic ThemeProvider setup with theme management capabilities.',
      },
    },
  },
};

/**
 * With System Theme Following
 */
export const WithSystemTheme: Story = {
  args: {
    followSystemTheme: true,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeConsumer />
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ThemeProvider configured to automatically follow system theme preference.',
      },
    },
  },
};

/**
 * Custom Storage Key
 */
export const CustomStorageKey: Story = {
  args: {
    storageKey: 'custom-design-system-theme',
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <Container paddingY="6">
        <VStack gap="4">
          <H2>Custom Storage Key</H2>
          <Body1>
            This example uses a custom storage key: "{args.storageKey}"
          </Body1>
          <ThemeConsumer />
        </VStack>
      </Container>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ThemeProvider with custom localStorage key for theme persistence.',
      },
    },
  },
};

/**
 * Multiple ThemeProviders (Nested)
 */
export const NestedProviders: Story = {
  render: () => {
    const [outerTheme, setOuterTheme] = useState<'light' | 'dark'>('light');
    const [innerTheme, setInnerTheme] = useState<'light' | 'dark'>('dark');

    return (
      <ThemeProvider defaultTheme={outerTheme} storageKey="outer-theme">
        <Container paddingY="6">
          <VStack gap="6">
            <div>
              <H2>Outer Theme Provider (Current: {outerTheme})</H2>
              <HStack gap="3">
                <Button onClick={() => setOuterTheme('light')}>Set Light</Button>
                <Button onClick={() => setOuterTheme('dark')}>Set Dark</Button>
              </HStack>
            </div>
            
            <div style={{ 
              padding: '2rem', 
              border: '2px dashed #666',
              borderRadius: '8px'
            }}>
              <ThemeProvider defaultTheme={innerTheme} storageKey="inner-theme">
                <VStack gap="4">
                  <H3>Inner Theme Provider (Current: {innerTheme})</H3>
                  <Body1>
                    This demonstrates nested ThemeProviders with different storage keys.
                  </Body1>
                  <HStack gap="3">
                    <Button onClick={() => setInnerTheme('light')}>Set Light</Button>
                    <Button onClick={() => setInnerTheme('dark')}>Set Dark</Button>
                  </HStack>
                  <HooksDemoComponent />
                </VStack>
              </ThemeProvider>
            </div>
          </VStack>
        </Container>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of nested ThemeProviders with independent theme states.',
      },
    },
  },
};

/**
 * Theme Script Integration
 */
export const WithThemeScript: Story = {
  render: (args) => (
    <div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '6px',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem'
      }}>
        <H3>Theme Script (would be in &lt;head&gt;):</H3>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {`<head>
  <ThemeScript 
    defaultTheme="${args.defaultTheme}"
    respectSystemTheme={true}
    storageKey="${args.storageKey}"
  />
</head>`}
        </pre>
      </div>
      
      <ThemeProvider {...args}>
        <Container paddingY="6">
          <VStack gap="4">
            <H2>Theme Script Integration</H2>
            <Body1>
              The ThemeScript component prevents flash of wrong theme by setting 
              the theme before React hydration. In a real app, this would be 
              placed in the document head.
            </Body1>
            <ThemeConsumer />
          </VStack>
        </Container>
      </ThemeProvider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows how ThemeScript integrates with ThemeProvider to prevent theme flash.',
      },
    },
  },
};

/**
 * Accessibility Testing
 */
export const AccessibilityDemo: Story = {
  render: (args) => (
    <ThemeProvider {...args}>
      <Container paddingY="6">
        <VStack gap="6">
          <div>
            <H2>Accessibility Features</H2>
            <Body1>
              The ThemeProvider respects user preferences and provides proper ARIA attributes.
            </Body1>
          </div>

          <div role="region" aria-labelledby="theme-controls-heading">
            <H3 id="theme-controls-heading">Theme Controls</H3>
            <VStack gap="3">
              <ThemeToggleEnhanced 
                showLabel 
                showSystemOption 
                aria-describedby="theme-toggle-help"
              />
              <Body2 id="theme-toggle-help" style={{ color: '#666' }}>
                Use this control to switch between light and dark themes, or follow your system preference.
              </Body2>
            </VStack>
          </div>

          <div role="status" aria-live="polite">
            <Body2>Current theme: <span style={{ fontWeight: 600 }}>{useCurrentTheme()}</span></Body2>
          </div>

          <div style={{ 
            padding: '1.5rem',
            borderRadius: '8px',
            backgroundColor: 'var(--colors-surface-secondary, #f5f5f5)'
          }}>
            <H3>High Contrast Support</H3>
            <Body1>
              This theme system works with high contrast mode and respects 
              `prefers-reduced-motion` for transition animations.
            </Body1>
          </div>
        </VStack>
      </Container>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including ARIA attributes and high contrast support.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'aria-roles',
            enabled: true,
          },
        ],
      },
    },
  },
};