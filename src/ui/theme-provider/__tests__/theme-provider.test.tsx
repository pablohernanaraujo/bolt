// /src/ui/theme-provider/__tests__/theme-provider.test.tsx
// Comprehensive tests for ThemeProvider component and hooks
// Tests SSR compatibility, hydration, and theme switching functionality
// RELEVANT FILES: ../theme-provider.tsx, ../theme-script.tsx

import { act, render, renderHook, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { type ReactNode } from 'react';

import {
  ThemeProvider,
  useCurrentTheme,
  useTheme,
  useThemeHydrated,
  useThemeOptional,
} from '../theme-provider';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  value: mockMatchMedia,
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));

// Test wrapper component
const TestComponent = () => {
  const { theme, setTheme, toggleTheme, isHydrated, followSystemTheme } =
    useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="hydrated">{isHydrated.toString()}</div>
      <div data-testid="follow-system">{followSystemTheme.toString()}</div>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });
  });

  describe('Initialization', () => {
    it('should initialize with light theme by default', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('should initialize with provided default theme', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should start as not hydrated and become hydrated', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // Should start as not hydrated
      expect(screen.getByTestId('hydrated')).toHaveTextContent('false');

      // Should become hydrated after effect runs
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('hydrated')).toHaveTextContent('true');
    });
  });

  describe('Theme Management', () => {
    it('should set theme correctly', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      await user.click(screen.getByTestId('set-dark'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      await user.click(screen.getByTestId('set-light'));
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('should toggle theme correctly', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // Start with light, toggle to dark
      await user.click(screen.getByTestId('toggle'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      // Toggle back to light
      await user.click(screen.getByTestId('toggle'));
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('should save theme to localStorage', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      await user.click(screen.getByTestId('set-dark'));

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'theme-preference',
        'dark',
      );
    });

    it('should use custom storage key', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider storageKey="custom-theme">
          <TestComponent />
        </ThemeProvider>,
      );

      await user.click(screen.getByTestId('set-dark'));

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'custom-theme',
        'dark',
      );
    });
  });

  describe('System Theme Following', () => {
    it('should not follow system theme by default', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('follow-system')).toHaveTextContent('false');
    });

    it('should follow system theme when enabled', () => {
      render(
        <ThemeProvider followSystemTheme>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('follow-system')).toHaveTextContent('true');
    });

    it('should watch for system theme changes when following system', async () => {
      const addEventListener = jest.fn();
      const removeEventListener = jest.fn();
      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener,
        removeEventListener,
      });

      const { unmount } = render(
        <ThemeProvider followSystemTheme>
          <TestComponent />
        </ThemeProvider>,
      );

      // Should set up event listener
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );

      // Should clean up on unmount
      unmount();
      expect(removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });
  });

  describe('LocalStorage Integration', () => {
    it('should load theme from localStorage on hydration', async () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // Should become dark after hydration
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should handle localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('LocalStorage error');
      });

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // Should not crash and should default to light theme
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      consoleSpy.mockRestore();
    });
  });
});

describe('Theme Hooks', () => {
  describe('useTheme', () => {
    it('should provide theme context', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe('light');
      expect(typeof result.current.setTheme).toBe('function');
      expect(typeof result.current.toggleTheme).toBe('function');
      expect(typeof result.current.isHydrated).toBe('boolean');
    });

    it('should throw error when used outside provider', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.error).toEqual(
        new Error('useTheme must be used within a ThemeProvider'),
      );
    });
  });

  describe('useThemeOptional', () => {
    it('should return undefined when used outside provider', () => {
      const { result } = renderHook(() => useThemeOptional());

      expect(result.current).toBeUndefined();
    });

    it('should return context when used inside provider', () => {
      const { result } = renderHook(() => useThemeOptional(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current?.theme).toBe('light');
    });
  });

  describe('useCurrentTheme', () => {
    it('should return only the current theme', () => {
      const { result } = renderHook(() => useCurrentTheme(), { wrapper });

      expect(result.current).toBe('light');
    });
  });

  describe('useThemeHydrated', () => {
    it('should return hydration status', () => {
      const { result } = renderHook(() => useThemeHydrated(), { wrapper });

      expect(typeof result.current).toBe('boolean');
    });

    it('should return false when used outside provider', () => {
      const { result } = renderHook(() => useThemeHydrated());

      expect(result.current).toBe(false);
    });
  });
});