/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-nested-callbacks */
// /src/ui/toast/__tests__/toast.test.tsx
// Comprehensive tests for Toast component
// Tests functionality, accessibility, animations, and user interactions
// RELEVANT FILES: ../toast.tsx, ../types.ts, ../helpers.ts

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Toast, ToastProvider, useToast } from '../toast';
import { type ToastPosition, type ToastVariant } from '../types';

// Mock the createPortal function for testing
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

// Mock timers
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  vi.clearAllMocks();
});

/**
 * Test component that uses the toast hook
 */
const TestComponent = ({
  variant = 'info',
  title,
  description,
  duration,
}: {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number | null;
}): ReactElement => {
  const { toast, close, closeAll } = useToast();

  const handleShowToast = (): void => {
    toast({
      variant,
      title,
      description: description || `Test ${variant} message`,
      duration,
    });
  };

  return (
    <div>
      <button onClick={handleShowToast} data-testid="show-toast">
        Show Toast
      </button>
      <button onClick={() => close('test-id')} data-testid="close-toast">
        Close Toast
      </button>
      <button onClick={closeAll} data-testid="close-all">
        Close All
      </button>
    </div>
  );
};

describe('Toast Component', () => {
  describe('Individual Toast', () => {
    it('should render with default props', () => {
      render(<Toast id="test-toast" description="Test message" />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should render with title and description', () => {
      render(
        <Toast
          id="test-toast"
          title="Test Title"
          description="Test description"
        />,
      );

      expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Title');
      expect(screen.getByTestId('toast-description')).toHaveTextContent(
        'Test description',
      );
    });

    it('should render different variants with correct styling', () => {
      const variants: ToastVariant[] = ['success', 'error', 'warning', 'info'];

      for (const variant of variants) {
        const { container } = render(
          <Toast
            id={`test-${variant}`}
            variant={variant}
            description={`${variant} message`}
          />,
        );

        // Check if variant class is applied
        const toast = container.querySelector(
          `[data-testid="toast-test-${variant}"]`,
        );
        expect(toast).toBeTruthy();
      }
    });

    it('should render close button when closable', () => {
      render(
        <Toast id="test-toast" description="Test message" isClosable={true} />,
      );

      expect(screen.getByTestId('toast-close')).toBeInTheDocument();
    });

    it('should not render close button when not closable', () => {
      render(
        <Toast id="test-toast" description="Test message" isClosable={false} />,
      );

      expect(screen.queryByTestId('toast-close')).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const onClose = vi.fn();

      render(
        <Toast id="test-toast" description="Test message" onClose={onClose} />,
      );

      await user.click(screen.getByTestId('toast-close'));
      expect(onClose).toHaveBeenCalledWith('test-toast');
    });

    it('should call onClose when Escape key is pressed', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const onClose = vi.fn();

      render(
        <Toast id="test-toast" description="Test message" onClose={onClose} />,
      );

      const toast = screen.getByRole('status');
      toast.focus();
      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledWith('test-toast');
    });

    it('should have correct ARIA attributes', () => {
      render(
        <Toast
          id="test-toast"
          variant="error"
          description="Error message"
          status="assertive"
        />,
      );

      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'assertive');
      expect(toast).toHaveAttribute('aria-atomic', 'true');
    });

    it('should render progress bar when duration is set', () => {
      render(
        <Toast id="test-toast" description="Test message" duration={5000} />,
      );

      expect(screen.getByTestId('toast-progress')).toBeInTheDocument();
    });

    it('should not render progress bar when duration is null', () => {
      render(
        <Toast id="test-toast" description="Test message" duration={null} />,
      );

      expect(screen.queryByTestId('toast-progress')).not.toBeInTheDocument();
    });
  });

  describe('ToastProvider', () => {
    it('should render children', () => {
      render(
        <ToastProvider>
          <div data-testid="child">Child content</div>
        </ToastProvider>,
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide toast context', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      await user.click(screen.getByTestId('show-toast'));

      expect(screen.getByText('Test info message')).toBeInTheDocument();
    });

    it('should show toast with correct variant', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <ToastProvider>
          <TestComponent variant="success" />
        </ToastProvider>,
      );

      await user.click(screen.getByTestId('show-toast'));

      expect(screen.getByText('Test success message')).toBeInTheDocument();
    });

    it('should auto-dismiss toasts after duration', async () => {
      render(
        <ToastProvider>
          <TestComponent duration={1000} />
        </ToastProvider>,
      );

      fireEvent.click(screen.getByTestId('show-toast'));
      expect(screen.getByText('Test info message')).toBeInTheDocument();

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Wait for the toast to be hidden
      await waitFor(
        () => {
          expect(
            screen.queryByText('Test info message'),
          ).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should not auto-dismiss when duration is null', () => {
      render(
        <ToastProvider>
          <TestComponent duration={null} />
        </ToastProvider>,
      );

      fireEvent.click(screen.getByTestId('show-toast'));
      expect(screen.getByText('Test info message')).toBeInTheDocument();

      // Fast-forward time significantly
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Toast should still be there
      expect(screen.getByText('Test info message')).toBeInTheDocument();
    });

    it('should limit number of toasts based on max prop', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <ToastProvider max={2}>
          <TestComponent />
        </ToastProvider>,
      );

      // Show 3 toasts
      await user.click(screen.getByTestId('show-toast'));
      await user.click(screen.getByTestId('show-toast'));
      await user.click(screen.getByTestId('show-toast'));

      // Should only have 2 toasts visible
      const toasts = screen.getAllByText('Test info message');
      expect(toasts).toHaveLength(2);
    });

    it('should close all toasts when closeAll is called', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      // Show multiple toasts
      await user.click(screen.getByTestId('show-toast'));
      await user.click(screen.getByTestId('show-toast'));

      expect(screen.getAllByText('Test info message')).toHaveLength(2);

      await user.click(screen.getByTestId('close-all'));

      // Wait for toasts to be removed
      await waitFor(() => {
        expect(screen.queryByText('Test info message')).not.toBeInTheDocument();
      });
    });

    it('should render toasts in correct position', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const positions: ToastPosition[] = [
        'top',
        'bottom',
        'top-left',
        'bottom-right',
      ];

      for (const position of positions) {
        const { container } = render(
          <ToastProvider position={position}>
            <TestComponent />
          </ToastProvider>,
        );

        await user.click(screen.getByTestId('show-toast'));

        const toastContainer = container.querySelector(
          '[data-testid="toast-container"]',
        );
        expect(toastContainer).toHaveAttribute('data-position', position);

        // Clean up for next iteration
        await user.click(screen.getByTestId('close-all'));
      }
    });
  });

  describe('useToast Hook', () => {
    it('should throw error when used outside provider', () => {
      // Mock console.error to suppress error output in test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useToast must be used within a ToastProvider');

      consoleSpy.mockRestore();
    });

    it('should return toast functions', () => {
      let toastContext: any;

      const TestHook = (): null => {
        toastContext = useToast();
        return null;
      };

      render(
        <ToastProvider>
          <TestHook />
        </ToastProvider>,
      );

      expect(toastContext).toHaveProperty('toast');
      expect(toastContext).toHaveProperty('close');
      expect(toastContext).toHaveProperty('closeAll');
      expect(toastContext).toHaveProperty('update');
      expect(typeof toastContext.toast).toBe('function');
      expect(typeof toastContext.close).toBe('function');
      expect(typeof toastContext.closeAll).toBe('function');
      expect(typeof toastContext.update).toBe('function');
    });
  });

  describe('Mouse Interactions', () => {
    it('should pause auto-dismiss on hover', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <ToastProvider>
          <TestComponent duration={1000} />
        </ToastProvider>,
      );

      fireEvent.click(screen.getByTestId('show-toast'));
      const toast = screen.getByText('Test info message');

      // Hover over toast
      await user.hover(toast);

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Toast should still be visible (paused)
      expect(screen.getByText('Test info message')).toBeInTheDocument();

      // Unhover
      await user.unhover(toast);

      // Fast-forward time again
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Now toast should be dismissed
      await waitFor(() => {
        expect(screen.queryByText('Test info message')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper keyboard navigation', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      await user.click(screen.getByTestId('show-toast'));

      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('tabIndex', '0');

      // Focus should work
      toast.focus();
      expect(toast).toHaveFocus();
    });

    it('should set correct tabIndex for non-closable toasts', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const TestNonClosable = (): ReactElement => {
        const { toast } = useToast();
        return (
          <button
            onClick={() =>
              toast({
                description: 'Test',
                isClosable: false,
              })
            }
            data-testid="show-non-closable"
          >
            Show
          </button>
        );
      };

      render(
        <ToastProvider>
          <TestNonClosable />
        </ToastProvider>,
      );

      await user.click(screen.getByTestId('show-non-closable'));

      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('tabIndex', '-1');
    });
  });
});
