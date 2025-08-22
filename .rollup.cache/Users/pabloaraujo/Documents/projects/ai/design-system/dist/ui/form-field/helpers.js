import * as styles from './form-field.css';
export const buildFormFieldClassName = (className) => className ? `${styles.formField} ${className}` : styles.formField;
export const hasFormFieldError = (error, isInvalid) => Boolean(error) || Boolean(isInvalid);
export const generateFormFieldIds = (baseId) => ({
    input: baseId,
    label: `${baseId}-label`,
    hint: `${baseId}-hint`,
    error: `${baseId}-error`,
});
export const buildAriaDescribedBy = (ids, hasHint, hasError) => {
    const describedBy = [];
    if (hasHint) {
        describedBy.push(ids.hint);
    }
    if (hasError) {
        describedBy.push(ids.error);
    }
    return describedBy.length > 0 ? describedBy.join(' ') : undefined;
};
