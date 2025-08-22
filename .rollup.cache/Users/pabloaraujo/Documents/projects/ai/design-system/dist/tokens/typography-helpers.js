import * as sharedStyles from '../ui/typography/shared-styles.css';
import { textEmphasis } from './typography.css';
export const buildTypographyClass = (baseClass, emphasis = 'high') => `${baseClass} ${textEmphasis[emphasis]}`;
export const buildCompleteTypographyClass = (baseClass, emphasis = 'high', modifiers = {}, customClass) => {
    const classes = [baseClass, textEmphasis[emphasis]];
    if (modifiers.bold)
        classes.push(sharedStyles.bold);
    if (modifiers.isTruncated)
        classes.push(sharedStyles.truncated);
    if (modifiers.italic)
        classes.push(sharedStyles.italic);
    if (modifiers.highlight)
        classes.push(sharedStyles.highlight);
    if (modifiers.underline && modifiers.strikeThrough) {
        classes.push(sharedStyles.underlineStrikeThrough);
    }
    else if (modifiers.underline) {
        classes.push(sharedStyles.underline);
    }
    else if (modifiers.strikeThrough) {
        classes.push(sharedStyles.strikeThrough);
    }
    if (customClass)
        classes.push(customClass);
    return classes.join(' ');
};
