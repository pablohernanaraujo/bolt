// /src/ui/menu/__tests__/menu.test.tsx
// Unit tests for Menu components
// Tests accessibility, interactions, and keyboard navigation
// RELEVANT FILES: ../menu.tsx, ../types.ts, ../helpers.ts

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ButtonClient as Button } from '@/ui/button';

import { ReactElement } from 'react';
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from '../menu';

// Helper to render basic menu
const renderBasicMenu = (): { onAction: ReturnType<typeof vi.fn> } => {
  const onAction = vi.fn();

  render(
    <MenuTrigger>
      <Button>Open Menu</Button>
      <Menu onAction={onAction}>
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
      </Menu>
    </MenuTrigger>,
  );

  return { onAction };
};

describe('MenuTrigger', () => {
  it('should render trigger button', () => {
    renderBasicMenu();

    expect(
      screen.getByRole('button', { name: 'Open Menu' }),
    ).toBeInTheDocument();
  });

  it('should open menu when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('should close menu when clicking outside', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    // Open menu
    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    // Click outside
    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});

describe('Menu', () => {
  it('should render menu items', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: 'Copy' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: 'Paste' }),
      ).toBeInTheDocument();
    });
  });

  it('should call onAction when menu item is selected', async () => {
    const user = userEvent.setup();
    const { onAction } = renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    const copyItem = screen.getByRole('menuitem', { name: 'Copy' });
    await user.click(copyItem);

    expect(onAction).toHaveBeenCalledWith('copy');
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    // Navigate with arrow keys
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus();
  });

  it('should close menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});

describe('MenuItem', () => {
  it('should render with start icon', async () => {
    const user = userEvent.setup();
    const TestIcon = (): ReactElement => (
      <span data-testid="test-icon">🔥</span>
    );

    render(
      <MenuTrigger>
        <Button>Open Menu</Button>
        <Menu>
          <MenuItem startIcon={<TestIcon />}>With Icon</MenuItem>
        </Menu>
      </MenuTrigger>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  it('should render with shortcut text', async () => {
    const user = userEvent.setup();

    render(
      <MenuTrigger>
        <Button>Open Menu</Button>
        <Menu>
          <MenuItem shortcut="⌘C">Copy</MenuItem>
        </Menu>
      </MenuTrigger>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('⌘C')).toBeInTheDocument();
    });
  });

  it('should be disabled when isDisabled is true', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <MenuTrigger>
        <Button>Open Menu</Button>
        <Menu onAction={onAction}>
          <MenuItem id="disabled" isDisabled>
            Disabled Item
          </MenuItem>
        </Menu>
      </MenuTrigger>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      const disabledItem = screen.getByRole('menuitem', {
        name: 'Disabled Item',
      });
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    });
  });
});

describe('MenuSection', () => {
  it('should render section with title', async () => {
    const user = userEvent.setup();

    render(
      <MenuTrigger>
        <Button>Open Menu</Button>
        <Menu>
          <MenuSection title="File Operations">
            <MenuItem>New</MenuItem>
            <MenuItem>Open</MenuItem>
          </MenuSection>
        </Menu>
      </MenuTrigger>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('File Operations')).toBeInTheDocument();
    });
  });

  it('should group menu items semantically', async () => {
    const user = userEvent.setup();

    render(
      <MenuTrigger>
        <Button>Open Menu</Button>
        <Menu>
          <MenuSection title="Edit">
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
          </MenuSection>
          <MenuSection title="View">
            <MenuItem>Zoom In</MenuItem>
            <MenuItem>Zoom Out</MenuItem>
          </MenuSection>
        </Menu>
      </MenuTrigger>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      // Check that sections are properly grouped
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });
  });
});

describe('MenuSeparator', () => {
  it('should render visual separator', async () => {
    const user = userEvent.setup();

    render(
      <MenuTrigger>
        <Button>Open Menu</Button>
        <Menu>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuSeparator />
          <MenuItem>Paste</MenuItem>
        </Menu>
      </MenuTrigger>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});

describe('Menu Accessibility', () => {
  it('should have proper ARIA attributes', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);

      for (const item of menuItems) {
        expect(item).toHaveAttribute('tabindex');
      }
    });
  });

  it('should manage focus properly', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByRole('button', { name: 'Open Menu' });

    // Focus should start on trigger
    trigger.focus();
    expect(trigger).toHaveFocus();

    // Open menu
    await user.click(trigger);

    await waitFor(() => {
      // Focus should move to menu container (proper ARIA behavior)
      const menu = screen.getByRole('menu');
      expect(menu).toHaveFocus();
    });

    // Navigate with arrow keys to focus items
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus();
  });
});
