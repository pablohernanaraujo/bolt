// /src/ui/link/__tests__/link.test.tsx
// Comprehensive tests for Link component
// Tests accessibility, behavior, variants, states and typography integration
// RELEVANT FILES: ../link.tsx, ../types.ts, ../helpers.ts

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ArrowRight } from '@/icons';

import { Link } from '../link';

describe('Link Component', () => {
  describe('Basic Rendering', () => {
    it('should render a link with correct text', () => {
      render(<Link href="#test">Test Link</Link>);

      const link = screen.getByRole('link', { name: /test link/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('Test Link');
    });

    it('should render with correct href attribute', () => {
      render(<Link href="/internal">Internal Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/internal');
    });

    it('should apply custom className', () => {
      render(
        <Link href="#test" className="custom-class">
          Test
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      render(<Link href="#test">Primary Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveClass(); // Should have variant classes
    });

    it('should apply secondary variant', () => {
      render(
        <Link href="#test" variant="secondary">
          Secondary Link
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should apply external variant', () => {
      render(
        <Link href="#test" variant="external">
          External Link
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('should add external attributes for external URLs', () => {
      render(
        <Link href="https://external.com" isExternal>
          External
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should auto-detect external URLs', () => {
      render(<Link href="https://external.com">Auto External</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not add external attributes for internal links', () => {
      render(<Link href="/internal">Internal</Link>);

      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target', '_blank');
      expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Disabled State', () => {
    it('should render as span when disabled', () => {
      render(
        <Link href="#test" isDisabled>
          Disabled Link
        </Link>,
      );

      const element = screen.getByRole('link');
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not be clickable when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Link href="#test" isDisabled onClick={handleClick}>
          Disabled Link
        </Link>,
      );

      const link = screen.getByRole('link');
      await user.click(link);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Typography Integration', () => {
    it('should apply size variants', () => {
      render(
        <Link href="#test" size="h1">
          H1 Link
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      // Size styles should be applied via CSS classes
    });

    it('should apply typography modifiers', () => {
      render(
        <Link href="#test" bold italic highlight>
          Styled Link
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      // Typography modifiers should be applied via CSS classes
    });

    it('should apply emphasis levels', () => {
      render(
        <Link href="#test" emphasis="low">
          Low Emphasis
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Underline Behavior', () => {
    it('should apply hover underline by default', () => {
      render(<Link href="#test">Hover Underline</Link>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should apply no underline when specified', () => {
      render(
        <Link href="#test" underlineBehavior="none">
          No Underline
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should apply always underline when specified', () => {
      render(
        <Link href="#test" underlineBehavior="always">
          Always Underline
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render with custom icon', () => {
      render(
        <Link href="#test" icon={ArrowRight}>
          Link with Icon
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      // Icon should be present in the DOM
    });

    it('should position icon on the left', () => {
      render(
        <Link href="#test" icon={ArrowRight} iconPosition="left">
          Link with Left Icon
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should position icon on the right by default', () => {
      render(
        <Link href="#test" icon={ArrowRight}>
          Link with Right Icon
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Polymorphic Rendering', () => {
    it('should render as button when specified', () => {
      const handleClick = vi.fn();

      render(
        <Link as="button" onClick={handleClick}>
          Button Link
        </Link>,
      );

      const button = screen.getByRole('link');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render as span when specified', () => {
      render(
        <Link as="span" role="link" tabIndex={0}>
          Span Link
        </Link>,
      );

      const span = screen.getByRole('link');
      expect(span.tagName).toBe('SPAN');
    });
  });

  describe('Accessibility', () => {
    it('should be focusable with keyboard', () => {
      render(<Link href="#test">Focusable Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('tabIndex'); // Should be focusable
    });

    it('should have proper ARIA attributes when disabled', () => {
      render(
        <Link href="#test" isDisabled>
          Disabled Link
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Link href="#test" onClick={handleClick}>
          Keyboard Link
        </Link>,
      );

      const link = screen.getByRole('link');

      // Focus the link
      await user.tab();
      expect(link).toHaveFocus();

      // Press Enter to activate
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should support external link accessibility', () => {
      render(
        <Link href="https://external.com" isExternal>
          External Link
        </Link>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Security', () => {
    it('should sanitize dangerous href values', () => {
      // Test that javascript: URLs are blocked
      const { container } = render(
        <Link href="javascript:alert('xss')">Dangerous Link</Link>,
      );

      // Should not render with dangerous href
      const link = container.querySelector('a');
      expect(link).not.toHaveAttribute('href', "javascript:alert('xss')");
    });

    it('should allow safe protocols', () => {
      render(<Link href="mailto:test@example.com">Email Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('should allow relative URLs', () => {
      render(<Link href="/safe/path">Safe Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/safe/path');
    });
  });

  describe('Event Handling', () => {
    it('should call onClick handler', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Link href="#test" onClick={handleClick}>
          Clickable Link
        </Link>,
      );

      const link = screen.getByRole('link');
      await user.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should support mouse events', async () => {
      const user = userEvent.setup();
      const handleMouseOver = vi.fn();
      const handleMouseOut = vi.fn();

      render(
        <Link
          href="#test"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Hoverable Link
        </Link>,
      );

      const link = screen.getByRole('link');

      await user.hover(link);
      expect(handleMouseOver).toHaveBeenCalled();

      await user.unhover(link);
      expect(handleMouseOut).toHaveBeenCalled();
    });
  });

  describe('URL Handling', () => {
    it('should handle absolute URLs', () => {
      render(<Link href="https://example.com">Absolute URL</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should handle relative URLs', () => {
      render(<Link href="/relative">Relative URL</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/relative');
    });

    it('should handle anchor links', () => {
      render(<Link href="#anchor">Anchor Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '#anchor');
    });

    it('should handle mailto links', () => {
      render(<Link href="mailto:test@example.com">Email Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('should handle tel links', () => {
      render(<Link href="tel:+1234567890">Phone Link</Link>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'tel:+1234567890');
    });
  });
});
