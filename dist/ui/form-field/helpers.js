import { formField } from './form-field.css.js';

const buildFormFieldClassName = (className) => className ? `${formField} ${className}` : formField;
const hasFormFieldError = (error, isInvalid) => Boolean(error) || Boolean(isInvalid);
const generateFormFieldIds = (baseId) => ({
    input: baseId,
    label: `${baseId}-label`,
    hint: `${baseId}-hint`,
    error: `${baseId}-error`,
});
const buildAriaDescribedBy = (ids, hasHint, hasError) => {
    const describedBy = [];
    if (hasHint) {
        describedBy.push(ids.hint);
    }
    if (hasError) {
        describedBy.push(ids.error);
    }
    return describedBy.length > 0 ? describedBy.join(' ') : undefined;
};

export { buildAriaDescribedBy, buildFormFieldClassName, generateFormFieldIds, hasFormFieldError };
//# sourceMappingURL=helpers.js.map
