import { jsx, jsxs } from 'react/jsx-runtime';
import { ChevronDown } from 'lucide-react';
import { useState, useCallback, useRef, useEffect, Children, isValidElement } from 'react';
import { Icon } from '../../icons/index.js';
import { normalizeKeys, toggleKey, buildAccordionClassName, buildAccordionItemClassName, buildAccordionTriggerClassName, buildTriggerContentClassName, buildIconClassName, buildChevronClassName, buildAccordionContentClassName, buildContentInnerClassName } from './helpers.js';

const AccordionItem = ({ id, title, children, isDisabled = false, className, icon, isExpanded = false, onToggle, size = 'medium', variant = 'default', disableAnimation = false, }) => {
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
    return (jsxs("div", { className: buildAccordionItemClassName(variant, isDisabled, className), children: [jsxs("button", { type: "button", className: buildAccordionTriggerClassName(size), onClick: handleClick, onKeyDown: handleKeyDown, "aria-expanded": isExpanded, "aria-controls": `accordion-content-${id}`, disabled: isDisabled, "data-expanded": isExpanded, "data-disabled": isDisabled || undefined, children: [jsxs("div", { className: buildTriggerContentClassName(), children: [icon && (jsx("div", { className: buildIconClassName(disableAnimation), children: icon })), title] }), jsx("div", { className: buildChevronClassName(disableAnimation), children: jsx(Icon, { icon: ChevronDown, size: "sm" }) })] }), jsx("div", { id: `accordion-content-${id}`, className: buildAccordionContentClassName(size, isExpanded, disableAnimation), "data-expanded": isExpanded, role: "region", "aria-labelledby": `accordion-trigger-${id}`, style: {
                    '--accordion-content-height': `${contentHeight}px`,
                }, children: jsx("div", { ref: contentRef, className: buildContentInnerClassName(), children: children }) })] }));
};
const Accordion = ({ items, children, selectionMode = 'single', variant = 'default', size = 'medium', expandedKeys: controlledKeys, defaultExpandedKeys, onExpandedChange, fullWidth = true, className, allowAllClosed = true, disableAnimation = false, }) => {
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
            return items.map((item) => (jsx(AccordionItem, { ...item, isExpanded: expandedKeys.has(item.id), onToggle: () => handleToggle(item.id), size: size, variant: variant, disableAnimation: disableAnimation }, item.id)));
        }
        const childElements = [];
        Children.forEach(children, (child) => {
            if (isValidElement(child) && child.type === AccordionItem) {
                const childProps = child.props;
                childElements.push(jsx(AccordionItem, { ...childProps, isExpanded: expandedKeys.has(childProps.id), onToggle: () => handleToggle(childProps.id), size: size, variant: variant, disableAnimation: disableAnimation }, childProps.id));
            }
        });
        return childElements;
    };
    return (jsx("div", { className: buildAccordionClassName(variant, size, fullWidth, className), onKeyDown: handleKeyDown, "aria-multiselectable": selectionMode === 'multiple', children: renderContent() }));
};
Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';

export { Accordion, AccordionItem };
//# sourceMappingURL=accordion.js.map
