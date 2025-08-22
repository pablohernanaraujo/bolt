import { ComponentIdGenerator, generateAriaIds, generateDeterministicId, generateFormFieldIds, } from './deterministic-ids';
export function generateFormFieldAccessibility(config) {
    const { componentName, fieldName, isRequired = false, hasError = false, isDisabled = false, isReadOnly = false, ariaLabel, ariaDescription, additionalAria = {}, } = config;
    const ids = generateFormFieldIds(componentName, fieldName);
    const describedBy = [];
    if (hasError) {
        describedBy.push(ids.error);
    }
    describedBy.push(ids.helpText);
    return {
        field: {
            'data-field': componentName,
            'data-testid': `${componentName}-field${fieldName ? `-${fieldName}` : ''}`,
        },
        input: {
            id: ids.input,
            'aria-labelledby': ids.label,
            'aria-describedby': describedBy.length > 0 ? describedBy.join(' ') : undefined,
            'aria-required': isRequired ? 'true' : undefined,
            'aria-invalid': hasError ? 'true' : 'false',
            'aria-disabled': isDisabled ? 'true' : undefined,
            'aria-readonly': isReadOnly ? 'true' : undefined,
            'aria-label': ariaLabel,
            'data-testid': `${componentName}-input${fieldName ? `-${fieldName}` : ''}`,
            ...additionalAria,
        },
        label: {
            id: ids.label,
            htmlFor: ids.input,
            'data-testid': `${componentName}-label${fieldName ? `-${fieldName}` : ''}`,
        },
        error: {
            id: ids.error,
            role: 'alert',
            'aria-live': 'polite',
            'aria-atomic': 'true',
            'data-testid': `${componentName}-error${fieldName ? `-${fieldName}` : ''}`,
        },
        helpText: {
            id: ids.helpText,
            'data-testid': `${componentName}-help${fieldName ? `-${fieldName}` : ''}`,
        },
    };
}
export function generateInteractiveAccessibility(config) {
    const { componentName, elementName, isPressed, isExpanded, hasPopup, controls, ariaLabel, liveRegion, additionalAria = {}, } = config;
    const ariaIds = generateAriaIds(componentName, elementName);
    return {
        id: ariaIds.element,
        'aria-label': ariaLabel,
        'aria-pressed': isPressed !== undefined ? (isPressed ? 'true' : 'false') : undefined,
        'aria-expanded': isExpanded !== undefined ? (isExpanded ? 'true' : 'false') : undefined,
        'aria-haspopup': hasPopup !== undefined && hasPopup !== false
            ? typeof hasPopup === 'boolean'
                ? 'true'
                : hasPopup
            : undefined,
        'aria-controls': controls || ariaIds.controls,
        'aria-live': liveRegion,
        'data-testid': `${componentName}-${elementName}`,
        ...additionalAria,
    };
}
export function generateCollectionAccessibility(config) {
    const { componentName, totalItems, selectedItems = [], isMultiSelect = false, orientation = 'vertical', ariaLabel, isSearchable = false, } = config;
    const containerId = generateDeterministicId(componentName, 'container');
    return {
        container: {
            id: containerId,
            role: isMultiSelect ? 'listbox' : 'list',
            'aria-label': ariaLabel,
            'aria-multiselectable': isMultiSelect ? 'true' : undefined,
            'aria-orientation': orientation,
            'aria-activedescendant': selectedItems.length > 0
                ? generateDeterministicId(componentName, 'item', selectedItems[0].toString())
                : undefined,
            'data-testid': `${componentName}-container`,
        },
        item: (index, isSelected = false) => ({
            id: generateDeterministicId(componentName, 'item', index.toString()),
            role: isMultiSelect ? 'option' : 'listitem',
            'aria-selected': isMultiSelect || isSelected
                ? isSelected
                    ? 'true'
                    : 'false'
                : undefined,
            'aria-setsize': totalItems,
            'aria-posinset': index + 1,
            'data-testid': `${componentName}-item-${index}`,
        }),
    };
}
export function generateDialogAccessibility(config) {
    const { componentName, isModal = true, title, description } = config;
    const dialogId = generateDeterministicId(componentName, 'dialog');
    const titleId = generateDeterministicId(componentName, 'title');
    const descriptionId = generateDeterministicId(componentName, 'description');
    const labelledBy = title ? titleId : undefined;
    const describedBy = description ? descriptionId : undefined;
    return {
        dialog: {
            id: dialogId,
            role: 'dialog',
            'aria-modal': isModal ? 'true' : undefined,
            'aria-labelledby': labelledBy,
            'aria-describedby': describedBy,
            'data-testid': `${componentName}-dialog`,
        },
        title: {
            id: titleId,
            'data-testid': `${componentName}-title`,
        },
        description: {
            id: descriptionId,
            'data-testid': `${componentName}-description`,
        },
    };
}
export const screenReader = {
    onlyStyles: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
    },
    focusableStyles: {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
    },
    announce: (message, priority = 'polite') => {
        if (typeof window === 'undefined')
            return;
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = Object.entries(screenReader.onlyStyles)
            .map(([prop, value]) => `${prop}: ${value}`)
            .join('; ');
        document.body.appendChild(announcement);
        announcement.textContent = message;
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },
};
export const keyboard = {
    keys: {
        ARROW_UP: 'ArrowUp',
        ARROW_DOWN: 'ArrowDown',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_RIGHT: 'ArrowRight',
        HOME: 'Home',
        END: 'End',
        PAGE_UP: 'PageUp',
        PAGE_DOWN: 'PageDown',
        ENTER: 'Enter',
        SPACE: ' ',
        TAB: 'Tab',
        ESCAPE: 'Escape',
        DELETE: 'Delete',
        BACKSPACE: 'Backspace',
    },
    isFocusable: (element) => {
        if (element.hasAttribute('disabled') ||
            element.getAttribute('aria-hidden') === 'true') {
            return false;
        }
        const focusableSelectors = [
            'input:not([disabled])',
            'button:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]',
        ];
        return focusableSelectors.some((selector) => element.matches(selector));
    },
    getFocusableElements: (container) => {
        const focusableSelectors = [
            'input:not([disabled]):not([aria-hidden="true"])',
            'button:not([disabled]):not([aria-hidden="true"])',
            'select:not([disabled]):not([aria-hidden="true"])',
            'textarea:not([disabled]):not([aria-hidden="true"])',
            'a[href]:not([aria-hidden="true"])',
            '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
            '[contenteditable="true"]:not([aria-hidden="true"])',
        ].join(', ');
        return Array.from(container.querySelectorAll(focusableSelectors)).filter((element) => keyboard.isFocusable(element));
    },
    trapFocus: (container, event) => {
        if (event.key !== keyboard.keys.TAB)
            return;
        const focusableElements = keyboard.getFocusableElements(container);
        if (focusableElements.length === 0)
            return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
        else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    },
};
export const focus = {
    setById: (id, delay = 0) => {
        if (typeof window === 'undefined')
            return;
        const focusElement = () => {
            const element = document.getElementById(id);
            if (element && keyboard.isFocusable(element)) {
                element.focus();
            }
        };
        if (delay > 0) {
            setTimeout(focusElement, delay);
        }
        else {
            focusElement();
        }
    },
    createTrap: (container) => {
        if (!container || typeof window === 'undefined') {
            return {
                activate: () => { },
                deactivate: () => { },
            };
        }
        let isActive = false;
        let previousActiveElement = null;
        let cleanup = null;
        const activate = () => {
            if (isActive)
                return;
            previousActiveElement = document.activeElement;
            isActive = true;
            const focusableElements = keyboard.getFocusableElements(container);
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            const handleKeyDown = (event) => {
                keyboard.trapFocus(container, event);
            };
            container.addEventListener('keydown', handleKeyDown);
            cleanup = () => {
                container.removeEventListener('keydown', handleKeyDown);
            };
        };
        const deactivate = () => {
            if (!isActive)
                return;
            isActive = false;
            if (cleanup) {
                cleanup();
                cleanup = null;
            }
            if (previousActiveElement &&
                keyboard.isFocusable(previousActiveElement)) {
                previousActiveElement.focus();
            }
        };
        return {
            activate,
            deactivate,
        };
    },
};
export function createAccessibilityHelper(componentName) {
    const idGenerator = new ComponentIdGenerator(componentName);
    return {
        idGenerator,
        generateFormField: (fieldName) => generateFormFieldAccessibility({
            componentName,
            fieldName,
        }),
        generateInteractive: (elementName, config) => generateInteractiveAccessibility({
            componentName,
            elementName,
            ...config,
        }),
        generateCollection: (config) => generateCollectionAccessibility({
            componentName,
            ...config,
        }),
        generateDialog: (config) => generateDialogAccessibility({
            componentName,
            ...config,
        }),
    };
}
