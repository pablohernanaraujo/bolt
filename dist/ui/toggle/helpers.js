import { clsx } from 'clsx';
import { container, labelPositions, track, trackSizes, thumb, thumbSizes, label, labelSizes, checkedVariants, thumbCheckedPositions } from './toggle.css.js';

const buildContainerClassName = (labelPosition = 'right', className) => clsx(container, labelPositions[labelPosition], className);
const buildTrackClassName = (size = 'medium', variant = 'primary', isSelected) => {
    const classes = [track, trackSizes[size]];
    if (isSelected) {
        classes.push(checkedVariants[variant]);
    }
    return clsx(...classes);
};
const buildThumbClassName = (size = 'medium', isSelected) => {
    const classes = [thumb, thumbSizes[size]];
    if (isSelected) {
        classes.push(thumbCheckedPositions[size]);
    }
    return clsx(...classes);
};
const buildLabelClassName = (size = 'medium') => clsx(label, labelSizes[size]);

export { buildContainerClassName, buildLabelClassName, buildThumbClassName, buildTrackClassName };
//# sourceMappingURL=helpers.js.map
