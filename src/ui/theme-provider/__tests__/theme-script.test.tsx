// /src/ui/theme-provider/__tests__/theme-script.test.tsx
// Tests for ThemeScript component and theme script generation utilities
// Validates script generation and server-side theme flash prevention
// RELEVANT FILES: ../theme-script.tsx

import { render } from '@testing-library/react';

import {
  generateThemeScript,
  getThemeScriptForAppRouter,
  ThemeScript,
} from '../theme-script';

describe('ThemeScript', () => {
  describe('Component Rendering', () => {
    it('should render script element with default configuration', () => {
      const { container } = render(<ThemeScript />);
      const script = container.querySelector('script');

      expect(script).toBeInTheDocument();
      expect(script?.innerHTML).toContain('theme-preference');
      expect(script?.innerHTML).toContain('data-theme');
    });

    it('should use custom storage key', () => {
      const { container } = render(<ThemeScript storageKey="custom-theme" />);
      const script = container.querySelector('script');

      expect(script?.innerHTML).toContain('custom-theme');
    });

    it('should use custom default theme', () => {
      const { container } = render(<ThemeScript defaultTheme="dark" />);
      const script = container.querySelector('script');

      expect(script?.innerHTML).toContain('dark');
    });

    it('should respect system theme setting', () => {
      const { container: withSystem } = render(
        <ThemeScript respectSystemTheme={true} />,
      );
      const { container: withoutSystem } = render(
        <ThemeScript respectSystemTheme={false} />,
      );

      const scriptWithSystem = withSystem.querySelector('script');
      const scriptWithoutSystem = withoutSystem.querySelector('script');

      expect(scriptWithSystem?.innerHTML).toContain('matchMedia');
      expect(scriptWithoutSystem?.innerHTML).not.toContain('matchMedia');
    });
  });

  describe('Script Content Validation', () => {
    it('should include localStorage reading logic', () => {
      const { container } = render(<ThemeScript />);
      const script = container.querySelector('script');

      expect(script?.innerHTML).toContain('localStorage.getItem');
      expect(script?.innerHTML).toContain('setAttribute');
    });

    it('should include error handling', () => {
      const { container } = render(<ThemeScript />);
      const script = container.querySelector('script');

      expect(script?.innerHTML).toContain('try');
      expect(script?.innerHTML).toContain('catch');
    });

    it('should be minified (no unnecessary whitespace)', () => {
      const { container } = render(<ThemeScript />);
      const script = container.querySelector('script');

      // Should not contain multiple spaces or line breaks
      expect(script?.innerHTML).not.toMatch(/\s{2,}/);
      expect(script?.innerHTML).not.toContain('\n');
    });
  });
});

describe('generateThemeScript', () => {
  it('should generate script string with default configuration', () => {
    const script = generateThemeScript();

    expect(script).toContain('localStorage.getItem');
    expect(script).toContain('theme-preference');
    expect(script).toContain('data-theme');
    expect(script).toContain('light');
  });

  it('should use custom configuration', () => {
    const script = generateThemeScript({
      storageKey: 'custom-key',
      defaultTheme: 'dark',
      respectSystemTheme: false,
    });

    expect(script).toContain('custom-key');
    expect(script).toContain('dark');
    expect(script).not.toContain('matchMedia');
  });

  it('should include system theme detection when enabled', () => {
    const script = generateThemeScript({ respectSystemTheme: true });

    expect(script).toContain('matchMedia');
    expect(script).toContain('prefers-color-scheme');
  });

  it('should not include system theme detection when disabled', () => {
    const script = generateThemeScript({ respectSystemTheme: false });

    expect(script).not.toContain('matchMedia');
    expect(script).not.toContain('prefers-color-scheme');
  });

  it('should be properly minified', () => {
    const script = generateThemeScript();

    // Should not contain multiple spaces or line breaks
    expect(script).not.toMatch(/\s{2,}/);
    expect(script).not.toContain('\n');
    expect(script.trim()).toBe(script);
  });
});

describe('getThemeScriptForAppRouter', () => {
  it('should return ThemeScript component', () => {
    const component = getThemeScriptForAppRouter();

    expect(component.type).toBe(ThemeScript);
  });

  it('should pass props to ThemeScript component', () => {
    const component = getThemeScriptForAppRouter({
      storageKey: 'test-key',
      defaultTheme: 'dark',
    });

    expect(component.props.storageKey).toBe('test-key');
    expect(component.props.defaultTheme).toBe('dark');
  });
});

describe('Script Execution Simulation', () => {
  // These tests simulate the script execution in different scenarios
  let mockDocumentElement: {
    setAttribute: jest.Mock;
  };
  let mockLocalStorage: {
    getItem: jest.Mock;
  };
  let mockMatchMedia: jest.Mock;

  beforeEach(() => {
    mockDocumentElement = {
      setAttribute: jest.fn(),
    };

    mockLocalStorage = {
      getItem: jest.fn(),
    };

    mockMatchMedia = jest.fn();

    // Mock global objects
    (global as any).document = {
      documentElement: mockDocumentElement,
    };
    (global as any).localStorage = mockLocalStorage;
    (global as any).window = {
      matchMedia: mockMatchMedia,
    };
  });

  afterEach(() => {
    delete (global as any).document;
    delete (global as any).localStorage;
    delete (global as any).window;
  });

  it('should use stored theme when available', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    // Execute the script logic
    const script = generateThemeScript();
    eval(script);

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'dark',
    );
  });

  it('should use system theme when no stored preference', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({ matches: true });

    const script = generateThemeScript({ respectSystemTheme: true });
    eval(script);

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'dark',
    );
  });

  it('should use default theme when system theme disabled', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const script = generateThemeScript({
      respectSystemTheme: false,
      defaultTheme: 'light',
    });
    eval(script);

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'light',
    );
  });

  it('should handle localStorage errors gracefully', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('LocalStorage error');
    });

    const script = generateThemeScript({ defaultTheme: 'light' });
    
    // Should not throw and should use default theme
    expect(() => eval(script)).not.toThrow();
    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'light',
    );
  });
});