import { radioGroupLabel, groupLabelSizes, radioGroup, radioGroupHorizontal, radioGroupVertical } from './radio-group.css.js';

const buildRadioGroupClassName = (orientation = 'vertical', className) => {
    const orientationClass = orientation === 'horizontal'
        ? radioGroupHorizontal
        : radioGroupVertical;
    return `${radioGroup} ${orientationClass} ${className ?? ''}`.trim();
};
const buildGroupLabelClassName = (size = 'medium') => `${radioGroupLabel} ${groupLabelSizes[size]}`.trim();

export { buildGroupLabelClassName, buildRadioGroupClassName };
//# sourceMappingURL=helpers.js.map
