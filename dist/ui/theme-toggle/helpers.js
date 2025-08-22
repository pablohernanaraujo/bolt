import { themeToggle } from './theme-toggle.css.js';

const buildThemeToggleClassName = (className) => {
    const classNames = [themeToggle];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};

export { buildThemeToggleClassName };
//# sourceMappingURL=helpers.js.map
