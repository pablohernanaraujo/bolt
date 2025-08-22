import { flexBase, flexDirection, flexWrap, alignItems, justifyContent, flexGap } from './flex.css.js';

const buildFlexClassName = ({ direction, wrap, align, justify, gap, className, }) => {
    const classNames = [
        flexBase,
        flexDirection[direction],
        flexWrap[wrap],
        alignItems[align],
        justifyContent[justify],
        flexGap[gap],
    ];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};

export { buildFlexClassName };
//# sourceMappingURL=helpers.js.map
