import * as styles from './checkbox.css';
export const buildContainerClassName = (labelPosition = 'right', className) => {
    const positionClass = labelPosition === 'left'
        ? styles.checkboxContainerLabelLeft
        : styles.checkboxContainerLabelRight;
    return `${styles.checkboxContainer} ${positionClass} ${className ?? ''}`.trim();
};
export const buildCheckboxClassName = (size = 'medium', variant = 'primary', isSelected) => {
    const sizeClass = styles.checkboxSizes[size];
    const variantClass = isSelected
        ? styles.checkboxVariants[variant]
        : styles.checkboxBase;
    return `${styles.checkboxInput} ${sizeClass} ${variantClass}`.trim();
};
export const buildCheckmarkClassName = (size = 'medium') => `${styles.checkboxCheckmark} ${styles.checkmarkSizes[size]}`.trim();
export const buildLabelClassName = (size = 'medium') => `${styles.checkboxLabel} ${styles.labelSizes[size]}`.trim();
