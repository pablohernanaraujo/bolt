import { spinner, sizes, colorSchemes, withTrack } from './spinner.css.js';

const buildSpinnerClassName = (size, colorScheme, showTrack, className) => {
    const classes = [spinner];
    classes.push(sizes[size]);
    classes.push(colorSchemes[colorScheme]);
    if (showTrack) {
        classes.push(withTrack);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
const getAriaValueText = (label) => `${label}...`;

export { buildSpinnerClassName, getAriaValueText };
//# sourceMappingURL=helpers.js.map
