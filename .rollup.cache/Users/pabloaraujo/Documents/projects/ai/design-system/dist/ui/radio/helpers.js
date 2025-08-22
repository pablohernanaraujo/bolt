import * as styles from './radio.css';
export const buildRadioClassName = (size = 'medium', variant = 'primary', isSelected) => {
    const sizeClass = styles.radioSizes[size];
    const variantClass = isSelected
        ? styles.radioVariants[variant]
        : styles.radioBase;
    return `${styles.radioInput} ${sizeClass} ${variantClass}`.trim();
};
export const buildRadioDotClassName = (size = 'medium', variant = 'primary') => `${styles.radioDot} ${styles.radioDotSizes[size]} ${styles.radioDotVariants[variant]}`.trim();
export const buildRadioLabelClassName = (size = 'medium') => `${styles.radioLabel} ${styles.radioLabelSizes[size]}`.trim();
