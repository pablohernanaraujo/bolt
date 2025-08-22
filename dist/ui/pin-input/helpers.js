const INPUT_PATTERNS = {
    numeric: /^[0-9]$/,
    alphanumeric: /^[a-zA-Z0-9]$/,
};
const INPUT_MODES = {
    numeric: 'numeric',
    alphanumeric: 'text',
};
const isValidChar = (char, type) => INPUT_PATTERNS[type].test(char);
const filterValidChars = (text, type) => text
    .split('')
    .filter((char) => isValidChar(char, type))
    .join('');
const handlePasteContent = (pastedText, startIndex, type, length, setValue, focusField) => {
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
const handleKeyNavigation = (key, currentIndex, currentValue, length, setValue, focusField) => {
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
const handleCharInput = (char, currentIndex, type, length, setValue, focusField) => {
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
const getPinValue = (values) => values.join('');
const isComplete = (values) => values.every((value) => value !== '');
const splitValue = (value, length) => {
    const values = value.split('').slice(0, length);
    while (values.length < length) {
        values.push('');
    }
    return values;
};
const createFieldRefs = (length) => new Array(length).fill(null);
const getDisplayValue = (value, masked, maskChar) => {
    if (!masked || !value) {
        return value;
    }
    return maskChar;
};
const buildPinInputClassName = (variant, size, hasError, disabled, className) => {
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

export { INPUT_MODES, INPUT_PATTERNS, buildPinInputClassName, createFieldRefs, filterValidChars, getDisplayValue, getPinValue, handleCharInput, handleKeyNavigation, handlePasteContent, isComplete, isValidChar, splitValue };
//# sourceMappingURL=helpers.js.map
