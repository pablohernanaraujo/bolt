// /src/ui/theme-provider/__tests__/theme-provider.ssr.test.tsx
// SSR/CSR boundary tests for ThemeProvider component
// Validates theme persistence and hydration consistency
// RELEVANT FILES: ../theme-provider.tsx, theme-script.tsx

import { render } from '@testing-library/react';
import { type ReactNode } from 'react';

import { renderServer, expectNoHydrationMismatch } from '@/ui/utils/ssr-test-utils';

import { ThemeProvider, useCurrentTheme } from '../theme-provider';

// Test component that uses theme
const ThemeConsumer = () => {
  const theme = useCurrentTheme();
  return (
    <div data-testid="theme-consumer" data-theme={theme}>
      Current theme: {theme}
    </div>
  );
};

const TestWrapper = ({ 
  children, 
  defaultTheme = 'light' 
}: { 
  children: ReactNode; 
  defaultTheme?: 'light' | 'dark';
}) => (
  <ThemeProvider defaultTheme={defaultTheme}>
    {children}
  </ThemeProvider>
);

describe('ThemeProvider SSR/CSR Tests', () => {
  beforeEach(() => {
    // Reset DOM state
    document.documentElement.removeAttribute('data-theme');
    
    // Clear localStorage mocks
    jest.clearAllMocks();
  });

  describe('Server-Side Rendering', () => {
    it('should render correctly on server with light theme', () => {
      const { serverHTML } = renderServer(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      expect(serverHTML).toContain('Current theme: light');
      expect(serverHTML).toContain('data-theme="light"');
    });

    it('should render correctly on server with dark theme', () => {
      const { serverHTML } = renderServer(
        <TestWrapper defaultTheme="dark">
          <ThemeConsumer />
        </TestWrapper>
      );

      expect(serverHTML).toContain('Current theme: dark');
      expect(serverHTML).toContain('data-theme="dark"');
    });

    it('should include theme provider context in server HTML', () => {
      const { serverHTML } = renderServer(
        <TestWrapper>
          <div data-testid="content">Theme Provider Test</div>
        </TestWrapper>
      );

      // Should render without errors
      expect(serverHTML).toContain('Theme Provider Test');
      expect(serverHTML).toBeDefined();
    });
  });

  describe('Hydration Consistency', () => {
    it('should hydrate without mismatches with matching theme', async () => {
      // Mock localStorage to return the same theme as server
      const mockLocalStorage = {
        getItem: jest.fn().mockReturnValue('light'),
        setItem: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        configurable: true,
      });

      const result = await expectNoHydrationMismatch(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      expect(result.hydration.success).toBe(true);
      expect(result.hydration.mismatches).toHaveLength(0);
    });

    it('should handle theme mismatch gracefully during hydration', async () => {
      // Mock localStorage to return different theme than server
      const mockLocalStorage = {
        getItem: jest.fn().mockReturnValue('dark'),
        setItem: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        configurable: true,
      });

      // This should not throw, but may have warnings about mismatches
      const result = await expectNoHydrationMismatch(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      // The hydration should still succeed, React handles mismatches
      expect(result.hydration.success).toBe(true);
    });
  });

  describe('Theme Script Integration', () => {
    it('should work correctly with theme script pre-initialization', () => {
      // Simulate theme script setting data-theme before React hydration
      document.documentElement.setAttribute('data-theme', 'dark');

      const { container } = render(
        <TestWrapper defaultTheme="dark">
          <ThemeConsumer />
        </TestWrapper>
      );

      const themeConsumer = container.querySelector('[data-testid="theme-consumer"]');
      expect(themeConsumer).toHaveAttribute('data-theme', 'dark');
    });

    it('should handle missing theme script gracefully', () => {
      // Don't set any data-theme attribute (theme script didn't run)
      const { container } = render(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      const themeConsumer = container.querySelector('[data-testid="theme-consumer"]');
      expect(themeConsumer).toHaveAttribute('data-theme', 'light');
    });
  });

  describe('Static Generation Compatibility', () => {
    it('should work with static generation (no localStorage)', () => {
      // Simulate static generation environment
      delete (window as any).localStorage;

      const { serverHTML } = renderServer(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      expect(serverHTML).toContain('Current theme: light');
      expect(serverHTML).toBeDefined();
    });

    it('should work with disabled JavaScript', () => {
      // Simulate no JavaScript environment
      const originalMatchMedia = window.matchMedia;
      delete (window as any).matchMedia;

      const { serverHTML } = renderServer(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      expect(serverHTML).toContain('Current theme: light');
      
      // Restore
      window.matchMedia = originalMatchMedia;
    });
  });

  describe('Theme Persistence', () => {
    it('should persist theme preference across page loads', () => {
      const mockLocalStorage = {
        getItem: jest.fn().mockReturnValue('dark'),
        setItem: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        configurable: true,
      });

      render(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      // Should read from localStorage during hydration
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme-preference');
    });

    it('should handle localStorage quota exceeded errors', () => {
      const mockLocalStorage = {
        getItem: jest.fn().mockReturnValue('dark'),
        setItem: jest.fn().mockImplementation(() => {
          throw new DOMException('QuotaExceededError');
        }),
      };
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        configurable: true,
      });

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <TestWrapper defaultTheme="light">
          <ThemeConsumer />
        </TestWrapper>
      );

      // Should not crash the application
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Performance Considerations', () => {
    it('should not cause multiple re-renders during hydration', async () => {
      let renderCount = 0;
      
      const RenderCounter = () => {
        renderCount++;
        const theme = useCurrentTheme();
        return <div>Theme: {theme}</div>;
      };

      render(
        <TestWrapper defaultTheme="light">
          <RenderCounter />
        </TestWrapper>
      );

      // Should render minimal times (initial + hydration)
      expect(renderCount).toBeLessThanOrEqual(3);
    });

    it('should work with disabled transitions during theme change', () => {
      const { container } = render(
        <TestWrapper>
          <div data-testid="content">Content with transitions</div>
        </TestWrapper>
      );

      // Should render without errors even with transition disabling
      expect(container.querySelector('[data-testid="content"]')).toBeInTheDocument();
    });
  });
});