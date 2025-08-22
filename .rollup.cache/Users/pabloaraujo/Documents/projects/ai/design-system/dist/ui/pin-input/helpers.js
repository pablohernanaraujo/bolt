export const INPUT_PATTERNS = {
    numeric: /^[0-9]$/,
    alphanumeric: /^[a-zA-Z0-9]$/,
};
export const INPUT_MODES = {
    numeric: 'numeric',
    alphanumeric: 'text',
};
export const isValidChar = (char, type) => INPUT_PATTERNS[type].test(char);
export const filterValidChars = (text, type) => text
    .split('')
    .filter((char) => isValidChar(char, type))
    .join('');
export const handlePasteContent = (pastedText, startIndex, type, length, setValue, focusField) => {
    const validChars = filterValidChars(pastedText, type);
    const processedChars = [];
    for (let i = 0; i < validChars.length && startIndex + i < length; i++) {
        const char = validChars[i];
        const fieldIndex = startIndex + i;
        setValue(fieldIndex, char);
        processedChars.push(char);
    }
    const nextFocusIndex = Math.min(startIndex + processedChars.length, length - 1);
    setTimeout(() => {
        focusField(nextFocusIndex);
    }, 0);
    return {
        processedChars,
        nextFocusIndex,
    };
};
export const handleKeyNavigation = (key, currentIndex, currentValue, length, setValue, focusField) => {
    switch (key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                focusField(currentIndex - 1);
            }
            return true;
        case 'ArrowRight':
            if (currentIndex < length - 1) {
                focusField(currentIndex + 1);
            }
            return true;
        case 'Home':
            focusField(0);
            return true;
        case 'End':
            focusField(length - 1);
            return true;
        case 'Backspace':
            if (currentValue === '' && currentIndex > 0) {
                focusField(currentIndex - 1);
            }
            else {
                setValue(currentIndex, '');
            }
            return true;
        case 'Delete':
            setValue(currentIndex, '');
            return true;
        default:
            return false;
    }
};
export const handleCharInput = (char, currentIndex, type, length, setValue, focusField) => {
    if (!isValidChar(char, type)) {
        return false;
    }
    setValue(currentIndex, char);
    if (currentIndex < length - 1) {
        setTimeout(() => {
            focusField(currentIndex + 1);
        }, 0);
    }
    return true;
};
export const findFirstEmptyIndex = (values) => values.indexOf('');
export const findLastFilledIndex = (values) => {
    for (let i = values.length - 1; i >= 0; i--) {
        if (values[i] !== '') {
            return i;
        }
    }
    return -1;
};
export const getPinValue = (values) => values.join('');
export const isComplete = (values) => values.every((value) => value !== '');
export const splitValue = (value, length) => {
    const values = value.split('').slice(0, length);
    while (values.length < length) {
        values.push('');
    }
    return values;
};
export const createFieldRefs = (length) => new Array(length).fill(null);
export const getDisplayValue = (value, masked, maskChar) => {
    if (!masked || !value) {
        return value;
    }
    return maskChar;
};
export const buildPinInputClassName = (variant, size, hasError, disabled, className) => {
    const classes = ['pin-input', `pin-input--${variant}`, `pin-input--${size}`];
    if (hasError) {
        classes.push('pin-input--error');
    }
    if (disabled) {
        classes.push('pin-input--disabled');
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
