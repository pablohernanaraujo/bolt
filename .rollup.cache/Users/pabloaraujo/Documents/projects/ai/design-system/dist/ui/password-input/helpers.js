export const handleToggleKeyDown = (event, onToggle) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onToggle();
    }
};
export const getToggleAriaLabel = (isVisible, customLabel) => {
    if (customLabel)
        return customLabel;
    return isVisible ? 'Hide password' : 'Show password';
};
