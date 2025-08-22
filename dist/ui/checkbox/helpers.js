import { checkboxCheckmark, checkmarkSizes, checkboxLabel, labelSizes, checkboxContainer, checkboxContainerLabelLeft, checkboxContainerLabelRight, checkboxInput, checkboxSizes, checkboxVariants, checkboxBase } from './checkbox.css.js';

const buildContainerClassName = (labelPosition = 'right', className) => {
    const positionClass = labelPosition === 'left'
        ? checkboxContainerLabelLeft
        : checkboxContainerLabelRight;
    return `${checkboxContainer} ${positionClass} ${className ?? ''}`.trim();
};
const buildCheckboxClassName = (size = 'medium', variant = 'primary', isSelected) => {
    const sizeClass = checkboxSizes[size];
    const variantClass = isSelected
        ? checkboxVariants[variant]
        : checkboxBase;
    return `${checkboxInput} ${sizeClass} ${variantClass}`.trim();
};
const buildCheckmarkClassName = (size = 'medium') => `${checkboxCheckmark} ${checkmarkSizes[size]}`.trim();
const buildLabelClassName = (size = 'medium') => `${checkboxLabel} ${labelSizes[size]}`.trim();

export { buildCheckboxClassName, buildCheckmarkClassName, buildContainerClassName, buildLabelClassName };
//# sourceMappingURL=helpers.js.map
