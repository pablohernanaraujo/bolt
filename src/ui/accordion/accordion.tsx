// /src/ui/accordion/accordion.tsx
// Accessible accordion component built with React Aria Components
// Provides collapsible content sections with keyboard navigation
// RELEVANT FILES: accordion.css.ts, types.ts, helpers.ts

'use client';

import { ChevronDown } from 'lucide-react';
import {
  Children,
  type FC,
  isValidElement,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Icon } from '@/icons';

import {
  buildAccordionClassName,
  buildAccordionContentClassName,
  buildAccordionItemClassName,
  buildAccordionTriggerClassName,
  buildChevronClassName,
  buildContentInnerClassName,
  buildIconClassName,
  buildTriggerContentClassName,
  normalizeKeys,
  toggleKey,
} from './helpers';
import type { AccordionItemProps, AccordionProps } from './types';

/**
 * Individual accordion item component
 * Handles expansion state and animation
 */
export const AccordionItem: FC<
  AccordionItemProps & {
    isExpanded?: boolean;
    onToggle?: () => void;
    size?: AccordionProps['size'];
    variant?: AccordionProps['variant'];
    disableAnimation?: boolean;
  }
> = ({
  id,
  title,
  children,
  isDisabled = false,
  className,
  icon,
  isExpanded = false,
  onToggle,
  size = 'medium',
  variant = 'default',
  disableAnimation = false,
}): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [children, isExpanded]);

  const handleClick = useCallback(() => {
    if (!isDisabled && onToggle) {
      onToggle();
    }
  }, [isDisabled, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isDisabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onToggle) {
          onToggle();
        }
      }
    },
    [isDisabled, onToggle],
  );

  return (
    <div
      className={buildAccordionItemClassName(variant, isDisabled, className)}
    >
      <button
        type="button"
        className={buildAccordionTriggerClassName(size)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${id}`}
        disabled={isDisabled}
        data-expanded={isExpanded}
        data-disabled={isDisabled || undefined}
      >
        <div className={buildTriggerContentClassName()}>
          {icon && (
            <div className={buildIconClassName(disableAnimation)}>{icon}</div>
          )}
          {title}
        </div>
        <div className={buildChevronClassName(disableAnimation)}>
          <Icon icon={ChevronDown} size="sm" />
        </div>
      </button>

      <div
        id={`accordion-content-${id}`}
        className={buildAccordionContentClassName(
          size,
          isExpanded,
          disableAnimation,
        )}
        data-expanded={isExpanded}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        style={
          {
            '--accordion-content-height': `${contentHeight}px`,
          } as React.CSSProperties
        }
      >
        <div ref={contentRef} className={buildContentInnerClassName()}>
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion component with multiple collapsible sections
 * Supports single and multiple selection modes
 *
 * Features:
 * - Single or multiple item expansion
 * - Keyboard navigation (arrow keys, space, enter)
 * - Animated expand/collapse transitions
 * - Full ARIA compliance for screen readers
 * - Controlled and uncontrolled modes
 * - Customizable appearance with variants and sizes
 */
export const Accordion: FC<AccordionProps> = ({
  items,
  children,
  selectionMode = 'single',
  variant = 'default',
  size = 'medium',
  expandedKeys: controlledKeys,
  defaultExpandedKeys,
  onExpandedChange,
  fullWidth = true,
  className,
  allowAllClosed = true,
  disableAnimation = false,
}): ReactElement => {
  // State for uncontrolled mode
  const [internalKeys, setInternalKeys] = useState<Set<string>>(() =>
    normalizeKeys(defaultExpandedKeys),
  );

  // Use controlled keys if provided, otherwise use internal state
  const isControlled = controlledKeys !== undefined;
  const expandedKeys = isControlled
    ? normalizeKeys(controlledKeys)
    : internalKeys;

  const handleToggle = useCallback(
    (key: string) => {
      const newKeys = toggleKey(
        expandedKeys,
        key,
        selectionMode,
        allowAllClosed,
      );

      if (!isControlled) {
        setInternalKeys(newKeys);
      }

      if (onExpandedChange) {
        onExpandedChange(newKeys);
      }
    },
    [
      expandedKeys,
      selectionMode,
      allowAllClosed,
      isControlled,
      onExpandedChange,
    ],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const accordionElement = e.currentTarget as HTMLElement;
    const triggers = Array.from(
      accordionElement.querySelectorAll('button[aria-expanded]'),
    ) as HTMLButtonElement[];

    const currentIndex = triggers.indexOf(target as HTMLButtonElement);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = triggers.length - 1;
        break;
    }

    if (nextIndex !== null) {
      triggers[nextIndex].focus();
    }
  }, []);

  // Render items from props or children
  const renderContent = (): ReactElement[] => {
    if (items && items.length > 0) {
      return items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isExpanded={expandedKeys.has(item.id)}
          onToggle={() => handleToggle(item.id)}
          size={size}
          variant={variant}
          disableAnimation={disableAnimation}
        />
      ));
    }

    // Process children if they are AccordionItem elements
    const childElements: ReactElement[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === AccordionItem) {
        const childProps = child.props as AccordionItemProps;
        childElements.push(
          <AccordionItem
            key={childProps.id}
            {...childProps}
            isExpanded={expandedKeys.has(childProps.id)}
            onToggle={() => handleToggle(childProps.id)}
            size={size}
            variant={variant}
            disableAnimation={disableAnimation}
          />,
        );
      }
    });

    return childElements;
  };

  return (
    <div
      className={buildAccordionClassName(variant, size, fullWidth, className)}
      onKeyDown={handleKeyDown}
      aria-multiselectable={selectionMode === 'multiple'}
    >
      {renderContent()}
    </div>
  );
};

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
