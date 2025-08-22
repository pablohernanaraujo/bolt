import { textareaRecipe } from './textarea.css.js';

function buildTextAreaClassName(variant, size, resize, className, renderProps) {
    const baseClassName = textareaRecipe({
        variant,
        size,
        resize,
    });
    const resolvedClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    return resolvedClassName
        ? `${baseClassName} ${resolvedClassName}`
        : baseClassName;
}
const isTextAreaInvalid = (hasError, isInvalid) => hasError || isInvalid || false;
const getTextAreaRows = (size, rows) => {
    if (rows !== undefined) {
        return rows;
    }
    switch (size) {
        case 'small':
            return 2;
        case 'medium':
            return 3;
        case 'large':
            return 4;
        default:
            return 3;
    }
};

export { buildTextAreaClassName, getTextAreaRows, isTextAreaInvalid };
//# sourceMappingURL=helpers.js.map
