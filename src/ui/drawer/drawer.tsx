// /src/ui/drawer/drawer.tsx
// Drawer component built with React Aria Components
// Provides accessible slide-out panels with customizable placements and sizes
// RELEVANT FILES: drawer.css.ts, types.ts, helpers.ts

'use client';

import { X } from 'lucide-react';
import React, {
  type FC,
  type ReactElement,
  useEffect,
  useId,
  useState,
} from 'react';
import {
  Button as AriaButton,
  Modal as AriaModal,
  Dialog,
  DialogTrigger,
  Heading,
  ModalOverlay,
} from 'react-aria-components';

import { Icon } from '@/icons';
import { darkTheme, lightTheme } from '@/tokens/themes.css';

import * as styles from './drawer.css';
import {
  buildDrawerBodyClassName,
  buildDrawerDialogClassName,
  buildDrawerFooterClassName,
  getAnimationSpeed,
  scrollLockManager,
} from './helpers';
import {
  type DrawerBodyProps,
  type DrawerContentProps,
  type DrawerFooterProps,
  type DrawerHeaderProps,
  type DrawerProps,
  type DrawerTriggerProps,
} from './types';

/**
 * Drawer component for slide-out panels
 * Built on React Aria Components for full accessibility
 *
 * Features:
 * - Multiple placement options (left, right, top, bottom)
 * - Multiple size variants (small, medium, large, full)
 * - Customizable dismiss behavior
 * - Focus trapping and restoration
 * - Smooth slide-in/out animations
 * - Theme-aware styling with design tokens
 * - Full keyboard navigation support
 *
 * @example
 * ```tsx
 * <DrawerTrigger>
 *   <Button>Open Drawer</Button>
 *   <Drawer placement="right" size="medium" isDismissable>
 *     <DrawerContent title="Settings">
 *       <p>Drawer content goes here</p>
 *     </DrawerContent>
 *   </Drawer>
 * </DrawerTrigger>
 * ```
 */
export const Drawer: FC<DrawerProps> = ({
  size = 'medium',
  placement = 'right',
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  animationSpeed = 'normal',
  disableAnimation = false,
  children,
  className,
  ...props
}): ReactElement => {
  // Reactive theme detection
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // Listen for theme changes in the document
  useEffect(() => {
    const detectTheme = (): void => {
      if (typeof document !== 'undefined') {
        const theme =
          document.documentElement.getAttribute('data-theme') || 'light';
        setCurrentTheme(theme as 'light' | 'dark');
      }
    };

    // Initial detection
    detectTheme();

    // Listen for attribute changes on the document element
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          detectTheme();
        }
      }
    });

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    return () => observer.disconnect();
  }, []);

  // Apply theme class for portaled drawer
  const themeClassName = currentTheme === 'dark' ? darkTheme : lightTheme;

  // Handle scroll locking when drawer opens/closes
  useEffect(() => {
    // Clean up scroll lock on unmount
    return () => {
      if (scrollLockManager.isLocked()) {
        scrollLockManager.unlock();
      }
    };
  }, []);

  // Build animation styles based on props
  const animationStyles = React.useMemo(() => {
    if (disableAnimation) {
      return {
        animationDuration: '0ms',
        animationName: 'none',
      };
    }

    const speed = getAnimationSpeed(animationSpeed);
    return {
      '--drawer-animation-duration-enter': `${speed.enter}ms`,
      '--drawer-animation-duration-exit': `${speed.exit}ms`,
    };
  }, [animationSpeed, disableAnimation]);

  return (
    <ModalOverlay
      className={`${styles.drawerOverlay} ${themeClassName}`}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      style={animationStyles}
      {...props}
    >
      <AriaModal>
        <Dialog
          className={buildDrawerDialogClassName(placement, size, undefined)}
          style={animationStyles}
        >
          {typeof children === 'function'
            ? children(() => {
                // Close function for render prop - React Aria handles this automatically
                // This is just for compatibility with render prop pattern
              })
            : children}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
};

/**
 * DrawerTrigger component
 * Wraps trigger element and drawer for controlled display
 *
 * @example
 * ```tsx
 * <DrawerTrigger>
 *   <Button>Open Drawer</Button>
 *   <Drawer>...</Drawer>
 * </DrawerTrigger>
 * ```
 */
export const DrawerTrigger: FC<DrawerTriggerProps> = ({
  children,
  ...props
}): ReactElement => <DialogTrigger {...props}>{children}</DialogTrigger>;

/**
 * DrawerHeader component
 * Header section with title and optional close button
 */
export const DrawerHeader: FC<DrawerHeaderProps> = ({
  title,
  showCloseButton = true,
  children,
}): ReactElement => {
  const titleId = useId();

  return (
    <header className={styles.drawerHeader}>
      <div>
        {title && (
          <Heading id={titleId} className={styles.drawerTitle} slot="title">
            {title}
          </Heading>
        )}
        {children}
      </div>

      {showCloseButton && (
        <AriaButton
          className={styles.drawerCloseButton}
          aria-label="Close drawer"
          slot="close"
        >
          <Icon icon={X} size="sm" />
        </AriaButton>
      )}
    </header>
  );
};

/**
 * DrawerBody component
 * Main content area of the drawer
 */
export const DrawerBody: FC<DrawerBodyProps> = ({
  children,
  className,
}): ReactElement => (
  <div className={buildDrawerBodyClassName(true, true, className)}>
    {children}
  </div>
);

/**
 * DrawerFooter component
 * Footer section typically containing action buttons
 */
export const DrawerFooter: FC<DrawerFooterProps> = ({
  children,
  className,
}): ReactElement => (
  <footer className={buildDrawerFooterClassName(className)}>{children}</footer>
);

/**
 * DrawerContent component
 * Structured content container with optional header and proper accessibility
 *
 * @example
 * ```tsx
 * <DrawerContent title="Navigation" showCloseButton>
 *   <p>Drawer body content</p>
 * </DrawerContent>
 * ```
 */
export const DrawerContent: FC<DrawerContentProps> = ({
  title,
  showCloseButton = true,
  children,
  ...props
}): ReactElement => {
  return (
    <>
      {title && (
        <DrawerHeader title={title} showCloseButton={showCloseButton} />
      )}
      <DrawerBody className={buildDrawerBodyClassName(!!title)}>
        {children}
      </DrawerBody>
    </>
  );
};

Drawer.displayName = 'Drawer';
DrawerTrigger.displayName = 'DrawerTrigger';
DrawerContent.displayName = 'DrawerContent';
DrawerHeader.displayName = 'DrawerHeader';
DrawerBody.displayName = 'DrawerBody';
DrawerFooter.displayName = 'DrawerFooter';
