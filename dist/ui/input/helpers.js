import { groupedInput, inputWithLeftAddon, inputWithRightAddon, inputWithLeftElement, inputWithRightElement } from '../input-group/input-group.css.js';
import { inputRecipe } from './input.css.js';

function buildInputClassName(variant, size, className, renderProps) {
    const baseClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    const inputClassName = inputRecipe({
        variant,
        size,
    });
    return baseClassName ? `${inputClassName} ${baseClassName}` : inputClassName;
}
const isInputInvalid = (hasError, isInvalid) => hasError || isInvalid || false;
function buildInputWithGroupClassName(variant, size, groupContext, className, renderProps) {
    const baseClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    const inputClassName = inputRecipe({
        variant,
        size,
    });
    const classes = [inputClassName, groupedInput];
    if (groupContext.hasLeftAddon) {
        classes.push(inputWithLeftAddon);
    }
    if (groupContext.hasRightAddon) {
        classes.push(inputWithRightAddon);
    }
    if (groupContext.hasLeftElement) {
        classes.push(inputWithLeftElement);
    }
    if (groupContext.hasRightElement) {
        classes.push(inputWithRightElement);
    }
    if (baseClassName) {
        classes.push(baseClassName);
    }
    return classes.join(' ');
}

export { buildInputClassName, buildInputWithGroupClassName, isInputInvalid };
//# sourceMappingURL=helpers.js.map
