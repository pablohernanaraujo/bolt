import { generateFormFieldIds } from './deterministic-ids.js';

function generateFormFieldAccessibility(config) {
    const { componentName, fieldName, isRequired = false, hasError = false, isDisabled = false, isReadOnly = false, ariaLabel, additionalAria = {}, } = config;
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

export { generateFormFieldAccessibility };
//# sourceMappingURL=accessibility.js.map
