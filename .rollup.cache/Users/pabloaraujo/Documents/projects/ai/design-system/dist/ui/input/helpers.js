import * as groupStyles from '../input-group/input-group.css';
import { inputRecipe } from './input.css';
export function buildInputClassName(variant, size, className, renderProps) {
    const baseClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    const inputClassName = inputRecipe({
        variant,
        size,
    });
    return baseClassName ? `${inputClassName} ${baseClassName}` : inputClassName;
}
export const isInputInvalid = (hasError, isInvalid) => hasError || isInvalid || false;
export function buildInputWithGroupClassName(variant, size, groupContext, className, renderProps) {
    const baseClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    const inputClassName = inputRecipe({
        variant,
        size,
    });
    const classes = [inputClassName, groupStyles.groupedInput];
    if (groupContext.hasLeftAddon) {
        classes.push(groupStyles.inputWithLeftAddon);
    }
    if (groupContext.hasRightAddon) {
        classes.push(groupStyles.inputWithRightAddon);
    }
    if (groupContext.hasLeftElement) {
        classes.push(groupStyles.inputWithLeftElement);
    }
    if (groupContext.hasRightElement) {
        classes.push(groupStyles.inputWithRightElement);
    }
    if (baseClassName) {
        classes.push(baseClassName);
    }
    return classes.join(' ');
}
