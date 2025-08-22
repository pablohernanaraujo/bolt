import { radioDot, radioDotSizes, radioDotVariants, radioLabel, radioLabelSizes, radioInput, radioSizes, radioVariants, radioBase } from './radio.css.js';

const buildRadioClassName = (size = 'medium', variant = 'primary', isSelected) => {
    const sizeClass = radioSizes[size];
    const variantClass = isSelected
        ? radioVariants[variant]
        : radioBase;
    return `${radioInput} ${sizeClass} ${variantClass}`.trim();
};
const buildRadioDotClassName = (size = 'medium', variant = 'primary') => `${radioDot} ${radioDotSizes[size]} ${radioDotVariants[variant]}`.trim();
const buildRadioLabelClassName = (size = 'medium') => `${radioLabel} ${radioLabelSizes[size]}`.trim();

export { buildRadioClassName, buildRadioDotClassName, buildRadioLabelClassName };
//# sourceMappingURL=helpers.js.map
