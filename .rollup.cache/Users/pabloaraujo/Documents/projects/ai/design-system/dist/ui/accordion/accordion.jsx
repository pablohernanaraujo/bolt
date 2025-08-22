'use client';
import { ChevronDown } from 'lucide-react';
import { Children, isValidElement, useCallback, useEffect, useRef, useState, } from 'react';
import { Icon } from '@/icons';
import { buildAccordionClassName, buildAccordionContentClassName, buildAccordionItemClassName, buildAccordionTriggerClassName, buildChevronClassName, buildContentInnerClassName, buildIconClassName, buildTriggerContentClassName, normalizeKeys, toggleKey, } from './helpers';
export const AccordionItem = ({ id, title, children, isDisabled = false, className, icon, isExpanded = false, onToggle, size = 'medium', variant = 'default', disableAnimation = false, }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
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
    const handleKeyDown = useCallback((e) => {
        if (isDisabled)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onToggle) {
                onToggle();
            }
        }
    }, [isDisabled, onToggle]);
    return (<div className={buildAccordionItemClassName(variant, isDisabled, className)}>
      <button type="button" className={buildAccordionTriggerClassName(size)} onClick={handleClick} onKeyDown={handleKeyDown} aria-expanded={isExpanded} aria-controls={`accordion-content-${id}`} disabled={isDisabled} data-expanded={isExpanded} data-disabled={isDisabled || undefined}>
        <div className={buildTriggerContentClassName()}>
          {icon && (<div className={buildIconClassName(disableAnimation)}>{icon}</div>)}
          {title}
        </div>
        <div className={buildChevronClassName(disableAnimation)}>
          <Icon icon={ChevronDown} size="sm"/>
        </div>
      </button>

      <div id={`accordion-content-${id}`} className={buildAccordionContentClassName(size, isExpanded, disableAnimation)} data-expanded={isExpanded} role="region" aria-labelledby={`accordion-trigger-${id}`} style={{
            '--accordion-content-height': `${contentHeight}px`,
        }}>
        <div ref={contentRef} className={buildContentInnerClassName()}>
          {children}
        </div>
      </div>
    </div>);
};
export const Accordion = ({ items, children, selectionMode = 'single', variant = 'default', size = 'medium', expandedKeys: controlledKeys, defaultExpandedKeys, onExpandedChange, fullWidth = true, className, allowAllClosed = true, disableAnimation = false, }) => {
    const [internalKeys, setInternalKeys] = useState(() => normalizeKeys(defaultExpandedKeys));
    const isControlled = controlledKeys !== undefined;
    const expandedKeys = isControlled
        ? normalizeKeys(controlledKeys)
        : internalKeys;
    const handleToggle = useCallback((key) => {
        const newKeys = toggleKey(expandedKeys, key, selectionMode, allowAllClosed);
        if (!isControlled) {
            setInternalKeys(newKeys);
        }
        if (onExpandedChange) {
            onExpandedChange(newKeys);
        }
    }, [
        expandedKeys,
        selectionMode,
        allowAllClosed,
        isControlled,
        onExpandedChange,
    ]);
    const handleKeyDown = useCallback((e) => {
        const target = e.target;
        const accordionElement = e.currentTarget;
        const triggers = Array.from(accordionElement.querySelectorAll('button[aria-expanded]'));
        const currentIndex = triggers.indexOf(target);
        if (currentIndex === -1)
            return;
        let nextIndex = null;
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
    const renderContent = () => {
        if (items && items.length > 0) {
            return items.map((item) => (<AccordionItem key={item.id} {...item} isExpanded={expandedKeys.has(item.id)} onToggle={() => handleToggle(item.id)} size={size} variant={variant} disableAnimation={disableAnimation}/>));
        }
        const childElements = [];
        Children.forEach(children, (child) => {
            if (isValidElement(child) && child.type === AccordionItem) {
                const childProps = child.props;
                childElements.push(<AccordionItem key={childProps.id} {...childProps} isExpanded={expandedKeys.has(childProps.id)} onToggle={() => handleToggle(childProps.id)} size={size} variant={variant} disableAnimation={disableAnimation}/>);
            }
        });
        return childElements;
    };
    return (<div className={buildAccordionClassName(variant, size, fullWidth, className)} onKeyDown={handleKeyDown} aria-multiselectable={selectionMode === 'multiple'}>
      {renderContent()}
    </div>);
};
Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
