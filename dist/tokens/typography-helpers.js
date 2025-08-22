import { bold, truncated, italic, highlight, underlineStrikeThrough, underline, strikeThrough } from '../ui/typography/shared-styles.css.js';
import { textEmphasis } from './typography.css.js';

const buildTypographyClass = (baseClass, emphasis = 'high') => `${baseClass} ${textEmphasis[emphasis]}`;
const buildCompleteTypographyClass = (baseClass, emphasis = 'high', modifiers = {}, customClass) => {
    const classes = [baseClass, textEmphasis[emphasis]];
    if (modifiers.bold)
        classes.push(bold);
    if (modifiers.isTruncated)
        classes.push(truncated);
    if (modifiers.italic)
        classes.push(italic);
    if (modifiers.highlight)
        classes.push(highlight);
    if (modifiers.underline && modifiers.strikeThrough) {
        classes.push(underlineStrikeThrough);
    }
    else if (modifiers.underline) {
        classes.push(underline);
    }
    else if (modifiers.strikeThrough) {
        classes.push(strikeThrough);
    }
    if (customClass)
        classes.push(customClass);
    return classes.join(' ');
};

export { buildCompleteTypographyClass, buildTypographyClass };
//# sourceMappingURL=typography-helpers.js.map
