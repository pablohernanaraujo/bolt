import { hstack, space, align, justify, wrap, reversed } from './hstack.css.js';

const buildHStackClassName = (props) => {
    const { space: space$1 = '0', align: align$1 = 'stretch', justify: justify$1 = 'start', wrap: wrap$1 = false, reversed: reversed$1 = false, className, } = props;
    const classNames = [
        hstack,
        space[space$1],
        align[align$1],
        justify[justify$1],
    ];
    if (wrap$1) {
        classNames.push(wrap);
    }
    if (reversed$1) {
        classNames.push(reversed);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.filter(Boolean).join(' ').trim();
};

export { buildHStackClassName };
//# sourceMappingURL=helpers.js.map
